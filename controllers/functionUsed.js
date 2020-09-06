//Create Title of Article 
const createArticleTitle = doc => {
    let articleTitle = document.createElement('div')
    articleTitle.setAttribute('class', 'article-title')

    let a = document.createElement('a')
    a.textContent = doc.title

    articleTitle.appendChild(a)

    return articleTitle
}

//Formating Date
const formatDate = (dt) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const subDate = dt.split('T')[0].split('-')
    return `${subDate[2]} ${months[Number(subDate[1]) - 1]} ${subDate[0]}`
}

//Open input popup
const togglePopup = () => {
    document.getElementById("popup-1").classList.toggle("active");
}

//delete an existing article
const deleteArticle = (e) => {
    let id = e.target.parentElement.parentElement.getAttribute('data-id')

    var retVal = confirm("Are you sure you want to delete this article?⚠")
    if (retVal == true) {
        fetch(`https://morning-thicket-92126.herokuapp.com/api/v1/blogs/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.token}`
            }
        }).then(res => res.json())
            .then(dt => {
                if (dt.status == "failed") {
                    alert(dt.message)
                } else {
                    alert("Deleted Successful!")
                    location.reload()
                }
            })
        // return true;
    } else {
        alert('Not deleted...')
        return false;
    }
}

const getArticleById = e => {
    let id = e.target.parentElement.parentElement.getAttribute('data-id')
    fetch(`https://morning-thicket-92126.herokuapp.com/api/v1/blogs/${id}`, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(dt => {
            dt.data.articles.map(article => {
                // renderArticle(article)
                variableToBeUsed.title.value = article.title
                variableToBeUsed.image.value = article.image
                variableToBeUsed.content.value = article.content
            })
            // console.log(dt.data.articles)
        })
}

//Rendering all articles
const renderArticle = doc => {
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
    article.appendChild(btnGroup)

    //Add article in articles section
    variableToBeUsed.articles.appendChild(article)

    //Delete Article
    btnDelete.addEventListener('click', (e) => {
        e.stopPropagation()
        deleteArticle(e)
    })

    btnUpdate.addEventListener('click', (e) => {
        let id = e.target.parentElement.parentElement.getAttribute('data-id')
        togglePopup()
        variableToBeUsed.saveDataBtn.style.display = 'none'
        variableToBeUsed.updateDataBtn.textContent = "Update"
        variableToBeUsed.updateDataBtn.style.backgroundColor = "#0a65d0"

        // getArticleById(e)
        fetch(`https://morning-thicket-92126.herokuapp.com/api/v1/blogs/${id}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(dt => {
                if ((localStorage.getItem("token") == null)) {
                    variableToBeUsed.authError.classList.add('error-login')
                    variableToBeUsed.authError.textContent = "Please you may login to get access"
                } else {
                    // console.log(dt)
                    variableToBeUsed.title.value = dt.data.article.title
                    variableToBeUsed.image.value = dt.data.article.image
                    variableToBeUsed.content.value = dt.data.article.content
                }

            })

        variableToBeUsed.updateDataBtn.addEventListener('click', () => {
            var retVal = confirm("Are you sure you want to update this article?🙄")
            if (retVal == true) {
                fetch(`https://morning-thicket-92126.herokuapp.com/api/v1/blogs/${id}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${localStorage.token}`
                    },
                    body: JSON.stringify({
                        title: variableToBeUsed.title.value,
                        image: variableToBeUsed.image.value,
                        content: variableToBeUsed.content.value
                    })
                }).then(res => res.json())
                    .then(result => {
                        if (result.status == 'success') {
                            clearFields
                            location.reload()
                        } else if ((localStorage.getItem("token") == null)) {
                            alert("Please, you may login to get access")
                        }
                    })
                return true;
            } else {
                return false;
            }
        })

    })
}


const clearFields = () => {
    variableToBeUsed.title.value = ''
    variableToBeUsed.image.value = ''
    variableToBeUsed.content.value = ''
}