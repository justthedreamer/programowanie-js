import Task from "../Task/Task.js"
import Note from "./Note.js"

export function getMainContainer() {
    return document.querySelector('#note-form')
}

export function getColorInput() {
    return document.querySelector('#note-color')
}

export function getTakeNoteButton() {
    return document.querySelector('#take-note')
}

export function getSaveNoteButton() {
    return document.querySelector('#save')
}

export function getCancelButton() {
    return document.querySelector('#cancel')
}

export function getClearNoteFormButton() {
    return document.querySelector('#clear')
}

export function getAddTaskButton() {
    return document.querySelector('#add-task')
}

export function getTaskDescriptionInput() {
    return document.querySelector('#task-description')
}

export function getNoteTitleErrorMessage() {
    return document.querySelector('#note-title-error-message')
}

export function getDeadlineDateErrorMessage() {
    return document.querySelector("#deadline-error-message")
}

export function getReminderErrorMessage() {
    return document.querySelector('#reminder-error-message')
}

export function toggleForm() {
    const mainContainer = getMainContainer() 
    mainContainer.classList.toggle('active')
}

export function getTasks() {
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

export function appendTask(taskHtml) {
    const taskList = document.querySelector('#task-list')
    taskList.appendChild(taskHtml)
}

export function getTagListContainer() {
    return document.querySelector('#tags');
}

export function getTags(tagAggregate) {
    const tagList = document.querySelector('#tags')
    const tagsHtml = tagList.querySelectorAll('.tag.checkbox.active span')

    const tagsValues = Array.from(tagsHtml).map(tag => {
        return tag.innerHTML
    });

    return tagsValues.map(tagValue => {
        return tagAggregate.getTagByName(tagValue)
    })

}

export function getDeadlineState() {
    const deadlineStateCheckbox = document.querySelector('#note-deadline-state')
    return deadlineStateCheckbox.checked
}

export function getDeadlineValue() {
    const deadlineDateInput = document.querySelector('#note-deadline-date')
    return deadlineDateInput.value
}

export function getDeadlineDate() {
    const deadlineDateInput = document.querySelector('#note-deadline-date')
    const isActive = getDeadlineState();
    if (isActive) {
        return new Date(deadlineDateInput.value);
    } else {
        return null
    }
}

export function getReminderState() {
    const reminderDateState = document.querySelector('#note-reminder-state')
    return reminderDateState.checked
}

export function getReminderDateValue() {
    const reminderDateInput = document.querySelector('#reminder-date')
    return reminderDateInput.value
}

export function getReminderDate() {
    const reminderDateInput = document.querySelector('#reminder-date')
    let isActive = getReminderState();

    if (isActive) {
        return new Date(reminderDateInput.value)
    } else {
        return null
    }
}

export function getIsPinned() {
    const isPinned = document.querySelector('#note-pin-state')
    return isPinned.checked;
}

export function getColor() {
    const colorInput = document.querySelector('#note-color')
    return colorInput.value;
}

export function getDescription() {
    const taskDescriptionInput = document.querySelector('#note-description')
    return taskDescriptionInput.value
}

export function getTitle() {
    const noteTitleInput = document.querySelector('#note-title')
    return noteTitleInput.value;
}

export function getTaskDescription() {
    const taskDescriptionInput = document.querySelector('#task-description')
    return taskDescriptionInput.value
}

export function composeNote(noteAggregate, tagAggregate) {
    const id = noteAggregate.getLastId() + 1;
    const createdAt = new Date();
    const title = getTitle()
    const description = getDescription()
    const color = getColor()
    const notificationDate = getReminderDate()
    const tags = getTags(tagAggregate)
    const taskList = getTasks()
    const deadline = getDeadlineDate()
    const isPinned = getIsPinned()

    return new Note(id, title, description, color, createdAt, notificationDate, tags, taskList, deadline, isPinned);
}

export function clearTaskDescription() {
    const taskDescriptionInput = document.querySelector('#task-description')
    taskDescriptionInput.value = ''

}

export function clear() {
    const noteTitleInput = document.querySelector('#note-title')
    const descriptionInput = document.querySelector('#note-description')
    const taskDescriptionInput = document.querySelector('#task-description')
    const taskList = document.querySelector('#task-list')
    const deadlineErrorMessage = getDeadlineDateErrorMessage()
    const reminderErrorMessage = getReminderErrorMessage()
    const noteTitleErrorMessage = getNoteTitleErrorMessage()

    // Clear note title
    noteTitleInput.value = ''
    // Clear note description
    descriptionInput.value = ''
    // Clear task description input
    taskDescriptionInput.value = ''
    // Clear task list
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }
    // Clear deadline error message
    deadlineErrorMessage.innerHTML = ''
    // Clear reminder error message
    reminderErrorMessage.innerHTML = ''
    // Clear note title error message
    noteTitleErrorMessage.innerHTML = ''

    // Uncheck active checkboxes
    const main = getMainContainer()
    let checkboxes = main.querySelectorAll('.checkbox.active')
    checkboxes.forEach(checkbox => {
        let input = checkbox.querySelector('input[type="checkbox"]')
        input.checked = false
        checkbox.classList.remove('active')
    });
}
