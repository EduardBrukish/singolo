const navigation = document.querySelector('.navigation');
const portfolioMenu = document.querySelector('.work-examples__menu');
const portfolioExamples = document.querySelector('.work-examples__images');
const iphoneVertical = document.querySelector('.iphone-vertical__wrapper');
const iphoneVerticalDisplay = document.querySelector('.iphone-vertical-display');
const iphoneHorizontal = document.querySelector('.iphone-horizontal__wrapper');
const iphoneHorizontalDisplay = document.querySelector('.iphone-horizontal-display');
const rightSliderBtn = document.querySelector('.slider__button-right');
const leftSliderBtn = document.querySelector('.slider__button-left');
const slides = document.querySelectorAll('.slide__item');
const submitBtn = document.getElementById('submit');
const form = document.querySelector('.form');
const userName = document.getElementById('name');
const userEmail = document.getElementById('email');
const subject = document.getElementById('subject');
const description = document.getElementById('description');
let currentSlide = 0;
let isEnabled = true;

document.addEventListener('scroll', scrollActivateMenuItem)
portfolioMenu.addEventListener('click', sortPortfolioExamples);
portfolioExamples.addEventListener('click', activePortfolioExample);
iphoneVertical.addEventListener('click', activateIphoneVertical);
iphoneHorizontal.addEventListener('click', activateIphoneHorizontal);
rightSliderBtn.addEventListener('click', moveSlideRight);
leftSliderBtn.addEventListener('click', moveSlideLeft);
submitBtn.addEventListener('click', submitForm);

function scrollActivateMenuItem(event) {
    const currentPosition = window.scrollY;
    const links = navigation.querySelectorAll('.navigation__link')

    document.querySelectorAll('.main>section').forEach(section => {

        if (currentPosition >= section.offsetTop && currentPosition < (section.offsetTop + section.offsetHeight)) {
            links.forEach(link => {
                link.classList.remove('navigation__link_active');
                if (link.getAttribute('href').slice(1) === section.getAttribute('id')) {
                    link.classList.add('navigation__link_active');
                }
            })
        }
    })
}

function activateIphoneVertical() {
    iphoneVerticalDisplay.classList.toggle('active-iphone-display');
}

function activateIphoneHorizontal() {
    iphoneHorizontalDisplay.classList.toggle('active-iphone-display');
}

function sortPortfolioExamples(event) {
    if (event.target.classList.contains('work-examples__menu-item_active')) return;

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



function submitForm(event) {
    if (!userName.validity.valid || !userEmail.validity.valid) { return }

    event.preventDefault();

    formSubmitWindow();
}

function formSubmitWindow() {
    let submitWindow = document.createElement('div');
    let message = document.createElement('p');
    let confirmBtn = document.createElement('button');
    let submitSubject = subject.value;
    let descriptionSubject = description.value;

    form.append(submitWindow);
    submitWindow.classList.add('submit-window');

    confirmBtn.innerText = 'Ok';
    confirmBtn.classList.add('submit-confirm-button');

    submitWindow.append(message, confirmBtn);
    confirmBtn.addEventListener('click', function () {
        form.reset();
        submitWindow.remove();
    });

    message.classList.add('submit-message');

    if (!submitSubject) { submitSubject = 'Without subject' };
    if (!descriptionSubject) { descriptionSubject = 'Without description' };
    message.innerText = `The letter was sent  
    Subject: ${submitSubject}  
    Description: ${descriptionSubject}`;
}