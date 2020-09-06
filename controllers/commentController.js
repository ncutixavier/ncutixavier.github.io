// variables.blurBtn.addEventListener('click', (e) => {
//     variables.blur.classList.toggle('active-blur')
//     variables.commentForm.classList.toggle('active-comment')
// })

const validate = e => {
    if (variables.name.value === '') {
        variables.commentError.style.display = "block"
        variables.commentError.textContent = "Please enter your name"
        return false
    } else {
        variables.commentError.style.display = "none"
    }

    if (variables.comment.value === '') {
        variables.commentError.style.display = "block"
        variables.commentError.textContent = "Please enter your comment"
        return false
    } else {
        variables.commentError.style.display = "none"
    }

    if ((variables.name.value && variables.comment.value) !== '') {
        alert("Thanks for your comment!")
        variables.commentForm.classList.toggle('active-comment')
        variables.blur.classList.toggle('active-blur')
        let id = e.target.parentElement.parentElement.getAttribute('data-id')

        fetch(`https://morning-thicket-92126.herokuapp.com/api/v1/blogs/comment/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                name: variables.name.value,
                comment: variables.comment.value
            })
        }).then(res => res.json())
            .then(result => console.log(result))

        variables.name.value = ''
        variables.comment.value = ''
        return true
    }
}
variables.sendComment.addEventListener('click', validate)
variables.closeBtn.addEventListener('click', () => {
    variables.commentForm.classList.toggle('active-comment')
    variables.blur.classList.toggle('active-blur')
})


// manipulating login button in navbar
if (!(localStorage.getItem("token") == null)) {
    credentialVariable.login.textContent = "Logout"
}

if (credentialVariable.login.textContent == "Logout") {
    credentialVariable.login.addEventListener('click', (e) => {
        localStorage.clear()
    })
}