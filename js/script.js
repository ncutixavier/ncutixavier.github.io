window.onscroll = function () {
    if (document.body.scrollTop >= 100 || document.documentElement.scrollTop >= 100) {
        document.querySelector('.navbar').classList.add("white-background")
        document.querySelector('.goUpBtn').style.display = "block"
    } else {
        document.querySelector('.navbar').classList.remove("white-background")
        document.querySelector('.goUpBtn').style.display = "none"
    }
};


const workBtn =  document.querySelector(".workPage")
workBtn.addEventListener('click', function(){
    document.querySelector(".work").scrollIntoView({
        behavior: "smooth"
    })
})


const submitBtn = document.querySelector("#sendBtn")

const userName = document.querySelector("#name")
const userEmail = document.querySelector("#e-mail")
const userMessage = document.querySelector("#message")


const validation = (e) => {

    e.preventDefault()
    let nameErr = document.querySelector(".nameErr")
    let emailErr = document.querySelector(".emailErr")
    let messageErr = document.querySelector(".messageErr")

    if (!nameIsValid(userName.value)) {
        nameErr.style.display = "inline"
        userName.focus();
        return false;
    } else {
        nameErr.style.display = "none"
    }

    if (!emailIsValid(userEmail.value)) {
        emailErr.style.display = "inline"
        userEmail.focus();
        return false;
    } else {
        emailErr.style.display = "none"
    }

    if (!nameIsValid(userMessage.value)) {
        messageErr.style.display = "inline"
        userMessage.focus()
        return false
    } else {
        messageErr.style.display = "none"
    }

    if ((nameErr || emailErr || messageErr) == true) {
        return false

    } else {

        togglePopup()
        clearFields()
        return true
    }
    // return true
}

const emailIsValid = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const nameIsValid = name => {
    return /^[a-zA-Z\s]+$/.test(name);
}

submitBtn.addEventListener('click', validation)

document.addEventListener('keypress', function (e) {
    if (e.keyCode === 13 && e.which == 13) {
        validation()
    }
})


const togglePopup = () => {
    document.getElementById("popup-1").classList.toggle("active");

    const html = '<div class="close-btn" onclick="togglePopup()">&times;</div>' +
        '<div class="content-text"><h1>Hi %Name%,</h1>' +
        '<p>Thank you for contacting me, I’ll get back to you shortly…</p></div>'

    //2. replace placeholders with actual data
    const newHtml = html.replace('%Name%', userName.value)

    //3. Insert html into DOM 
    document.querySelector(".content").insertAdjacentHTML('beforeend', newHtml)
}

function clearFields() {
    document.querySelector("#name").value = ""
    document.querySelector("#e-mail").value = ""
    document.querySelector("#message").value = ""
}
