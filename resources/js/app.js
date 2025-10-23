// slider
const sliderContainer = document.querySelector('.slider-container');
const slidesContainer = document.querySelector('.slides');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.arrow.prev');
const nextButton = document.querySelector('.arrow.next');

let currentIndex = 0;

function showSlide(index) {
    if (!slides || slides.length === 0) return;

    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });

    const activeSlide = slides[index];
    if (!activeSlide) return;

    const slideWidth = activeSlide.offsetWidth;
    const containerWidth = sliderContainer.offsetWidth;
    const offset = (containerWidth / 2) - activeSlide.offsetLeft - (slideWidth / 2);

    slidesContainer.style.transform = `translateX(${offset}px)`;
}

if (nextButton && prevButton) {
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    });
}

window.addEventListener('load', () => {
    showSlide(currentIndex);
});

window.addEventListener('resize', () => {
    showSlide(currentIndex);
});

// scroll animnation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));
