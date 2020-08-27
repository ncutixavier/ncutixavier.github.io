const articles = document.querySelector(".articles")
const items = document.querySelector(".items")
const anArticle = document.querySelector('.single-blog-container')
const blogTitle = document.querySelector('.blog-title')
const saveCommentBtn = document.querySelector('#save-comment-btn')
const comWriter = document.querySelector('#comWriter')
const comArticle = document.querySelector('#comArticle')
const singleBlogCommentTitle = document.querySelector('.single-blog-comment-title')
const singleBlogComments = document.querySelector('.single-blog-comments')
const singleBlogBtn = document.querySelector('.single-blog-btn')



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

function togglePopup() {
    document.getElementById("popup-1").classList.toggle("active");
}

function createArticleTitle(doc) {
    let articleTitle = document.createElement('div')
    articleTitle.setAttribute('class', 'article-title')

    let a = document.createElement('a')
    a.textContent = doc.data().title

    articleTitle.appendChild(a)

    return articleTitle
}

function createSingleArticleTitle(doc) {
    let SingleArticleTitle = document.createElement('div')
    SingleArticleTitle.setAttribute('class', 'single-blog-title')

    let h1 = document.createElement('h1')
    h1.textContent = doc.data().title

    let h6 = document.createElement('h6')
    h6.textContent = "By " + doc.data().writer + ", " + doc.data().date

    SingleArticleTitle.appendChild(h1)
    SingleArticleTitle.appendChild(h6)

    return SingleArticleTitle
}

function createSingleArticleContent(doc) {
    let SingleArticleTitle = document.createElement('div')
    SingleArticleTitle.setAttribute('class', 'single-blog-article')

    let img = document.createElement('img')
    img.src = doc.data().image

    let p = document.createElement('p')
    p.textContent = doc.data().description

    SingleArticleTitle.appendChild(img)
    SingleArticleTitle.appendChild(p)

    return SingleArticleTitle
}

const createArticleCommentTitle = () => {
    let h1 = document.createElement('h1')
    h1.textContent = "Comments"
    singleBlogCommentTitle.appendChild(h1)
}

const createDivContainer = (name, com) => {
    let comment = document.createElement('div')
    comment.setAttribute('class', 'comment')

    let hr = document.createElement('hr')

    const h5 = document.createElement('h5')
    h5.textContent = name
    const p = document.createElement('p')
    p.textContent = com

    comment.appendChild(h5)
    comment.appendChild(p)
    comment.appendChild(hr)

    return comment

}

const createArticleComment = (doc) => {

    for (let i = 0; i < doc.data().comments.length; i++) {
        singleBlogComments.appendChild(
            createDivContainer(doc.data().comments[i].name, doc.data().comments[i].comment)
        )
    }
}

const createCommentBtn = () => {
    let button = document.createElement('button')
    button.textContent = 'Leave your Comment'

    button.addEventListener('click', () => {
        togglePopup()
    })
    singleBlogBtn.appendChild(button)
}


const renderSingleArticle = (doc) => {
    console.log("Single Article Loading...")

    anArticle.appendChild(createSingleArticleTitle(doc))
    anArticle.appendChild(createSingleArticleContent(doc))
    createArticleCommentTitle()
    createArticleComment(doc)
    createCommentBtn()
}

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
    // Append sub-item to correspond item
    article.appendChild(img)
    article.appendChild(createArticleTitle(doc))
    article.appendChild(writer)
    article.appendChild(desc)

    //Add article in articles section
    articles.appendChild(article)

    article.addEventListener('click', (e) => {
        e.stopPropagation()
        console.log('link clicked....')

        document.querySelector('.back-to-blog').style.display = 'block'
        // document.querySelector('.single-blog-container').style.display = 'block' 

        articles.style.display = 'none'
        blogTitle.style.display = 'none'

        let id = e.target.parentElement.getAttribute('data-id')
        // console.log(String(id))

        var docRef = db.collection("articles").doc(`${id}`);

        docRef.get().then(function (doc) {
            if (doc.exists) {
                renderSingleArticle(doc)
                console.log("Document data loading");
            } else {
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

        saveCommentBtn.addEventListener('click', function (e) {
            e.preventDefault()
            if (comWriter.value == '') {
                comWriter.focus()
                alert("Please enter your name")
                return false;
            }

            if (comArticle.value == '') {
                comArticle.focus()
                alert("Please enter your comment")
                return false;
            }

            if (comWriter.value == '' || comArticle.value == '') {
                alert("Please Fill all fields.")
                return false;
            } else {
                db.collection("articles").doc(id).update({
                    comments: firebase.firestore.FieldValue.arrayUnion({
                        name: comWriter.value,
                        comment: comArticle.value
                    })
                }).catch((err) => console.log(err))
                clearFields()
                alert("Thanks for your comment.")
                return true;
            }
        })

    })

}

//Display the data from firebase
db.collection('articles').get().then((snapshot) => {
    snapshot.docs.map(doc => {
        renderArticle(doc)
        // console.log(doc.data().comments[0])
    })
})

function clearFields() {
    comWriter.value = ''
    comArticle.value = ''
}

