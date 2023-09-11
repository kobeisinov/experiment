// global var for findNoise? Create a 2D array for gradients
let gradients = [];
for (let i = 0; i < 100; i++) {
  gradients[i] = [];
  for (let j = 0; j < 100; j++) {
    gradients[i][j] = {x: Math.random() * 2 - 1, y: Math.random() * 2 - 1};
  }
}

// findNoise's helper. Create a function to interpolate between values
function interpolate(a, b, x) {
  let ft = x * Math.PI;
  let f = (1 - Math.cos(ft)) * 0.5;
  return a * (1 - f) + b * f;
}

// noisejs alternative function. Create a function to find noise
function findNoise(x, y) {
    let xFloor = Math.floor(x);
    let yFloor = Math.floor(y);
    let xWeight = x - xFloor;
    let yWeight = y - yFloor;
  
    let v1 = gradients[xFloor % gradients.length][yFloor % gradients.length];
    let v2 = gradients[(xFloor + 1) % gradients.length][yFloor % gradients.length];
    let v3 = gradients[xFloor % gradients.length][(yFloor + 1) % gradients.length];
    let v4 = gradients[(xFloor + 1) % gradients.length][(yFloor + 1) % gradients.length];
  
    let i1 = interpolate(v1.x * xWeight + v1.y * yWeight, v2.x * (xWeight - 1) + v2.y * yWeight, xWeight);
    let i2 = interpolate(v3.x * xWeight + v3.y * (yWeight - 1), v4.x * (xWeight - 1) + v4.y * (yWeight - 1), xWeight);
  
    return interpolate(i1, i2, yWeight);
}



let canvas = document.getElementById("myCanvas"),
ctx = canvas.getContext("2d"),
width = (canvas.width = window.innerWidth), // idk how it works
height = (canvas.height = window.innerHeight), // without canvas.weight canvas is not loaded
centerY = height / 2, // Y axis of wave's center
segNum = 180, // it increases the # of peaks
lineWidth = centerY/1.5, // width of tape (diff between 1st ad last lines??)
lineNum = 100; // band consists of this number of lines 

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}) // makes wave responsive

drawContent(); // activates below function when script.js runs

function drawContent() {
  ctx.clearRect(0, 0, width, height); // to remove previous canvas (history)
  let time = Date.now() / 5000; //  returns the # of msec elapsed since the 01.01.1970
  for (var j = 0; j < lineNum; j++) {
    ctx.beginPath(); // start of new path
    ctx.lineWidth = 3; // width of single line
    ctx.strokeStyle = "rgba(0,0,255, 0.2)"; // color of that line
    for (var i = 0; i < segNum; i++) {
      const x = (i / (segNum - 1)) * width;
      const px = i / 50;
      const py = j / 50 + time; // time adds the motion
      const y = lineWidth * findNoise(px, py) + centerY;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }

  requestAnimationFrame(drawContent); // loop like self calls
}
