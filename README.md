# 🖥️Lab Computer - Web Server & Sistem Reservasi Warnet

Website informasi, pemantauan status komputer (*live indicator*), dan reservasi billing warnet berbasis web statis yang dapat di-hosting langsung menggunakan **GitHub Pages**.

## ✨ Fitur Utama
- **Landing Page Modern**: Informasi profil warnet, paket harga, dan spesifikasi PC (Zona Reguler & VIP).
- **Indikator Status PC Real-Time**: Menampilkan status setiap unit komputer (**Kosong**, **Terpakai**, dan **Direservasi**).
- **Sistem Reservasi Pelanggan**: Pelanggan dapat memilih unit PC yang kosong dan melakukan booking jam kedatangan secara online.
- **Kontrol Cepat Operator**: Klik kanan pada kotak PC untuk mengubah status unit secara manual (Kosong/Terpakai).

## 🛠️ Teknologi yang Digunakan
- **HTML5** - Struktur halaman web
- **CSS3** - Desain responsif bertema *Dark Gaming*
- **JavaScript (ES6)** - Manajemen state status PC & penyimpanan `localStorage`

## 🚀 Cara Menjalankan di GitHub Pages
1. Upload seluruh file (`index.html`, `style.css`, `script.js`, `README.md`) ke repositori GitHub Anda.
2. Buka menu **Settings** pada repositori tersebut.
3. Pilih tab **Pages** di menu sebelah kiri.
4. Pada bagian **Source / Branch**, pilih `main` (atau `master`) dan folder `/ (root)`, lalu klik **Save**.
5. Tunggu beberapa saat hingga link website GitHub Pages Anda aktif.

## Catatan Pengembangan Selanjutnya
Karena GitHub Pages bersifat statis (`localStorage` hanya tersimpan di browser masing-masing perangkat), untuk sinkronisasi *real-time* antar komputer kasir/server dan HP pelanggan yang berbeda, Anda dapat menghubungkan `script.js` dengan database gratis seperti **Firebase Realtime Database** atau **Supabase**.
