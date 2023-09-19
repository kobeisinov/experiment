window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const snail = document.getElementById('snail')

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Bar {
        constructor(x, y, width, height, color, index) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;
            this.index = index;
        }

        update(micInput) {
            // it will set height of bar based on mic input
            // this.height = micInput * 1000;

            // added for one-sided waves and further spiral animation
            const sound = micInput * 1000;
            if(sound > this.height) {
                this.height = sound;
            } else {
                this.height -= this.height * 0.03
            }
        }

        draw(context, volume) {
            // interesting, context also can be passed as input
            context.strokeStyle = this.color; // fillStyle to strokeStyle
            // context.fillRect(this.x, this.y, this.width, this.height); // was replaced by lines
            context.lineWidth = this.width;
            
            context.save(); // translate & draw 
            // everything between save and restore don't affect the outside
            // it will restore to the last point saved
            
            context.rotate(this.index * 0.045);
            context.beginPath();
            // context.moveTo(0, 0); //initial experiment
            // context.lineTo(this.x, this.y + this.height); //initial experiment
            context.bezierCurveTo(this.x/2, this.y/2, this.height * -0.6 - 150, this.height + 50, this.x, this.y);
            context.stroke();
            context.restore(); // it will 
        } 
    }

    class Microphone {
        constructor(fftSize) {
            // fast fourier transform = to slice raw data to specific amount of audio samples
            this.initialized = false; // it take a fraction of second, so wait is needed 
            navigator.mediaDevices.getUserMedia({audio: true})
            .then(function(stream) {
                // 'then' is for success Promises
                this.audioContext = new AudioContext();
                this.microphone = this.audioContext.createMediaStreamSource(stream); // creates audio source code
                this.analyser = this.audioContext.createAnalyser(); // creates analyser node, expose its time and freq data
                this.analyser.fftSize = fftSize; // will slice data into specific # of audio samples
                const bufferLength = this.analyser.frequencyBinCount; // how many samples we're getting. half the fftSize 
                this.dataArray = new Uint8Array(bufferLength);
                this.microphone.connect(this.analyser); // to connect audio nodes
                this.initialized = true;
            }.bind(this)).catch(function (e) {
                alert(e);
            }); 
        }
        getSamples() {
            // getting current audio samples
            this.analyser.getByteTimeDomainData(this.dataArray); 
            // copies analyser time-domain data into arr we pass to it
            // will overwrite dataArray with incoming audio data

            let normSamples = [...this.dataArray].map(e => e/128 - 1);
            // transforms to values between -1 and 1
            return normSamples;
        };

        getVolume() {
            this.analyser.getByteTimeDomainData(this.dataArray);
            let normSamples = [...this.dataArray].map(e => e/128 - 1);
            let sum = 0;

            for(let i = 0; i < normSamples.length; i++) {
                sum += normSamples[i] * normSamples[i];
            }
            let volume = Math.sqrt(sum/normSamples.length);
            return volume;
        }
    }

    let fftSize = 512;
    const microphone = new Microphone(fftSize);
    let bars = [];
    let barWidth = canvas.width/(fftSize/2);
    function createBars() {
        for(let i = 0; i < fftSize/2; i++) {
            let color = 'hsl(' + i + ',100%, 50%)';
            bars.push(new Bar(0, i*0.9, 1, 0, color, i))
        }
    }
    createBars();

    function animate() {
        if(microphone.initialized === true) {
            ctx.clearRect(0,0, canvas.width, canvas.height);
            const volume = microphone.getVolume();
            const samples = microphone.getSamples();
            
            ctx.save();
            ctx.translate(canvas.width/2 - 70, canvas.height/2);
            bars.forEach(function(bar, i) {
                bar.update(samples[i]);
                bar.draw(ctx, volume);
            })
            ctx.restore();
        }
        // to see only current animation frame
        

        requestAnimationFrame(animate);
    }

    animate();
})