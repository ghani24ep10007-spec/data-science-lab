# Python Mastery Tutor

Aplikasi belajar Python interaktif berbahasa Indonesia, dari dasar hingga analisis data.

## Fitur
- 12 modul belajar bertahap dengan contoh kode Python
- Kuis interaktif, petunjuk, koreksi jawaban, dan progres tersimpan di browser
- Roadmap pembelajaran dan prompt mentor AI universal
- Desain responsif untuk ponsel dan desktop
- Contoh dan instruksi yang ramah untuk Android/Pydroid 3

## Menjalankan secara lokal
Memerlukan Node.js 20.19+ atau 22.12+.

```bash
npm install
npm run dev
```

## Build produksi
```bash
npm run build
npm run preview
```

Hasil build berada di folder `dist/`.

## Deploy
Cloudflare Pages menggunakan root directory `/python-mastery-tutor`, build command `npm run build`, dan output directory `dist`.

Aplikasi awal juga tersedia melalui AppDeploy: https://python-mastery-tutor-nvk59y.v2.appdeploy.ai/
