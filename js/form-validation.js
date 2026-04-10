// js/form-validation.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    // Правила валідації (RegExp)
    const rules = {
        nameInput: {
            pattern: /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s'-]{2,}$/,
            message: 'Ім\'я: мін. 2 літери'
        },
        emailInput: {
            pattern: /^[\w.-]+@[\w.-]+\.\w{2,}$/,
            message: 'Невірний формат email'
        },
        phoneInput: {
            pattern: /^\+?\d[\d\s-]{9,}$/,
            message: 'Мінімум 10 цифр',
            optional: true
        },
        subjectInput: {
            pattern: /^.{1,}$/,
            message: 'Тема обов\'язкова'
        },
        messageInput: {
            minLength: 20,
            message: 'Мінімум 20 символів'
        }
    };

    // Валідація окремого поля
    function validateField(input) {
        const rule = rules[input.id];
        if (!rule) return true;

        const msg = input.nextElementSibling;
        let isValid = false;

        if (rule.optional && !input.value.trim()) {
            input.className = 'form-control';
            msg.textContent = '';
            return true;
        }

        if (rule.pattern) {
            isValid = rule.pattern.test(input.value);
        } else if (rule.minLength) {
            isValid = input.value.trim().length >= rule.minLength;
        }

        if (isValid) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            msg.textContent = '✓ Валідне';
            msg.style.color = 'green';
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            msg.textContent = '✗ ' + rule.message;
            msg.style.color = 'red';
        }

        return isValid;
    }

    // Слухачі oninput для кожного поля
    Object.keys(rules).forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', function() {
                validateField(this);
                updateSubmitBtn();
            });
        }
    });

    function updateSubmitBtn() {
        const allValid = Object.keys(rules).every(id => {
            const el = document.getElementById(id);
            return validateField(el);
        });
        submitBtn.disabled = !allValid;
    }

    // Обробка submit
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        generateResultPage();
    });

    // Генерація сторінки результату
    function generateResultPage() {
        const name = document.getElementById('nameInput').value;
        const email = document.getElementById('emailInput').value;
        const subject = document.getElementById('subjectInput').value;
        const msg = document.getElementById('messageInput').value;

        document.open();
        document.write('<html><head>');
        document.write('<meta charset="UTF-8">');
        document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">');
        document.write('<title>Результат</title>');
        document.write('</head><body class="p-5">');
        document.write('<div class="card">');
        document.write('<div class="card-header bg-primary text-white">');
        document.write('<h2>Повідомлення отримано!</h2>');
        document.write('<p>Дякуємо, ' + name + '</p></div>');
        document.write('<div class="card-body">');
        document.write('<p><b>Email:</b> ' + email + '</p>');
        document.write('<p><b>Тема:</b> ' + subject + '</p>');
        document.write('<p><b>Повідомлення:</b> ' + msg + '</p>');
        document.write('<p><b>Дата:</b> ' + new Date().toLocaleString('uk-UA') + '</p>');
        document.write('</div></div>');
        document.write('</body></html>');
        document.close();
    }
});
