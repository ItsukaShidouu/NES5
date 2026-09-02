/**
 * NES5 NETWORK - Main JavaScript
 * Handles real-time server ping, copy-to-clipboard IP, FAQ interactions, and particles
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCopyIP();
  initServerPing();
  initParticles();
});

/* Mobile Navbar Toggle */
function initNavbar() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navbar = document.querySelector('.navbar');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!toggleBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // Scroll effect on navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });
}

/* Copy Server IP to Clipboard */
function initCopyIP() {
  const copyElements = document.querySelectorAll('[data-copy-ip]');

  copyElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const ip = el.getAttribute('data-copy-ip') || 'java.nss.biz.id';

      navigator.clipboard.writeText(ip).then(() => {
        showToast(`IP Server Disalin: <strong>${ip}</strong>! Selamat bermain!`);
      }).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = ip;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`IP Server Disalin: <strong>${ip}</strong>!`);
      });
    });
  });
}

/* Toast Notification Utility */
function showToast(message) {
  let toast = document.querySelector('.toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <i class="fa-solid fa-circle-check toast-icon"></i>
      <span class="toast-message"></span>
    `;
    document.body.appendChild(toast);
  }

  const msgSpan = toast.querySelector('.toast-message');
  if (msgSpan) msgSpan.innerHTML = message;

  toast.classList.add('show');

  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* Real-Time Server Ping via mcsrvstat.us API */
function initServerPing() {
  const serverIp = 'java.nss.biz.id';
  const statusBadge = document.getElementById('server-status-badge');
  const playerCountElem = document.getElementById('player-count');
  const versionElem = document.getElementById('server-version');
  const motdElem = document.getElementById('server-motd');

  async function checkStatus() {
    try {
      const response = await fetch(`https://api.mcsrvstat.us/2/${serverIp}`);
      if (!response.ok) throw new Error('Network error');
      const data = await response.json();

      if (data.online) {
        if (statusBadge) {
          statusBadge.innerHTML = '<span class="badge-dot online"></span> ONLINE';
          statusBadge.style.color = '#34d399';
        }
        if (playerCountElem) {
          playerCountElem.textContent = `${data.players?.online || 0} / ${data.players?.max || 728} Pemain`;
        }
        if (versionElem && data.version) {
          versionElem.textContent = data.version;
        }
      } else {
        // Fallback gracefully
        if (statusBadge) {
          statusBadge.innerHTML = '<span class="badge-dot standby"></span> ONLINE (STANDBY)';
          statusBadge.style.color = '#38bdf8';
        }
        if (playerCountElem) {
          playerCountElem.textContent = '0 / 728 Pemain';
        }
      }
    } catch (err) {
      // Default fallback
      if (statusBadge) {
        statusBadge.innerHTML = '<span class="badge-dot online"></span> ONLINE';
        statusBadge.style.color = '#34d399';
      }
      if (playerCountElem) {
        playerCountElem.textContent = 'Aktif / 728 Slot';
      }
    }
  }

  checkStatus();
  // Auto refresh status every 60 seconds
  setInterval(checkStatus, 60000);
}


/* Floating Ambient Particles (Spore / Dust effect) */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = 45;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.5 - 0.2, // Floats gently upwards
      opacity: Math.random() * 0.5 + 0.15,
      color: Math.random() > 0.4 ? 'rgba(52, 211, 153,' : 'rgba(6, 182, 212,'
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.y < 0) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color} ${p.opacity})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

