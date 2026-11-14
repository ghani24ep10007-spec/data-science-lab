import { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  Code2,
  Flame,
  GraduationCap,
  Menu,
  Play,
  RotateCcw,
  Terminal,
  Trophy,
} from 'lucide-react';

type Lesson = {
  id: number;
  title: string;
  level: string;
  duration: string;
  desc: string;
  code: string;
  explain: string[];
  question: string;
  answer: string;
  hint: string;
  options?: string[];
};
const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Mengenal Python & print()',
    level: 'Pemula',
    duration: '10 menit',
    desc: 'Python adalah bahasa pemrograman yang mudah dibaca. Fungsi print() menampilkan informasi ke layar.',
    code: 'print("Halo, dunia!")\nprint(2 + 3)',
    explain: [
      'print() menampilkan nilai ke layar.',
      'Teks ditulis di antara tanda kutip.',
      'Ekspresi matematika dapat langsung dihitung.',
    ],
    question: 'Apa hasil dari print(4 + 6)?',
    answer: '10',
    hint: 'Operator + menjumlahkan dua angka.',
  },
  {
    id: 2,
    title: 'Variabel dan tipe data',
    level: 'Pemula',
    duration: '15 menit',
    desc: 'Variabel menyimpan nilai. Python mengenali tipe seperti int, float, str, dan bool.',
    code: 'nama = "Ghani"\numur = 20\ntinggi = 1.72\naktif = True\nprint(type(nama))',
    explain: [
      'Gunakan = untuk memberi nilai variabel.',
      'str untuk teks, int untuk bilangan bulat.',
      'float untuk desimal dan bool untuk True/False.',
    ],
    question: 'Apa tipe data dari nilai 3.14?',
    answer: 'float',
    hint: 'Bilangan yang memiliki angka di belakang koma biasanya bertipe float.',
  },
  {
    id: 3,
    title: 'Input dan konversi tipe',
    level: 'Pemula',
    duration: '15 menit',
    desc: 'input() menerima teks dari pengguna. Gunakan int() atau float() untuk mengubahnya menjadi angka.',
    code: 'umur = int(input("Umur: "))\ntahun_depan = umur + 1\nprint(tahun_depan)',
    explain: [
      'input() selalu menghasilkan string.',
      'int() mengubah teks angka menjadi bilangan bulat.',
      'Konversi mencegah kesalahan saat operasi matematika.',
    ],
    question: 'Fungsi apa untuk mengubah "25" menjadi bilangan bulat?',
    answer: 'int',
    hint: 'Nama fungsi ini sama dengan nama tipe data integer.',
  },
  {
    id: 4,
    title: 'Percabangan if / elif / else',
    level: 'Pemula',
    duration: '20 menit',
    desc: 'Percabangan membuat program mengambil keputusan berdasarkan kondisi.',
    code: 'nilai = 85\nif nilai >= 80:\n    print("Lulus")\nelse:\n    print("Belajar lagi")',
    explain: [
      'if memeriksa kondisi pertama.',
      'else dijalankan jika kondisi if salah.',
      'Indentasi menentukan blok kode.',
    ],
    question: 'Jika nilai = 70, cabang mana yang berjalan pada contoh?',
    answer: 'else',
    hint: '70 tidak memenuhi syarat nilai >= 80.',
  },
  {
    id: 5,
    title: 'Perulangan for dan while',
    level: 'Pemula',
    duration: '20 menit',
    desc: 'Loop menjalankan instruksi berulang kali. for cocok untuk urutan, while untuk kondisi.',
    code: 'for angka in range(1, 4):\n    print(angka)',
    explain: [
      'range(1, 4) menghasilkan 1, 2, 3.',
      'for mengambil satu nilai setiap iterasi.',
      'Gunakan break untuk menghentikan loop.',
    ],
    question: 'Berapa kali loop pada contoh berjalan?',
    answer: '3',
    hint: 'Angka akhir pada range tidak ikut dihitung.',
  },
  {
    id: 6,
    title: 'List, tuple, set, dictionary',
    level: 'Pemula',
    duration: '25 menit',
    desc: 'Struktur data menyimpan kumpulan nilai dengan karakteristik berbeda.',
    code: 'buah = ["apel", "jeruk"]\nprofil = {"nama": "Ghani", "umur": 20}\nprint(buah[0])\nprint(profil["nama"])',
    explain: [
      'List dapat diubah dan memakai indeks.',
      'Tuple bersifat tetap (immutable).',
      'Set menyimpan anggota unik; dictionary menyimpan pasangan key-value.',
    ],
    question: 'Struktur data mana yang menyimpan pasangan key-value?',
    answer: 'dictionary',
    hint: 'Contohnya ditulis dengan kurung kurawal dan key.',
  },
  {
    id: 7,
    title: 'Function dan return',
    level: 'Menengah',
    duration: '25 menit',
    desc: 'Function membungkus instruksi agar dapat digunakan ulang dan lebih mudah diuji.',
    code: 'def tambah(a, b):\n    return a + b\n\nhasil = tambah(3, 5)\nprint(hasil)',
    explain: [
      'def mendefinisikan fungsi.',
      'Parameter menerima masukan.',
      'return mengirim hasil kembali ke pemanggil.',
    ],
    question: 'Apa kata kunci untuk mengembalikan hasil fungsi?',
    answer: 'return',
    hint: 'Lihat baris kedua contoh.',
  },
  {
    id: 8,
    title: 'File, CSV, dan JSON',
    level: 'Menengah',
    duration: '30 menit',
    desc: 'Python dapat membaca dan menulis data ke file agar hasil program tersimpan.',
    code: 'import json\ndata = {"nama": "Ghani", "aktif": True}\nwith open("data.json", "w") as file:\n    json.dump(data, file, indent=2)',
    explain: [
      'import memanggil modul.',
      'with mengelola file secara aman.',
      'json.dump() menulis objek Python ke file JSON.',
    ],
    question: 'Modul bawaan Python untuk mengolah JSON bernama apa?',
    answer: 'json',
    hint: 'Nama modul sama dengan format datanya.',
  },
  {
    id: 9,
    title: 'Exception dan debugging',
    level: 'Menengah',
    duration: '25 menit',
    desc: 'Tangani kesalahan yang diperkirakan dengan try/except dan baca traceback saat debugging.',
    code: 'try:\n    angka = int("abc")\nexcept ValueError:\n    print("Input harus angka")',
    explain: [
      'try berisi kode yang mungkin gagal.',
      'except menangani jenis error tertentu.',
      'Jangan menutupi error tanpa alasan yang jelas.',
    ],
    question: 'Error apa yang muncul saat int("abc") dijalankan?',
    answer: 'valueerror',
    hint: 'Konversi gagal karena teks bukan representasi integer.',
  },
  {
    id: 10,
    title: 'Object-Oriented Programming',
    level: 'Menengah',
    duration: '35 menit',
    desc: 'OOP mengelompokkan data dan perilaku ke dalam class dan object.',
    code: 'class Mahasiswa:\n    def __init__(self, nama):\n        self.nama = nama\n\nmhs = Mahasiswa("Ghani")\nprint(mhs.nama)',
    explain: [
      'class adalah cetak biru objek.',
      '__init__ dijalankan saat objek dibuat.',
      'self merujuk pada instance saat ini.',
    ],
    question: 'Apa nama metode khusus yang dipanggil saat objek dibuat?',
    answer: '__init__',
    hint: 'Metode ini memiliki dua garis bawah di kiri dan kanan.',
  },
  {
    id: 11,
    title: 'Database dan SQL',
    level: 'Mahir',
    duration: '40 menit',
    desc: 'Python dapat terhubung ke SQLite untuk menyimpan data terstruktur dan menjalankan query SQL.',
    code: 'import sqlite3\nconn = sqlite3.connect("kampus.db")\nconn.execute("CREATE TABLE IF NOT EXISTS mahasiswa (nama TEXT)")\nconn.close()',
    explain: [
      'sqlite3 tersedia di Python standar.',
      'connect() membuka atau membuat database.',
      'Gunakan parameter query untuk data pengguna agar aman.',
    ],
    question: 'Modul Python standar untuk SQLite adalah?',
    answer: 'sqlite3',
    hint: 'Nama modul menggabungkan SQLite dan angka 3.',
  },
  {
    id: 12,
    title: 'Analisis data dengan Pandas',
    level: 'Mahir',
    duration: '45 menit',
    desc: 'Pandas membantu membaca, membersihkan, mengolah, dan menganalisis data tabular.',
    code: 'import pandas as pd\ndf = pd.read_csv("data.csv")\nprint(df.head())\nprint(df.describe())',
    explain: [
      'read_csv() membaca file CSV menjadi DataFrame.',
      'head() menampilkan beberapa baris awal.',
      'describe() merangkum statistik kolom numerik.',
    ],
    question: 'Apa nama struktur data tabular utama pada Pandas?',
    answer: 'dataframe',
    hint: 'Namanya terdiri dari dua kata: data dan frame.',
  },
];
const roadmap = [
  'Dasar Python',
  'Logika & struktur data',
  'Function & modularisasi',
  'File dan penanganan error',
  'OOP & algoritma',
  'Database & API',
  'Analisis data',
  'Testing & proyek nyata',
];
function App() {
  const [active, setActive] = useState(0);
  const [answer, setAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [done, setDone] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('python-tutor-done') || '[]');
    } catch {
      return [];
    }
  });
  const [tab, setTab] = useState<'belajar' | 'roadmap' | 'prompt'>('belajar');
  const [menu, setMenu] = useState(false);
  const lesson = lessons[active];
  const percent = Math.round((done.length / lessons.length) * 100);
  useEffect(() => {
    localStorage.setItem('python-tutor-done', JSON.stringify(done));
  }, [done]);
  const normalized = (s: string) => s.toLowerCase().trim().replace(/\s+/g, '');
  const correct = normalized(answer) === normalized(lesson.answer);
  const selectLesson = (i: number) => {
    setActive(i);
    setAnswer('');
    setChecked(false);
    setTab('belajar');
    setMenu(false);
  };
  const markDone = () => {
    setDone(prev => (prev.includes(lesson.id) ? prev : [...prev, lesson.id]));
    if (active < lessons.length - 1) selectLesson(active + 1);
  };
  return (
    <div className="shell">
      <header className="top">
        <div className="brand">
          <div className="logo">
            <Code2 size={22} />
          </div>
          <div>
            <b>
              PYTHON<span>LAB</span>
            </b>
            <small>MASTERY TUTOR</small>
          </div>
        </div>
        <nav>
          <button
            className={tab === 'belajar' ? 'nav active' : 'nav'}
            onClick={() => setTab('belajar')}
          >
            Belajar
          </button>
          <button
            className={tab === 'roadmap' ? 'nav active' : 'nav'}
            onClick={() => setTab('roadmap')}
          >
            Kurikulum
          </button>
          <button
            className={tab === 'prompt' ? 'nav active' : 'nav'}
            onClick={() => setTab('prompt')}
          >
            Prompt AI
          </button>
        </nav>
        <button className="menu" onClick={() => setMenu(!menu)}>
          <Menu />
        </button>
        <div className="profile">
          <div className="avatar">G</div>
          <span>Mode belajar</span>
        </div>
      </header>
      <main>
        <section className="hero">
          <div>
            <div className="eyebrow">
              <span className="pulse"></span> INTERACTIVE PYTHON LEARNING
            </div>
            <h1>
              Bangun skill Python,
              <br />
              <em>selangkah demi selangkah.</em>
            </h1>
            <p>
              Belajar konsep, praktik menulis kode, uji pemahaman, dan perbaiki
              kesalahan dengan tutor yang sabar.
            </p>
            <div className="hero-actions">
              <button
                className="primary"
                onClick={() => {
                  setTab('belajar');
                  document
                    .getElementById('workspace')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Play size={16} fill="currentColor" /> Lanjut belajar
              </button>
              <button className="secondary" onClick={() => setTab('roadmap')}>
                Lihat kurikulum <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="hero-card">
            <div className="orb">
              <Terminal size={32} />
            </div>
            <div className="code-mini">
              <span>01</span> <i>def</i> belajar_python():
              <br />
              <span>02</span> &nbsp;&nbsp;skill = <b>"konsisten"</b>
              <br />
              <span>03</span> &nbsp;&nbsp;<i>return</i> skill
              <br />
              <span>04</span> print(belajar_python())
            </div>
            <div className="floating-tag">✦ Learn by doing</div>
          </div>
        </section>
        <section className="stats">
          <div className="stat">
            <div className="stat-icon violet">
              <BookOpen />
            </div>
            <div>
              <b>{lessons.length}</b>
              <small>Materi terstruktur</small>
            </div>
          </div>
          <div className="stat">
            <div className="stat-icon green">
              <CheckCircle2 />
            </div>
            <div>
              <b>{done.length}</b>
              <small>Materi selesai</small>
            </div>
          </div>
          <div className="stat">
            <div className="stat-icon orange">
              <Flame />
            </div>
            <div>
              <b>{percent}%</b>
              <small>Progres belajar</small>
            </div>
          </div>
          <div className="stat">
            <div className="stat-icon blue">
              <Trophy />
            </div>
            <div>
              <b>{done.length >= lessons.length ? 'Master' : 'Pemula+'}</b>
              <small>Status kemampuan</small>
            </div>
          </div>
        </section>
        {menu && (
          <div className="mobile-menu">
            <button
              onClick={() => {
                setTab('belajar');
                setMenu(false);
              }}
            >
              Belajar
            </button>
            <button
              onClick={() => {
                setTab('roadmap');
                setMenu(false);
              }}
            >
              Kurikulum
            </button>
            <button
              onClick={() => {
                setTab('prompt');
                setMenu(false);
              }}
            >
              Prompt AI
            </button>
          </div>
        )}
        {tab === 'belajar' ? (
          <section id="workspace" className="workspace">
            <aside className="sidebar">
              <div className="side-title">
                JALUR PEMBELAJARAN{' '}
                <span>
                  {done.length}/{lessons.length}
                </span>
              </div>
              <div className="progress">
                <div style={{ width: percent + '%' }} />
              </div>
              <div className="lesson-list">
                {lessons.map((l, i) => (
                  <button
                    key={l.id}
                    onClick={() => selectLesson(i)}
                    className={
                      'lesson-link ' + (active === i ? 'selected' : '')
                    }
                  >
                    <span
                      className={
                        'lesson-number ' +
                        (done.includes(l.id) ? 'completed' : '')
                      }
                    >
                      {done.includes(l.id) ? (
                        <CheckCircle2 size={15} />
                      ) : (
                        String(i + 1).padStart(2, '0')
                      )}
                    </span>
                    <span className="lesson-label">
                      <b>{l.title}</b>
                      <small>
                        {l.level} · {l.duration}
                      </small>
                    </span>
                  </button>
                ))}
              </div>
              <div className="side-tip">
                <Brain size={18} />
                <b>Tips belajar</b>
                <p>
                  Ketik ulang contoh kode. Belajar aktif membantu memahami
                  logika lebih kuat.
                </p>
              </div>
            </aside>
            <article className="lesson-content">
              <div className="crumb">
                KELAS PYTHON <ChevronRight size={13} /> MODUL{' '}
                {String(lesson.id).padStart(2, '0')}
              </div>
              <div className="lesson-heading">
                <div>
                  <span className="tag">{lesson.level}</span>
                  <span className="duration">{lesson.duration}</span>
                  <h2>{lesson.title}</h2>
                  <p>{lesson.desc}</p>
                </div>
                <div className="lesson-index">
                  {String(lesson.id).padStart(2, '0')}
                  <small> / {lessons.length}</small>
                </div>
              </div>
              <div className="section-label">
                <span>01</span> CONTOH KODE
              </div>
              <div className="code-card">
                <div className="code-top">
                  <span>
                    <i /> <i /> <i /> &nbsp; contoh.py
                  </span>
                  <button
                    onClick={() => navigator.clipboard?.writeText(lesson.code)}
                  >
                    Salin kode
                  </button>
                </div>
                <pre>
                  <code>{lesson.code}</code>
                </pre>
                <div className="code-foot">
                  <span>PYTHON 3</span>
                  <span>Jalankan di Pydroid 3 atau komputer</span>
                </div>
              </div>
              <div className="explain">
                <div className="section-label">
                  <span>02</span> PEMAHAMAN KONSEP
                </div>
                {lesson.explain.map((x, i) => (
                  <div className="explain-row" key={i}>
                    <span>{i + 1}</span>
                    <p>{x}</p>
                  </div>
                ))}
              </div>
              <div className="quiz">
                <div className="quiz-head">
                  <div>
                    <div className="section-label">
                      <span>03</span> UJI PEMAHAMAN
                    </div>
                    <h3>Sekarang giliran kamu.</h3>
                    <p>
                      Jawab pertanyaan berikut tanpa melihat solusi terlebih
                      dahulu.
                    </p>
                  </div>
                  <div className="brain-icon">
                    <Brain />
                  </div>
                </div>
                <label className="question">{lesson.question}</label>
                <div className="answer-row">
                  <input
                    value={answer}
                    onChange={e => {
                      setAnswer(e.target.value);
                      setChecked(false);
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') setChecked(true);
                    }}
                    placeholder="Tulis jawabanmu di sini..."
                  />
                  <button
                    onClick={() => setChecked(true)}
                    disabled={!answer.trim()}
                  >
                    Periksa <ChevronRight size={16} />
                  </button>
                </div>
                {checked && (
                  <div className={'feedback ' + (correct ? 'good' : 'bad')}>
                    <b>
                      {correct
                        ? 'Tepat sekali! Jawabanmu benar.'
                        : 'Belum tepat. Yuk, pahami lagi.'}
                    </b>
                    <p>
                      {correct
                        ? 'Kamu sudah memahami konsep ini.'
                        : 'Petunjuk: ' + lesson.hint}
                    </p>
                    {!correct && (
                      <small>
                        Coba lagi. Jawaban yang diharapkan berupa:{' '}
                        {lesson.answer.length > 4
                          ? 'istilah atau kata kunci'
                          : 'nilai atau kata kunci'}
                        .
                      </small>
                    )}
                    {correct && (
                      <button onClick={markDone}>
                        Tandai selesai & lanjut <ChevronRight size={15} />
                      </button>
                    )}
                  </div>
                )}
                <div className="quiz-hint">
                  <Brain size={15} /> Jika salah, baca petunjuk dan coba lagi.
                  Tidak perlu terburu-buru.
                </div>
              </div>
              <div className="lesson-nav">
                <button
                  onClick={() => selectLesson(Math.max(0, active - 1))}
                  disabled={active === 0}
                >
                  ← Materi sebelumnya
                </button>
                <button
                  onClick={() =>
                    selectLesson(Math.min(lessons.length - 1, active + 1))
                  }
                  disabled={active === lessons.length - 1}
                >
                  Materi berikutnya →
                </button>
              </div>
            </article>
          </section>
        ) : tab === 'roadmap' ? (
          <section className="alt-panel">
            <div className="crumb">
              PETA BELAJAR <ChevronRight size={13} /> ROADMAP
            </div>
            <h2>Kurikulum dari nol hingga mahir</h2>
            <p className="muted">
              Ikuti urutan ini. Setiap tahap membangun fondasi untuk materi
              berikutnya.
            </p>
            <div className="roadmap">
              {roadmap.map((r, i) => (
                <div className="road-item" key={r}>
                  <div className="road-num">{i + 1}</div>
                  <div>
                    <b>{r}</b>
                    <small>
                      {i < 2
                        ? 'Fondasi pemrograman'
                        : i < 5
                          ? 'Pengembangan kemampuan'
                          : 'Penerapan profesional'}
                    </small>
                  </div>
                  <span>
                    {i < Math.ceil(done.length / 2) ? 'Dasar' : 'Berikutnya'}
                  </span>
                </div>
              ))}
            </div>
            <button className="primary" onClick={() => setTab('belajar')}>
              Mulai dari materi <ChevronRight size={16} />
            </button>
          </section>
        ) : (
          <section className="alt-panel">
            <div className="crumb">
              TOOLS <ChevronRight size={13} /> PROMPT AI
            </div>
            <h2>Prompt mentor Python universal</h2>
            <p className="muted">
              Salin prompt ini ke ChatGPT, Gemini, Claude, atau AI lain untuk
              mendapatkan sesi belajar interaktif.
            </p>
            <div className="prompt-box">
              <button
                onClick={() =>
                  navigator.clipboard?.writeText(
                    'Bertindaklah sebagai mentor Python senior. Ajari saya dari pemula sampai mahir dengan bahasa Indonesia sederhana. Mulai dengan tes diagnostik satu pertanyaan. Ajarkan satu konsep per sesi, beri contoh kode, latihan, dan 3 pertanyaan. Tunggu jawaban saya, koreksi dengan menjelaskan bagian benar dan salah, beri petunjuk sebelum solusi, catat progres, dan jangan lanjut sebelum saya paham. Sesuaikan contoh untuk Android/Pydroid 3. Kurikulum: dasar, tipe data, percabangan, loop, struktur data, fungsi, modul, file, exception, OOP, algoritma, database, API, Pandas, visualisasi, testing, keamanan, dan proyek portofolio.'
                  )
                }
              >
                Salin prompt
              </button>
              <pre>
                Bertindaklah sebagai mentor Python senior. Ajari saya dari
                pemula sampai mahir dengan bahasa Indonesia sederhana. Mulai
                dengan tes diagnostik satu pertanyaan. Ajarkan satu konsep per
                sesi, beri contoh kode, latihan, dan 3 pertanyaan. Tunggu
                jawaban saya, koreksi dengan menjelaskan bagian benar dan salah,
                beri petunjuk sebelum solusi, catat progres, dan jangan lanjut
                sebelum saya paham. Sesuaikan contoh untuk Android/Pydroid 3.
                Kurikulum: dasar, tipe data, percabangan, loop, struktur data,
                fungsi, modul, file, exception, OOP, algoritma, database, API,
                Pandas, visualisasi, testing, keamanan, dan proyek portofolio.
              </pre>
            </div>
            <p className="muted">
              Tips: gunakan satu percakapan khusus Python agar riwayat belajar
              dan evaluasi lebih mudah diikuti.
            </p>
          </section>
        )}
        <section className="bottom-note">
          <GraduationCap size={22} />
          <div>
            <b>Belajar konsisten, bukan terburu-buru.</b>
            <p>
              Latihan kecil setiap hari lebih baik daripada menghafal banyak
              kode sekaligus.
            </p>
          </div>
        </section>
      </main>
      <footer>
        PYTHONLAB · BELAJAR PYTHON DENGAN PEMAHAMAN{' '}
        <span>Made for curious minds</span>
      </footer>
    </div>
  );
}
export default App;
