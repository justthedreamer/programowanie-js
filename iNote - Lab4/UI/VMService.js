import NoteForm from "../Note/NoteForm.js";
import { createNoteHtml, createNotificationEmptyMessageHtml, createNotificationHtml, createTaskFormHtml } from "./UIFactory.js"
import { validateNoteForm, validateTaskDescription } from '../Validation/Validation.js';
import NoteDetails from "../Note/NoteDetails.js";

export default class VMService {
    constructor(noteAggregate, notificator) {
        this.noteAggregate = noteAggregate
        this.notificator = notificator
        this.noteForm = new NoteForm()
        this.noteDetails = new NoteDetails()

        this.#notesInitialize()
        this.#checkboxesFunctionality()
        this.#noteFormFunctionality()
        this.#notifyRingFunctionality()
        this.#noteDetailsFunctionality()
        this.#searchNotesFunctionality()
        this.#noteFormTagsFunctionality()
        this.updateNotifications()
        this.updateNotificationCounter()
    }
    #notesInitialize() {
        let notes = this.noteAggregate.notes;

        const allNotes = document.querySelector('#all-notes .notes')
        while (allNotes.firstChild) {
            allNotes.removeChild(allNotes.firstChild)
        }

        const pinnedNotes = document.querySelector('#pinned .notes')
        while (pinnedNotes.firstChild) {
            pinnedNotes.removeChild(pinnedNotes.firstChild)
        }

        notes.forEach(note => {
            this.appendNote(note)
        })

    }
    #checkboxesFunctionality() {
        const checkboxes = document.querySelectorAll('.container.checkbox')

        function toggleCheckbox(checkbox) {
            checkbox.classList.toggle('active')
        }
        checkboxes.forEach(checkbox => {
            let input = checkbox.querySelector('input[type="checkbox"]')
            let inputDate = checkbox.querySelector('input[type="date"]')

            checkbox.addEventListener('click', (e) => {
                if (e.target !== input && e.target !== inputDate) {
                    input.checked = !input.checked
                    toggleCheckbox(checkbox)
                }
            })

            input.addEventListener('click', () => {
                toggleCheckbox(checkbox)
            })
        });
    }
    #noteFormFunctionality() {

        // Take note button opens form.
        const takeNoteButton = document.querySelector('#take-note')
        takeNoteButton.addEventListener('click', () => this.noteForm.openForm())

        // Save note form button
        const saveNoteButton = document.querySelector('#save')
        saveNoteButton.addEventListener('click', () => {
            let validate = validateNoteForm(this.noteForm)
            if (validate) {
                let note = this.noteForm.composeNote(this.noteAggregate)
                this.noteAggregate.add(note)
                this.noteAggregate.commitNotes()
                this.appendNote(note)
                this.updateNotifications()
                this.updateNotificationCounter()
                this.noteForm.closeForm()
                this.noteForm.clear()
            }
        })

        // Cancel form button.
        const cancelNoteButton = document.querySelector('#cancel')
        cancelNoteButton.addEventListener('click', () => this.noteForm.closeForm())

        // Clear note form button.
        const clearNoteFormButton = document.querySelector('#clear')
        clearNoteFormButton.addEventListener('click', () => this.noteForm.clear())

        // Add task to list in note form button.
        const addTaskButton = document.querySelector('#add-task')
        addTaskButton.addEventListener('click', () => {
            let taskDescription = this.noteForm.getTaskDescription()
            let validate = validateTaskDescription(taskDescription)
            if (validate) {
                let task = createTaskFormHtml(taskDescription)
                this.noteForm.appendTask(task)
                this.noteForm.clearTaskDescription()
            }
        })

        // Task description from note form.
        const taskDescription = document.querySelector('#task-description')
        // Add task to list on click 'Enter'.
        taskDescription.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                let taskDescription = this.noteForm.getTaskDescription()
                let validate = validateTaskDescription(taskDescription)
                if (validate) {
                    let task = createTaskFormHtml(taskDescription)
                    this.noteForm.appendTask(task)
                    this.noteForm.clearTaskDescription()
                }
            }
        })
    }
    #notifyRingFunctionality() {
        const notifyRing = document.querySelector('#notify-ring')
        const notificationList = document.querySelector('#notification-list')

        notifyRing.addEventListener('click', () => {
            notificationList.classList.toggle('active')
        })

    }
    #noteDetailsFunctionality() {
        const main = document.querySelector('#note-details')

        function closeDetails() {
            if (main.classList.contains('active')) {
                main.classList.add('inactive')
                main.classList.remove('active')
                setTimeout(() => {
                    main.classList.remove('inactive')
                }, 900)
            }
        }

        // Closeing details
        const closeButton = document.querySelector('#note-details-close-button')

        closeButton.addEventListener('click', () => closeDetails())
        // Delete note 
        const deleteButton = document.querySelector('#note-details-delete-note-button')
        deleteButton.addEventListener('click', () => {
            const noteId = document.querySelector('#note-details').getAttribute('data-note-id')
            const note = this.noteAggregate.getNoteById(noteId)
            const confirmation = this.userConfirmation('Are you sure to delete this note?')
            if(!confirmation){
                return;
            }
            this.noteAggregate.remove(note)
            this.noteAggregate.commitNotes()
            this.updateNotifications()
            this.updateNotificationCounter()
            this.pushSucessfullMessage('Note removed successfully!')
            closeDetails()
            this.#notesInitialize()
        })

        // Save button
        const saveButton = document.querySelector('#note-details-save-button')
        saveButton.addEventListener('click', () => {
            const pinButton = document.querySelector('#note-details-pin-button')
            const noteId = document.querySelector('#note-details').getAttribute('data-note-id')
            const note = this.noteAggregate.getNoteById(noteId)
            if(pinButton.classList.contains('active')){
                note.isPinned = true
            }else{
                note.isPinned = false
            }
            this.noteAggregate.commitNotes();
            closeDetails()
            this.pushSucessfullMessage('Note updated successfully!')
            this.#notesInitialize()
        })

        // Pin button
        const pinButton = document.querySelector('#note-details-pin-button')
        pinButton.addEventListener('click',()=>{
            if(pinButton.classList.contains('active')){
                pinButton.classList.remove('active')
            }else{
                pinButton.classList.add('active')
            }
        })
    }
    #searchNotesFunctionality() {
        // Pinned notes section
        const searchPinnedBarInput = document.querySelector('#pinned-notes-search-bar')
        var searchByPinnedOption = document.getElementById("pinned-notes-search-option");

        searchPinnedBarInput.addEventListener('keyup', (e) => {
            const pinnedNotes = document.querySelector('#pinned .notes')

            const value = e.target.value
            const searchBy = searchByPinnedOption.options[searchByPinnedOption.selectedIndex].value;

            var result = this.searchNotes(value, searchBy, "pinned")

            if (result) {
                // Clear container
                while (pinnedNotes.firstChild) {
                    pinnedNotes.removeChild(pinnedNotes.firstChild)
                }
                // Append result
                this.updatePinnedNotes(result)
            }

        })

        // Other Notes Section
        const searchAllBarInput = document.querySelector('#all-notes-search-bar')
        var searchByAllOption = document.getElementById("all-notes-search-option");
        searchAllBarInput.addEventListener('keyup', (e) => {
            const allNotes = document.querySelector('#all-notes .notes')
            const value = e.target.value
            const searchBy = searchByAllOption.options[searchByAllOption.selectedIndex].value;
            var result = this.searchNotes(value, searchBy, "all")

            if (result) {
                // Clear container
                while (allNotes.firstChild) {
                    allNotes.removeChild(allNotes.firstChild)
                }
                // Append result
                this.updateOtherNotes(result)

            }
        })
    }
    #noteFormTagsFunctionality(){
        const main = document.querySelector("#tags")
        const tags = main.querySelectorAll('.tag.checkbox')

        tags.forEach(tag => {
            tag.addEventListener('click',()=>{
                var checkbox = tag.querySelector('input[type="checkbox"]')
                var checkboxValue = checkbox.checked

                if(checkboxValue){
                    tag.classList.remove('active')
                    checkbox.checked = false
                }else{
                    tag.classList.add('active')
                    checkbox.checked = true
                }
            })
        })

    }
    appendNote(note) {
        const pinnedNotes = document.querySelector('#pinned .notes')
        const allNotes = document.querySelector('#all-notes .notes')

        const noteHtml = createNoteHtml(note, this)
        const isPinned = note.isPinned
        if (isPinned) {
            pinnedNotes.appendChild(noteHtml)
        } else {
            allNotes.appendChild(noteHtml)
        }
    }
    updatePinnedNotes(notes) {
        const pinnedNotes = document.querySelector('#pinned .notes')

        // Clear container
        while (pinnedNotes.firstChild) {
            pinnedNotes.removeChild(pinnedNotes.firstChild)
        }

        // Create html elements
        const notesHtml = notes.map(note => {
            if (note.isPinned)
                return createNoteHtml(note, this)
        })

        // Append all html elements
        notesHtml.forEach(noteHtml => {
            pinnedNotes.appendChild(noteHtml)
        })
    }
    updateOtherNotes(notes) {
        const otherNotes = document.querySelector('#all-notes .notes')

        // Clear container
        while (otherNotes.firstChild) {
            otherNotes.removeChild(otherNotes.firstChild)
        }

        // Create html elements
        const notesHtml = notes.map(note => {
            if (!note.isPinned)
                return createNoteHtml(note, this)
        })

        // Append all html elements
        notesHtml.forEach(noteHtml => {
            otherNotes.appendChild(noteHtml)
        })
    }
    updateNotificationCounter() {
        const notificationBell = document.querySelector('#notification-bell')
        const notificationCounter = document.querySelector('#notification-counter')
        const notificationCounterValue = document.querySelector('#notification-counter .value')
        const notifications = this.notificator.getNotesToNotify();

        const actualValue = notificationCounterValue.innerHTML

        const notificationsCount = notifications.length;

        if (notifications.length > 0) {
            notificationCounter.classList.add('active')
            notificationCounterValue.innerHTML = ''
            notificationBell.classList.add('active')
            setTimeout(() => {
                notificationBell.classList.remove('active')
            }, 1500)

            notificationCounterValue.innerHTML = notifications.length
        } else {
            notificationCounter.classList.remove('active')
        }
    }
    updateNotifications() {
        const notificationList = document.querySelector('#notification-list')
        const notes = this.notificator.getNotesToNotify()
        const notifications = notes.map(note => createNotificationHtml(note, this.noteAggregate, this.notificator, this))

        // Clear content.
        while (notificationList.firstChild) {
            notificationList.removeChild(notificationList.firstChild)
        }

        // Append all notifications.
        if (notifications.length > 0) {
            notifications.forEach(notification => {
                notificationList.appendChild(notification)
            });
        } else {
            notificationList.appendChild(createNotificationEmptyMessageHtml())
        }
    }
    showNoteDetails(note) {
        const container = document.querySelector('#note-details')
        container.style.backgroundColor = note.color;

        this.noteDetails.appendNote(note)

        container.classList.add('active')
    }
    searchNotes(value, searchBy, category) {
        var notes = []

        switch (category) {
            case "pinned": {
                notes = this.noteAggregate.getPinned();

                if (value === '') {
                    return notes;
                }
                break;
            }
            case "all": {
                notes = this.noteAggregate.getNotPinned();

                if (value === '')
                    return notes;

                break;

            }
        }

        switch (searchBy) {
            case "title": {
                var result = notes.filter(note => {
                    return note.title.includes(value)
                })
                return result;
            }
            case "tag": {
                var result = notes.filter(note => {
                    return note.tags.includes(value)
                })
                return result;
            }
            case "description": {
                var result = notes.filter(note => {
                    return note.description.includes(value)
                })

                return result;
            }
            default: {
                break;
            }
        }
    }
    pushSucessfullMessage(message) {
        const alertAnimationTime = 3000
        const alert = document.querySelector('#alert')
        const alertIcon = document.querySelector('#alert-icon')
        const alertMessage = document.querySelector('#alert-message')

        alertIcon.innerHTML = '&check;'
        alertIcon.innerHTML = '&#10005;'

        alertMessage.innerHTML = ''
        alertMessage.innerHTML = message

        alert.classList.remove('active')
        alert.classList.add('active')
        setTimeout(() => {
            alert.classList.remove('active')
        }, alertAnimationTime)
    }
    pushUnsuccesfullMessage(message) {
        const alertAnimationTime = 3000
        const alert = document.querySelector('#alert')
        const alertIcon = document.querySelector('#alert-icon')
        const alertMessage = document.querySelector('#alert-message')

        alertIcon.innerHTML = ''
        alertIcon.innerHTML = '&#10005;'

        alertMessage.innerHTML = ''
        alertMessage.innerHTML = message

        alert.classList.remove('active')
        alert.classList.add('active')
        setTimeout(() => {
            alert.classList.remove('active')
        }, alertAnimationTime)
    }
    userConfirmation(message){
        var response = confirm(message)
        return response;
    }
}