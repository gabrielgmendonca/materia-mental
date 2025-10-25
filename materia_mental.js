let time;
let e1, e2, e3;
let w1, w2, w3;
let theta = 0.0;

// Vibration enum equivalent
const Vibration = {
  NONE: 0,
  ATOM: 1,
  NUCLEUS: 2,
  ELETRON: 3
};

let vibration = Vibration.NONE;

function setup() {
  createCanvas(1280, 720);
  
  // Initialize colors
  e1 = color(255, 100, 100);
  e2 = color(100, 255, 100);
  e3 = color(100, 100, 255);
  w1 = color(255, 0, 0);
  w2 = color(59, 163, 24);
  w3 = color(159, 0, 255);
}

function drawNucleus() {
  push();

  stroke(0);
  strokeWeight(1);
  translate(width / 4.0, height / 2.0);
  
  if (vibration === Vibration.NUCLEUS) {
    translate(0, 2.0 * cos(time * 20.0));
  }

  let numParticles = 6;
  let p = color(255, 255, 102);
  let n = color(255, 165, 0);
  let isProton = true;
  
  for (let i = 0; i < numParticles; i++) {
    if (isProton) {
      fill(p);
    } else {
      fill(n);
    }
    
    push();
    if (vibration === Vibration.NUCLEUS) {
      let amp = 4.0;
      let freq = 20.0;
      let trans = amp * cos(time * freq);
      if (isProton) {
        trans *= -1;
      }
      translate(trans, trans);
    }
    ellipse(15, 10, 40, 40);
    pop();
    
    rotate(TWO_PI / numParticles);
    isProton = !isProton;
  }

  ellipse(0, 0, 40, 40);
  pop();
}

function drawEletron(c, angle) {
  let x = height / 3.0 * cos(time);
  let y = height / 8.0 * sin(time);
  
  push();
  translate(width / 4.0, height / 2.0);
  rotate(angle);
  translate(x, y);
  
  if (vibration === Vibration.ELETRON) {
    translate(0, 8.0 * cos(time * 20.0));
  }

  noStroke();
  fill(c);
  ellipse(0, 0, 30, 30);
  pop();
}

function drawOrbit(c, angle) {
  noFill();
  strokeWeight(6);

  push();
  translate(width / 4.0, height / 2.0);
  rotate(angle);
  stroke(c);
  ellipse(0, 0, height / 1.5, height / 4.0);
  pop();
}

function drawWave() {
  theta += 0.02;
  
  let c = 255;
  let amplitude = height / 6.0;
  let period = 0.0;
  let spacing = 0.0;
  
  if (vibration === Vibration.ATOM) {
    c = w1;
    period = 800.0;
    spacing = 10.0;
  } else if (vibration === Vibration.ELETRON) {
    c = w2;
    period = 400.0;
    spacing = 5.0;
  } else if (vibration === Vibration.NUCLEUS) {
    c = e3;
    period = 100.0;
    spacing = 2.0;
  } else {
    return;
  }
  
  let n = Math.floor(width / 2.0 / spacing);
  let dx = (TWO_PI / period) * spacing;
  
  push();
  translate(width / 2.0, height / 2.0);
  
  for (let i = 0; i < n; i++) {
    let angle = theta + dx * i;
    let x = i * spacing;
    let y = cos(angle) * amplitude;
    fill(c);
    ellipse(-x + width / 2, y, 20, 20);
  }
  pop();
}

function drawText() {
  fill(255);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("Matéria Mental e Matéria Física", width / 2.0, 20);
  
  textSize(15);
  text("Livro \"Mecanismos da Mediunidade\", cap.IV", width / 2.0, 50);
  
  let label = ""; 
  if (vibration === Vibration.ATOM) {
    label = "Vibração do átomo mental";
  } else if (vibration === Vibration.ELETRON) {
    label = "Vibração dos elétrons mentais";
  } else if (vibration === Vibration.NUCLEUS) {
    label = "Vibração do núcleo do átomo mental";
  }
  
  textSize(20);
  text(label, width * 0.75, 140);
  
  textSize(15);
  textAlign(LEFT);
  text("Instruções:", width * 0.75, height * 0.9);
  text("Use as teclas 0, 1, 2, 3 para alternar \nentre os modos de vibração", 
       width * 0.75, height * 0.9 + 30);
}

function draw() {
  background(0);

  drawText();
  
  time = millis() / 1000.0;
  
  push();
  if (vibration === Vibration.ATOM) {
    translate(0, 20.0 * cos(time * 3.2));
  }
  
  drawNucleus();
  
  drawOrbit(e1, 0.0);
  drawOrbit(e2, PI / 1.5);
  drawOrbit(e3, TWO_PI / 1.5);

  drawEletron(e1, 0.0);
  drawEletron(e2, PI / 1.5);
  drawEletron(e3, TWO_PI / 1.5);
  pop();
  
  drawWave();
}

function keyPressed() {
  switch (key) {
    case '0':
      vibration = Vibration.NONE;
      break;

    case '1':
      vibration = Vibration.ATOM;
      break;

    case '2':
      vibration = Vibration.ELETRON;
      break;

    case '3':
      vibration = Vibration.NUCLEUS;
      break;
      
    default:
      vibration = Vibration.NONE;
      break;
  }
}

