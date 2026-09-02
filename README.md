# NES5 NETWORK - Official Minecraft Server Website

Website resmi server Minecraft **NES5 NETWORK** (`nss.biz.id` / `java.nss.biz.id`) dengan tampilan visual lanskap Minecraft modern, *floating glass island navbar*, informasi server lengkap, dan live status ping real-time.

---

## 🌟 Fitur Utama Website

1. **Aesthetic Floating Navbar**:
   - Desain modern *floating glass island* dengan efek *backdrop blur*, border glow halus, dan animasi logo.
   - Tombol interaktif penyalin IP instan (`java.nss.biz.id`) dengan indikator status online dan animasi toast.
   - Tombol akses cepat ke server Discord resmi.
   - Responsif di perangkat mobile dengan menu transisi halus.

2. **Minecraft Landscape Backdrop & Particles**:
   - Pemandangan shaders Minecraft resolusi tinggi sebagai latar belakang dinamis dengan partikel atmosfer (*spores/dust*) yang melayang lembut.
   - Antarmuka *dark glassmorphism* yang nyaman dipandang.

3. **Integrasi Server Real-Time**:
   - Menampilkan status server online dan jumlah pemain saat ini secara otomatis menggunakan API publik `mcsrvstat.us`.
   - Kotak IP interaktif dengan sekali klik untuk menyalin alamat server.

4. **Detail & Informasi Server Lengkap**:
   - Penjelasan mendalam gameplay **Slimefun 4 Survival** (teknologi kelistrikan, otomatisasi industri, reaktor nuklir, magis kuno, dan armor khusus murni tanpa mod client).
   - Fitur ekonomi pasar pemain, sistem proteksi tanah (*land claim / anti-grief*), serta panduan 4 langkah mudah cara bergabung bagi pemain baru.

5. **Integrasi Komunitas Discord**:
   - Tautan langsung ke server Discord komunitas resmi [NES5 NETWORK](https://discord.gg/MX8ZTA9ZzA) untuk event, pengumuman, dan pembelian/klaim rank di channel `1419480910419595384`.

---

## 📁 Struktur File

```text
NES5/
├── CNAME                    # Domain GitHub Pages: nss.biz.id
├── index.html               # Halaman utama (Hero, Status, Fitur, Cara Join)
├── config.json              # Data server & konfigurasi rank
├── assets/
│   ├── css/
│   │   └── style.css        # Desain utama, floating navbar estetik, dan responsif
│   └── js/
│       └── main.js          # Live status ping, copy IP toast, navbar scroll spy, partikel canvas
└── README.md                # Dokumentasi proyek
```

---

## 🚀 Menjalankan Website Secara Lokal

Buka file `index.html` langsung di browser, atau gunakan local web server:
```bash
# Menggunakan Python
python -m http.server 8000
```
Buka `http://localhost:8000` pada browser favorit Anda.
