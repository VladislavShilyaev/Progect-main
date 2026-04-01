// js/storage.js — збереження стану через localStorage

// === Тема ===
function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Кнопка перемикання
const themeBtn = document.getElementById('themeToggle');
if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
}

// === Лічильник відвідувань ===
function initVisitCounter() {
    let count = parseInt(localStorage.getItem('visitCount') || '0');
    count++;
    localStorage.setItem('visitCount', count.toString());

    // Зберегти дату останнього візиту
    const lastVisit = localStorage.getItem('lastVisit');
    localStorage.setItem('lastVisit', new Date().toLocaleDateString('uk-UA'));

    // Показати привітання для повторних
    if (count > 1 && lastVisit) {
        showWelcomeBack(count, lastVisit);
    }
}

function showWelcomeBack(count, lastVisit) {
    const toast = document.createElement('div');
    toast.className = 'welcome-toast';
    toast.innerHTML =
        '<strong>Ласкаво просимо назад!</strong><br>Ви відвідали сайт ' +
        count +
        ' разів. Останній візит: ' +
        lastVisit;

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
}

// Ініціалізація при завантаженні
document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initVisitCounter();
});

