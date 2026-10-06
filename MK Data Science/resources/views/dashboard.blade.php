<!doctype html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#f5f9ff">
    <meta name="description" content="Ruang kerja data science: pantau proyek, analisis, dan insight dalam satu dashboard.">
    <link rel="icon" type="image/svg+xml" href="{{ asset('favicon.svg') }}">
    <title>Skydata — Dashboard Data Science</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    <div class="app-shell">
        <aside class="sidebar" id="sidebar">
            <a class="brand" href="#overview" aria-label="Skydata beranda">
                <span class="brand-mark" aria-hidden="true">
                    <svg viewBox="0 0 32 32" fill="none"><path d="M9 22h13.1a5 5 0 0 0 .3-10A7.1 7.1 0 0 0 8.8 10.5 5.8 5.8 0 0 0 9 22Z" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="m12 17 2.5 2.5L20 14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
                <span>skydata<span class="brand-period">.</span><small>DATA SCIENCE STUDIO</small></span>
            </a>
            <div class="workspace-switch"><span class="workspace-avatar">MK</span><span><b>MK Data Science</b><small>Ruang kerja pribadi</small></span><span class="chevron">⌄</span></div>
            <nav class="nav-group" aria-label="Navigasi utama">
                <p class="nav-label">MENU</p>
                <a class="nav-link active" href="#overview"><span class="nav-icon">◫</span> Ringkasan <span class="active-dot"></span></a>
                <a class="nav-link" href="#projects"><span class="nav-icon">▤</span> Proyek <span class="nav-count">5</span></a>
                <a class="nav-link" href="#insights"><span class="nav-icon">⌁</span> Insight</a>
                <a class="nav-link" href="#projects"><span class="nav-icon">▦</span> Dataset</a>
                <p class="nav-label nav-label-spaced">RUANG KERJA</p>
                <a class="nav-link" href="#projects"><span class="nav-icon">◇</span> Pembelajaran</a>
                <a class="nav-link" href="#projects"><span class="nav-icon">◷</span> Aktivitas</a>
            </nav>
            <div class="sidebar-bottom">
                <div class="help-card"><span class="help-icon">✦</span><b>Butuh inspirasi?</b><p>Lihat ide proyek data pilihan untuk memulai eksplorasi berikutnya.</p><a href="#projects">Jelajahi ide <span>→</span></a></div>
                <button type="button" class="profile-button"><span class="profile-avatar">G</span><span><b>Ghani</b><small>Mahasiswa Data Science</small></span><span class="chevron">···</span></button>
            </div>
        </aside>

        <main class="main-content" id="overview">
            <header class="topbar">
                <button class="icon-button mobile-menu" type="button" data-menu-toggle aria-label="Buka menu" aria-expanded="false">☰</button>
                <div class="breadcrumbs">Ruang kerja <span>/</span> <b>Ringkasan</b></div>
                <div class="top-actions"><span class="demo-tag">DATA DEMO</span><span class="today-label"><span class="live-dot"></span> {{ now()->locale('id')->translatedFormat('l, j F Y') }}</span><button class="icon-button notification-button" type="button" aria-label="Notifikasi">♧<i></i></button><span class="top-avatar">G</span></div>
            </header>
            <section class="page-content">
                <div class="welcome-row">
                    <div><p class="eyebrow"><span class="sun-icon">☀</span> SELAMAT DATANG KEMBALI</p><h1>Halo, Ghani <span class="wave">✦</span></h1><p class="welcome-copy">Ini perkembangan ruang data science kamu. Siap menemukan insight baru?</p></div>
                    <a class="primary-button" href="#projects"><span>＋</span> Buat proyek baru</a>
                </div>

                <div class="stat-grid" aria-label="Ringkasan statistik">
                    <article class="stat-card"><div class="stat-top"><span>Total proyek</span><span class="stat-icon icon-blue">▤</span></div><div class="stat-value">12</div><div class="stat-foot"><span class="trend up">↗ 20%</span><span>dari bulan lalu</span></div><div class="sparkline spark-blue" aria-hidden="true"><svg viewBox="0 0 112 32"><path d="M1 24 15 20 28 23 42 12 56 16 70 8 84 13 98 3 111 7"/></svg></div></article>
                    <article class="stat-card"><div class="stat-top"><span>Dalam proses</span><span class="stat-icon icon-violet">◷</span></div><div class="stat-value">04</div><div class="stat-foot"><span class="neutral">● Aktif dikerjakan</span></div><div class="sparkline spark-violet" aria-hidden="true"><svg viewBox="0 0 112 32"><path d="M1 22 15 16 28 20 42 13 56 18 70 9 84 14 98 5 111 10"/></svg></div></article>
                    <article class="stat-card"><div class="stat-top"><span>Dataset dianalisis</span><span class="stat-icon icon-teal">▦</span></div><div class="stat-value">28</div><div class="stat-foot"><span class="trend up">↗ 12%</span><span>dari bulan lalu</span></div><div class="sparkline spark-teal" aria-hidden="true"><svg viewBox="0 0 112 32"><path d="M1 26 15 19 28 21 42 16 56 18 70 8 84 13 98 4 111 6"/></svg></div></article>
                    <article class="stat-card"><div class="stat-top"><span>Insight tersimpan</span><span class="stat-icon icon-amber">✧</span></div><div class="stat-value">36</div><div class="stat-foot"><span class="trend up">↗ 8%</span><span>dari bulan lalu</span></div><div class="sparkline spark-amber" aria-hidden="true"><svg viewBox="0 0 112 32"><path d="M1 25 15 22 28 15 42 19 56 12 70 15 84 8 98 11 111 3"/></svg></div></article>
                </div>

                <div class="content-grid">
                    <section class="panel chart-panel" id="insights">
                        <div class="panel-heading"><div><h2>Aktivitas analisis</h2><p>Produktivitas eksplorasi data kamu</p></div><label class="select-wrap"><select aria-label="Rentang waktu"><option>7 hari terakhir</option><option>30 hari terakhir</option><option>90 hari terakhir</option></select></label></div>
                        <div class="chart-legend"><span><i class="legend-blue"></i> Dataset dianalisis</span><span><i class="legend-lilac"></i> Insight dibuat</span></div>
                        <div class="chart" role="img" aria-label="Grafik aktivitas analisis selama tujuh hari, aktivitas tertinggi pada hari Kamis dan Sabtu">
                            <div class="y-labels"><span>24</span><span>18</span><span>12</span><span>6</span><span>0</span></div>
                            <div class="chart-area"><div class="grid-lines"><i></i><i></i><i></i><i></i><i></i></div><svg class="chart-lines" viewBox="0 0 700 190" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="fillBlue" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#69a9ff" stop-opacity=".2"/><stop offset="1" stop-color="#69a9ff" stop-opacity="0"/></linearGradient></defs><path class="area-fill" d="M0 139 C35 130 45 117 100 122 S165 100 200 110 S265 69 300 83 S365 90 400 76 S465 98 500 80 S565 46 600 59 S665 28 700 40 V190 H0Z"/><path class="line-one" d="M0 139 C35 130 45 117 100 122 S165 100 200 110 S265 69 300 83 S365 90 400 76 S465 98 500 80 S565 46 600 59 S665 28 700 40"/><path class="line-two" d="M0 164 C35 159 65 137 100 147 S165 131 200 140 S265 122 300 130 S365 103 400 117 S465 129 500 111 S565 103 600 112 S665 85 700 93"/></svg><div class="x-labels"><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span><span>Sen</span><span>Sel</span></div></div>
                        </div>
                    </section>
                    <section class="panel progress-panel">
                        <div class="panel-heading"><div><h2>Tujuan belajar</h2><p>Target mingguan kamu</p></div><button type="button" class="more-button" aria-label="Pilihan tujuan">···</button></div>
                        <div class="goal-ring-wrap"><div class="goal-ring"><div><b>68<span>%</span></b><small>tercapai</small></div></div><div class="goal-summary"><b>9 dari 13 jam</b><span>Waktu belajar minggu ini</span><em>+2 jam dari minggu lalu</em></div></div>
                        <div class="goal-divider"></div><div class="goal-footer"><span class="goal-check">✓</span><span>Terus konsisten!<small>4 jam lagi menuju target</small></span><span class="goal-arrow">→</span></div>
                    </section>
                </div>

                <section class="panel project-panel" id="projects">
                    <div class="panel-heading project-heading"><div><h2>Proyek terkini</h2><p>Semua eksperimen dan pekerjaan data kamu, di satu tempat.</p></div><a class="subtle-link" href="#dataset">Lihat semua <span>→</span></a></div>
                    <div class="table-toolbar"><label class="search-box"><span>⌕</span><input type="search" data-project-search placeholder="Cari proyek..." aria-label="Cari proyek"></label><div class="toolbar-actions"><label class="filter-wrap"><span>Status:</span><select data-status-filter aria-label="Filter status"><option value="all">Semua</option><option value="Berjalan">Berjalan</option><option value="Direncanakan">Direncanakan</option><option value="Showcase">Showcase</option></select></label><button type="button" class="export-button" data-export-csv>⇩ <span>Ekspor CSV</span></button></div></div>
                    <div class="table-scroll"><table id="project-table"><thead><tr><th>Nama proyek</th><th>Kategori</th><th>Status</th><th>Progres</th><th>Pembaruan</th><th></th></tr></thead><tbody>
                        @foreach ($projects as $project)
                        <tr data-project-row data-status="{{ $project['status'] }}" data-name="{{ strtolower($project['name']) }}">
                            <td><div class="project-name"><span class="project-glyph tone-{{ $project['tone'] }}">{{ $loop->iteration === 1 ? '⌁' : ($loop->iteration === 2 ? '▥' : ($loop->iteration === 3 ? '✳' : ($loop->iteration === 4 ? '◉' : '▤'))) }}</span><b>{{ $project['name'] }}</b></div></td><td><span class="category-tag">{{ $project['category'] }}</span></td><td><span class="status-pill status-{{ strtolower($project['status']) }}"><i></i>{{ $project['status'] }}</span></td><td><div class="progress-cell"><div class="progress-track"><span style="width: {{ $project['progress'] }}%"></span></div><small>{{ $project['progress'] }}%</small></div></td><td class="updated-cell">{{ $project['updated'] }}</td><td><button class="row-menu" aria-label="Menu {{ $project['name'] }}" type="button">···</button></td>
                        </tr>
                        @endforeach
                    </tbody></table><div class="empty-state" data-empty-state hidden>Tidak ada proyek yang cocok dengan pencarian.</div></div>
                    <div class="table-footer"><span>Menampilkan <b data-visible-count>{{ count($projects) }}</b> dari {{ $totalProjects }} proyek</span><a href="#projects">Kelola proyek <span>→</span></a></div>
                </section>
                <footer class="page-footer"><span>© {{ date('Y') }} Skydata Studio <span>·</span> MK Data Science</span><span>Dirancang untuk belajar, dibuat untuk berkembang <span>✦</span></span></footer>
            </section>
        </main>
    </div>
    <div class="sidebar-overlay" data-menu-overlay></div>
</body>
</html>
