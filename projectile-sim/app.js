// Reads HTML elements
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const velocityInput = document.getElementById('velocity');
const angleInput = document.getElementById('angle');
const startBtn = document.getElementById('startBtn');

// Projectile Object
const projectile = {
    x0: 30,
    y0: canvas.height -30,
    velocity: 0,
    angle: 0,
    radius: 25,
    color: "red"
}

// Draws Projectile
function draw_projectile(x , y) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, projectile.radius, 0, 2 * Math.PI);
    ctx.fillStyle = projectile.color;
    ctx.fill();
}

// Simulation runs when start button is clicked
startBtn.addEventListener('click', () => {
	const gravity = 9.81
    projectile.velocity = parseFloat(velocityInput.value) * 100;
    projectile.angle = parseFloat(angleInput.value) * Math.PI / 180

	const v0x = projectile.velocity * Math.cos(projectile.angle);
	const v0y = -projectile.velocity * Math.sin(projectile.angle);
	const dt = 0.1;

	let x = projectile.x0;
	let y = projectile.y0;
	let vx = v0x;
	let vy = v0y;

	const animate = () => {
	    const ax = 0;
		const ay = gravity;

        draw_projectile(x, y);

		vx += ax * dt;
		vy += ay * dt;
		x += vx * dt;
		y += vy * dt;

		if (y > canvas.height - projectile.radius) {
			y = projectile.y0;
			vy = -vy * 0.8;
		}

        if (y < projectile.radius) {
            y = projectile.radius;
            vy = -vy * 0.8;
        }

		if (x > canvas.width - projectile.radius) {
            x = canvas.width - projectile.radius;
            vx = -vx * 0.8;
		}

        if (x < projectile.radius) {
            x = projectile.radius;
            vx = -vx * 0.8;
        }

        if (x < canvas.width && y > 0) {
            requestAnimationFrame(animate);
        }
	};

	requestAnimationFrame(animate);
});