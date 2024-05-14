import Notificator from '../Notificator/Notificator.js'
import Note from "./Note.js";
import { appendNote } from "../UI/UIController.js";

export default class NotesFacade{
    constructor(aggregate){
        this.aggregate = aggregate;
    }
    createNote(title,description,color,notificationDate = null,tags = [],taskList = [],deadline = null,isPinned = false){
        let id = this.aggregate.getLastId() + 1;
        let createdAt = new Date();

        let note = new Note(id,title,description,color,createdAt,notificationDate,tags,taskList,deadline,isPinned)

        return note;
    }
}