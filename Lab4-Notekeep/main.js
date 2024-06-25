import NotesAggregate from './Note/NotesAggregate.js';
import Notificator from './Notificator/Notificator.js';
import VMService from './Services/VMService.js';

const notesAggregate = new NotesAggregate()
const notificator = new Notificator(notesAggregate)
const vmService = new VMService(notesAggregate,notificator)