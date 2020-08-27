(function () {

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyCDC_Fr59RYH5mFtMT2qES1SaLm2uejH0A",
        authDomain: "personal-website-664ca.firebaseapp.com",
        databaseURL: "https://personal-website-664ca.firebaseio.com",
        projectId: "personal-website-664ca",
        storageBucket: "personal-website-664ca.appspot.com",
        messagingSenderId: "138869735689",
        appId: "1:138869735689:web:2cdcfd8a88977e022453d8",
        measurementId: "G-N5VFQ4H262",
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const mail = document.querySelector('#mail')
    const pwd = document.querySelector('#password')
    const btnRegister = document.querySelector('.btn-register')
    const btnLogin = document.querySelector('.btn-login')

    const validate = e => {
        if (!emailIsValid(mail.value)) {
            alert('Please enter a valid email')
            mail.focus();
            return false;
        }

        if(pwd.value == ""){
            alert('Please enter a password')
            pwd.focus();
            return false;
        }

        // if (mail.value == "" || pwd.value == "") {
        //     return false
        // } else{
        //     clearFields()
        //     return true
        // }
    }

    const emailIsValid = email => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function clearFields() {
        document.querySelector("#mail").value = ""
        document.querySelector("#password").value = ""
    }


    //Sign IN user
    btnLogin.addEventListener('click', (e) => {
        validate()
        const email = mail.value;
        const pass = pwd.value;
        const auth = firebase.auth()

        const promise = auth.signInWithEmailAndPassword(email, pass)
        promise.catch((err) => console.log(err.message))
    })

    //Register
    btnRegister.addEventListener('click', (e) => {
        validate()
        const email = mail.value;
        const pass = pwd.value;
        const auth = firebase.auth()

        const promise = auth.createUserWithEmailAndPassword(email, pass)
        promise.catch((err) => console.log(err.message))
    })

    //realtime
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location.href="dashboard.html"
        } else {
            console.log('Not Logged in')
        }
    });

})()

