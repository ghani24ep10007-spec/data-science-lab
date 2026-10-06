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
