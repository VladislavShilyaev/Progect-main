// js/customization.js - обробка персоналізації інтерфейсу

const sliders = {
    hueSlider: '--primary-hue',
    fontSlider: '--heading-size',
    radiusSlider: '--border-radius'
};

// Ініціалізація: відновити з localStorage
Object.entries(sliders).forEach(([id, cssVar]) => {
    const slider = document.getElementById(id);
    const saved = localStorage.getItem(cssVar);
    const valueDisplay = document.getElementById(id.replace('Slider', 'Value'));

    if (saved) {
        slider.value = saved;
        applyValue(cssVar, saved);
        updateValueDisplay(id, saved);
    }

    // Слухач oninput
    slider.addEventListener('input', function() {
        applyValue(cssVar, this.value);
        localStorage.setItem(cssVar, this.value);
        updateValueDisplay(id, this.value);
    });
});

function applyValue(cssVar, value) {
    const root = document.documentElement;

    if (cssVar === '--primary-hue') {
        // Встановити колір як HSL
        root.style.setProperty(cssVar, value);
        
        // Також оновити основні кольори в LESS
        const hue = parseInt(value);
        const primaryColor = `hsl(${hue}, 70%, 50%)`;
        document.documentElement.style.setProperty('--primary-color-computed', primaryColor);
    } else if (cssVar === '--heading-size') {
        root.style.setProperty(cssVar, value + 'px');
    } else if (cssVar === '--border-radius') {
        root.style.setProperty(cssVar, value + 'px');
    }
}

function updateValueDisplay(sliderId, value) {
    const displayId = sliderId.replace('Slider', 'Value');
    const displayElement = document.getElementById(displayId);
    
    if (displayElement) {
        if (sliderId === 'hueSlider') {
            displayElement.textContent = `Значення: ${value}°`;
        } else if (sliderId === 'fontSlider') {
            displayElement.textContent = `Значення: ${value}px`;
        } else if (sliderId === 'radiusSlider') {
            displayElement.textContent = `Значення: ${value}px`;
        }
    }
}

// Скидання налаштувань
const resetBtn = document.getElementById('resetBtn');
if (resetBtn) {
    resetBtn.addEventListener('click', function() {
        // Стандартні значення
        const defaults = {
            hueSlider: '210',
            fontSlider: '24',
            radiusSlider: '8'
        };

        Object.entries(defaults).forEach(([id, defaultValue]) => {
            const slider = document.getElementById(id);
            const cssVar = sliders[id];

            slider.value = defaultValue;
            applyValue(cssVar, defaultValue);
            updateValueDisplay(id, defaultValue);
            localStorage.setItem(cssVar, defaultValue);
        });

        alert('Налаштування скинуті до стандартних значень!');
    });
}

// При завантаженні сторінки - застосувати збережені значення до DOM
document.addEventListener('DOMContentLoaded', function() {
    // Перепроцесувати значення при завантаженні
    Object.entries(sliders).forEach(([id, cssVar]) => {
        const saved = localStorage.getItem(cssVar);
        if (saved) {
            applyValue(cssVar, saved);
        }
    });
});
