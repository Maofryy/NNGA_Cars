
function nextGeneration() {
  // console.log('next generation');
  // console.log(particlesFinished);
  calculateFitness(end);
  for (let i = 0; i < TOTAL; i++) {
    particles[i] = pickOne();
  }
  for (let i = 0; i < TOTAL; i++) {
    particlesFinished[i].dispose();
  }
  particlesFinished = [];
}

function pickOne() {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r = r - particlesFinished[index].fitness;
    index++;
  }
  index--;
  let particle = particlesFinished[index];
  let child = new Particle(particle.brain);
  child.mutate();
  return child;
}

function calculateFitness(end) {
  let sum = 0;
  for (let particle of particlesFinished) {
    // console.log(particlesFinished[i].status);
    particle.calcfitness(end);
  }
  for (let particle of particlesFinished) {
    sum += particle.fitness;
  }
  for (let particle of particlesFinished) {
    particle.fitness = particle.fitness / sum;
  }
}
