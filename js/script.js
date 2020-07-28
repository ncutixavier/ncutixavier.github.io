window.onscroll = function () {
    if (document.body.scrollTop >= 300 || document.documentElement.scrollTop >= 300) {
        document.querySelector('.navbar').classList.add("white-background")
        document.querySelector('.goUpBtn').style.display = "block"
    } else {
        document.querySelector('.navbar').classList.remove("white-background")
        document.querySelector('.goUpBtn').style.display = "none"
    }
};


const submitBtn = document.querySelector("#sendBtn")

const validation = () => {
    // e.preventDefault()
    var userName = document.querySelector("#name")
    var userEmail = document.querySelector("#e-mail")
    var userMessage = document.querySelector("#message")

    var nameErr = document.querySelector(".nameErr")
    var emailErr = document.querySelector(".emailErr")
    var messageErr = document.querySelector(".messageErr")

    if (!nameIsValid(userName.value)) {
        nameErr.innerHTML = "Please enter a valid name"
        userName.focus();
        return false;
    }else{
        nameErr.innerHTML = ""
        // nameErr.display = "none"
    }

    if (!emailIsValid(userEmail.value)) {
        emailErr.innerHTML = "Please enter a valid email address"
        userEmail.focus();
        return false;
    }else{
        emailErr.innerHTML = ""
    }

    if (userMessage.value === "") {
        messageErr.innerHTML = "Please enter your message"
        userMessage.focus()
        return false
    }else{
        messageErr.innerHTML = ""
    }

    if ((nameErr || emailErr || messageErr) == true){
        return false
    }else{
        togglePopup()
        clearFields()
    }

}

const emailIsValid = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const nameIsValid = name => {
    return /^[a-zA-Z\s]+$/.test(name);
}

document.addEventListener('click', validation)

document.addEventListener('keyup', function (e) {
    if (e.keyCode === 13 && e.which == 13) {
        validation()
    }
    
    // if(e.keyCode === 9 && e.which == 9){
    //     validation()
    // }
})


function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active");
  }

function clearFields() {
    document.querySelector("#name").value = ""
    document.querySelector("#e-mail").value = ""
    document.querySelector("#message").value = ""
}
