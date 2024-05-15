import NoteForm from "./NoteForm.js";
import { createNoteHtml, createNotificationEmptyMessageHtml, createNotificationHtml, createTagForNoteFormHtml, createTagForTagManagerHtml, createTagHtml, createTaskFormHtml } from "./UIFactory.js"
import { validateNoteForm, validateTaskDescription } from '../Validation/Validation.js';
import NoteDetails from "../Note/NoteDetails.js";
import { TagAggregate } from "../Note/TagAggregate.js";
import TagForm from './TagForm.js'
import Tag from '../Tag/Tag.js'

export default class VMService {
    constructor(noteAggregate, notificator) {
        this.noteAggregate = noteAggregate
        this.notificator = notificator
        this.noteForm = new NoteForm()
        this.noteDetails = new NoteDetails()
        this.tagAggregate = new TagAggregate()
        this.tagForm = new TagForm()

        this.#notesInitialize()
        this.#checkboxesFunctionality()
        this.#noteFormFunctionality()
        this.#notifyRingFunctionality()
        this.#noteDetailsFunctionality()
        this.#searchNotesFunctionality()
        this.#noteFormTagsFunctionality()
        this.#settingsFunctionality()
        this.#tagsInitialize()
        this.#tagsFormFunctionality()
        this.updateNotifications()
        this.updateNotificationCounter()
    }
    #notesInitialize() {
        let notes = this.noteAggregate.getAllNotes();

        const otherNotesSection = document.querySelector('#all-notes .notes')
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
    #tagsInitialize() {
        const tagFormList = document.querySelector('#tag-form-tag-list')
        const tags = this.tagAggregate.getTags()

        const tagsHtml = tags.map(tag => {
            return createTagForTagManagerHtml(tag, this)
        })

        if (tagsHtml) {
            tagsHtml.forEach(tagHtml => {
                tagFormList.appendChild(tagHtml)
            })
        }
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
        // Picking color chenges main container background color.
        const colorInput = this.noteForm.getColorInput()
        colorInput.addEventListener('change',(e)=>{
            const main = this.noteForm.getMainContainer()
            var value = e.target.value
            main.style.backgroundColor = value
        })

        // Take note button opens form.
        const takeNoteButton = this.noteForm.getTakeNoteButton()
        takeNoteButton.addEventListener('click', () => this.noteForm.toggleForm())

        // Save note form button
        const saveNoteButton = this.noteForm.getSaveNoteButton()
        saveNoteButton.addEventListener('click', () => {
            let validate = validateNoteForm(this.noteForm)
            if (validate) {
                let note = this.noteForm.composeNote(this.noteAggregate,this.tagAggregate)
                console.log(note)
                this.noteAggregate.add(note)
                this.noteAggregate.commitNotes()
                this.appendNote(note)
                this.updateNotifications()
                this.updateNotificationCounter()
                this.noteForm.toggleForm()
                this.noteForm.clear()
            }
        })

        // Cancel form button.
        const cancelButton = this.noteForm.getCancelButton()
        cancelButton.addEventListener('click', () => this.noteForm.toggleForm())

        // Clear note form button.
        const clearNoteFormButton = this.noteForm.getClearNoteFormButton()
        clearNoteFormButton.addEventListener('click', () => this.noteForm.clear())

        // Add task to list in note form button.
        const addTaskButton = this.noteForm.getAddTaskButton()
        addTaskButton.addEventListener('click', () => {
            let taskDescription = this.noteForm.getTaskDescription()
            let validate = validateTaskDescription(taskDescription)
            if (validate) {
                let task = createTaskFormHtml(taskDescription)
                this.noteForm.appendTask(task)
                this.noteForm.clearTaskDescription()
            }
        })

        // Task description input from note form.
        const taskDescriptionInput = this.noteForm.getTaskDescriptionInput()
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

        // Update tagsList
        this.updateNoteFormTagList()
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
            if (!confirmation) {
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
            if (pinButton.classList.contains('active')) {
                note.isPinned = true
            } else {
                note.isPinned = false
            }
            this.noteAggregate.commitNotes();
            closeDetails()
            this.pushSucessfullMessage('Note updated successfully!')
            this.#notesInitialize()
        })

        // Pin button
        const pinButton = document.querySelector('#note-details-pin-button')
        pinButton.addEventListener('click', () => {
            if (pinButton.classList.contains('active')) {
                pinButton.classList.remove('active')
            } else {
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
    #noteFormTagsFunctionality() {
        const main = document.querySelector("#tags")
        const tags = main.querySelectorAll('.tag.checkbox')

        tags.forEach(tag => {
            tag.addEventListener('click', () => {
                var checkbox = tag.querySelector('input[type="checkbox"]')
                var checkboxValue = checkbox.checked

                if (checkboxValue) {
                    tag.classList.remove('active')
                    checkbox.checked = false
                } else {
                    tag.classList.add('active')
                    checkbox.checked = true
                }
            })
        })

    }
    #settingsFunctionality() {
        const settingsButton = document.querySelector('#settings-button')
        const settings = document.querySelector('#settings')
        // Settings button click listener
        settingsButton.addEventListener('click', () => {
           settings.classList.toggle('active')
           settingsButton.classList.toggle('active')
           this.tagForm.clear()
        })
    }
    #tagsFormFunctionality() {
        // Add button
        const addButton = this.tagForm.getAddButton()

        addButton.addEventListener('click', () => {
            var tagName = this.tagForm.getTagName()
            if (tagName === '') {
                this.pushUnsuccesfullMessage('Tag name cannot be empty.')
                return;
            }
            var tagColor = this.tagForm.getTagColor()

            var tag = new Tag(tagName, tagColor)

            if (!tag) {
                this.pushUnsuccesfullMessage('Something went wrong.')
                return
            }

            var result = this.tagAggregate.add(tag)
            if(result.state){
                this.pushSucessfullMessage(result.message)
                this.tagForm.clear()
                this.updateTags()
            }else{
                this.pushUnsuccesfullMessage(result.message)
            }
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
    updateTagFormList() {
        const tagList = this.tagForm.getTagListContainer()
        const tags = this.tagAggregate.getTags()

        if (!tags) {
            console.log('No tags.')
            return
        }

        const tagsHtml = tags.map(tag => {
            return createTagForTagManagerHtml(tag, this)
        })

        while (tagList.firstChild) {
            tagList.removeChild(tagList.firstChild)
        }

        tagsHtml.forEach(tagHtml => {
            tagList.appendChild(tagHtml)
        })

    }
    updateNoteFormTagList() {
        const tagList = this.noteForm.getTagListContainer()
        const tags = this.tagAggregate.getTags()

        if (!tags || !tagList) {
            return;
        }

        while (tagList.firstChild) {
            tagList.removeChild(tagList.firstChild)
        }

        const tagsHtml = tags.map(tag => {
            return createTagForNoteFormHtml(tag)
        })

        tagsHtml.forEach(tagHtml=>{
            tagList.appendChild(tagHtml)
        })

    }
    updateTags(){
        this.updateTagFormList()
        this.updateNoteFormTagList()
    }
    deleteTag(tag) {
        var confirmation = confirm(`Are you sure to delete ${tag.name} tag?`)
        if (confirmation) {
            this.tagAggregate.remove(tag)
            this.updateTags()
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
        alert.style.backgroundColor = '#54F996'
        const alertIcon = document.querySelector('#alert-icon')
        const alertMessage = document.querySelector('#alert-message')

        alertIcon.innerHTML = ''
        alertIcon.innerHTML = '&check;'

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
        alert.style.backgroundColor = '#F9545E'
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
    userConfirmation(message) {
        var response = confirm(message)
        return response;
    }
   
}