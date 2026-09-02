# NES5 NETWORK - Official Minecraft Server Website & Store

Website resmi server Minecraft **NES5 NETWORK** (`nss.biz.id` / `java.nss.biz.id`) dengan tema visual lanskap Minecraft modern, informasi server lengkap, live status ping, serta halaman Toko (Store) dinamis berbasis konfigurasi `config.json`.

---

## 🌟 Fitur Utama Website

1. **Minecraft Landscape Background**:
   - Pemandangan shaders Minecraft resolusi tinggi sebagai latar belakang dengan efek partikel partikel atmosfer (spores/dust) halus yang bergerak.
   - Desain antarmuka *dark glassmorphism* yang elegan, responsif di HP, tablet, dan komputer.

2. **Integrasi Server Real-Time**:
   - Menampilkan status live online dan jumlah pemain saat ini secara otomatis menggunakan API publik `mcsrvstat.us`.
   - Tombol **Salin IP** (`java.nss.biz.id`) sekali klik dengan notifikasi toast instan.

3. **Detail & Informasi Server**:
   - Informasi lengkap mengenai gameplay **Slimefun 4 Survival** (teknologi kelistrikan, industri otomatis, reaktor nuklir, sihir kuno, dan armor custom murni tanpa mod client).
   - Penjelasan fitur ekonomi & player shop, sistem proteksi tanah (*land claim / anti-grief*), dan panduan 4 langkah cara bergabung.

4. **Toko Server Dinamis (`store.html` & `config.json`)**:
   - Seluruh produk, harga, kategori, dan deskripsi dimuat langsung dari file `config.json`.
   - Filter kategori (*Normal & Paid Ranks*, *High Ranks*, *Special & Community Ranks*, *Slimefun Boosters*) dan pencarian produk langsung.
   - **Checkout Modal Interaktif**:
     - Kolom input Username Minecraft dengan pratinjau avatar kepala skin Minecraft real-time.
     - Pilihan metode pembayaran (QRIS, DANA, GoPay, OVO, Transfer Bank) untuk rank berbayar.
     - Penanganan khusus untuk rank gratis/komunitas (Booster Discord, Viewers, Streamer).
     - Tombol order otomatis ke **WhatsApp Admin** (pesan terformat otomatis) dan **Salin Format Tiket Discord**.

---

## 📁 Struktur File

```text
NES5/
├── CNAME                    # Domain GitHub Pages: nss.biz.id
├── index.html               # Halaman utama (Hero, Status, Fitur, Cara Join)
├── store.html               # Halaman katalog toko server
├── config.json              # File konfigurasi produk, harga, kategori, dan kontak
├── assets/
│   ├── css/
│   │   ├── style.css        # Desain utama dan responsif
│   │   └── store.css        # Gaya kartu produk, filter, dan modal checkout
│   └── js/
│       ├── main.js          # Live status ping, copy IP, partikel canvas, navbar
│       └── store.js         # Engine katalog toko dari config.json
└── README.md                # Dokumentasi panduan
```

---

## ⚙️ Panduan Menambah / Mengubah Produk di `config.json`

Untuk mengubah atau menambah produk baru, kamu cukup membuka file [`config.json`](file:///c:/Users/Administrator/Documents/GitHub/NES5/config.json).

### 1. Mengubah Kontak Admin & WhatsApp
Pada bagian `"server"`, ganti nomor WhatsApp atau link Discord:
```json
"server": {
  "name": "NES5 NETWORK",
  "ip": "java.nss.biz.id",
  "discordUrl": "https://discord.gg/MX8ZTA9ZzA",
  "discordChannelId": "1419480910419595384",
  "whatsappNumber": "628123456789"
}
```

### 2. Menambah Produk Baru
Tambahkan objek baru ke dalam array `"products"`:
```json
{
  "id": "rank-sultan",
  "name": "Rank Sultan",
  "category": "ranks",
  "price": 150000,
  "originalPrice": 200000,
  "badge": "BARU",
  "badgeColor": "amber",
  "icon": "fa-crown",
  "duration": "Permanen",
  "description": "Rank tertinggi dengan fasilitas tak terbatas!",
  "perks": [
    "Prefix [SULTAN] Emas",
    "Akses /fly di semua dunia",
    "Kit mingguan super lengkap",
    "Diskon 20% di NPC Shop"
  ]
}
```

Pilihan warna badge (`badgeColor`): `green`, `amber`, `purple`, `red`, `blue`.

---

## 🚀 Menjalankan Website Secara Lokal

Kamu bisa membuka file `index.html` dan `store.html` langsung di browser favoritmu, atau menggunakan local HTTP server seperti:
```bash
# Menggunakan Python
python -m http.server 8000

# Menggunakan npx serve
npx serve .
```
Lalu buka `http://localhost:8000` di browser.
