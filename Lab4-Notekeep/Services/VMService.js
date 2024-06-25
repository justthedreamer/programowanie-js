import * as NoteForm from "../Note/NoteForm.js";
import UIFactory from "../UI/UIFactory.js";
import Validation from '../Validation/Validation.js';
import NoteDetails from "../Note/NoteDetails.js";
import TagAggregate from "../Tag/TagAggregate.js";
import TagForm from '../Tag/TagForm.js'
import Tag from '../Tag/Tag.js'
import HomePage from "../UI/HomePage.js";
import Common from "../Utilities/Common.js";

export default class VMService {
    constructor(noteAggregate, notificator) {
        this.noteAggregate = noteAggregate
        this.notificator = notificator
        this.tagAggregate = new TagAggregate()

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

    /*Cleans notes containers and append existing notes from notes aggregate.
    *  */
    #notesInitialize() {
        let notes = this.noteAggregate.getAllNotes();

        const otherNotesListContainer = HomePage.getOtherNotesListContainer()

        Common.removeChild(otherNotesListContainer)

        const pinnedNotes = HomePage.getPinnedNotesListContainer()

        Common.removeChild(pinnedNotes)

        notes.forEach(note => {
            this.appendNote(note)
        })
    }

    // Appends existing tags into tag form.
    #tagsInitialize() {
        const tagFormListContainer = TagForm.getTagListContainer()
        const tags = this.tagAggregate.getTags()

        const tagsHtml = tags.map(tag => {
            return UIFactory.createTagForTagManagerHtml(tag, this)
        })

        if (tagsHtml) {
            tagsHtml.forEach(tagHtml => {
                tagFormListContainer.appendChild(tagHtml)
            })
        }
    }

    // Provides functionality for checkboxes (css class).
    #checkboxesFunctionality() {
        const checkboxes = HomePage.getAllCheckboxes()

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

    // Provides note form functionality
    #noteFormFunctionality() {
        // Picking color changes main container background color.
        const colorInput = NoteForm.getColorInput()
        colorInput.addEventListener('change', (e) => {
            const main = NoteForm.getMainContainer()
            main.style.backgroundColor = e.target.value
        })

        // Take note button opens form.
        const takeNoteButton = NoteForm.getTakeNoteButton()
        takeNoteButton.addEventListener('click', () => {
            NoteForm.clear()
            NoteForm.toggleForm()
        })

        // Save note form button
        const saveNoteButton = NoteForm.getSaveNoteButton()
        saveNoteButton.addEventListener('click', () => {
            let validate = Validation.validateNoteForm(NoteForm)
            if (validate) {
                let note = NoteForm.composeNote(this.noteAggregate, this.tagAggregate)
                this.noteAggregate.add(note)
                this.noteAggregate.commitNotes()
                this.appendNote(note)
                this.updateNotifications()
                this.updateNotificationCounter()
                NoteForm.toggleForm()
                NoteForm.clear()
            }
        })

        // Cancel form button.
        const cancelButton = NoteForm.getCancelButton()
        cancelButton.addEventListener('click', () => {
            NoteForm.toggleForm()
            NoteForm.clear()
        })


        // Clear note form button.
        const clearNoteFormButton = NoteForm.getClearNoteFormButton()
        clearNoteFormButton.addEventListener('click', () => NoteForm.clear())

        // Add task to list in note form button.
        const addTaskButton = NoteForm.getAddTaskButton()
        addTaskButton.addEventListener('click', () => {
            let taskDescription = NoteForm.getTaskDescription()
            let validate = Validation.validateTaskDescription(taskDescription)
            if (validate) {
                let task = UIFactory.createTaskFormHtml(taskDescription)
                NoteForm.appendTask(task)
                NoteForm.clearTaskDescription()
            }
        })

        // Task description input from note form.
        const taskDescriptionInput = NoteForm.getTaskDescriptionInput()
        // Add task to list on click 'Enter'.
        taskDescriptionInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                let taskDescription = NoteForm.getTaskDescription()
                let validate = Validation.validateTaskDescription(taskDescription)
                if (validate) {
                    let task = UIFactory.createTaskFormHtml(taskDescription)
                    NoteForm.appendTask(task)
                    NoteForm.clearTaskDescription()
                }
            }
        })

        // Update tagsList
        this.updateNoteFormTagList()
    }

    // Provides notify ring functionality
    #notifyRingFunctionality() {
        const notifyRing = HomePage.getNotifyRing()
        const notificationList = HomePage.getNotificationListContainer()

        notifyRing.addEventListener('click', () => {
            notificationList.classList.toggle('active')
        })
    }

    // Provides note details functionality
    #noteDetailsFunctionality() {
        const noteDetailsContainer = NoteDetails.getMainContainer()

        function closeDetails() {
            if (noteDetailsContainer.classList.contains('active')) {
                noteDetailsContainer.classList.add('inactive')
                noteDetailsContainer.classList.remove('active')
                setTimeout(() => {
                    noteDetailsContainer.classList.remove('inactive')
                }, 900)
            }
        }

        // Closing details
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
            this.pushSuccessfulMessage('Note removed successfully!')
            closeDetails()
            this.#notesInitialize()
        })

        // Save button
        const saveButton = document.querySelector('#note-details-save-button')
        saveButton.addEventListener('click', () => {
            const pinButton = document.querySelector('#note-details-pin-button')
            const noteId = document.querySelector('#note-details').getAttribute('data-note-id')
            const note = this.noteAggregate.getNoteById(noteId)
            note.isPinned = pinButton.classList.contains('active');
            this.noteAggregate.commitNotes();
            closeDetails()
            this.pushSuccessfulMessage('Note updated successfully!')
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
        const searchByPinnedOption = document.getElementById("pinned-notes-search-option");

        searchPinnedBarInput.addEventListener('keyup', (e) => {
            const pinnedNotes = document.querySelector('#pinned .notes')

            const value = e.target.value
            const searchBy = searchByPinnedOption.options[searchByPinnedOption.selectedIndex].value;

            const result = this.searchNotes(value, searchBy, "pinned");

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
        const searchByAllOption = document.getElementById("all-notes-search-option");
        searchAllBarInput.addEventListener('keyup', (e) => {
            const allNotes = document.querySelector('#all-notes .notes')
            const value = e.target.value
            const searchBy = searchByAllOption.options[searchByAllOption.selectedIndex].value;
            const result = this.searchNotes(value, searchBy, "all");

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
                const checkbox = tag.querySelector('input[type="checkbox"]');
                const checkboxValue = checkbox.checked;

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
            TagForm.clear()
        })
    }

    #tagsFormFunctionality() {
        // Add button
        const addButton = TagForm.getAddButton()

        addButton.addEventListener('click', () => {
            const tagName = TagForm.getTagName();
            if (tagName === '') {
                this.pushUnsuccessfulMessage('Tag name cannot be empty.')
                return;
            }
            const tagColor = TagForm.getTagColor();

            const tag = new Tag(tagName, tagColor);

            if (!tag) {
                this.pushUnsuccessfulMessage('Something went wrong.')
                return
            }

            const result = this.tagAggregate.add(tag);
            if (result.state) {
                this.pushSuccessfulMessage(result.message)
                TagForm.clear()
                this.updateTags()
            } else {
                this.pushUnsuccessfulMessage(result.message)
            }
        })
    }

    appendNote(note) {
        const pinnedNotes = HomePage.getPinnedNotesListContainer()
        const allNotes = HomePage.getOtherNotesListContainer()

        const noteHtml = UIFactory.createNoteHtml(note, this)
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
                return UIFactory.createNoteHtml(note, this)
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
                return UIFactory.createNoteHtml(note, this)
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

        if (notifications.length > 0) {
            notificationCounter.classList.add('active')
            notificationCounterValue.innerHTML = ''
            notificationBell.classList.add('active')
            setTimeout(() => {
                notificationBell.classList.remove('active')
            }, 1500)

            notificationCounterValue.innerHTML = `${notifications.length}`
        } else {
            notificationCounter.classList.remove('active')
        }
    }

    updateNotifications() {
        const notificationList = document.querySelector('#notification-list')
        const notes = this.notificator.getNotesToNotify()
        const notifications = notes.map(note => {
            return UIFactory.createNotificationHtml(note, this.noteAggregate, this.notificator, this);
        })

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
            notificationList.appendChild(UIFactory.createNotificationEmptyMessageHtml())
        }
    }

    updateTagFormList() {
        const tagList = TagForm.getTagListContainer()
        const tags = this.tagAggregate.getTags()

        if (!tags) {
            console.log('No tags.')
            return
        }

        const tagsHtml = tags.map(tag => {
            return UIFactory.createTagForTagManagerHtml(tag, this)
        })

        while (tagList.firstChild) {
            tagList.removeChild(tagList.firstChild)
        }

        tagsHtml.forEach(tagHtml => {
            tagList.appendChild(tagHtml)
        })
    }

    updateNoteFormTagList() {
        const tagList = NoteForm.getTagListContainer()
        const tags = this.tagAggregate.getTags()

        if (!tags || !tagList) {
            return;
        }

        while (tagList.firstChild) {
            tagList.removeChild(tagList.firstChild)
        }

        const tagsHtml = tags.map(tag => {
            return UIFactory.createTagForNoteFormHtml(tag)
        })

        tagsHtml.forEach(tagHtml => {
            tagList.appendChild(tagHtml)
        })

        this.#noteFormTagsFunctionality();
    }

    updateTags() {
        this.updateTagFormList()
        this.updateNoteFormTagList()
    }

    deleteTag(tag) {
        const confirmation = confirm(`Are you sure to delete ${tag.name} tag?`);
        if (confirmation) {
            this.tagAggregate.remove(tag)
            this.updateTags()
        }
    }

    showNoteDetails(note) {
        const container = document.querySelector('#note-details')
        container.style.backgroundColor = note.color;
        NoteDetails.appendNote(note)
        container.classList.add('active')
    }

    searchNotes(value, searchBy, category) {
        let result;
        let notes = [];
        value = value.toLowerCase()

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
                return notes.filter(note => {
                    return note.title.toLowerCase().includes(value)
                });
            }
            case "tag": {
                result = notes.filter(note => {
                    return note.tags.some(tag => tag.name.includes(value))
                })
                return result;
            }
            case "description": {
                result = notes.filter(note => {
                    return note.description.toLowerCase().includes(value)
                });

                return result;
            }
            default: {
                break;
            }
        }
    }

    pushSuccessfulMessage(message) {
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

    pushUnsuccessfulMessage(message) {
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
        return confirm(message);
    }

}