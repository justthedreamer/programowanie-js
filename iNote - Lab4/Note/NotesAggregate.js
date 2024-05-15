const NotesKey = 'notes'
function GetNotesJson() {
    const items = localStorage.getItem(NotesKey)
    return items === null ? [] : JSON.parse(items)
}
function CommitNotes(notes) {
    const stringify = JSON.stringify(notes)
    localStorage.setItem(NotesKey, stringify)
}
export default class NotesAggregate {
    constructor() {
        this.notes = []
        this.#initNotes();
    }
    #initNotes() {
        const notes = GetNotesJson()
        if (notes) {
            this.notes = notes
        }
    }
    add(note) {
        this.notes.push(note)
        CommitNotes(this.notes)
    }
    remove(note) {
        const index = this.notes.indexOf(note)
        this.notes.splice(index, 1)
    }
    getNoteById(noteId) {
        return this.notes.find(note => {
            return note.id === parseInt(noteId)
        })
    }
    getLastId() {
        if(this.notes.length === 0){
            return 0;
        }else{
            const idArray = Array.from(this.notes).map(note => {
                return parseInt(note.id);
            })
            return Math.max(...idArray)
        }
    }
    getNotPinned() {
        if (this.notes.length === 0)
            return []

        return this.notes.filter(note => {
            return !note.isPinned
        })
    }
    getPinned() {
        if (this.notes.length === 0)
            return []

        return Array.from(this.notes).filter(note => {
            return note.isPinned
        })
    }
    getAllNotes() {
        return this.notes
    }
    commitNotes(){
        CommitNotes(this.notes)
    }
}