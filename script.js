const navigation = document.querySelector('.navigation');
const portfolioMenu = document.querySelector('.work-examples__menu');
const portfolioExamples = document.querySelector('.work-examples__images');
const iphoneVertical = document.querySelector('.iphone-vertical');
const iphoneVerticalDisplay = document.querySelector('.iphone-vertical-display');
const iphoneHorizontal = document.querySelector('.iphone-horizontal');
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
const menuMobileBurger = document.querySelector('.menu-burger');
const headerMenu = document.querySelector('.header__navigation');
const body = document.querySelector('body');
menuMobileBurger.addEventListener('click', activeMobileMenu);
let flag = true;
let currentSlide = 0;
let isEnabled = true;

document.addEventListener('scroll', scrollActivateMenuItem)
portfolioMenu.addEventListener('click', sortPortfolioExamples);
portfolioExamples.addEventListener('click', activePortfolioExample);
iphoneVertical.addEventListener('click', activateIphoneVertical);
iphoneVerticalDisplay.addEventListener('click', activateIphoneVertical);
iphoneHorizontalDisplay.addEventListener('click', activateIphoneHorizontal);
iphoneHorizontal.addEventListener('click', activateIphoneHorizontal);
rightSliderBtn.addEventListener('click', moveSlideRight);
leftSliderBtn.addEventListener('click', moveSlideLeft);
submitBtn.addEventListener('click', submitForm);

function scrollActivateMenuItem(event) {
    const header = document.querySelector('.header');
    let headerHeight = +window.getComputedStyle(header, null).getPropertyValue('height').replace(/\D+/, '');

    const currentPosition = window.scrollY;
    const links = [...navigation.querySelectorAll('.navigation__link')];


    document.querySelectorAll('.main>section').forEach(section => {

        if ((currentPosition + headerHeight) >= section.offsetTop && currentPosition < (section.offsetTop + section.offsetHeight)) {
            links.forEach(link => {
                link.classList.remove('navigation__link_active');
                if (link.getAttribute('href').slice(1) === section.getAttribute('id')) {
                    link.classList.add('navigation__link_active');
                }
            })
        }

        if (currentPosition === document.documentElement.scrollHeight - document.documentElement.clientHeight) {
            links.forEach(link => { link.classList.remove('navigation__link_active') });
            links[links.length - 1].classList.add('navigation__link_active');
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

    const examples = [...portfolioExamples.querySelectorAll('.work-examples__images-item')];
    examples.forEach(example => example.remove());
    let examplesItem = examples.splice(0, 1);
    examples.push(examplesItem[0]);
    examples.forEach(example => portfolioExamples.append(example));
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

function activeMobileMenu() {

    activeMobileBurger();

    if (flag) {
        showMenu();
        flag = false;
    } else {
        hideMenu();
        flag = true;
    }
}

function activeMobileBurger() {
    menuMobileBurger.classList.add('flip');
    menuMobileBurger.classList.remove('unflip')
}

function deactiveMobileBurger() {
    menuMobileBurger.classList.add('unflip')
    menuMobileBurger.classList.remove('flip');
}

function showMenu() {
    body.classList.add('body-overflow');
    navigation.querySelectorAll('.navigation__link').forEach(item => item.addEventListener('click', hideMenu));

    headerMenu.classList.add('header__navigation-active');
    headerMenu.classList.add('show-mobile-menu');

    headerMenu.addEventListener('animationend', function () {
        headerMenu.classList.remove('show-mobile-menu');
        flag = false;
    });
}

function hideMenu() {
    body.classList.remove('body-overflow');

    deactiveMobileBurger()

    navigation.querySelectorAll('.navigation__link').forEach(item => item.removeEventListener('click', hideMenu));

    headerMenu.classList.add('menu-right');

    headerMenu.addEventListener('animationend', function () {
        headerMenu.classList.remove('header__navigation-active');
        headerMenu.classList.remove('menu-right');
        flag = true;
    }, { once: true });
}
