// creates a canvas
const canvas = document.getElementById("canvas1");
// lets us draw on a canvas
const ctx = canvas.getContext("2d");
console.log(ctx);
// sets sizes to inner sizes of the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
let hue = 0;

// this event listener deletes the canvas content, so we must apply our styles here too
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "white";
})

canvas.addEventListener("click", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 10; i++) {
        particlesArray.push(new Particle());
    }
})

canvas.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 10; i++) {
        particlesArray.push(new Particle());
    }
})

// we need mouse global object which we could use in the event listener
const mouse = {
    x: null,
    y: null
}

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = "hsl(" + hue + ", 100%, 50%)";
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
        ctx.fillStyle = this.color;
        //shapes can be made of multiple lines, we must tell that we are beginning a new line path
        ctx.beginPath();
        // can also make semi circles, curves etc.
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        //this will fill the shape, cann also call Stroke()
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
    }
}

init();
console.log(particlesArray)

function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = particlesArray[i].size / 10;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = "rgba(0, 0, 0, 0.1";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue += 5;
    requestAnimationFrame(animate)
}

animate()


