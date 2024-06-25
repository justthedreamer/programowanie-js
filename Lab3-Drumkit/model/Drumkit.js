import {Note} from './Note.js'
import {Channel,createChannelHtml} from './Channel.js';

function createDrumkitInterface(drumkitObj){
    const root = document.createElement('div')
    root.id = 'interface';

    const playButton = document.createElement('button')
    playButton.classList.add('play-button')
    playButton.innerHTML = 'play'
    playButton.addEventListener('click',()=>{
        if(playButton.classList.contains('active'))
        {
            playButton.classList.remove('active')
            playButton.innerHTML = ''
            playButton.innerHTML = 'play'
            drumkitObj.pause();
        }else{
            playButton.classList.add('active')
            playButton.innerHTML = ''
            playButton.innerHTML = 'stop'
            drumkitObj.play();
        }
    })

    const recordingButton = document.createElement('button')
    recordingButton.classList.add('recording-button')
    recordingButton.innerHTML = 'record'
    recordingButton.addEventListener('click',()=>{
        if(recordingButton.classList.contains('active'))
        {
            recordingButton.classList.remove('active')
            recordingButton.innerHTML = ''
            recordingButton.innerHTML = 'record'
            drumkitObj.stopRecording();

        }else{
            recordingButton.classList.add('active')
            recordingButton.innerHTML = ''
            recordingButton.innerHTML = 'stop'
            drumkitObj.startRecording();
        }
    })


    root.appendChild(playButton)
    root.appendChild(recordingButton)
    return root;
}
function createDrumkitHtml(drumkitObj){
    const root = document.createElement('div')
    root.id = 'drumkit'

    const drumkitInterface = createDrumkitInterface(drumkitObj)

    const channels = document.createElement('div')
    channels.id = 'channels'

    root.appendChild(drumkitInterface)
    root.appendChild(channels)
    document.body.appendChild(root)
    return root;
}
export default class DrumKit{
    constructor(sampleBindingArr,freePlayFunc,initialChannelsCount = 4){
        this.channels = []
        this.activeChannels = []
        this.sampleBindingArr = sampleBindingArr
        this.freePlayFunc = freePlayFunc
        this.initialChannelsCount = initialChannelsCount
        this.#init();
    }
    #init()
    {
        this.drumkitContainer = createDrumkitHtml(this);
        this.channelsContainer = this.drumkitContainer.querySelector('#channels')

        // Initialize channels.
        for(let i = 0; i < this.initialChannelsCount ; i++)
        {
            this.addChannel();
        }
    }
    addChannel(){
        const channel = new Channel(this.channels.length + 1,this.sampleBindingArr,this.freePlayFunc);
        this.channels.push(channel)
        const channelHtml = createChannelHtml(this,channel)
        this.channelsContainer.appendChild(channelHtml)
    }
    activeChannel(channel){
        if(this.activeChannels.includes(channel))
        {
            let index = this.activeChannels.indexOf(channel)
            this.activeChannels.splice(index,1)
        }else{
            this.activeChannels.push(channel)
        }
    }
    clearChannel(channel){
        let index = this.channels.indexOf(channel);
        this.channels[index].notesArr = []
    }
    play(){
        this.activeChannels.forEach(channel =>{
            channel.play();
        })
    }
    pause(){
        this.activeChannels.forEach(channel =>{
            channel.pause();
        })
    }
    startRecording(){
        this.activeChannels.forEach(channel =>{
            channel.startRecording();
        })
    }
    stopRecording(){
        this.activeChannels.forEach(channel =>{
            channel.stopRecording();
        })
    }
}