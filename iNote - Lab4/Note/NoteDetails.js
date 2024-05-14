import { createNoteDetailsTaskHtml, createTagHtml, getDateFormat } from "../UI/UIFactory.js"

export default class NoteDetails{
    constructor(){

    }
    appendNote(note){
        const main = document.querySelector('#note-details')
        main.setAttribute('data-note-id',note.id)
        const title = document.querySelector('#note-details-note-title')
        const deadline = document.querySelector('#note-details-note-deadline')
        const noteTags = document.querySelector('#note-details-tag-list')
        const description = document.querySelector('#note-details-note-description')
        const taskList = document.querySelector('#note-details-taks-list') 
        const pinnedButton = document.querySelector('#note-details-pin-button')

        title.innerHTML = ''
        title.innerHTML = note.title;

        deadline.innerHTML = ''
        deadline.innerHTML = getDateFormat(note.deadline)

        noteTags.innerHTML = ''
        noteTags.classList.remove('empty')
        noteTags.style.marginLeft = '0rem'
        while(noteTags.firstChild){
            noteTags.removeChild(noteTags.firstChild)
        }
        note.tags.forEach(tag => {
            noteTags.appendChild(createTagHtml(tag)) 
        });
        if(note.tags.length === 0){
            noteTags.innerHTML = 'No tags.'
            noteTags.classList.add('empty')
            noteTags.style.marginLeft = '.5rem'
        }


        taskList.innerHTML = ''
        taskList.classList.remove('empty')
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild)
        }
        note.taskList.forEach(task => {
            taskList.appendChild(createNoteDetailsTaskHtml(task))
        });
        if(note.taskList.length === 0){
            taskList.innerHTML = 'Task list is empty.'
            taskList.classList.add('empty')
        }


        description.classList.remove('empty')
        description.innerHTML = ''
        description.innerHTML = note.description
        if(note.description === ''){
            description.innerHTML = 'Description is empty.'
            description.classList.add('empty')
        }

        if(note.isPinned){
            pinnedButton.classList.add('active')
        }else{
            pinnedButton.classList.remove('active')
        }
    }
}