credentialVariable.btnRegister.addEventListener('click', () => {
    fetch("https://morning-thicket-92126.herokuapp.com/api/v1/users/signup", {
        // Adding method type 
        method: "POST",
        // Adding body or contents to send 
        body: JSON.stringify({
            name: credentialVariable.name.value,
            email: credentialVariable.email.value,
            password: credentialVariable.password.value,
            passwordConfirm: credentialVariable.passwordConfirm.value
        }),
        // Adding headers to the request 
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        // Converting to JSON
        .then(response => response.json())
        // Displaying results to console
        .then(dt => {
            if (dt.status == 'fail') {
                credentialVariable.loginerror.classList.add('error-login')
                credentialVariable.loginerror.textContent = dt.message._message
                // console.log(dt)
            } else {
                clearFields()
                credentialVariable.loginerror.classList.remove('error-login')
                credentialVariable.loginerror.classList.add('success-login')
                credentialVariable.loginerror.textContent = "Registered Successful!"
                // console.log(dt)
            }
        })
})

credentialVariable.btnLogin.addEventListener('click', () => {
    document.querySelector('.loading').style.display = 'flex'
    document.querySelector('.login-container').style.display = 'none'
    fetch("https://morning-thicket-92126.herokuapp.com/api/v1/users/login", {
        method: "POST",
        body: JSON.stringify({
            email: credentialVariable.email.value,
            password: credentialVariable.password.value
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(dt => {
            document.querySelector('.loading').style.display = 'none'
            // document.querySelector('.loginerror').style.display = 'flex'
            document.querySelector('.login-container').style.display = 'block'


            if (dt.status == 'failed') {
                credentialVariable.loginerror.classList.add('error-login')
                credentialVariable.loginerror.textContent = dt.message
                credentialVariable.email.focus()

            } else if (dt.status == 'success' && dt.user.role == 'user') {
                credentialVariable.loginerror.classList.remove('error-login')
                document.querySelector('.login-container').style.display = 'none'
                clearCredentialsField()
                localStorage.setItem("token", dt.token)
                localStorage.setItem("name", dt.user.name)
                window.location.href = "blog.html"
                // credentialVariable.login.textContent = 'Logout'

            } else if (dt.status == 'success' && dt.user.role == 'admin') {
                credentialVariable.loginerror.classList.remove('error-login')
                clearCredentialsField()
                localStorage.setItem("token", dt.token)
                window.location.href = "dashboard.html"
            }
        })
})

const clearCredentialsField = () => {
    credentialVariable.email.value = ''
    credentialVariable.password.value = ''
}

document.onkeydown = function (e) {
    if (e.ctrlKey &&
        (e.keyCode === 67 ||
            e.keyCode === 86 ||
            e.keyCode === 85 ||
            e.keyCode === 117)) {
        return false;
    } else {
        return true;
    }
};