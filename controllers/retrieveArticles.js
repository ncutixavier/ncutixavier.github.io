const renderUserName = doc => {
    console.log('rendered')
}

const createTitleAndDate = doc => {
    //Create Title and date
    const singleBlogTitle = document.createElement('div')
    singleBlogTitle.setAttribute('class', 'single-blog-title')

    const h1 = document.createElement('h1')
    h1.textContent = doc.title
    const h6 = document.createElement('h6')
    h6.textContent = "By " + doc.author + ", " + formatDate(doc.date)

    singleBlogTitle.appendChild(h1)
    singleBlogTitle.appendChild(h6)

    return singleBlogTitle
}

const createImageAndContent = doc => {
    //create image and content 
    const singleBlogArticle = document.createElement('div')
    singleBlogArticle.setAttribute('class', 'single-blog-article')

    const img = document.createElement('img')
    img.src = doc.image

    const p = document.createElement('p')
    p.textContent = doc.content

    singleBlogArticle.appendChild(img)

    let paragraphs = doc.content.split("<br>");
    paragraphs.map((paragraph) => {
        let p = document.createElement("p");
        p.textContent = paragraph;
        singleBlogArticle.appendChild(p);
    });

    return singleBlogArticle
}

const createCommentButton = () => {
    const commentButton = document.createElement('div')
    commentButton.setAttribute('class', 'single-blog-btn')

    const button = document.createElement('button')
    button.textContent = 'Leave a comment'
    button.setAttribute('id', 'blurBtn')

    commentButton.appendChild(button)

    commentButton.addEventListener('click', (e) => {
        window.scrollTo(0, 0)
        variables.blur.classList.toggle('active-blur')
        variables.commentForm.classList.toggle('active-comment')
        if (variables.name.value === '' && localStorage.length > 0) {
            variables.name.value = localStorage.name
            variables.name.disabled = true
        }
        
    })

    return commentButton
}

//comment
const renderComments = doc => {
    const singleBlogComments = document.createElement('div')
    singleBlogComments.setAttribute('class', 'single-blog-comments')

    doc.comments.map(el => {
        const comments = document.createElement('div')
        comments.setAttribute('class', 'comment')

        const h5 = document.createElement('h5')
        const p = document.createElement('p')
        const hr = document.createElement('hr')

        h5.textContent = el.name
        p.textContent = el.comment

        comments.appendChild(h5)
        comments.appendChild(p)
        comments.appendChild(hr)

        singleBlogComments.appendChild(comments)
    })
    return singleBlogComments
}

const createSingleBlogComment = doc => {

    const singleBlogComment = document.createElement('div')
    singleBlogComment.setAttribute('class', 'single-blog-comment')

    const commentTitle = document.createElement('div')
    commentTitle.setAttribute('class', 'single-blog-comment-title')

    const title = document.createElement('h1')
    title.textContent = `${doc.comments.length} Comments`

    commentTitle.appendChild(title)

    singleBlogComment.appendChild(commentTitle)
    singleBlogComment.appendChild(renderComments(doc))

    return singleBlogComment
}

const renderSingleArticle = doc => {

    const backBtn = document.createElement('div')
    backBtn.setAttribute('class', 'back-to-blog')

    const a = document.createElement('a')
    a.textContent = "Back To Blog"
    a.setAttribute('href', 'blog.html')
    backBtn.appendChild(a)
    backBtn.addEventListener('click', () => {
        window.history.pushState('newArticle', "Page", `/blog.html`);
    })

    //Main card
    const singleBlogCard = document.createElement('div')
    singleBlogCard.setAttribute('class', 'single-blog-container')

    singleBlogCard.appendChild(createTitleAndDate(doc))
    singleBlogCard.appendChild(createImageAndContent(doc))
    singleBlogCard.appendChild(createCommentButton())

    variableToBeUsed.singleBlog.appendChild(backBtn)
    variableToBeUsed.singleBlog.appendChild(singleBlogCard)
    variableToBeUsed.singleBlog.appendChild(createSingleBlogComment(doc))

}

const renderArticles = doc => {

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
    article.setAttribute('data-id', doc._id)

    //get values from doc
    img.src = doc.image

    writer.textContent = "By " + doc.author + ", " + formatDate(doc.date)

    artContent = doc.content
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
    variableToBeUsed.articles.appendChild(article)

    article.addEventListener('click', (e) => {
        document.querySelector('.loading').style.display = 'flex'
        let id = e.target.parentElement.getAttribute('data-id')
        variables.commentForm.setAttribute('data-id', id)
        variableToBeUsed.articles.style.display = 'none'

        fetch(`https://morning-thicket-92126.herokuapp.com/api/v1/blogs/${id}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(dt => {
                // console.log(dt)
                renderSingleArticle(dt.data.article)
                // window.history.pushState('newArticle', "Page", `/blog/${dt.data.article.title}`);
                document.querySelector('.loading').style.display = 'none'
            })
    })
}

fetch('https://morning-thicket-92126.herokuapp.com/api/v1/blogs', {
    method: 'GET'
})
    .then(res => res.json())
    .then(dt => {
        dt.data.articles.map(article => {
            renderArticles(article)
            document.querySelector('.loading').style.display = 'none'
            // console.log(article)
        })
    })