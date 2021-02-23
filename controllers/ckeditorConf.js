let theEditor
let articleContent = document.getElementById('article').value
ClassicEditor.create(document.getElementById('article')).then(editor => {
    theEditor = editor
})
