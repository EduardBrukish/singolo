const navigation = document.querySelector('.navigation');
navigation.addEventListener('click', activateMenuItem);

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