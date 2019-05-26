class Particle {
  constructor(brain) {
    this.pos = createVector(start.x, start.y);
    this.speed = createVector();
    this.maxspeed = 15;
    this.accel = createVector();
    this.status = true;
    this.steering = createVector();
    this.rays = [];
    this.col = 255;
    this.sight = 100;
    this.fitness = 0;
    this.lifespan = 300;
    this.maxforce = 0.1;
    for (let a = 0; a < 360; a += 45) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
    if (brain)
    {
      this.brain = brain.copy();
    }else {
      this.brain = new NeuralNetwork(this.rays.length, this.rays.length, 1);
    }
  }

  dispose() {
    this.brain.dispose();
  }

  mutate() {
  	this.brain.mutate(MUTATE_R);
  }

  applyForce(force)
  {
    this.accel.add(force);
  }

  update() {
    if (this.status)
    {
      this.pos.add(this.speed);
      this.speed.add(this.accel);
      this.speed.limit(this.maxspeed);
      this.accel.set(0,0);
      this.lifespan--;
      console.log(this.lifespan);
      if (this.lisespan <= 0){
        console.log(this.lifespan);
        this.status = false;
      }
    }else {
      this.accel.set(0,0);
    }
  }

  look(walls) {
    const inputs = [];
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];
      let closest = null;
      let record = this.sight;
      for (let wall of walls) {
        const pt = ray.cast(wall);
        if (pt) {
          const d = p5.Vector.dist(this.pos, pt);
          //console.log(d);
          if (d < record && d < this.sight  ) {
            record = d;
            closest = pt;
          }
        }
      }

      inputs[i] = map(record, 0, 50, 1, 0);
      if (record < 10)
      {

        this.status = false;
      }

      if (closest) {
        // colorMode(HSB);
        // stroke((i + frameCount * 2) % 360, 255, 255, 50);
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    }
    const output = this.brain.predict(inputs);
    const angle = map(output[0], 0, 1, 0, 2*PI);
    // console.log(output);
    const steering = p5.Vector.fromAngle(angle);
    steering.setMag(this.maxspeed / 2);
    steering.sub(this.speed);
    steering.limit(this.maxforce);
    this.applyForce(steering);
    // console.log(output);
  }

  show() {
    push();
    fill(this.col);
    rectMode(CENTER);
    translate(this.pos.x, this.pos.y);
    rotate(this.speed.heading());
    rect(0, 0, 15, 5);
    pop();
    // ellipse(this.pos.x, this.pos.y, 4);
    // for (let ray of this.rays) {
    //   ray.show();
    // }
  }

  showFitness(x, y)
  {
    fill(255);
    //text("Fitness : "+ this.fitness(end));
    fill(255);
  }

  calcfitness(end) {
    // var total = p5.Vector.dist(end, start);
    // var p = p5.Vector.dist(this.pos, end);
    // f = p / total;
    // console.log(f);
    const d = p5.Vector.dist(this.pos, end);
    this.fitness = 1 / d;
  }

  text(){
    console.log("Prout");
  }
}
