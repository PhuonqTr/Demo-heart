const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const numberOfParticles = 500;
const heartShape = [];
const heartWidth = 300;
const heartHeight = 300;

// Function to create heart shape
function createHeart() {
    for (let t = 0; t < Math.PI * 2; t += 0.05) {
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        heartShape.push({ x: x * 10, y: -y * 10 });
    }
}

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x + canvas.width / 2;
        this.y = y + canvas.height / 2;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'rgba(255, 0, 0, 0.7)';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size -= 0.02;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].size <= 0.2) {
            particles.splice(i, 1);
            i--;
        }
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

// Generate particles in heart shape
function generateParticles() {
    setInterval(() => {
        const heartPoint = heartShape[Math.floor(Math.random() * heartShape.length)];
        particles.push(new Particle(heartPoint.x, heartPoint.y));
    }, 50);
}

// Initialize
createHeart();
generateParticles();
animate();
