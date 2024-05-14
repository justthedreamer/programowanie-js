import { isToday,isTommorow,isFuture } from "../Utilities/DateService.js"


export default class Note{
    constructor(id,title,description,color,createdAt,notificationDate = null,tags = [],taskList = [],deadline = null,isPinned = false){
        this.id = id;
        this.title = title;
        this.description = description;
        this.color = color;
        this.createdAt = createdAt;
        this.notificationDate = notificationDate;
        this.tags = tags;
        this.taskList = taskList;
        this.deadline = deadline;
        this.isPinned = isPinned;
        this.completedTasks = []
        this.hasBeenNotified = false;
    }
}