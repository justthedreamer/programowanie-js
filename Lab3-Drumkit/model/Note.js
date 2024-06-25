export class Note{
    constructor(sample,timestamp)
    {
        this.sample = sample,
        this.timestamp = timestamp
    }
    play(){
        this.note = setTimeout(()=>{
            this.sample.play();
        },this.timestamp)
    }
    pause(){
        clearTimeout(this.note)
    }
}