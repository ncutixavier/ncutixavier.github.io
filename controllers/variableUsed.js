const variableToBeUsed = {
    title: document.querySelector('#title'),
    image: document.querySelector('#image'),
    content: document.querySelector('#article'),
    articles: document.querySelector(".articles"),
    updateDataBtn: document.querySelector('#update-data-btn'),
    saveDataBtn: document.querySelector('#save-data-btn'),
    createBtn: document.querySelector('#createBtn'),
    logoutBtn: document.querySelector('.btn-logout'),
    authError: document.querySelector('.error'),
    singleBlog: document.querySelector('.single-blog'),
    scrollUp: document.querySelector('.goUpBtn'),
    profileName: document.querySelector('.username-profile')
    // user-profile-name
}

const variables = {
    blur: document.querySelector('.blur'),
    sendComment: document.querySelector('#sendComment'),
    blurBtn: document.querySelector("#blurBtn"),
    name: document.querySelector("#name"),
    comment: document.querySelector("#comment"),
    commentError: document.querySelector(".comment-error"),
    commentForm: document.querySelector(".comment-form"),
    closeBtn: document.querySelector(".fa-times-circle"),
}

const credentialVariable = {
    name: document.querySelector('#name'),
    email: document.querySelector('#mail'),
    password: document.querySelector('#password'),
    passwordConfirm: document.querySelector('#passwordConfirm'),
    btnRegister: document.querySelector('.btn-register'),
    btnLogin: document.querySelector('.btn-login'),
    loginerror: document.querySelector('.errorlogin'),
    login: document.querySelector('.login')
}

const projectVariable = {
    projects: document.querySelector('.projects'),
    project: document.querySelector('.project')
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
