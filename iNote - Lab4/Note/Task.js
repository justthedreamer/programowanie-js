export default class Task{
    constructor(description,isDone = false){
        this.description = description;
        this.isDone = isDone;
    }
}