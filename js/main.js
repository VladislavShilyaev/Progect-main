// main.js - основний JavaScript файл для CreativePortfolio

function validateForm() {
    // Очистити попередні помилки
    clearErrors();

    let isValid = true;

    // Перевірка імені
    let name = document.getElementById('name').value.trim();
    if (name === '') {
        showError('nameError', "Будь ласка, введіть ім'я");
        isValid = false;
    } else if (name.length < 2) {
        showError('nameError', "Ім'я занадто коротке");
        isValid = false;
    }

    // Перевірка email
    let email = document.getElementById('email').value.trim();
    if (email === '') {
        showError('emailError', 'Будь ласка, введіть email');
        isValid = false;
    } else if (!email.includes('@') || !email.includes('.')) {
        showError('emailError', 'Некоректний формат email');
        isValid = false;
    }

    // Перевірка повідомлення
    let message = document.getElementById('message').value.trim();
    if (message === '') {
        showError('messageError', 'Будь ласка, введіть повідомлення');
        isValid = false;
    } else if (message.length < 10) {
        showError('messageError', 'Повідомлення занадто коротке (мін. 10 символів)');
        isValid = false;
    }

    // Якщо форма валідна — показати повідомлення про успіх
    if (isValid) {
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('contactForm').reset();
        // Оновити лічильник символів після очищення textarea
        countCharacters();
    }

    return false; // Запобігти реальній відправці (для демонстрації)
}

function showError(elementId, message) {
    let errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '14px';
}

function clearErrors() {
    let errors = document.querySelectorAll('.error-message');
    for (let i = 0; i < errors.length; i++) {
        errors[i].textContent = '';
    }
}

// Показати/приховати кнопку при прокрутці
window.onscroll = function () {
    let scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) return;

    if (document.documentElement.scrollTop > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
};

// Оновити стан кнопки при першому завантаженні
window.onscroll();

// Прокрутка нагору при кліку
let scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Плавна прокрутка
        });
    });
}

// Масив навичок
let skills = [
    { name: 'HTML5 / CSS3', level: 90 },
    { name: 'JavaScript', level: 75 },
    { name: 'Bootstrap', level: 85 },
    { name: 'Git / GitHub', level: 70 },
];

// Генерація HTML
let skillsList = document.getElementById('skillsList');
if (skillsList) {
    let html = '';
    for (let i = 0; i < skills.length; i++) {
        html += '<div class="mb-3">';
        html += '<label>' + skills[i].name + '</label>';
        html += '<div class="progress">';
        html += '<div class="progress-bar" style="width:' + skills[i].level + '%">';
        html += skills[i].level + '%';
        html += '</div></div></div>';
    }
    skillsList.innerHTML = html;
}

// Приховування завантажувача після завантаження сторінки
window.addEventListener('load', function () {
    let loader = document.getElementById('loader');
    if (loader) {
        setTimeout(function () {
            loader.style.display = 'none';
        }, 1000); // Затримка 1 секунда для демонстрації
    }
});

// Лічильник символів для textarea "Повідомлення"
function countCharacters() {
    let message = document.getElementById('message').value;
    let count = message.length;
    document.getElementById('charCount').textContent = count + ' символів';

    // Змінити колір якщо занадто мало символів
    let charCount = document.getElementById('charCount');
    if (count < 10 && count > 0) {
        charCount.style.color = 'red';
    } else {
        charCount.style.color = '#6c757d';
    }
}