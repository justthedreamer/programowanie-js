
import {Note} from './Note.js'

function createChannelHtml(drumkitObj,channelObj){
    // Root element
    const root = document.createElement('div')
    root.classList.add('channel')

    // Play button
    const playButton = document.createElement('button')
    playButton.classList.add('play-button')
    playButton.innerHTML = 'play'
    playButton.addEventListener('click',()=>{
        if(playButton.classList.contains('active'))
        {
            playButton.classList.remove('active')
            channelObj.pause();
        }else{
            playButton.classList.add('active')
            channelObj.play();
        }
    })

    // Record solo button
    const recordSolo = document.createElement('button')
    recordSolo.classList.add('record-solo-button')
    recordSolo.innerHTML = 'record' 
    recordSolo.addEventListener('click',()=>{
        if(!channelObj.recording)
        {
            channelObj.recording = true;
            recordSolo.classList.add('active')
            recordSolo.innerHTML = '' 
            recordSolo.innerHTML = 'stop'
            channelObj.startRecording();

        }else{
            channelObj.recording = false;
            recordSolo.classList.remove('active')
            recordSolo.innerHTML = '' 
            recordSolo.innerHTML = 'record' 
            channelObj.stopRecording();
        
        }
    })

    // Options
    const channelOptions = document.createElement('div')
    channelOptions.classList.add('options')

    const activeOption = document.createElement('button')
    activeOption.classList.add('active-button')
    activeOption.innerHTML = 'active on<br>master'
    activeOption.addEventListener('click',()=>{
        drumkitObj.activeChannel(channelObj)
        activeOption.classList.toggle('active')
    })


    channelOptions.appendChild(activeOption)

    // Path
    const channelPath = document.createElement('div')
    channelPath.classList.add('path')

    root.appendChild(playButton)
    root.appendChild(recordSolo)
    root.appendChild(channelOptions)
    root.appendChild(channelPath)

    return root
}
class Channel{
    constructor(id,sampleBindingArr,freePlayFunc){
        this.id = id
        this.notesArr = []
        this.sampleBindingArr = sampleBindingArr
        this.freePlayFunc = freePlayFunc
    }
    play(){
        if(this.notesArr.length !== 0 && this.notesArr !== undefined){
            this.path = []
            this.notesArr.forEach(note => {
                this.path.push(note)
            })
            this.path.forEach(note =>{
               note.play()
            })
        }
    }
    pause(){
        if(this.path !== undefined)
        {
            this.path.forEach(note => {
                note.pause()
            })
        }
    }
    startRecording(){
        this.startTime = 0;
    
        this.recordingEvent = (ev) => {
            let key = ev.key;
            let sample = this.sampleBindingArr[key];
            sample.play();
            let timestamp = ev.timeStamp - this.startTime;
            let note = new Note(sample, timestamp);
            this.notesArr.push(note);
        };
        
        console.log(this.freePlayFunc)
        document.removeEventListener('keypress', this.freePlayFunc);
        document.addEventListener('keypress', this.recordingEvent);
    
        this.startTime = performance.now();
    }
    stopRecording(){
        document.removeEventListener('keypress', this.recordingEvent);
        document.addEventListener('keypress', this.freePlayFunc);
    
        this.startTime = 0;
    }
}


export {Channel, createChannelHtml}