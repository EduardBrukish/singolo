const navigation = document.querySelector('.navigation');
const portfolioMenu = document.querySelector('.work-examples__menu');
const portfolioExamples = document.querySelector('.work-examples__images');

navigation.addEventListener('click', activateMenuItem);
portfolioMenu.addEventListener('click', sortPortfolioExamples);
portfolioExamples.addEventListener('click', activePortfolioExample);

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