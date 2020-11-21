const renderProjects = doc => {
    const project = document.createElement('div')
    project.setAttribute("class", "project")
    project.setAttribute("data-id", `${doc.id}`)
    //img section
    const projImg = document.createElement('div')
    projImg.setAttribute("class", "proj-img")

    let img = document.createElement('img')
    img.setAttribute("src", `./img/${doc.image}`)

    projImg.appendChild(img)

    //title section
    const projTitle = document.createElement('div')
    projTitle.setAttribute("class", "proj-title")
    projTitle.textContent = doc.title

    //description & language section
    const projDesc = document.createElement('div')
    projDesc.setAttribute("class", "proj-desc")

    const desc = document.createElement('p')
    desc.textContent = doc.desc

    const LangSect = document.createElement('p')
    const lang = document.createElement('span')
    lang.textContent = `Language: ${doc.language}`
    LangSect.appendChild(lang)

    projDesc.appendChild(desc)
    projDesc.appendChild(LangSect)

    //btn section
    const btnDiv = document.createElement('div')
    btnDiv.setAttribute("class", "proj-btn")

    let button = document.createElement('button')
    let link = document.createElement('a')
    link.setAttribute("href", `${doc.link}`)
    link.setAttribute("target", "_blank")
    link.textContent = "Find More"
    button.appendChild(link)

    btnDiv.appendChild(button)

    //Append all children
    project.appendChild(projImg)
    project.appendChild(projTitle)
    project.appendChild(projDesc)
    project.appendChild(btnDiv)

    projectVariable.projects.appendChild(project)
}

const projects = [
    {
        id: 1,
        image: 'messenger.png',
        title: 'Messenger Website',
        desc: 'Messenger-Rwanda is company located in Rwanda. We help people who want to deliver message in difference province of Rwanda.',
        language :"HTML5, CSS3, JavaScript",
        link: 'https://nx-messenger.netlify.com/'
    },
    {
        id: 2,
        image: 'donationweb.png',
        title: 'Partners In Hope Website',
        desc: 'Partners in hope is a local nongovernmental non-profit organization whose mission is to continue...',
        language :"HTML5, CSS3, JavaScript",
        link: 'https://donationweb.netlify.app/'
    },
    {
        id: 3,
        image: 'volvelab.png',
        title: 'Volvelab Website',
        desc: 'Volve Lab provides turn-key software development services that add value to your business.',
        language :"HTML5, CSS3, JavaScript",
        link: 'https://volvelab.netlify.app/'
    },
    {
        id: 4,
        image: 'api.png',
        title: 'Find Home API',
        desc: 'Find Home API provides easy way to find house for rent. View the documentation below',
        language: "Node Js and PostgreSQL",
        link: 'https://find-home-apps-staging.herokuapp.com/api-docs'
    },
    {
        id: 5,
        image: 'api.png',
        title: 'Phantom API',
        desc: 'Phantom API provides easy way to track public bus i Kigali. View the documentation below',
        language: "Node Js and PostgreSQL",
        link: 'https://phantom-cabal-staging.herokuapp.com/api-docs'
    }
]

projects.map(doc => renderProjects(doc))