const menuToggle = document.querySelector('[data-menu-toggle]');
const sidebar = document.querySelector('#sidebar');
const overlay = document.querySelector('[data-menu-overlay]');

function setMenuOpen(open) {
    sidebar?.classList.toggle('is-open', open);
    overlay?.classList.toggle('is-visible', open);
    menuToggle?.setAttribute('aria-expanded', String(open));
}

menuToggle?.addEventListener('click', () => setMenuOpen(!sidebar?.classList.contains('is-open')));
overlay?.addEventListener('click', () => setMenuOpen(false));
document.querySelectorAll('.nav-link').forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));

const searchInput = document.querySelector('[data-project-search]');
const statusFilter = document.querySelector('[data-status-filter]');
const rows = [...document.querySelectorAll('[data-project-row]')];
const visibleCount = document.querySelector('[data-visible-count]');
const emptyState = document.querySelector('[data-empty-state]');

function filterProjects() {
    const query = searchInput?.value.trim().toLocaleLowerCase('id') ?? '';
    const status = statusFilter?.value ?? 'all';
    let visible = 0;

    rows.forEach((row) => {
        const matchesQuery = row.dataset.name.includes(query);
        const matchesStatus = status === 'all' || row.dataset.status === status;
        const show = matchesQuery && matchesStatus;
        row.hidden = !show;
        visible += Number(show);
    });

    if (visibleCount) visibleCount.textContent = String(visible);
    if (emptyState) emptyState.hidden = visible !== 0;
}

searchInput?.addEventListener('input', filterProjects);
statusFilter?.addEventListener('change', filterProjects);

document.querySelector('[data-export-csv]')?.addEventListener('click', () => {
    const headers = ['Nama proyek', 'Kategori', 'Status', 'Progres', 'Pembaruan'];
    const visibleRows = rows.filter((row) => !row.hidden);
    const values = visibleRows.map((row) => {
        const cells = row.querySelectorAll('td');
        return [cells[0].innerText.trim(), cells[1].innerText.trim(), cells[2].innerText.trim(), cells[3].innerText.trim(), cells[4].innerText.trim()];
    });
    const csvCell = (value) => '"' + String(value).replaceAll('"', '""') + '"';
    const csv = [headers, ...values].map((line) => line.map(csvCell).join(',')).join('\r\n');
    const file = new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');

    link.href = URL.createObjectURL(file);
    link.download = 'proyek-mk-data-science.csv';
    link.click();
    URL.revokeObjectURL(link.href);
});

// CSV lab runs in the browser; uploaded rows are never sent to Laravel.
const csvInput = document.querySelector('[data-csv-upload]');
const preview = document.querySelector('[data-data-preview]');
const insight = document.querySelector('[data-data-insight]');
const setText = (selector, value) => { const node = document.querySelector(selector); if (node) node.textContent = value; };

function parseCsv(text) {
    const result = []; let row = [], cell = '', quoted = false;
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (quoted) {
            if (char === '"' && text[i + 1] === '"') { cell += '"'; i++; }
            else if (char === '"') quoted = false;
            else cell += char;
        } else if (char === '"') quoted = true;
        else if (char === ',') { row.push(cell); cell = ''; }
        else if (char === '\n' || char === '\r') {
            if (char === '\r' && text[i + 1] === '\n') i++;
            row.push(cell); cell = '';
            if (row.some((value) => value.trim())) result.push(row);
            row = [];
        } else cell += char;
    }
    row.push(cell); if (row.some((value) => value.trim())) result.push(row);
    if (quoted) throw new Error('CSV memiliki tanda kutip yang belum ditutup.');
    if (result.length < 2) throw new Error('CSV perlu header dan setidaknya satu baris data.');
    const headers = result[0].map((value, index) => value.trim() || `Kolom ${index + 1}`);
    return { headers, rows: result.slice(1, 5001).map((values) => headers.map((_, index) => values[index]?.trim() ?? '')) };
}

function showDataset({ headers, rows }, name) {
    const missing = rows.flat().filter((value) => value === '').length;
    const numeric = headers.map((header, index) => ({ header, values: rows.map((row) => row[index]).filter((value) => value !== '' && Number.isFinite(Number(value))).map(Number) })).filter((column) => column.values.length);
    setText('[data-rows]', String(rows.length)); setText('[data-cols]', String(headers.length));
    setText('[data-missing]', String(missing)); setText('[data-numeric]', String(numeric.length));
    setText('[data-studio-status]', `${name} · siap dianalisis${rows.length === 5000 ? ' · batas 5.000 baris' : ''}`);
    preview.replaceChildren();
    const head = document.createElement('thead'), headRow = document.createElement('tr'), body = document.createElement('tbody');
    headers.forEach((value) => { const th = document.createElement('th'); th.textContent = value; headRow.append(th); });
    head.append(headRow);
    rows.slice(0, 8).forEach((values) => { const tr = document.createElement('tr'); values.forEach((value) => { const td = document.createElement('td'); td.textContent = value || '—'; tr.append(td); }); body.append(tr); });
    preview.append(head, body); insight.replaceChildren(); insight.hidden = false;
    const title = document.createElement('b'); title.textContent = 'Ringkasan cepat'; insight.append(title);
    if (!numeric.length) { const p = document.createElement('p'); p.textContent = 'Tidak ditemukan kolom angka; cek format nilai pada CSV.'; insight.append(p); return; }
    numeric.slice(0, 4).forEach(({ header, values }) => {
        const sorted = [...values].sort((a, b) => a - b);
        const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
        const median = sorted[Math.floor(sorted.length / 2)];
        const p = document.createElement('p');
        p.textContent = `${header}: rata-rata ${mean.toLocaleString('id-ID', { maximumFractionDigits: 2 })} · median ${median.toLocaleString('id-ID', { maximumFractionDigits: 2 })} · rentang ${sorted[0]}–${sorted.at(-1)}`;
        insight.append(p);
    });
}

csvInput?.addEventListener('change', async (event) => {
    const file = event.target.files?.[0]; if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setText('[data-studio-status]', 'Ukuran file melebihi batas 5 MB.'); event.target.value = ''; return; }
    try { showDataset(parseCsv(await file.text()), file.name); }
    catch (error) { setText('[data-studio-status]', error.message || 'CSV tidak dapat dibaca.'); }
});

document.querySelector('[data-load-sample]')?.addEventListener('click', () => {
    const records = [['Produk', 'Kategori', 'Harga', 'Terjual'], ['Kopi Arabika', 'Minuman', '28000', '42'], ['Teh Melati', 'Minuman', '16000', '35'], ['Roti Gandum', 'Makanan', '22000', '28'], ['Susu Oat', 'Minuman', '24000', '19'], ['Granola', 'Makanan', '32000', '24'], ['Kue Pisang', 'Makanan', '18000', '31'], ['Kopi Susu', 'Minuman', '26000', '48'], ['Biskuit Oat', 'Makanan', '14000', '22']];
    showDataset({ headers: records[0], rows: records.slice(1) }, 'Dataset simulasi penjualan');
});
document.querySelector('[data-print-report]')?.addEventListener('click', () => window.print());
