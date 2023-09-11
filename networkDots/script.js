const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = []; // empty arr
let hue = 0;

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

    for(let i = 0; i < 10; i++) {
        particlesArray.push(new Particle());
    }
})

canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    // drawCircle()
    console.log(1)

    for(let i = 0; i < 7; i++) {
        particlesArray.push(new Particle());
    }
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
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.size = Math.random()*15 + 1; // between 1 and 6
        this.speedX = Math.random()*3 - 1.5;
        this.speedY = Math.random()*3 - 1.5; // if =0, no movement in Y-axis
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }

    update() {
        this.x  += this.speedX;
        this.y  += this.speedY;
        if(this.size > 0.2) this.size -= 0.1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}


function handleParticles() {
    for(let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        for(let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if(dist < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = 0.2;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }

        // first for then if, cuz in if we splice the element and cannot find it in the loop
        if(particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);
            i--; // to not skip the next element
        }
    }
}

function animate() {
    ctx.clearRect(0,0, canvas.width, canvas.height); 
    // ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    handleParticles()
    hue++;
    requestAnimationFrame(animate); // will call it once. so, it's loop
}

animate();

