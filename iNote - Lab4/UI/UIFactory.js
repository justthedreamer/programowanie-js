import { clockSVG } from "../svg/Clock.js"
import { binSVG } from '../svg/Bin.js'
import { isToday,isTommorow } from "../Utilities/DateService.js"
import VMService from "./VMService.js"

export function createTaskFormHtml(taskDescription) {
    const main = document.createElement('div')
    main.classList.add('task')
    const content = document.createElement('p')
    content.innerHTML = taskDescription
    const deleteTaskContainer = document.createElement('div')
    deleteTaskContainer.classList.add('delete-task')
    deleteTaskContainer.innerHTML = binSVG();

    deleteTaskContainer.addEventListener('click', () => {
        main.parentNode.removeChild(main)
    })

    main.appendChild(content)
    main.appendChild(deleteTaskContainer)

    return main;
}
export function getDateFormat(date) {

    if (date === null) {
        return date;
    }
    const givenDate = new Date(date)

    const givenDay = givenDate.getDate();
    const givenMonth = givenDate.getMonth() + 1;
    const givenYear = givenDate.getFullYear();

    if(isToday(date))
        return 'Today'

    if(isTommorow(date))
        return 'Tomorrow'
    
    return `${givenDay}/${givenMonth}/${givenYear}`
}
export function createTaskHtml(task) {
    let description = task.description
    let state = task.isDone

    let main = document.createElement('div')
    main.classList.add('task')

    let checkbox = document.createElement('span')
    checkbox.classList.add('checkbox')
    
    if(state){
        checkbox.innerHTML = ''
        checkbox.innerHTML = '&#10004;'
    }else{
        checkbox.innerHTML = ''
        checkbox.innerHTML = '&#10006;'
    }

    let content = document.createElement('span')
    content.innerHTML = description

    main.appendChild(checkbox)
    main.appendChild(content)

    return main;
}
export function createTagHtml(tag) {
    let main = document.createElement('span')
    main.classList.add('tag')
    main.innerHTML = tag
    return main;
}
export function createNoteHtml(note,VMService) {
    let main = document.createElement('div')
    main.classList.add('note')
    main.classList.add('shadow')
    main.style.backgroundColor = note.color

    let id = document.createElement('div')
    id.id = note.id
    id.style.display = 'none'

    let title = document.createElement('h3');
    title.innerHTML = note.title;

    let deadline = document.createElement('div')
    deadline.classList.add('deadline')

    let tags = document.createElement('div')
    tags.classList.add('tags')

    Array.from(note.tags).map(tag => {
        tags.appendChild(createTagHtml(tag))
    })

    let clock = document.createElement('div')
    clock.classList.add('clock')
    clock.innerHTML = clockSVG();

    let deadlineDate = document.createElement('p')
    deadlineDate.innerHTML = getDateFormat(note.deadline)

    deadline.appendChild(clock)
    deadline.appendChild(deadlineDate)


    let description = document.createElement('p')
    description.classList.add('description')
    description.innerHTML = note.description

    let taskList = document.createElement('task-list')
    taskList.classList.add('task-list')

    let tasks = Array.from(note.taskList).map(note => {
        return createTaskHtml(note)
    })

    if (tasks) {
        tasks.forEach(task => {
            taskList.appendChild(task)
        });
    }

    let details = document.createElement('button')
    details.innerHTML = 'Details'
    details.addEventListener('click',()=>{
        VMService.showNoteDetails(note)
    })

    // Append ID
    main.appendChild(id)

    // Append title
    main.appendChild(title)
    
    // Append deadline if its not null
    if (note.deadline !== null)
        main.appendChild(deadline)

    // Append tags if its not empty
    if (note.tags.length !== 0)
        main.appendChild(tags)

    // Append description if its not null
    if (note.description !== '')
        main.appendChild(description)

    // Append task list if its not empty
    if (note.taskList.length !== 0)
        main.appendChild(taskList)

    // Append details button
    main.appendChild(details)

    return main;
}
export function createNotificationHtml(note,noteAggregate,notificator,VMService){

    const main = document.createElement('div')
    main.classList.add('notification')

    function closeNotificationList(){
        var notificationList = main.parentNode
        notificationList.classList.remove('active')
    }

    const info = document.createElement('div')
    info.classList.add('info')

    const infoTitle = document.createElement('h4')
    infoTitle.innerHTML = `${note.title} deadline upcoming.`

    const infoDescription = document.createElement('p')
    infoDescription.innerHTML = `Your note : ${note.title} deadline upcoming.`

    const deadlineDate = document.createElement('span')
    deadlineDate.innerHTML = `Deadline date: ${getDateFormat(note.deadline)}`

    info.appendChild(infoTitle)
    info.appendChild(infoDescription)
    info.appendChild(deadlineDate)

    const actions = document.createElement('div')
    actions.classList.add('actions')

    const show = document.createElement('div')
    show.classList.add('show')
    show.innerHTML = '&#10148;'
    show.addEventListener('click',()=>{
        VMService.showNoteDetails(note)
        closeNotificationList()
    })

    const check = document.createElement('div')
    check.classList.add('check')
    check.innerHTML = '&#10004;'
    check.addEventListener('click',()=>{
        main.classList.add('remove')
        note.hasBeenNotified = true;
        VMService.updateNotificationCounter();
        noteAggregate.commitNotes()
        setTimeout(()=>{
            VMService.updateNotifications();
        },1200)
    })

    actions.appendChild(show)
    actions.appendChild(check)

    main.appendChild(info)
    main.appendChild(actions)

    return main;
}
export function createNoteDetailsTaskHtml(task){
    let description = task.description
    let state = task.isDone

    let main = document.createElement('div')
    main.classList.add('task')

    let checkbox = document.createElement('span')
    checkbox.classList.add('checkbox')
    
    if(state){
        checkbox.innerHTML = ''
        checkbox.innerHTML = '&#10004;'
    }else{
        checkbox.innerHTML = ''
        checkbox.innerHTML = '&#10006;'
    }

    main.addEventListener('click',()=>{
        task.isDone = !task.isDone

        if(task.isDone){
            checkbox.innerHTML = ''
            checkbox.innerHTML = '&#10004;'
        }else{
            checkbox.innerHTML = ''
            checkbox.innerHTML = '&#10006;'
        }
    })

    let content = document.createElement('span')
    content.innerHTML = description

    main.appendChild(checkbox)
    main.appendChild(content)

    return main;
}
export function createNotificationEmptyMessageHtml(){
    const main = document.createElement('div')
    main.id = 'notification-list-empty-message'
    main.innerHTML = 'You dont have notifications.'
    return main;
}