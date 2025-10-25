float time;
boolean atomMoving, nucleusMoving, eletronMoving;
color e1 = color(255, 100, 100); 
color e2 = color(100, 255, 100);
color e3 = color(100, 100, 255);
color w1 = color(255, 0, 0);
color w2 = color(59, 163, 24);
color w3 = color(159, 0, 255);
float theta = 0.0;

enum Vibration
{
  NONE, ATOM, NUCLEUS, ELETRON
};

Vibration vibration;

void setup()
{
  size(1280, 720);
}

void drawNucleus()
{
  pushMatrix();

  stroke(0);
  strokeWeight(1);
  translate(width / 4.0, height / 2.0);
  
  if (vibration == Vibration.NUCLEUS)
  {
    translate(0, 2.0 * cos(time * 20.0));
  }

  int numParticles = 6;
  color p = color(255,255,102);
  color n = color(255,165,0);
  boolean isProton = true;
  
  for (int i = 0; i < numParticles; i++) {
    if (isProton) {
      fill(p);
    } 
    else {
      fill(n);
    }
    
    pushMatrix();
    if (vibration == Vibration.NUCLEUS)
    {
      float amp = 4.0;
      float freq = 20.0;
      float trans = amp * cos(time * freq);
      if (isProton) {
        trans *= -1;
      }
      translate(trans, trans);
    }
    ellipse(15, 10, 40, 40);
    popMatrix();
    
    rotate(TWO_PI / numParticles);
    isProton = !isProton;
  }

  ellipse(0, 0, 40, 40);
  popMatrix();
}

void drawEletron(color c, float angle)
{
  float x = height / 3.0 * cos(time);
  float y = height / 8.0 * sin(time);
  
  pushMatrix();
  translate(width / 4.0, height / 2.0);
  rotate(angle);
  translate(x, y);
  
  if (vibration == Vibration.ELETRON)
  {
    translate(0, 8.0 * cos(time * 20.0));
  }

  noStroke();
  fill(c);
  ellipse(0, 0, 30, 30);
  popMatrix();
}

void drawOrbit(color c, float angle)
{
  noFill();
  strokeWeight(6);

  pushMatrix();
  translate(width / 4.0, height / 2.0);
  rotate(angle);
  stroke(c);
  ellipse(0, 0, height / 1.5, height / 4.0);
  popMatrix();
}

void drawWave()
{
  theta += 0.02;
  
  color c = 255;
  float amplitude = height / 6.0;
  float period = 0.0;
  float spacing = 0.0;
  
  if (vibration == Vibration.ATOM)
  {
    c = w1;
    period = 800.0;
    spacing = 10.0;
  }  
  else if (vibration == Vibration.ELETRON)
  {
    c = w2;
    period = 400.0;
    spacing = 5.0;
  }
  else if (vibration == Vibration.NUCLEUS)
  {
    c = e3;
    period = 100.0;
    spacing = 2.0;
  }
  else
  {
    return;
  }
  
  int n = (int) (width / 2.0 / spacing);
  float dx = (TWO_PI / period) * spacing;
  
  pushMatrix();
  translate(width / 2.0, height / 2.0);
  
  for (int i = 0; i < n; i++)
  {
    float angle = theta + dx * i;
    float x = i * spacing;
    float y = cos(angle) * amplitude;
    fill(c);
    ellipse(-x + width / 2, y, 20, 20);
  }
  popMatrix();
}

void drawText()
{
  fill(255);
  textSize(30);
  textAlign(CENTER, CENTER);
  text("Matéria Mental e Matéria Física", width / 2.0, 20);
  
  textSize(15);
  text("Livro \"Mecanismos da Mediunidade\", cap.IV", width / 2.0, 50);
  
  String label = ""; 
  if (vibration == Vibration.ATOM)
  {
    label = "Vibração do átomo mental";
  }  
  else if (vibration == Vibration.ELETRON)
  {
    label = "Vibração dos elétrons mentais";
  }
  else if (vibration == Vibration.NUCLEUS)
  {
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

void draw()
{
  background(0);

  drawText();
  
  time = millis() / 1000.0;
  
  pushMatrix();
  if (vibration == Vibration.ATOM)
  {
    translate(0, 20.0 * cos(time * 3.2));
  }
  
  drawNucleus();
  
  drawOrbit(e1, 0.0);
  drawOrbit(e2, PI / 1.5);
  drawOrbit(e3, TWO_PI / 1.5);

  drawEletron(e1, 0.0);
  drawEletron(e2, PI / 1.5);
  drawEletron(e3, TWO_PI / 1.5);
  popMatrix();
  
  drawWave();
}

void keyPressed()
{
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
