// js/table-effects.js - ефекти для таблиці проектів

let sortDirection = {};

function sortTable(colIndex) {
    const table = document.getElementById('projectsTable');
    const tbody = table.tBodies[0];
    const rows = Array.from(tbody.rows);

    // Перемкнути напрямок
    sortDirection[colIndex] = !sortDirection[colIndex];
    const dir = sortDirection[colIndex] ? 1 : -1;

    rows.sort((a, b) => {
        const textA = a.cells[colIndex].textContent.trim();
        const textB = b.cells[colIndex].textContent.trim();
        return textA.localeCompare(textB, 'uk') * dir;
    });

    rows.forEach(row => tbody.appendChild(row));
}

// Підсвічування та виділення рядків
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('#projectsTable tbody tr').forEach(row => {
        // Hover ефект
        row.addEventListener('mouseover', function() {
            this.style.backgroundColor = '#e8f4fd';
        });

        row.addEventListener('mouseout', function() {
            if (!this.classList.contains('selected')) {
                this.style.backgroundColor = '';
            }
        });

        // Click — виділення
        row.addEventListener('click', function() {
            this.classList.toggle('selected');
            this.style.backgroundColor = this.classList.contains('selected')
                ? '#fff3cd'
                : '';
        });
    });
});
