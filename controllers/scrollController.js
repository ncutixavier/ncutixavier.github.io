window.onscroll = function () {
    if (document.body.scrollTop >= 100 || document.documentElement.scrollTop >= 100) {
        document.querySelector('.navbar').classList.add("white-background")
        document.querySelector('.goUpBtn').style.display = "block"
    } else {
        document.querySelector('.navbar').classList.remove("white-background")
        document.querySelector('.goUpBtn').style.display = "none"
    }
};

variableToBeUsed.scrollUp.addEventListener('click', (e)=>{
    window.scrollTo(0, 0);
})