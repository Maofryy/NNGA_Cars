var p1;
var p2;
var i = 0;
var go = false;

const ROADSIZE = 10;
const TOTAL = 50;
const MUTATE_R = 0.05;

let walls = [];
let particles = [];
let particlesFinished = [];
let ray;

var popsize = 100;

var steering;
let start,end;

let speedSlider;
let generation = 0;

function setup() {
	clear();
	tf.setBackend('cpu');
	createCanvas(800, 800);
	//runSketch();

	// p1 = new Point(0, 0);
	// p2 = new Point(0, 0);
	// walls.push(new Boundary(50, 450, 50, 150));
	// walls.push(new Boundary(150, 450, 150, 200));
	// walls.push(new Boundary(50, 150, 180, 20));
	// walls.push(new Boundary(150, 201, 230, 120));
	// walls.push(new Boundary(180, 20, 410, 20));
	// walls.push(new Boundary(230, 120, 410, 120));
	//
	// walls.push(new Boundary(50, 450, 150, 450));
	// walls.push(new Boundary(410, 20, 410, 120));

	start = createVector(100, 740);
	end = createVector(410, 70);
	p1 = createVector();
	for (var j = 0; j < TOTAL; j++)
	{
  	particles[j] = new Particle();
		// particles[j].steering = createVector(0.0,-0.1);
	}
	//drawTrack();
	//particle.applyForce(createVector(0,-0.01));


	//console.log(p5.Vector.dist(end, start));
	// console.log(start);
	// console.log(particles[0].pos);
	generation = 0;
	speedSlider = createSlider(1, 50, 1);
}

function draw()
{
	const val = speedSlider.value();
	for (let n = 0; n < val ; n++){
		if (go){
			// let steering = createVector(map(mouseX,0,800,-2,2), map(mouseY,0,800,-2,2));
			// particle.applyForce(steering);
			for (let particle of particles) {
			  particle.look(walls);
				particle.update();
			}

			for (let i = particles.length - 1; i >= 0; i--){
				const particle = particles[i];
				if (!particle.status || particle.lifespan < 0){
					particlesFinished.push(particles.splice(i, 1)[0]);
					// particle.fitness(start, end);
				}
			}

			if (particles.length == 0){
				// console.log(particlesFinished);
				generation++;
				console.log(generation);
				nextGeneration();
			}
			// steering.x -= 0.00002;
			//console.log(steering);
		}
}
	background(0);
	for (let wall of walls) {
		wall.show();
	}
	for (let particle of particles){
		particle.show();
	}
	ellipse(start.x, start.y, 10);
	ellipse(end.x, end.y, 10);
	// ellipse(400,400,20);
	//console.log(steering);


}

function keyPressed() {
	go = true;
}
// Draw Circuit Manually
function mousePressed()
{
	if (!go){
		if (mouseButton === LEFT)
		{
			if (p1.x != 0 || p1.y != 0)
			{
				let theta = p1.heading();
				// drawRoad(p1, createVector(mouseX - p1.x, mouseY - p1.x), )
				walls.push(new Boundary(p1.x,p1.y,mouseX,mouseY));
			}
			p1.x = mouseX;
			p1.y = mouseY;
		}
		else if (mouseButton === RIGHT)
		{
			p1.x = mouseX;
			p1.y = mouseY;
		}
	}
}

function drawRoad(base, vec, theta) {
	let A = createVector();
	let B = createVector();
	let d = ROADSIZE;
	A.x = - d*Math.sin(theta);
	A.y =  d*Math.cos(theta);
	B.x = d*Math.sin(theta);
	B.y = - d*Math.cos(theta);
  push();
  stroke(0);
  strokeWeight(3);
  fill(0);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
	walls.push(new Boundary(A.x, A.y, A.x + vec.x, A.y + vec.y));
	walls.push(new Boundary(B.x, B.y, B.x + vec.x, B.y + vec.y));
  // rotate(vec.heading());

  pop();
}

//Draw Circuit

// function mousePressed()
// {
// 	console.log(mouseX, mouseY);
// }
