const articleWriter = document.querySelector('#writer')
const title = document.querySelector('#title')
const date = document.querySelector('#date')
const image = document.querySelector('#image')
const articleContent = document.querySelector('#article')

const updateDataBtn = document.querySelector('#update-data-btn')
const saveDataBtn = document.querySelector('#save-data-btn')
const createBtn = document.querySelector('#createBtn')

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
const db = firebase.firestore();

createBtn.addEventListener('click', () => {
    updateDataBtn.style.display = 'none'
    saveDataBtn.textContent = 'Save'
})

function togglePopup() {
    document.getElementById("popup-1").classList.toggle("active");
}

const formatDate = (dt) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let d = new Date(dt)
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)

    return `${da} ${mo} ${ye}`
}

const unformatDate = (dt) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let arr = dt.split(' ')
    let d = arr[0]
    let m = months.indexOf(arr[1]) + 1
    if (m < 10) {
        mStr = '0' + String(m)
    } else {
        mStr = String(m)
    }
    let y = arr[2]

    return y + '-' + mStr + '-' + d
}

unformatDate('12 Aug 2020')

function createBtnGroup() {
    let btnGroup = document.createElement('div')
    btnGroup.setAttribute("class", "btn-group")

    let btnUpdate = document.createElement('button')
    btnUpdate.textContent = "Update"
    btnUpdate.setAttribute("class", "btn-update")
    // btnUpdate.setAttribute('onclick', 'togglePopup()')

    let btnDelete = document.createElement('button')
    btnDelete.textContent = "Delete"
    btnDelete.setAttribute("class", "btn-delete")

    btnGroup.appendChild(btnUpdate)
    btnGroup.appendChild(btnDelete)

    return btnGroup
}

function createArticleTitle(doc) {
    let articleTitle = document.createElement('div')
    articleTitle.setAttribute('class', 'article-title')

    let a = document.createElement('a')
    a.textContent = doc.data().title

    articleTitle.appendChild(a)

    return articleTitle
}

const articles = document.querySelector(".articles")
const items = document.querySelector(".items")
const user = document.querySelector(".username-profile")

const renderArticle = (doc) => {

    //create mail element for the article
    const article = document.createElement('div')
    article.setAttribute('class', 'article')

    //create sub-item of item of article
    let img = document.createElement('img')
    img.setAttribute("class", "article-img")


    let writer = document.createElement('div')
    writer.setAttribute("class", "article-writer")

    let desc = document.createElement('p')
    desc.setAttribute("class", "article-desc")

    //Update and Delette Button
    let btnGroup = document.createElement('div')
    btnGroup.setAttribute("class", "btn-group")

    let btnUpdate = document.createElement('button')
    btnUpdate.textContent = "Update"
    btnUpdate.setAttribute("class", "btn-update")

    let btnDelete = document.createElement('button')
    btnDelete.textContent = "Delete"
    btnDelete.setAttribute("class", "btn-delete")

    btnGroup.appendChild(btnUpdate)
    btnGroup.appendChild(btnDelete)

    //get id of the article
    article.setAttribute('data-id', doc.id)

    //get values from doc
    img.src = doc.data().image

    writer.textContent = "By " + doc.data().writer + ", " + doc.data().date

    artContent = doc.data().description
    if (artContent.length > 150) {
        desc.textContent = artContent.substr(0, 150) + "..."
    } else {
        desc.textContent = artContent
    }

    if (user.textContent === "ADMIN") {
        // Append sub-item to correspond item
        article.appendChild(img)
        article.appendChild(createArticleTitle(doc))
        article.appendChild(writer)
        article.appendChild(desc)
        article.appendChild(btnGroup)
    } else {
        // Append sub-item to correspond item
        article.appendChild(img)
        article.appendChild(createArticleTitle(doc))
        article.appendChild(writer)
        article.appendChild(desc)
    }

    //Add article in articles section
    articles.appendChild(article)

    //Delete Article
    btnDelete.addEventListener('click', (e) => {
        e.stopPropagation()
        var retVal = confirm("Are you sure you want to delete this article?🙄")
        if (retVal == true) {
            let id = e.target.parentElement.parentElement.getAttribute('data-id')
            db.collection('articles').doc(id).delete()
            return true;
        } else {
            return false;
        }
    })

    btnUpdate.addEventListener('click', (e) => {
        togglePopup()
        saveDataBtn.style.display = 'none'
        updateDataBtn.textContent = "Update"
        updateDataBtn.style.backgroundColor = "#0a65d0"
        let id = e.target.parentElement.parentElement.getAttribute('data-id')

        db.collection("articles").doc(id).get().then((doc) => {
            console.log(doc.data())
            title.value = doc.data().title
            articleWriter.value = doc.data().writer
            date.value = unformatDate(doc.data().date)
            image.value = doc.data().image
            articleContent.value = doc.data().description
        });

        updateDataBtn.addEventListener('click', () => {
            var retVal = confirm("Are you sure you want to update this article?🙄")
            if (retVal == true) {
                db.collection("articles").doc(id).update({
                    title: title.value,
                    date: formatDate(date.value),
                    image: image.value,
                    writer: articleWriter.value,
                    description: articleContent.value
                })
                clearFields()
                return true;
            } else {
                return false;
            }
        })

        // db.collection('articles').where('title', '==', 'What is Html?').get().then((snapshot) => {
        //     snapshot.docs.map(doc => {
        //         console.log(doc.data())
        //     })
        // })

    })
}


//Display the data from firebase
db.collection('articles').get().then((snapshot) => {
    snapshot.docs.map(doc => {
        renderArticle(doc)
        console.log(doc.data())
    })
})

//INSERT ARTICLE IN FIRESTORE
//Get all values from form

const error = document.querySelector('.error')

const addArticle = () => {
    db.collection('articles').add({
        writer: articleWriter.value,
        title: title.value,
        date: formatDate(date.value),
        image: image.value,
        description: articleContent.value,
        comments: []
    })
}


const validateForm = () => {
    if ((writer.value || title.value || date.value || image.value || article.value) === '') {
        error.style.display = 'block'
        writer.focus();
        return false
    } else {
        error.style.display = 'none'
        addArticle()
        clearFields()
        alert('Thank you for adding new article🙂')
        return true
    }
}

saveDataBtn.addEventListener('click', validateForm)


const clearFields = () => {
    writer.value = ''
    title.value = ''
    date.value = ''
    image.value = ''
    article.value = ''
}

const btnLogout = document.querySelector('.btn-logout')
btnLogout.addEventListener('click', e => {
    firebase.auth().signOut()
    window.location.href = "login.html"
})
