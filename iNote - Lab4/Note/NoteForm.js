import Task from "./Task.js"
import Note from "../Note/Note.js"

export default class NoteForm {
    constructor() {
        this.main = document.querySelector('#note-form')
        this.noteTitleErrorMessage = document.querySelector('#note-title-error-message')
        this.deadlineDateErrorMessage = document.querySelector("#deadline-error-message")
        this.reminderErrorMessage = document.querySelector('#reminder-error-message')
    }
    openForm() {
        if (!this.main.classList.contains('active')) {
            this.main.classList.add('active')
        }
    }
    closeForm() {
        this.main.classList.remove('active')
        this.clear();
    }
    getTasks() {
        const taskList = document.querySelector('#task-list')
        let tasks = []
        let tasksHtml = taskList.querySelectorAll('.task')

        if (tasksHtml === null)
            return tasks;



        tasksHtml.forEach(taskHtml => {
            let content = taskHtml.querySelector('p').innerHTML
            let task = new Task(content, false)
            tasks.push(task)
        });

        return tasks;
    }
    appendTask(taskHtml){
        const taskList = document.querySelector('#task-list')
        taskList.appendChild(taskHtml)
    }
    getTags() {
        const tagList = document.querySelector('#tags')
        let tagsHtml = tagList.querySelectorAll('.tag.active span')

        console.log(tagsHtml)

        let tags = Array.from(tagsHtml).map(tag => {
            return tag.innerHTML
        })
        return tags
    }
    getDeadlineState() {
        const deadlineStateCheckbox = document.querySelector('#note-deadline-state')
        return deadlineStateCheckbox.checked
    }
    getDeadlineValue() {
        const deadlineDateInput = document.querySelector('#note-deadline-date')
        return deadlineDateInput.value
    }
    getDeadlineDate() {
        const deadlineDateInput = document.querySelector('#note-deadline-date')
        let isActive = this.getDeadlineState();
        if (isActive) {
            return new Date(deadlineDateInput.value);
        } else {
            return null
        }
    }
    getReminderState() {
        const reminderDateState = document.querySelector('#note-reminder-state')
        return reminderDateState.checked
    }
    getReminderDateValue() {
        const reminderDateInput = document.querySelector('#reminder-date')
        return reminderDateInput.value
    }
    getReminderDate() {
        const reminderDateInput = document.querySelector('#reminder-date')
        let isActive = this.getReminderState();

        if (isActive) {
            return new Date(reminderDateInput.value)
        } else {
            return null
        }
    }
    getIsPinned() {
        const isPinned = document.querySelector('#note-pin-state')
        let isActive = isPinned.checked
        return isActive;
    }
    getColor() {
        const colorInput = document.querySelector('#note-color')
        return colorInput.value;
    }
    getDescription() {
        const taskDescriptionInput = document.querySelector('#note-description')
        return taskDescriptionInput.value
    }
    getTitle() {
        const noteTitleInput = document.querySelector('#note-title')
        return noteTitleInput.value;
    }
    getTaskDescription(){
        const taskDescriptionInput = document.querySelector('#task-description')
        return taskDescriptionInput.value
    }
    composeNote(noteAggregate) {
        var id = noteAggregate.getLastId() + 1;
        var createdAt = new Date();
        var title = this.getTitle()
        var description = this.getDescription()
        var color = this.getColor()
        var notificationDate = this.getReminderDate()
        var tags = this.getTags()
        var taskList = this.getTasks()
        var deadline = this.getDeadlineDate()
        var isPinned = this.getIsPinned()
        
        const note = new Note(id,title,description,color,createdAt,notificationDate,tags,taskList,deadline,isPinned)
        return note;
    }
    saveNote(noteFacade, note) {
        noteFacade.addNote(note)
    }
    clearTaskDescription(){
        const taskDescriptionInput = document.querySelector('#task-description')
        taskDescriptionInput.value = ''

    }
    clear() {
        const noteTitleInput = document.querySelector('#note-title')
        const descriptionInput = document.querySelector('#note-description')
        const taskDescriptionInput = document.querySelector('#task-description')
        const taskList = document.querySelector('#task-list')

        // Clear note title
        noteTitleInput.value = ''
        // Clear note description
        descriptionInput.value = ''
        // Clear taks description input
        taskDescriptionInput.value = ''
        // Clear task list
        while (taskList.firstChild){
            taskList.removeChild(taskList.firstChild)
        }
        
        // Uncheck active checkboxes
        let checkboxes = this.main.querySelectorAll('.checkbox.active')
        checkboxes.forEach(checkbox => {
            let input = checkbox.querySelector('input[type="checkbox"]')
            input.checked = false
            checkbox.classList.remove('active')
        });
    }
}