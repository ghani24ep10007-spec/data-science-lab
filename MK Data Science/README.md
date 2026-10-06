# Skydata Studio — MK Data Science

Dashboard portofolio Data Science berbasis Laravel 13 dengan antarmuka responsif bertema biru awan. Tampilan ini mengadaptasi pola dashboard POS pada [web-pos-unugha](https://github.com/mastzy/web-pos-unugha): navigasi samping, ringkasan metrik, grafik, target mingguan, dan tabel proyek.

> Angka, nama proyek, dan aktivitas pada halaman saat ini adalah data demo untuk tugas mata kuliah. Dashboard belum memakai login atau basis data.

## Teknologi

- Laravel 13 · PHP 8.3+ · Node.js 22+
- Blade, Vite, custom responsive CSS
- JavaScript untuk navigasi seluler, filter proyek, dan ekspor CSV

## Menjalankan secara lokal

    git clone https://github.com/ghani24ep10007-spec/data-science-lab.git
    cd "data-science-lab/MK Data Science"
    composer install
    Copy-Item .env.example .env
    php artisan key:generate
    npm install
    npm run build
    php artisan serve

Buka http://127.0.0.1:8000. Untuk pengembangan aset, jalankan npm run dev di terminal terpisah.

## Deploy ke GitHub dan Cloudflare

Repository: [ghani24ep10007-spec/data-science-lab](https://github.com/ghani24ep10007-spec/data-science-lab), folder MK Data Science.

Aplikasi memakai PHP dan Laravel, sehingga perlu runtime PHP. Cloudflare Pages tidak menjalankan PHP. Untuk deployment Laravel yang tetap memakai jaringan edge Cloudflare:

1. Hubungkan repository dan branch main ke [Laravel Cloud](https://cloud.laravel.com/).
2. Pilih subfolder aplikasi MK Data Science, lalu gunakan runtime PHP 8.3 atau yang kompatibel.
3. Pilih Node.js 22. Gunakan build command composer install --no-dev && npm install && npm run build.
4. Tambahkan domain aplikasi melalui pengaturan domain Laravel Cloud. Ikuti instruksi DNS yang ditampilkan untuk menghubungkan domain di Cloudflare. Simpan APP_KEY sebagai secret, set APP_ENV=production dan APP_DEBUG=false, lalu deploy.

Laravel Cloud menghubungkan aplikasi ke Git dan menggunakan Cloudflare untuk edge network serta mitigasi DDoS. Pengaturan deployment PHP ini berbeda dari Cloudflare Pages. Aplikasi saat ini belum membutuhkan database atau perintah migrasi.

## Catatan pengembangan

- Tabel proyek diisi dari controller route Laravel (routes/web.php) dan dirender memakai Blade.
- Isi pencarian dan status dipakai bersama saat ekspor CSV.
- Untuk memakai data sungguhan, sambungkan daftar proyek dan metrik ke migration, model, serta database Laravel.
- Jangan commit .env, kredensial, atau kunci aplikasi.
