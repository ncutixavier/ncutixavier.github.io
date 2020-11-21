const barBtn = document.querySelector('.nav-bar')
const navbar = document.querySelector('.navbar-list')

barBtn.addEventListener('click', (e) => {
    navbar.classList.toggle('navbar-list-active')
})