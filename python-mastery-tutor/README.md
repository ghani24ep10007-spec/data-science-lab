# Python Mastery Tutor

Aplikasi belajar Python interaktif berbahasa Indonesia, dari dasar hingga analisis data.

## Fitur
- 12 modul belajar bertahap dengan contoh kode Python
- Kuis interaktif, petunjuk, koreksi jawaban, dan progres tersimpan di browser
- Roadmap pembelajaran dan prompt mentor AI universal
- Desain responsif untuk ponsel dan desktop
- Contoh dan instruksi yang ramah untuk Android/Pydroid 3

## Prompt AI
Prompt universal yang ringkas tersedia di [PROMPT_MASTER_PYTHON_TUTOR.md](./PROMPT_MASTER_PYTHON_TUTOR.md).

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

## Deployment
- AppDeploy: https://python-mastery-tutor-nvk59y.v2.appdeploy.ai/
- Cloudflare Worker: https://python-mastery-tutor.ghanisyifanur.workers.dev/
- GitHub: https://github.com/ghani24ep10007-spec/data-science-lab/tree/main/python-mastery-tutor

Cloudflare Worker meneruskan permintaan ke aplikasi AppDeploy. Pembaruan GitHub belum diatur untuk memicu deployment otomatis.
