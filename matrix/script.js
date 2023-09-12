const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// creates gradient object
let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, 'red'); // 0 is start, 1 is the end
gradient.addColorStop(0.25, 'orange');
gradient.addColorStop(0.5, 'yellow');
gradient.addColorStop(0.75, 'green');
gradient.addColorStop(1, 'blue');



class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight;
    }

    draw(context) {
        console.log(1);
        // context is in the args to know which canvas to draw on
        this.text = this.characters.charAt(Math.floor(Math.random()*this.characters.length)) 
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize) // text, x-coord, y-coord.
        if(this.y*this.fontSize > this.canvasHeight && Math.random() > 0.95) {
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 25;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize(); 
        console.log(this.symbols);
    }
    #initialize() {
        // hash sumbol makes method private
        // you can't call outside of class
        // it's called abstraction - hiding internal functionality

        for(let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }

    resize(w, h) {
        this.canvasWidth = w;
        this.canvasHeight = h;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = []
        this.#initialize();
    }
}

// to control the speed of animation
const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 50; //frames per second // inc or decr to alther the speed
const nextFrame = 1000/fps;
let timer = 0;

function animate(timeStamp) {
    // deltaTime is the diff in ms between the prev and the curr animation frame
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if(timer > nextFrame) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.textAlign = 'center';
        ctx.fillRect(0, 0, canvas.width, canvas.height); // it will create semi-transparent fading animation
        ctx.fillStyle = gradient; //'#0aff0a';
        // gradient applies to the canvas, not individual shape
        ctx.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(symbol => symbol.draw(ctx));
        timer = 0;
    } else {
        timer += deltaTime;
    }
    
    requestAnimationFrame(animate); 
    // endless animation
    // requestAnimationFrame passes method timeStamp (but from the second frame)
    // so, passing 0 into below animate()
}
animate(0)

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height)
})