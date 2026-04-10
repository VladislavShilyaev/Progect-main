// js/interactive-table.js
document.addEventListener('DOMContentLoaded', function() {
    // Дані проектів
    const projects = [
        { id: 1, name: 'Веб-сайт For Tech', category: 'web', date: '2024-01-15', status: 'Завершено' },
        { id: 2, name: 'Мобільний додаток Shop', category: 'mobile', date: '2024-02-20', status: 'Завершено' },
        { id: 3, name: 'UI/UX дизайн Dashboard', category: 'ui', date: '2024-03-10', status: 'У процесі' },
        { id: 4, name: 'Веб-портал LMS', category: 'web', date: '2024-04-05', status: 'Завершено' },
        { id: 5, name: 'Мобільне обладнання App', category: 'mobile', date: '2024-05-12', status: 'Планування' },
        { id: 6, name: 'UI-кіт для стартапу', category: 'ui', date: '2024-06-01', status: 'Завершено' }
    ];

    let currentSortColumn = null;
    let sortAscending = true;
    let draggedItem = null;

    const tableBody = document.getElementById('tableBody');
    const projectsTable = document.getElementById('projectsTable');
    const dragDropList = document.getElementById('dragDropList');
    const scaleSlider = document.getElementById('scaleSlider');
    const opacitySlider = document.getElementById('opacitySlider');
    const scaleValue = document.getElementById('scaleValue');
    const opacityValue = document.getElementById('opacityValue');

    // Ініціалізація таблиці
    function renderTable(data = projects) {
        tableBody.innerHTML = '';
        data.forEach(project => {
            const row = document.createElement('tr');
            const statusClass = project.status === 'Завершено' ? 'success' : 
                              project.status === 'У процесі' ? 'info' : 'warning';
            
            row.innerHTML = `
                <td><strong>${project.name}</strong></td>
                <td>${project.category}</td>
                <td>${new Date(project.date).toLocaleDateString('uk-UA')}</td>
                <td><span class="badge bg-${statusClass}">${project.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="viewProject(${project.id})">Переглянути</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Сортування таблиці
    const sortableHeaders = document.querySelectorAll('.sortable');
    sortableHeaders.forEach((header, index) => {
        header.addEventListener('click', function() {
            const columnName = ['name', 'category', 'date'][index];
            
            if (currentSortColumn === columnName) {
                sortAscending = !sortAscending;
            } else {
                sortAscending = true;
                currentSortColumn = columnName;
            }

            const sortedData = [...projects].sort((a, b) => {
                let aVal = a[columnName];
                let bVal = b[columnName];

                if (columnName === 'date') {
                    aVal = new Date(aVal);
                    bVal = new Date(bVal);
                }

                if (sortAscending) {
                    return aVal > bVal ? 1 : -1;
                } else {
                    return aVal < bVal ? 1 : -1;
                }
            });

            renderTable(sortedData);
            
            // Оновлення символу сортування
            sortableHeaders.forEach(h => h.textContent = h.textContent.replace(/^⇅/, '⇧').replace(/^⇧/, '⇥').replace(/^⇥/, '⇅'));
            this.textContent = sortAscending ? '⇧ ' : '⇩ ' + this.textContent.substring(2);
        });
    });

    // Персоналізація слайдерами
    scaleSlider.addEventListener('input', function() {
        const scale = this.value;
        scaleValue.textContent = scale;
        projectsTable.style.transform = `scale(${scale / 100})`;
        projectsTable.style.transformOrigin = 'top left';
    });

    opacitySlider.addEventListener('input', function() {
        const opacity = this.value;
        opacityValue.textContent = opacity;
        const rows = tableBody.querySelectorAll('tr');
        rows.forEach(row => {
            row.style.opacity = opacity / 100;
        });
    });

    // Ініціалізація drag-and-drop списку
    function renderDragDropList(data = projects) {
        dragDropList.innerHTML = '';
        data.forEach((project, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center draggable-item';
            li.draggable = true;
            li.dataset.id = project.id;
            li.dataset.index = index;
            
            li.innerHTML = `
                <span>🎯 ${project.name}</span>
                <span class="badge bg-secondary">${project.category}</span>
            `;

            li.addEventListener('dragstart', handleDragStart);
            li.addEventListener('dragend', handleDragEnd);
            li.addEventListener('dragover', handleDragOver);
            li.addEventListener('drop', handleDrop);
            li.addEventListener('dragenter', handleDragEnter);
            li.addEventListener('dragleave', handleDragLeave);

            dragDropList.appendChild(li);
        });
    }

    function handleDragStart(e) {
        draggedItem = this;
        this.style.opacity = '0.5';
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }

    function handleDragEnd(e) {
        this.style.opacity = '1';
        document.querySelectorAll('.draggable-item').forEach(item => {
            item.style.backgroundColor = '';
        });
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    function handleDragEnter(e) {
        if (this !== draggedItem) {
            this.style.backgroundColor = '#e3f2fd';
        }
    }

    function handleDragLeave(e) {
        this.style.backgroundColor = '';
    }

    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();

        if (this !== draggedItem) {
            // Обмін позиціями
            const allItems = document.querySelectorAll('.draggable-item');
            const draggedIndex = Array.from(allItems).indexOf(draggedItem);
            const targetIndex = Array.from(allItems).indexOf(this);

            // Обмін в масиві проектів
            [projects[draggedIndex], projects[targetIndex]] = [projects[targetIndex], projects[draggedIndex]];
            
            renderDragDropList();
        }

        this.style.backgroundColor = '';
        return false;
    }

    // Глобальна функція для перегляду проекту
    window.viewProject = function(id) {
        const project = projects.find(p => p.id === id);
        alert(`Подробиці проекту:\n\nНазва: ${project.name}\nКатегорія: ${project.category}\nДата: ${project.date}\nСтатус: ${project.status}`);
    };

    // Ініціалізація
    renderTable();
    renderDragDropList();
});
