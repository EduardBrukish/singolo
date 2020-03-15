const navigation = document.querySelector('.navigation');
const portfolioMenu = document.querySelector('.work-examples__menu');
const portfolioExamples = document.querySelector('.work-examples__images');
const iphoneVertical = document.querySelector('.iphone-vertical__wrapper');
const iphoneVerticalDisplay = document.querySelector('.iphone-vertical-display');
const iphoneHorizontal = document.querySelector('.iphone-horizontal__wrapper');
const iphoneHorizontalDisplay = document.querySelector('.iphone-horizontal-display');

navigation.addEventListener('click', activateMenuItem);
portfolioMenu.addEventListener('click', sortPortfolioExamples);
portfolioExamples.addEventListener('click', activePortfolioExample);
iphoneVertical.addEventListener('click', activateIphoneVertical);
iphoneHorizontal.addEventListener('click', activateIphoneHorizontal);

function activateMenuItem(event) {
    event.preventDefault();
    if (event.target === null) return;
    navigation.querySelectorAll('.navigation__link').forEach(element => element.classList.remove('navigation__link_active'));
    event.target.classList.add('navigation__link_active');

    let anchorId = event.target.getAttribute('href').slice(1);

    document.getElementById(anchorId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
};

function activateIphoneVertical() {
    iphoneVerticalDisplay.classList.toggle('active-iphone-display');
}

function activateIphoneHorizontal() {
    iphoneHorizontalDisplay.classList.toggle('active-iphone-display');
}

function sortPortfolioExamples(event) {
    if (event.target === null || event.target.classList.contains('work-examples__menu-item_active')) return;

    portfolioMenu.querySelectorAll('.work-examples__menu-item').forEach(element => element.classList.remove('work-examples__menu-item_active'));
    event.target.classList.add('work-examples__menu-item_active');
    portfolioExamples.querySelectorAll('.work-examples__images-item')
        .forEach(item => {
            item.style.order = Math.round(Math.random() * 12);
        }
        );
}

function activePortfolioExample(event) {
    if (event.target === null) return;
    portfolioExamples.querySelectorAll('.work-examples__image').forEach(element => element.classList.remove('work-examples__image_active'));
    event.target.classList.add('work-examples__image_active');
}


const rightSliderBtn = document.querySelector('.slider__button-right');
const leftSliderBtn = document.querySelector('.slider__button-left');
const slides = document.querySelectorAll('.slide__item');
let currentSlide = 0;
let isEnabled = true;

rightSliderBtn.addEventListener('click', moveSlideRight);
leftSliderBtn.addEventListener('click', moveSlideLeft);

function changeCurrentSlide(n) {
    currentSlide = (n + slides.length) % slides.length;
};

function moveSlideRight() {
    if (isEnabled) previousSlide(currentSlide);
};

function moveSlideLeft() {
    if (isEnabled) nextSlide(currentSlide);
};

function hideSlide(direction) {
    slides[currentSlide].classList.add(direction);
    slides[currentSlide].addEventListener('animationend', function () {
        this.classList.remove('active-slide', direction);
    });
}


function showSlide(direction) {
    slides[currentSlide].classList.add('next-slide', direction);
    slides[currentSlide].addEventListener('animationend', function () {
        this.classList.remove('next-slide', direction);
        this.classList.add('active-slide');
        isEnabled = true;
    });
}

function nextSlide(n) {
    isEnabled = false;
    hideSlide('to-left');
    changeCurrentSlide(n + 1);
    showSlide('from-right');
};

function previousSlide(n) {
    isEnabled = false;
    hideSlide('to-right');
    changeCurrentSlide(n - 1);
    showSlide('from-left');
};