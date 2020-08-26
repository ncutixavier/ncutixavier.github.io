
//fetch all articles
fetch('https://morning-thicket-92126.herokuapp.com/api/v1/blogs', {
    method: 'GET'
})
    .then(res => res.json())
    .then(dt => {
        dt.data.articles.map(article => {
            renderArticle(article)
        })
    })
    .catch(err => console.log(err))

//Save created article
variableToBeUsed.saveDataBtn.addEventListener('click', () => {
    fetch("https://morning-thicket-92126.herokuapp.com/api/v1/blogs/", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
            title: variableToBeUsed.title.value,
            image: variableToBeUsed.image.value,
            content: variableToBeUsed.content.value
        })
    })
        // Converting to JSON
        .then(response => response.json())
        // Displaying results to console
        .then(dt => {
            if (dt.status == "success") {
                alert("Created Successful✅")
                window.history.pushState('newArticle', "Page", `/dashboard.html`);
                location.reload()

            } else if (localStorage.length == 0) {
                variableToBeUsed.authError.classList.add('error-login')
                variableToBeUsed.authError.textContent = "Please login to get access"
            } else {
                variableToBeUsed.authError.classList.add('error-login')
                variableToBeUsed.authError.textContent = "All fields are required"
            }
        })
})

//create
variableToBeUsed.createBtn.addEventListener('click', () => {
    window.history.pushState('newArticle', "Page", "/dashboard/newArticle");
    variableToBeUsed.updateDataBtn.style.display = 'none'
    variableToBeUsed.saveDataBtn.textContent = 'Save'
})

//logout
variableToBeUsed.logoutBtn.addEventListener('click', () => {
    localStorage.clear()
    window.location.replace(`login.html`);
})