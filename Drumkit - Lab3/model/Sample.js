export default class Sample {
    constructor(name, audioSrc) {
        this.name = name;
        this.audioSrc = audioSrc;
    }

    play() {
        const audio = new Audio(this.audioSrc);
        audio.play();
    }
}
