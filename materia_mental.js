let time;
let e1, e2, e3;
let w1, w2, w3;
let theta = 0.0;
let scaleFactor = 1;

// Vibration enum equivalent
const Vibration = {
  NONE: 0,
  ATOM: 1,
  NUCLEUS: 2,
  ELETRON: 3
};

let vibration = Vibration.NONE;

function setup() {
  // Create responsive canvas
  let canvasWidth = windowWidth;
  let canvasHeight = windowHeight;
  
  // Maintain aspect ratio 16:9 while fitting screen
  const targetRatio = 16 / 9;
  const screenRatio = canvasWidth / canvasHeight;
  
  if (screenRatio > targetRatio) {
    canvasWidth = canvasHeight * targetRatio;
  } else {
    canvasHeight = canvasWidth / targetRatio;
  }
  
  createCanvas(canvasWidth, canvasHeight);
  
  // Calculate scale factor for responsive sizing
  scaleFactor = width / 1280;
  
  // Initialize colors
  e1 = color(255, 100, 100);
  e2 = color(100, 255, 100);
  e3 = color(100, 100, 255);
  w1 = color(255, 0, 0);
  w2 = color(59, 163, 24);
  w3 = color(159, 0, 255);
  
  // Setup mobile controls
  setupMobileControls();
}

function windowResized() {
  // Recalculate canvas size on window resize
  let canvasWidth = windowWidth;
  let canvasHeight = windowHeight;
  
  const targetRatio = 16 / 9;
  const screenRatio = canvasWidth / canvasHeight;
  
  if (screenRatio > targetRatio) {
    canvasWidth = canvasHeight * targetRatio;
  } else {
    canvasHeight = canvasWidth / targetRatio;
  }
  
  resizeCanvas(canvasWidth, canvasHeight);
  scaleFactor = width / 1280;
}

function setupMobileControls() {
  // Setup touch controls for mobile
  const buttons = document.querySelectorAll('.mode-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const mode = parseInt(this.getAttribute('data-mode'));
      setVibrationMode(mode);
      updateActiveButton(mode);
    });
  });
}

function updateActiveButton(mode) {
  const buttons = document.querySelectorAll('.mode-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
    if (parseInt(btn.getAttribute('data-mode')) === mode) {
      btn.classList.add('active');
    }
  });
}

function setVibrationMode(mode) {
  switch(mode) {
    case 0:
      vibration = Vibration.NONE;
      break;
    case 1:
      vibration = Vibration.ATOM;
      break;
    case 2:
      vibration = Vibration.ELETRON;
      break;
    case 3:
      vibration = Vibration.NUCLEUS;
      break;
  }
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
  
  // Responsive text sizing
  let titleSize = 30 * scaleFactor;
  let subtitleSize = 15 * scaleFactor;
  let labelSize = 20 * scaleFactor;
  let instructionSize = 15 * scaleFactor;
  
  // Adjust for very small screens
  if (width < 600) {
    titleSize = max(18, titleSize);
    subtitleSize = max(10, subtitleSize);
    labelSize = max(14, labelSize);
    instructionSize = max(10, instructionSize);
  }
  
  textSize(titleSize);
  textAlign(CENTER, CENTER);
  text("Matéria Mental e Matéria Física", width / 2.0, 20 * scaleFactor);
  
  textSize(subtitleSize);
  text("Livro \"Mecanismos da Mediunidade\", cap.IV", width / 2.0, 50 * scaleFactor);
  
  let label = ""; 
  if (vibration === Vibration.ATOM) {
    label = "Vibração do átomo mental";
  } else if (vibration === Vibration.ELETRON) {
    label = "Vibração dos elétrons mentais";
  } else if (vibration === Vibration.NUCLEUS) {
    label = "Vibração do núcleo do átomo mental";
  }
  
  if (label !== "") {
    textSize(labelSize);
    
    // Position label based on screen size
    if (width < 768) {
      // Mobile: position at top
      text(label, width / 2.0, 80 * scaleFactor);
    } else {
      // Desktop: position at right
      text(label, width * 0.75, 140 * scaleFactor);
    }
  }
  
  // Hide instructions on mobile (we have buttons)
  if (width >= 768) {
    textSize(instructionSize);
    textAlign(LEFT);
    text("Instruções:", width * 0.75, height * 0.9);
    text("Use as teclas 0, 1, 2, 3 para alternar \nentre os modos de vibração", 
         width * 0.75, height * 0.9 + 30 * scaleFactor);
  }
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
  let mode = -1;
  
  switch (key) {
    case '0':
      vibration = Vibration.NONE;
      mode = 0;
      break;

    case '1':
      vibration = Vibration.ATOM;
      mode = 1;
      break;

    case '2':
      vibration = Vibration.ELETRON;
      mode = 2;
      break;

    case '3':
      vibration = Vibration.NUCLEUS;
      mode = 3;
      break;
      
    default:
      vibration = Vibration.NONE;
      mode = 0;
      break;
  }
  
  if (mode !== -1) {
    updateActiveButton(mode);
  }
}

