// js/drag-sort.js - Drag and Drop для зміни порядку проектів

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    
    if (!gallery) return;

    // Функція для ініціалізації drag-and-drop
    function initDragSort() {
        // Зробити картки перетягуваними
        gallery.querySelectorAll('.col').forEach((col, i) => {
            const card = col.querySelector('.card');
            if (!card) return;

            col.setAttribute('draggable', 'true');
            col.id = 'project-' + i;

            col.addEventListener('dragstart', function(e) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', this.id);
                this.classList.add('dragging');
                col.style.opacity = '0.5';
            });

            col.addEventListener('dragend', function() {
                this.classList.remove('dragging');
                col.style.opacity = '1';
                // Збереження порядку в localStorage
                saveProjectOrder();
            });

            col.addEventListener('dragover', function(e) {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                this.classList.add('drag-over');
            });

            col.addEventListener('dragleave', function() {
                this.classList.remove('drag-over');
            });

            col.addEventListener('drop', function(e) {
                e.preventDefault();
                const draggingElement = document.querySelector('.dragging');
                const dragggingId = draggingElement.id;
                const targetId = this.id;

                if (dragggingId !== targetId) {
                    // Обмін місцями
                    const allCols = [...gallery.querySelectorAll('[draggable="true"]')];
                    const draggingIndex = allCols.indexOf(draggingElement);
                    const targetIndex = allCols.indexOf(this);

                    if (draggingIndex < targetIndex) {
                        this.parentNode.insertBefore(draggingElement, this.nextSibling);
                    } else {
                        this.parentNode.insertBefore(draggingElement, this);
                    }
                }

                this.classList.remove('drag-over');
            });
        });
    }

    // Функція для збереження порядку проектів
    function saveProjectOrder() {
        const order = [...gallery.querySelectorAll('[draggable="true"]')].map(el => el.id);
        localStorage.setItem('projectOrder', JSON.stringify(order));
        console.log('Порядок проектів збережено:', order);
    }

    // Функція для відновлення порядку з localStorage
    function restoreProjectOrder() {
        const savedOrder = localStorage.getItem('projectOrder');
        if (!savedOrder) return;

        const order = JSON.parse(savedOrder);
        const fragment = document.createDocumentFragment();
        
        order.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                fragment.appendChild(element);
            }
        });

        // Додати інші елементи, які не були в збережному порядку
        const allCols = gallery.querySelectorAll('[draggable="true"]');
        allCols.forEach(col => {
            if (!fragment.contains(col)) {
                fragment.appendChild(col);
            }
        });

        gallery.innerHTML = '';
        gallery.appendChild(fragment);
    }

    // Ініціалізація
    initDragSort();
    restoreProjectOrder();

    // Переініціалізація при зміні фільтрів (якщо логіка фільтрування змінює галерею)
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            setTimeout(() => {
                initDragSort();
                restoreProjectOrder();
            }, 100);
        });
    });
});
