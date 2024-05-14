import Note from './Note.js'

const NotesKey = 'notes'
function reviveNote(noteJson) {
    return new Note(
        noteJson.id,
        noteJson.title,
        noteJson.description,
        noteJson.color,
        noteJson.createdAt,
        noteJson.notificationDate,
        noteJson.tags,
        noteJson.taskList,
        noteJson.deadline,
        noteJson.isPinned
    )
}
function GetNotesJson() {
    let items = localStorage.getItem(NotesKey)
    return items === null ? [] : JSON.parse(items)
}
function CommitNotes(notes) {
    let strigify = JSON.stringify(notes)
    localStorage.setItem(NotesKey, strigify)
}
export default class NotesAggregate {
    constructor() {
        this.notes = []
        this.#initNotes();
    }
    #initNotes() {
        let notes = GetNotesJson()
        if (notes) {
            this.notes = notes
        }
    }
    add(note) {
        this.notes.push(note)
        CommitNotes(this.notes)
    }
    remove(note) {
        let index = this.notes.indexOf(note)
        this.notes.splice(index, 1)
    }
    getNoteById(noteId) {
        var note = this.notes.find(note => {
            return note.id == noteId
        })
        return note
    }
    getLastId() {
        if(this.notes.length ===0){
            return 0;
        }else{
            const idArray = this.notes.map(note => {
                return note.id;
            })

            return Math.max(idArray)
        }
    }
    getNotPinned() {
        if (this.notes.length === 0)
            return []

        var result = this.notes.filter(note=>{
            return !note.isPinned
        })

        return result
    }
    getPinned() {
        if (this.notes.length === 0)
            return []

        let notes = Array.from(this.notes).filter(note => {
            return note.isPinned
        })
        return notes
    }
    getAllNotes() {
        return this.notes
    }
    commitNotes(){
        CommitNotes(this.notes)
    }
}