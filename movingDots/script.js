const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
// console.log(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = []; // empty arr

window.addEventListener('resize', function(){
    // to make canvas responsive in every resize event 
    // and to save style and size of rect every event
    // otherwise (out of event) it renders once only
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // ctx.fillStyle = 'white';
    // ctx.fillRect(10, 20, 150, 50);
})

const mouse = {
    x: undefined,
    y: undefined,
}
canvas.addEventListener('click', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    // drawCircle()
})

canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    // drawCircle()
})


// function drawCircle() {
//     ctx.fillStyle = 'blue';
//     ctx.beginPath(); // without beginPath below is not drawn
//     ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
//     ctx.fill();
// }

// to create similar object -> class
class Particle {
    constructor() {
        //properties
        // this.x = mouse.x;
        // this.y = mouse.y;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random()*5 + 1; // between 1 and 6
        this.speedX = Math.random()*3 - 1.5;
        this.speedY = Math.random()*3 - 1.5; // if =0, no movement in Y-axis
    }

    update() {
        this.x  += this.speedX;
        this.y  += this.speedY;
    }

    draw() {
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 50, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for(let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
    }
}

init();

function handleParticles() {
    for(let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
}

function animate() {
    // at the start of our animation loop
    // we clear old paints from canvas
    // so, we can see only current frame
    ctx.clearRect(0,0, canvas.width, canvas.height); 
    // drawCircle();
    handleParticles()
    requestAnimationFrame(animate); // will call it once. so, it's loop
}

animate();

