import {isFuture} from '../Utilities/DateService.js'

export default class Notificator{
    constructor(notesAggregate)
    {
        this.notesAggregate = notesAggregate
    }
    shouldNotify(note){
        if(note.hasBeenNotified)
            return false;

        if(note.notificationDate === null)
            return false;

        return !isFuture(note.notificationDate);
    }
    getNotesToNotify() {
        const notes = this.notesAggregate.getAllNotes()
        return notes.filter(note => this.shouldNotify(note)) 
    }
}