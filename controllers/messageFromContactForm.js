


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCDC_Fr59RYH5mFtMT2qES1SaLm2uejH0A",
    authDomain: "personal-website-664ca.firebaseapp.com",
    databaseURL: "https://personal-website-664ca.firebaseio.com",
    projectId: "personal-website-664ca",
    storageBucket: "personal-website-664ca.appspot.com",
    messagingSenderId: "138869735689",
    appId: "1:138869735689:web:2cdcfd8a88977e022453d8",
    measurementId: "G-N5VFQ4H262"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
emailjs.init('user_8Q8lp87WvxGxE6xiXQ68f')
//Display All mesages
// db.collection('messages').get().then((msg) => {
//     msg.docs.map(doc => console.log(doc.data()))
// })

//Adding messages in firebase
const addMessage = (name, email, message) => {
    db.collection('messages').add({
        name: name,
        email: email,
        message: message
    })
}

const workBtn = document.querySelector(".workPage")
workBtn.addEventListener('click', function () {

    document.querySelector(".work").scrollIntoView({
        behavior: "smooth"
    })
})


const submitBtn = document.querySelector("#sendBtn")
const formMessage = document.querySelector('#gform')

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

    if (userMessage.value === "") {
        messageErr.style.display = "inline"
        userMessage.focus()
        return false
    } else {
        messageErr.style.display = "none"
    }

    if ((nameErr || emailErr || messageErr) == true) {
        return false

    } else {

        submitBtn.value = 'Sending...';

        const serviceID = 'service_ikkj11e';
        const templateID = 'template_u4z6v9l';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                submitBtn.value = 'Send Email';
                alert('Sent!');
            }, (err) => {
                submitBtn.value = 'Send Email';
                alert(JSON.stringify(err));
            });
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

// submitBtn.addEventListener('submit', validation)
// formMessage.addEventListener('submit', validation)

// document.addEventListener('keypress', function (e) {
//     if (e.keyCode === 13 && e.which == 13) {
//         validation()
//     }
// })


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

document.getElementById('gform').addEventListener('submit', function (event) {
    event.preventDefault()
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

    if (userMessage.value === "") {
        messageErr.style.display = "inline"
        userMessage.focus()
        return false
    } else {
        messageErr.style.display = "none"
    }

    if ((userName.value || userEmail.value || userMessage.value) == "") {
        return false

    } else {

        submitBtn.value = 'Sending...';

        const serviceID = 'service_ikkj11e';
        const templateID = 'template_u4z6v9l';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                submitBtn.value = 'Send Email';
                clearFields()
                swal({
                    title: "Message Sent!",
                    text: "Your message has been sent! We wil get back to you as soon as possible.",
                    type: 'success'
                })
            }, (err) => {
                submitBtn.value = 'Send Email';
                alert(JSON.stringify(err));
            });
        return true
    }

    // submitBtn.value = 'Sending...';

    // const serviceID = 'service_ikkj11e';
    // const templateID = 'template_u4z6v9l';

    // emailjs.sendForm(serviceID, templateID, this)
    //     .then(() => {
    //         submitBtn.value = 'Send Email';
    //         alert('Sent!');
    //     }, (err) => {
    //         submitBtn.value = 'Send Email';
    //         alert(JSON.stringify(err));
    //     });
});