import Sample from './model/Sample.js';
import DrumKit from './model/Drumkit.js';

// Create samples.
const clap = new Sample('clap','./sounds/clap.wav')
const hihat = new Sample('hihat','./sounds/hihat.wav')
const snare = new Sample('snare','./sounds/snare.wav')
const kick = new Sample('kick','./sounds/kick.wav')
const openhat = new Sample('kick','./sounds/openhat.wav')
const ride = new Sample('kick','./sounds/ride.wav')
const tink = new Sample('kick','./sounds/tink.wav')
const tom = new Sample('kick','./sounds/tom.wav')


// Configure keybinding.
const keyBinding = {
    'q' : kick,
    'w' : clap,
    'e' : hihat,
    'r' : snare,
    't' : openhat,
    'y' : ride,
    'u' : tink,
    'i' : tom,
}

// Free play listener.
function freePlay(ev){
    let key = ev.key;
    let sample = keyBinding[key];
    sample.play();
}
document.addEventListener('keypress',freePlay);

const drumkit = new DrumKit(keyBinding,freePlay)