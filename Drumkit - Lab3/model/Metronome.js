export default class Metronome {
    constructor(bpm,sample){
        this.bpm = bpm;
        this.sample = sample;
    }
    #bpmToMs(){
        return Math.round(60000 / this.bpm)
    }
    play(){
        let time = this.#bpmToMs();

        this.interval = setInterval(()=>{
            this.sample.play();
        },time)
    }
    pause(){
        let interval = this.interval;
        if(interval === undefined)
        {
            return;
        }
        clearInterval(interval)
    }
    set setBpm(bpm){
        this.pause();
        this.bpm = bpm;
    }
}