// js/scroll-reveal.js
document.addEventListener('DOMContentLoaded', function () {
    // Знайти всі секції для анімації
    const sections = document.querySelectorAll(
        '.hero-section, .about-section, .skills-section,' +
        ' .portfolio-section, .blog-section,' +
        ' .contact-section'
    );

    // Додати клас .hidden до всіх секцій
    sections.forEach(section => {
        section.classList.add('hidden');
    });

    // IntersectionObserver — спостерігач
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.replace('hidden', 'visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    // Запустити спостереження
    sections.forEach(section => {
        observer.observe(section);
    });

    // Анімація progress bars при появі секції
    const skillsSection = document.getElementById('skills');
    const skillsObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateAllBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    function animateAllBars() {
        const bars = document.querySelectorAll('#skills .progress-bar[data-target]');
        bars.forEach(bar => {
            const target = parseInt(bar.getAttribute('data-target'));
            animateProgress(bar, target);
        });
    }

    function animateProgress(bar, target) {
        let current = 0;
        bar.style.width = '0%';
        bar.textContent = '';

        function step() {
            current += 1;
            bar.style.width = current + '%';
            bar.textContent = current + '%';
            if (current < target) {
                requestAnimationFrame(step);
            }
        }
        requestAnimationFrame(step);
    }
});

