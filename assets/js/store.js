/**
 * NES5 NETWORK - Dynamic Store Engine
 * Loads config.json, handles category filtering, search, and interactive checkout modal
 */

let storeConfig = null;
let currentCategory = 'all';
let searchQuery = '';
let selectedProduct = null;
let selectedPaymentMethod = null;

document.addEventListener('DOMContentLoaded', () => {
  loadStoreConfig();
  initStoreEvents();
});

/* Fetch config.json */
async function loadStoreConfig() {
  const loadingContainer = document.getElementById('products-loading');
  try {
    const response = await fetch('config.json');
    if (!response.ok) throw new Error('Gagal memuat config.json');
    storeConfig = await response.json();

    if (loadingContainer) loadingContainer.style.display = 'none';

    renderCategories();
    renderProducts();
    initModalPaymentMethods();
  } catch (error) {
    console.error('Store error:', error);
    if (loadingContainer) {
      loadingContainer.innerHTML = `
        <div class="no-products">
          <i class="fa-solid fa-triangle-exclamation" style="color: #ef4444;"></i>
          <h3>Gagal Memuat Produk Toko</h3>
          <p>Pastikan file <code>config.json</code> tersedia dengan format yang benar.</p>
        </div>
      `;
    }
  }
}

/* Render Category Tabs */
function renderCategories() {
  const tabsContainer = document.getElementById('category-tabs');
  if (!tabsContainer || !storeConfig?.categories) return;

  tabsContainer.innerHTML = '';

  storeConfig.categories.forEach(cat => {
    const tabBtn = document.createElement('button');
    tabBtn.className = `category-tab ${cat.id === currentCategory ? 'active' : ''}`;
    tabBtn.innerHTML = `<i class="fa-solid ${cat.icon || 'fa-tag'}"></i> ${cat.name}`;
    tabBtn.addEventListener('click', () => {
      document.querySelectorAll('.category-tab').forEach(b => b.classList.remove('active'));
      tabBtn.classList.add('active');
      currentCategory = cat.id;
      renderProducts();
    });
    tabsContainer.appendChild(tabBtn);
  });
}

/* Render Products List */
function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid || !storeConfig?.products) return;

  grid.innerHTML = '';

  const filtered = storeConfig.products.filter(item => {
    const matchCategory = currentCategory === 'all' || item.category === currentCategory;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-products">
        <i class="fa-solid fa-box-open"></i>
        <h3>Tidak Ada Produk Ditemukan</h3>
        <p>Coba pilih kategori lain atau ubah kata kunci pencarian Anda.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    // Badge styling
    let badgeHtml = '';
    if (product.badge) {
      const colorClass = product.badgeColor ? `badge-${product.badgeColor}` : 'badge-green';
      badgeHtml = `<span class="product-badge ${colorClass}">${product.badge}</span>`;
    }

    // Perks list
    const perksHtml = product.perks ? product.perks.map(perk => `
      <li><i class="fa-solid fa-check"></i> <span>${perk}</span></li>
    `).join('') : '';

    // Pricing format
    const formattedPrice = formatRupiah(product.price);
    const originalPriceHtml = product.originalPrice ? 
      `<span class="original-price">${formatRupiah(product.originalPrice)}</span>` : '';

    card.innerHTML = `
      ${badgeHtml}
      <div class="product-icon-wrap">
        <i class="fa-solid ${product.icon || 'fa-cube'}"></i>
      </div>
      <h3 class="product-name">${product.name}</h3>
      ${product.duration ? `<div class="product-duration"><i class="fa-regular fa-clock"></i> ${product.duration}</div>` : ''}
      <p class="product-desc">${product.description}</p>
      <ul class="product-perks">
        ${perksHtml}
      </ul>
      <div class="product-footer">
        <div class="product-pricing">
          ${originalPriceHtml}
          <div class="current-price"><span>Rp</span> ${formattedPrice}</div>
        </div>
        <button class="btn btn-primary btn-sm btn-buy" data-product-id="${product.id}">
          <i class="fa-solid fa-cart-shopping"></i> Beli
        </button>
      </div>
    `;

    const buyBtn = card.querySelector('.btn-buy');
    buyBtn.addEventListener('click', () => openCheckoutModal(product));

    grid.appendChild(card);
  });
}

/* Event Handlers for Search & Filters */
function initStoreEvents() {
  const searchInput = document.getElementById('store-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderProducts();
    });
  }

  // Modal close trigger
  const modal = document.getElementById('checkout-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', closeCheckoutModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCheckoutModal();
    });
  }

  // Live avatar preview on Minecraft username input
  const usernameInput = document.getElementById('mc-username-input');
  const avatarImg = document.getElementById('mc-avatar-img');

  if (usernameInput && avatarImg) {
    let debounceTimer;
    usernameInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const val = usernameInput.value.trim();
        if (val.length >= 3) {
          avatarImg.src = `https://mc-heads.net/avatar/${encodeURIComponent(val)}/64`;
        } else {
          avatarImg.src = `https://mc-heads.net/avatar/Steve/64`;
        }
      }, 400);
    });
  }

  // Action buttons inside modal
  const btnWhatsapp = document.getElementById('modal-btn-whatsapp');
  const btnCopyFormat = document.getElementById('modal-btn-copy-format');

  if (btnWhatsapp) {
    btnWhatsapp.addEventListener('click', handleWhatsappCheckout);
  }

  if (btnCopyFormat) {
    btnCopyFormat.addEventListener('click', handleCopyDiscordFormat);
  }
}

/* Payment Methods Setup inside Modal */
function initModalPaymentMethods() {
  const container = document.getElementById('payment-methods-list');
  if (!container || !storeConfig?.paymentMethods) return;

  container.innerHTML = '';
  selectedPaymentMethod = storeConfig.paymentMethods[0]?.name || 'QRIS';

  storeConfig.paymentMethods.forEach((method, idx) => {
    const card = document.createElement('div');
    card.className = `payment-method-card ${idx === 0 ? 'active' : ''}`;
    card.innerHTML = `<i class="fa-solid ${method.icon || 'fa-credit-card'}"></i> ${method.name}`;
    card.addEventListener('click', () => {
      document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedPaymentMethod = method.name;
    });
    container.appendChild(card);
  });
}

/* Open Modal with Product Data */
function openCheckoutModal(product) {
  selectedProduct = product;
  const modal = document.getElementById('checkout-modal');
  if (!modal) return;

  document.getElementById('modal-product-title').textContent = product.name;
  document.getElementById('modal-product-price').textContent = `Rp ${formatRupiah(product.price)}`;

  const instructions = document.getElementById('modal-payment-instruction');
  if (instructions && storeConfig?.server?.paymentInstructions) {
    instructions.textContent = storeConfig.server.paymentInstructions;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* Close Modal */
function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* WhatsApp Order Integration */
function handleWhatsappCheckout() {
  if (!selectedProduct) return;

  const usernameInput = document.getElementById('mc-username-input');
  const username = usernameInput ? usernameInput.value.trim() : '';

  if (!username) {
    alert('Mohon masukkan Username Minecraft kamu terlebih dahulu!');
    usernameInput?.focus();
    return;
  }

  const phone = storeConfig?.server?.whatsappNumber || '628123456789';
  const price = formatRupiah(selectedProduct.price);

  const message = 
`Halo Admin NES5 NETWORK!
Saya ingin melakukan pembelian di Store Server:
━━━━━━━━━━━━━━━━━━━━
• Produk: ${selectedProduct.name}
• Harga: Rp ${price}
• Username Minecraft: ${username}
• Metode Pembayaran: ${selectedPaymentMethod || 'QRIS'}
━━━━━━━━━━━━━━━━━━━━
Mohon informasi nomor rekening / QRIS untuk penyelesaian transaksi ini. Terima kasih!`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

/* Copy Ticket Format for Discord */
function handleCopyDiscordFormat() {
  if (!selectedProduct) return;

  const usernameInput = document.getElementById('mc-username-input');
  const username = usernameInput ? usernameInput.value.trim() : '';

  if (!username) {
    alert('Mohon masukkan Username Minecraft kamu terlebih dahulu!');
    usernameInput?.focus();
    return;
  }

  const price = formatRupiah(selectedProduct.price);

  const ticketFormat = 
`=== FORM PEMBELIAN STORE NES5 NETWORK ===
Produk           : ${selectedProduct.name}
Harga            : Rp ${price}
Username Minecraft: ${username}
Metode Bayar     : ${selectedPaymentMethod || 'QRIS'}
Catatan          : Siap transfer & konfirmasi bukti pembayaran.
=========================================`;

  navigator.clipboard.writeText(ticketFormat).then(() => {
    alert('Format tiket berhasil disalin! Silakan paste (Ctrl+V) ke Discord Ticket admin kami.');
  }).catch(() => {
    prompt('Salin teks order berikut:', ticketFormat);
  });
}

/* Number Formatting Helper */
function formatRupiah(angka) {
  if (angka === undefined || angka === null) return '0';
  return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

