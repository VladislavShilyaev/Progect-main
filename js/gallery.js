// Масив проектів
const projects = [
    {
        name: 'Інтернет-магазин',
        image: 'images/portfolio/project1.jpg',
        description: 'Адаптивний e-commerce сайт на Bootstrap',
        category: 'web'
    },
    {
        name: 'Мобільний додаток',
        image: 'images/portfolio/project2.jpg',
        description: 'UI/UX для сервісу доставки їжі',
        category: 'mobile'
    },
    {
        name: 'Лендінг-сторінка',
        image: 'images/portfolio/project3.jpg',
        description: 'Промо-сайт для стартапу в медицині',
        category: 'web'
    },
    {
        name: 'Дашборда',
        image: 'images/portfolio/project4.jpg',
        description: 'Панель аналітики з графіками',
        category: 'ui'
    },
    {
        name: 'Портал новин',
        image: 'images/portfolio/project5.jpg',
        description: 'Новинний сайт з динамічним контентом',
        category: 'web'
    },
    {
        name: 'Фітнес-трекер',
        image: 'images/portfolio/project6.jpg',
        description: 'Мобільний додаток для тренувань',
        category: 'mobile'
    }
];

let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;

    // Створити overlay
    let overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.id = 'lightbox';

    // Створити контент
    let content = document.createElement('div');
    content.className = 'lightbox-content';

    // Кнопка закриття
    let closeBtn = document.createElement('span');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', closeLightbox);

    // Зображення
    let img = document.createElement('img');
    img.src = projects[index].image;
    img.alt = projects[index].name;
    img.id = 'lightboxImg';

    // Інформація
    let info = document.createElement('div');
    info.style.padding = '16px';
    info.id = 'lightboxInfo';
    info.innerHTML =
        '<h4>' + projects[index].name + '</h4>' +
        '<p>' + projects[index].description + '</p>' +
        '<span class="badge bg-primary">' + projects[index].category + '</span>';

    // Навігація
    let nav = document.createElement('div');
    nav.className = 'lightbox-nav';

    let prevBtn = document.createElement('button');
    prevBtn.innerHTML = '&larr; Попередній';
    prevBtn.addEventListener('click', function () {
        navigateLightbox(-1);
    });

    let nextBtn = document.createElement('button');
    nextBtn.innerHTML = 'Наступний &rarr;';
    nextBtn.addEventListener('click', function () {
        navigateLightbox(1);
    });

    nav.appendChild(prevBtn);
    nav.appendChild(nextBtn);

    // Зібрати lightbox
    content.appendChild(closeBtn);
    content.appendChild(img);
    content.appendChild(info);
    content.appendChild(nav);
    overlay.appendChild(content);
    document.body.appendChild(overlay);

    // Закриття при кліку поза вікном
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeLightbox();
    });
}

function navigateLightbox(direction) {
    currentIndex += direction;

    if (currentIndex < 0) currentIndex = projects.length - 1;
    if (currentIndex >= projects.length) currentIndex = 0;

    // Оновити контент
    document.getElementById('lightboxImg').src = projects[currentIndex].image;
    document.getElementById('lightboxInfo').innerHTML =
        '<h4>' + projects[currentIndex].name + '</h4>' +
        '<p>' + projects[currentIndex].description + '</p>' +
        '<span class="badge bg-primary">' + projects[currentIndex].category + '</span>';
}

function closeLightbox() {
    let lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.remove();
    }
}

// Функція створення однієї картки
function createProjectCard(project) {
    // Створити колонку
    let col = document.createElement('div');
    col.className = 'col-sm-6 col-md-4 col-lg-3';
    col.setAttribute('data-category', project.category);

    // Створити картку
    let card = document.createElement('div');
    card.className = 'card h-100 project-card';

    // Зображення з overlay
    let imgWrapper = document.createElement('div');
    imgWrapper.className = 'card-img-wrapper';

    let img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = project.image;
    img.alt = project.name;

    let overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML =
        '<p>' + project.description + '</p>' +
        '<a class="btn btn-warning btn-sm">Детальніше</a>';

    imgWrapper.appendChild(img);
    imgWrapper.appendChild(overlay);

    // Тіло картки
    let body = document.createElement('div');
    body.className = 'card-body';
    body.innerHTML =
        '<h5 class="card-title">' + project.name + '</h5>' +
        '<p class="card-text">' + project.description + '</p>' +
        '<span class="badge bg-primary">' + project.category + '</span>';

    // Зібрати картку
    card.appendChild(imgWrapper);
    card.appendChild(body);
    col.appendChild(card);

    // Клік — відкрити lightbox
    card.addEventListener('click', function () {
        openLightbox(projects.indexOf(project));
    });

    return col;
}

// Відображення всіх карток та фільтрації
function displayProjects(filter) {
    let gallery = document.getElementById('gallery');
    if (!gallery) return;

    gallery.innerHTML = ''; // Очистити галерею

    for (let i = 0; i < projects.length; i++) {
        if (filter === 'all' || projects[i].category === filter) {
            let card = createProjectCard(projects[i]);
            gallery.appendChild(card);
        }
    }

    // Зберегти поточний фільтр
    localStorage.setItem('galleryFilter', filter);
}

// Пошук по галереї
let siteSearch = document.getElementById('siteSearch');
let gallerySearchQuery = '';

function applyGallerySearch() {
    let query = gallerySearchQuery;
    let cards = document.querySelectorAll('#gallery > div');

    for (let i = 0; i < cards.length; i++) {
        let titleEl = cards[i].querySelector('.card-title');
        let title = titleEl ? titleEl.textContent : '';

        if (query === '' || title.toLowerCase().includes(query)) {
            cards[i].style.display = 'block';
        } else {
            cards[i].style.display = 'none';
        }
    }
}

if (siteSearch) {
    siteSearch.addEventListener('input', function () {
        gallerySearchQuery = this.value.toLowerCase();
        applyGallerySearch();
    });
}

// Обробники кнопок фільтрації
let filterButtons = document.querySelectorAll('.filter-btn');
for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener('click', function () {
        // Змінити активну кнопку
        let activeBtn = document.querySelector('.filter-btn.active');
        if (activeBtn) {
            activeBtn.classList.remove('active', 'btn-primary');
            activeBtn.classList.add('btn-outline-primary');
        }

        this.classList.add('active', 'btn-primary');
        this.classList.remove('btn-outline-primary');

        // Застосувати фільтр
        let category = this.getAttribute('data-category');
        displayProjects(category);
        applyGallerySearch();
    });
}

// Початкове відображення
const savedFilter = localStorage.getItem('galleryFilter') || 'all';
displayProjects(savedFilter);
applyGallerySearch();

// Встановити активну кнопку відповідно до збереженого фільтра
let initialBtn = document.querySelector('.filter-btn[data-category="' + savedFilter + '"]');
if (initialBtn) {
    let activeBtn = document.querySelector('.filter-btn.active');
    if (activeBtn) {
        activeBtn.classList.remove('active', 'btn-primary');
        activeBtn.classList.add('btn-outline-primary');
    }
    initialBtn.classList.add('active', 'btn-primary');
    initialBtn.classList.remove('btn-outline-primary');
}

