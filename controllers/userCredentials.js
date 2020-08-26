const name = document.querySelector('#name')
const email = document.querySelector('#mail')
const password = document.querySelector('#password')
const passwordConfirm = document.querySelector('#passwordConfirm')
const btnRegister = document.querySelector('.btn-register')
const btnLogin = document.querySelector('.btn-login')
const loginerror = document.querySelector('.errorlogin')
var token = ''

btnRegister.addEventListener('click', () => {
    fetch("https://morning-thicket-92126.herokuapp.com/api/v1/users/signup", {
        // Adding method type 
        method: "POST",
        // Adding body or contents to send 
        body: JSON.stringify({
            name: name.value,
            email: email.value,
            password: password.value,
            passwordConfirm: passwordConfirm.value
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
                loginerror.classList.add('error-login')
                loginerror.textContent = dt.message._message
                // console.log(dt)
            } else {
                clearFields()
                loginerror.classList.remove('error-login')
                loginerror.classList.add('success-login')
                loginerror.textContent = "Registered Successful!"
                // console.log(dt)
            }
        })
})

btnLogin.addEventListener('click', () => {
    fetch("https://morning-thicket-92126.herokuapp.com/api/v1/users/login", {
        method: "POST",
        body: JSON.stringify({
            email: email.value,
            password: password.value
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(dt => {
            if (dt.status == 'failed') {
                loginerror.classList.add('error-login')
                loginerror.textContent = dt.message
                email.focus()
            } else if (dt.status == 'success') {
                loginerror.classList.remove('error-login')
                clearFields()
                localStorage.setItem("token", dt.token)
                window.location.href = "dashboard.html"
            }
        })
})

const clearFields = () => {
    email.value = ''
    password.value = ''
}

