const button1 = document.getElementById('button1');
let audio1 = new Audio();
audio1.src = 'audio.mp3';

const audioCtx = new AudioContext()
// older version: ... = new (window.AudioContext || window.webkitAudioContext)(); // second one is for safari


// some browsers don't allow analyze for pixel data 
// with audio same problem

button1.addEventListener('click', function () {
    audio1.play();
    audio1.addEventListener('playing', function () {
        // playing = when media starts or restarts

    })

    audio1.addEventListener('ended', function  () {
        // ended = self-explanatory

    })
})

const button2 = document.getElementById('button2');
button2.addEventListener('click', playSound);

function playSound() {
    const oscillator = audioCtx.createOscillator(); // creates audio node that generates a tone
    oscillator.connect(audioCtx.destination); // destination = def audio-render device on computer (speakers)
    oscillator.type = 'triangle'; // what waveform it outputs; others: sine, square, sawtooth
    oscillator.start();
    setTimeout(function() {
        oscillator.stop();
    }, 1000);
}   