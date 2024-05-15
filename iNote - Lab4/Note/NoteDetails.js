import UIFactory from "../UI/UIFactory.js"

function getMainContainer(){
    return document.querySelector('#note-details')
}
function getNoteTitleContainer(){
    return document.querySelector('#note-details-note-title')
}
function getNoteDeadlineContainer(){
    return document.querySelector('#note-details-note-deadline')
}
function getNoteTagsContainer(){
    return document.querySelector('#note-details-tag-list')
}
function getNoteDescriptionContainer(){
    return document.querySelector('#note-details-note-description')
}
function getTaskListContainer(){
    return document.querySelector('#note-details-taks-list')
}
function getPinButton(){
    return document.querySelector('#note-details-pin-button')
}
function appendNote(note) {
    const main = getMainContainer()
    main.setAttribute('data-note-id', note.id)
    const title = getNoteTitleContainer()
    const deadline = getNoteDeadlineContainer()
    const noteTags = getNoteTagsContainer()
    const description = getNoteDescriptionContainer()
    const taskList = getTaskListContainer()
    const pinnedButton = getPinButton()

    title.innerHTML = ''
    title.innerHTML = note.title;

    deadline.innerHTML = ''
    deadline.innerHTML = UIFactory.getDateFormat(note.deadline)

    noteTags.innerHTML = ''
    noteTags.classList.remove('empty')
    noteTags.style.marginLeft = '0rem'
    while (noteTags.firstChild) {
        noteTags.removeChild(noteTags.firstChild)
    }
    note.tags.forEach(tag => {
        noteTags.appendChild(UIFactory.createTagHtml(tag))
    });
    if (note.tags.length === 0) {
        noteTags.innerHTML = 'No tags.'
        noteTags.classList.add('empty')
        noteTags.style.marginLeft = '.5rem'
    }


    taskList.innerHTML = ''
    taskList.classList.remove('empty')
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }
    note.taskList.forEach(task => {
        taskList.appendChild(UIFactory.createNoteDetailsTaskHtml(task))
    });
    if (note.taskList.length === 0) {
        taskList.innerHTML = 'Task list is empty.'
        taskList.classList.add('empty')
    }


    description.classList.remove('empty')
    description.innerHTML = ''
    description.innerHTML = note.description
    if (note.description === '') {
        description.innerHTML = 'Description is empty.'
        description.classList.add('empty')
    }

    if (note.isPinned) {
        pinnedButton.classList.add('active')
    } else {
        pinnedButton.classList.remove('active')
    }
}

export default {getMainContainer,getNoteTitleContainer,getNoteDeadlineContainer,getNoteTagsContainer,getNoteDescriptionContainer,getTaskListContainer,getPinButton,appendNote}