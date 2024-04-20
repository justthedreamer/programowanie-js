class Task{
    constructor(content,isDone = false){
        this.content = content;
        this.isDone = isDone;
    }
}
class Note{
    constructor(id,title,content,color,createdAt,notificationDate = null,tags = [],taskList = [],deadline = null,isPinned = false){
        this.id = id;
        this.title = title;
        this.content = content;
        this.color = color;
        this.createdAt = createdAt;
        this.notificationDate = notificationDate;
        this.tags = tags;
        this.taskList = tasksList;
        this.deadline = deadline;
        this.isPinned = isPinned;
        this.completedTasks = []
        this.hasBeenNotified = false;
    }
    togglePin(){
        this.isPinned = !this.isPinned;
    }
    completeTask(task){
        task.isDone = true;
        this.completedTasks.push(task)
    }
    shouldNotify(){
        if(this.notificationDate == null)
        return false;

        let isNowOrLate = this.notificationDate === Date.now() || this.notificationDate <= Date.now();

        if(isNowOrLate && !this.hasBeenNotified)
        {
            return true;
        }else{
            return false;
        }
    }
}
const notificatorState = {
    On : true,
    Of: false,
}
class Notificator{
    constructor(state = notificatorState.On,notes = [])
    {
        this.notes = notes;
        this.state = state;
        this.#notificator();
    }
    addNote(note){
        this.notes.push(note)
    }
    removeNote(note){
        let index = this.notes.indexOf(note);
        this.notes.slice(index,1);
    }
    #notificator(){
        let delay = 10_000;
        setInterval(()=>{
            if(this.notes.length === 0 )
            {
                return;
            }
            this.notes.forEach(note =>{
                if(note.shouldNotify())
                {
                    this.#notify(note);
                }else{
                    this.#removeOldNote(note);
                }
            })

        },delay)
    }
    #notify(note){
        if(this.state){
            let content = `Notification: Check out your note : ${note.title}.`
            console.log(content)
        }
    }
    #removeOldNote(note){
        let index = this.notes.indexOf(note);
        this.notes.slice(index,1);
    }
}

class Facade{
    constructor(notes = []){
        this.notes = notes;
        this.notificator = new Notificator(this.notes)
    }
    addNote(note){
        this.notes.push(note)
        this.notificator.addNote(note)
    }
    removeNote(note){
        let index = this.notes.indexOf(note)
        this.notes.slice(index,1)
        this.notificator.removeNote(note);   
    }
    turnOnNotifications(){
        this.notificator.state = notificatorState.On;
    }
    turnOffNotifications(){
        this.notificator.state = notificatorState.Of;
    }
    search(){

    }
}