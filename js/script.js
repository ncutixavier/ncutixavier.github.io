window.onscroll = function () {
    if (document.body.scrollTop >= 300 || document.documentElement.scrollTop >= 300) {
        document.querySelector('.navbar').classList.add("white-background")
        document.querySelector('.goUpBtn').style.display = "block"
    }else{
        document.querySelector('.navbar').classList.remove("white-background")
        document.querySelector('.goUpBtn').style.display = "none"
    }
};