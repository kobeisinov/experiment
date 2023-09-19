// const audio1 = document.getElementById('audio1');
// let audio1 = new Audio();
// audio1.src = 'audio.mp3';

// const audioContext = new AudioContext()
// older version: ... = new (window.AudioContext || window.webkitAudioContext)(); // second one is for safari

const container = document.getElementById('container');
const canvas = document.getElementById('canvas1');
const file = document.getElementById('fileupload');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let audioSource;
let analyser;

// container.addEventListener('click', function () {
//     audio1.play();
//     audioSource = audioContext.createMediaElementSource(audio1);
//     analyser = audioContext.createAnalyser();
//     audioSource.connect(analyser);
//     analyser.connect(audioContext.destination);
//     analyser.fftSize = 64;
//     const bufferLength = analyser.frequencyBinCount; // for some reason, it's half the fftSize value
//     // bufferLength indicates the # of bars we will have in our animation
//     // bufferLength is the # of details in analyser sound file

//     const dataArray = new Uint8Array(bufferLength); // need the data analyser returns in specific format

//     const barWidth = canvas.width/bufferLength;
//     let barHeight; // it's 'let' cuz changes freq
//     let x; // horizontal x-coordinate, for drawing bars next to each other

//     function animate() {
//         x = 0;
//         ctx.clearRect(0, 0, canvas.width, canvas.height); // what area of canvas we want to delete
    
//         analyser.getByteFrequencyData(dataArray); // determines the h of each sound bar
//         // dataArray will be updated freq
    
//         for(let i = 0; i < bufferLength; i++) {
//             barHeight = dataArray[i]; // larger(?) sound - larger the bar
//             ctx.fillStyle = 'white';
//             ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight); // it's inside the loop, this represents the individual bar
    
//             x += barWidth;
//         }
    
//         requestAnimationFrame(animate); 
//     }
    
//     animate();
// })


file.addEventListener('change', function () {
    const files = this.files;
    const audio1 = document.getElementById('audio1');
    audio1.src = URL.createObjectURL(files[0]); // 16-bit uInt
    const audioContext = new AudioContext();
    audio1.load(); // update the audio element after changing the src;
    audio1.play();

    audioSource = audioContext.createMediaElementSource(audio1);
    analyser = audioContext.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 32;
    const bufferLength = analyser.frequencyBinCount; // for some reason, it's half the fftSize value
    // bufferLength indicates the # of bars we will have in our animation
    // bufferLength is the # of details in analyser sound file

    const dataArray = new Uint8Array(bufferLength); // need the data analyser returns in specific format

    const barWidth = canvas.width/bufferLength;
    let barHeight; // it's 'let' cuz changes freq
    let x; // horizontal x-coordinate, for drawing bars next to each other

    function animate() {
        x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // what area of canvas we want to delete
    
        analyser.getByteFrequencyData(dataArray); // determines the h of each sound bar
        // dataArray will be updated freq

        // console.log(dataArray);
    
        for(let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i]; // larger(?) sound - larger the bar
            ctx.fillStyle = 'white';
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight); // it's inside the loop, this represents the individual bar
    
            x += barWidth;
        }
    
        requestAnimationFrame(animate); 
    }
    
    animate();
})