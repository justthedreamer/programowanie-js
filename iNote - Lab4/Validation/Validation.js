import { isOlder } from "../Utilities/DateService.js";
import * as NoteForm from '../Note/NoteForm.js'

function ValidateNoteFormDeadline(){
    const deadlineState = NoteForm.getDeadlineState()
    const deadlineDateValue = NoteForm.getDeadlineValue()
    const deadlineDateErrorMessage = NoteForm.getDeadlineDateErrorMessage()

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

        const deadlineDate = NoteForm.getDeadlineDate()

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
function ValidateNoteFormReminder(){
    const reminderState = NoteForm.getReminderState()
    const reminderDateValue = NoteForm.getReminderDateValue()
    const reminderDate = NoteForm.getReminderDate()
    const reminderErrorMessage = NoteForm.getReminderErrorMessage()
    const deadlineState = NoteForm.getDeadlineState()
    const deadlineDate = NoteForm.getDeadlineDate()

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
function ValidateNoteTitle(){
    const noteTitle = NoteForm.getTitle()
    const noteTitleErrorMessage = NoteForm.getNoteTitleErrorMessage()
    const trimmed = noteTitle.trim();

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
function validateTaskDescription(taskDescription){
    const description = taskDescription.trim()
    return description !== '';
}
function validateNoteForm(NoteForm){
    const deadline = ValidateNoteFormDeadline(NoteForm)
    const reminder = ValidateNoteFormReminder(NoteForm)
    const title = ValidateNoteTitle(NoteForm)

    return (deadline && reminder && title)
}
export default {validateTaskDescription,validateNoteForm,ValidateNoteTitle}