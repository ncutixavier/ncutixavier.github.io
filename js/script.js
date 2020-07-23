window.onscroll = function () {
    if (document.body.scrollTop >= 40 || document.documentElement.scrollTop >= 40) {
        document.querySelector('.navbar').classList.add("white-background")
    }else{
        document.querySelector('.navbar').classList.remove("white-background")
    }
};