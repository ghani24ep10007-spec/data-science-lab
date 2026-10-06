# Skydata — MK Data Science

Aplikasi belajar Data Science berbahasa Indonesia, dibangun dengan Laravel 13 dan Vite. Dirancang agar pemula bisa memahami alur analisis lewat materi ringkas dan latihan langsung.

## Fitur inti

- **Jalur belajar 80/20**: memahami data, membersihkan dan meringkas, memilih visualisasi, lalu menyampaikan insight.
- **Studio CSV privat**: baca pratinjau, jumlah baris/kolom, nilai kosong, rata-rata, median, dan rentang angka. Berkas dibaca di browser, tidak dikirim ke server.
- **Dataset simulasi** penjualan untuk memulai tanpa berkas sendiri.
- **Cetak laporan / simpan PDF** melalui dialog cetak browser.
- Antarmuka responsif dengan palet biru awan.

## Menjalankan lokal

Persyaratan: PHP 8.3+, Composer, Node.js 22+, dan npm.

```powershell
composer install
Copy-Item .env.example .env
php artisan key:generate
npm install
npm run dev
php artisan serve
```

Buka alamat yang ditampilkan oleh `php artisan serve`. Untuk aset produksi, jalankan `npm run build`.

Studio CSV saat ini memproses berkas maksimum 5 MB dan hingga 5.000 baris di browser. Dataset demo adalah data simulasi, bukan data bisnis nyata. Statistik ringkasan dihitung dari sel numerik; kolom kosong diabaikan.

## Deployment

Aplikasi Laravel memerlukan runtime PHP. Gunakan host yang mendukung Laravel (misalnya Laravel Cloud atau VPS) untuk aplikasi, lalu arahkan DNS/proxy Cloudflare ke host tersebut. GitHub berfungsi sebagai repositori dan sumber deployment bila platform hosting dikonfigurasi menghubungkan repo ini. GitHub Pages hanya untuk situs statis dan tidak menjalankan backend Laravel/PHP.

Langkah dasar pada hosting Laravel: set document root ke folder `public`, gunakan PHP 8.3+, jalankan `composer install --no-dev --optimize-autoloader` dan `npm ci && npm run build`, set `APP_ENV=production` dan `APP_DEBUG=false`, buat `APP_KEY`, lalu jalankan migrasi bila kelak database ditambahkan.
