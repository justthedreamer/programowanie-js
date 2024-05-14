import NoteForm from "../Note/NoteForm.js";
import { isOlder } from "../Utilities/DateService.js";

const currentDate = new Date();

function ValidateNoteFormDeadline(noteForm){
    const deadlineState = noteForm.getDeadlineState()
    const deadlineDateValue = noteForm.getDeadlineValue()
    const deadlineDateErrorMessage = noteForm.deadlineDateErrorMessage
    
    function clearErrorMessage(){
        if (deadlineDateErrorMessage.classList.contains('active')) {
            deadlineDateErrorMessage.innerHTML = ''
            deadlineDateErrorMessage.classList.remove('active')
        }
    }

    if (deadlineState) {
        if (deadlineDateValue === '') {
            deadlineDateErrorMessage.innerHTML = ''
            deadlineDateErrorMessage.innerHTML = 'Date cannot be empty.'
            if (!deadlineDateErrorMessage.classList.contains('active')) {
                deadlineDateErrorMessage.classList.add('active')
            }
            return false;
        }

        const deadlineDate = noteForm.getDeadlineDate()

        if (isOlder(deadlineDate)) {
            deadlineDateErrorMessage.innerHTML = ''
            deadlineDateErrorMessage.innerHTML = 'Date should be located in future.'
            if (!deadlineDateErrorMessage.classList.contains('active')) {
                deadlineDateErrorMessage.classList.add('active')
            }
            return false;
        }
    }

    clearErrorMessage();
    return true;
}
function ValidateNoteFormReminder(noteForm){
    const reminderState = noteForm.getReminderState()
    const reminderDateValue = noteForm.getReminderDateValue()
    const reminderDate = noteForm.getReminderDate()
    const reminderErrorMessage = noteForm.reminderErrorMessage
    const deadlineState = noteForm.getDeadlineState()
    const deadlineDate = noteForm.getDeadlineDate()

    function clearErrorMessage(){
        if (reminderErrorMessage.classList.contains('active')) {
            reminderErrorMessage.innerHTML = ''
            reminderErrorMessage.classList.remove('active')
    }
    }

    if(reminderState){
        if (!deadlineState) {
            reminderErrorMessage.innerHTML = ''
            reminderErrorMessage.innerHTML = 'Reminder could be enabled only with the set deadline.'
            if (!reminderErrorMessage.classList.contains('active')) {
                reminderErrorMessage.classList.add('active')
            }
            return false;
        }
        
        if(reminderDateValue === ''){
            reminderErrorMessage.innerHTML = ''
            reminderErrorMessage.innerHTML = 'Reminder date should be set between current date and deadline.'
            if (!reminderErrorMessage.classList.contains('active')) {
                reminderErrorMessage.classList.add('active')
            }
            return false;
        }

        if(isOlder(reminderDate) || reminderDate > deadlineDate){
            reminderErrorMessage.innerHTML = ''
            reminderErrorMessage.innerHTML = 'Reminder date should be set between current date and deadline.'
            if (!reminderErrorMessage.classList.contains('active')) {
                reminderErrorMessage.classList.add('active')
            }
            return false;
        }
    }

    clearErrorMessage()
    return true;
}
function ValidateNoteTitle(noteForm){
    let noteTitle = noteForm.getTitle()
    let noteTitleErrorMessage = noteForm.noteTitleErrorMessage
    let trimmed = noteTitle.trim();

    if(trimmed === ''){
        noteTitleErrorMessage.innerHTML = ''
        noteTitleErrorMessage.innerHTML = 'Note title cannot be empty.'
        noteTitleErrorMessage.classList.add('active')
        return false;
    }
    noteTitleErrorMessage.classList.remove('active')
    noteTitleErrorMessage.innerHTML = ''
    return true;
}
export function validateTaskDescription(taskDescription){
    let description = taskDescription.trim()
    if(description === ''){
        return false
    }
    return true;
}
export function validateNoteForm(noteForm){
    let deadline = ValidateNoteFormDeadline(noteForm)
    let reminder = ValidateNoteFormReminder(noteForm)
    let title = ValidateNoteTitle(noteForm)

    return (deadline && reminder && title)
}