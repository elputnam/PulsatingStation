//Pulsating Station, part of Emergent
//Randomly cycles through Delicate Figure, Firefly Burnout, Beautfiul Game, Oblivious Network, Delicate Feline
//3D

//p5.scenemanager variable
let mgr;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
  reset();
  mgr = new SceneManager();

  //Preload scenes
  mgr.addScene (DelicateFigure);
  mgr.addScene (FireflyBurnout);
  mgr.addScene (BeautifulGame);
  mgr.addScene (ObliviousNetwork);
  mgr.addScene (DelicateFeline);

  mgr.showNextScene();
}

function draw() {
  console.log(frameCount);
  mgr.draw();
}

//resets framecount
function reset(){
  frameCount = 0;
  }

//change between scenes with keyboard
function keyPressed(){
  switch(key)
  {
      case '1':
        reset();
        mgr.showScene(DelicateFigure);
        break;
      case '2':
        reset();
        mgr.showScene(FireflyBurnout);
        break;
      case '3':
        reset();
        mgr.showScene(BeautifulGame);
        break;
      case '4':
        reset();
        mgr.showScene(ObliviousNetwork);
        break;
      case '5':
        reset();
        mgr.showScene(DelicateFeline);
        break;
  }
}

//resize canvas when window is resized
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

//changes between scenes automatically and randomly
function changeScene(){
    reset();
    let chance = floor(random(1,5));

    if (chance == 1){
    mgr.showScene(DelicateFigure);
    } else if (chance == 2){
      mgr.showScene(FireflyBurnout);
    } else if (chance == 3) {
      mgr.showScene(BeautifulGame);
    } else if (chance == 4) {
      mgr.showScene(ObliviousNetwork);
    }  else if (chance == 5){
      mgr.showScene(DelicateFeline);
     }
}

function mousePressed(){

  let fs = fullscreen();
  fullscreen(!fs);
}

//========================================================================
//=========================Scenes=========================================
//========================================================================

//==================Delicate Figure=======================================

function DelicateFigure(){
  let xspacing = 10; // How far apart should each horizontal position be spaced
  let w; // Width of entire wave
  let maxwaves = 12; // total # of waves to add together

  let theta = 0.0;
  let amplitude = []; // Height of wave
  let dx = []; // Value for incrementing X, to be calculated as a function of period and xspacing
  let yvalues; // Using an array to store height values for the wave (not entirely necessary)
  
  let change;
  
  this.setup = function(){
    createCanvas(windowWidth, windowHeight, WEBGL);
    background(0, 100,10);
    frameRate(20)
    
    w = width + 16;
  
    for (let i = 0; i < maxwaves; i++) {
      amplitude[i] = random(10, 30);
      let period = random(100, 300); // How many pixels before the wave repeats
      dx[i] = (TWO_PI / period) * xspacing;
    }
  
    yvalues = [];

  }

  this.draw = function(){
    if (frameCount == 1){
      frameRate(20);
      change = int(random(500, 2000));
    }

    background(0, 100, random(10));
    push();
    translate(-width/2, -height/2)
    this.calcWave();
    this.renderWave();
    pop();
    
    // scale(map(mouseX, 0, width, 10, 3))
    scale(4);
    rotateX(millis()/ 1000);
    rotateY(millis() / 2000);
    rotateZ(millis()/ 1500)
    fill(0, random(100), random(100), 50);
    strokeWeight(random(5));
    stroke(175, random(100), random(100));
    sphere(width*.05, 1, int(random(2, 4)));
    push();
    rotateY(180);
    sphere(width*.05, 1, int(random(2, 4)));
    pop();

    if (frameCount == change){
      changeScene();
    }
  }

  this.calcWave = function() {
    // Increment theta (try different values for 'angular velocity' here
    theta += random(0.01,0.05);
  
    // Set all height values to zero
    for (let i = 0; i < w / xspacing; i++) {
      yvalues[i] = 0;
    }
  
    // Accumulate wave height values
    for (let j = 0; j < maxwaves; j++) {
      let x = theta;
      for (let i = 0; i < yvalues.length; i++) {
        // Every other wave is cosine instead of sine
        if (j % 2 === 0) yvalues[i] += sin(x) * amplitude[j];
        else yvalues[i] += tan(x) * amplitude[j];
        x += dx[j];
      }
    }
  }
  
  this.renderWave = function() {
    // A simple way to draw the wave with an ellipse at each position
    noStroke();
    fill(random(340, 360), random(100), random(100), random(100));
    ellipseMode(CENTER);
    for (let x = 0; x < yvalues.length; x++) {
     circle(x * xspacing, height / 2 + yvalues[x], random(10));
    }
  }
}

//==================Firefly Burnout=======================================

function FireflyBurnout(){
  let w1 = 0;
  let lum = 0;
  let num;
  let swarm = [];
  let change;
  
  this.setup = function() {
    reset();
    createCanvas(windowWidth, windowHeight, WEBGL);
    frameRate(30);
    background(0);
    num = height;
    for (let i = 0; i < num; i++) {
      swarm.push(new Firefly());
    }
  }
  
  this.draw = function() {
    // background(0);
    if (frameCount == 1){
      //background(0);
      frameRate(30);
      change = int(random(500, 2000));
      w1 = 0;
    }

    for(let i=0; i < swarm.length; i++){
      swarm[i].run();
    }
      push();
      // translate(map(mouseX, 0, width, -width/2, width/2), 
      // map2(mouseY, 0, height, -height/2, height/2), 0);
      noStroke();
      // strokeWeight(random(5, 10));
      // stroke(random(50,100), random(30), 100, lum);
      fill(random(50,100), lum, 100, 10);
      circle(0, 0, w1);
      w1 += 1;
      lum += 0.5;
  
    if (w1 >= windowHeight){
      
      // background(0);
      changeScene();
    }
  
    if (lum == 100){
      lum = 0;
      background(0);
    }

    // if (frameCount == change){
    //   changeScene();
    // }
  }
  
  class Firefly{
    constructor(){
      this.loc = createVector(0, 0, 0);
      this.vel = createVector(0, 0, 0);
      this.ts = random(5);
      this.lum = 100;
    }
  
    run(){
      this.relight();
      this.update();
      this.display();
    }
  
    update(){
      this.a = p5.Vector.random3D();
      this.a.mult(random(3));
      this.vel.add(this.a);
      this.vel.limit(this.ts);
      this.loc.add(this.vel);
      this.lum -= 0.5;
    }
    
    display(){
      push();
      fill(random(70,130), this.lum, this.lum, random(this.lum));
      noStroke()
      translate(this.loc);
      plane(random(10), random(10));
      pop();
      }
    
    relight(){
      if (this.lum <= 0){
        this.lum = 100;
      }
    }
  }
}

//==================Beautfiul Game========================================

function BeautifulGame(){
  let rad;
  let v;
  let turn = 0;
  let num;
  let swarm = [];
  let twists = 1;
  let change;
  
  this.setup = function() {
    rad = height*.3;
    v = height*.1;
    num = height*.5;
    frameRate(15);
    background(10)
    for (let i = 0; i < num; i++) {
      swarm.push(new Bug());
    }
  }
  
  this.draw = function() {
    background(random(50), 20, 100);
    if (frameCount == 1){
      frameRate(15);
      change = int(random(500, 2000));
    }

    lights();
    strokeWeight(1);
    for(let i=0; i < swarm.length; i++){
      swarm[i].run();
    }
    push();
    rotateY(turn);
    // rotateY(map(mouseX, 0, width, -1, 1));
    rotateX(turn);
    // rot3ateX(map(mouseY, 03, width, -1, 1));
    rotateZ(turn);
    //noStroke();
    this.drawTrack(random(90,100), rad, v);
    //drawEdges(height*0.15, rad, v);
    turn += 0.005;
    pop();
    // v = map(mouseX, 0, width, height*.03, height/2);
    // rad = map(mouseY, 0, height, height*.03, height/2);
    let toggle = int(random(0,2));
    if (toggle == 1) twists += 0.5;
    if (toggle == 2) twists -= 0.5;
    if(frameRate%15==0) toggle;
    if (twists == 2) twists = 0.5;

    if (frameCount == change){
      changeScene();
    }
  }
  
  this.drawTrack = function(steps, rad, v) {
    //beginShape(TRIANGLE_STRIP);
    beginShape(TRIANGLE_STRIP);
    fill(10)
    stroke(255)
    //noFill();
    //fill(150, 70, 50, 50)
    //strokeWeight(2);
    //stroke(random(150, 200), 70, 50, 50);
    //noStroke()
    for (let step = 0; step < (steps + 1); step += 1) {
      let u = step * TAU / steps;
      let x = (rad - v * cos(twists * u)) * cos(u);
      let y = (rad - v * cos(twists * u)) * sin(u);
      let z = -v * sin(twists * u);
      vertex(x, y, z);
      x = (rad + v * cos(twists * u)) * cos(u);
      y = (rad + v * cos(twists * u)) * sin(u);
      z = v * sin(twists * u);
      vertex(x, y, z);
    }
    endShape(CLOSE);
  }
  
  this.drawEdges = function(steps, rad, v) {
    for (let step = 0; step < (steps + 1); step += 1) {
      stroke(0);
      fill(random(260, 300), random(100), random(100));
      let u = step * TAU / steps;
      let x = (rad - v * cos(twists * u)) * cos(u);
      let y = (rad - v * cos(twists * u)) * sin(u);
      let z = -v * sin(twists * u);
      push();
      translate(x, y, z);
      //box(10)c
      box(random(6,10))
      pop();
      x = (rad + v * cos(twists * u)) * cos(u);
      y = (rad + v * cos(twists * u)) * sin(u);
      z = v * sin(twists * u);
      push();
      translate(x, y, z);
      box(random(6,10))
      //box(10);
      pop();
    }
  }
  
  class Bug{
    constructor(){
      this.loc = createVector(0, 0, 0);
      this.vel = createVector(0, 0, 0);
      this.rad = random(height*0.1);
      this.ts = random(5);
      this.color = random(360);
    }
  
    run(){
      this.update();
      this.display();
    }
    
    update(){
      this.a = p5.Vector.random3D();
      this.a.mult(random(3));
      this.vel.add(this.a);
      this.vel.limit(this.ts);
      this.loc.add(this.vel);
    }
    
    display(){
      push();
      fill(this.color, random(100), random(100));
      noStroke()
      translate(this.loc);
      plane(random(this.rad), random(20));
      pop();
    }
  }
}

//==================Oblivious Network=====================================

function ObliviousNetwork(){  
  let change; 

  this.setup = function() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    colorMode(HSB, 360, 100, 100, 100);
    background(0, 100, 20);
    frameRate(5);
  }
  
  this.draw = function() {
    if (frameCount == 1){
      frameRate(5);
      change = int(random(500, 2000));
    }

    background(0, 100, random(20));
    rotateX(frameCount * random(0.01));
    rotateY(frameCount * random(0.01));
    rotateZ(frameCount * random(0.01));
    strokeWeight(2);
    stroke(175, random(100), random(100));
    // noFill();
    fill(0, 100, random(100));
    cone(width*.25, height*.25, int(random(5,10)), 10);
    push();
    rotate(random(90));
    cone(width*.25, height*.25, int(random(5,10)), 10);
    pop();
    push();
    rotate(random(90, 180));
    cone(width*.25, height*.25, int(random(5,10)), 10);
    pop();
    push();
    rotate(random(180, 270));
    cone(width*.25, height*.25, int(random(5,10)), 10);
    pop()

    if (frameCount == change){
      changeScene();
    }
  }
}

//=================Delicate Feline======================//

function DelicateFeline(){
let swarm = [];
let num;
let tileCount;
let change;

this.setup = function() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
  num = height*.5;
  frameRate(10);
  tileCount = height*0.1;
  background(0);
  for (let i = 0; i < num; i++) {
    swarm.push(new Pixel());
  }
}

this.draw = function() {
  if (frameCount==1){
    frameRate(10)
    change = int(random(500, 2000));
  }
  //background(0);

  //grid
  fill(0);
  push();
  translate(random(-width), random(-height));
  this.grid();
  pop();
  rotateX(frameCount * 0.001);
  rotateY(frameCount * 0.001);
  rotateZ(frameCount * 0.001);
  scale(random(0.65, 0.7));
  for(let i=0; i < swarm.length; i++){
    swarm[i].run();
  }
  if (frameCount == change){
    changeScene();
  }
}

this.grid = function(){
  for (let gridY = 0; gridY <tileCount; gridY++) {
    for (let gridX = 0; gridX < tileCount; gridX++) {
      let posX = (width / tileCount) * gridX;
      let posY = (height / tileCount) * gridY;
      noStroke();
      //stroke(100, 100, 100);
      //noFill();
      rect(posX, posY, width/tileCount, height/tileCount);
      let toggle = floor(random(1, 5));
      
      if (toggle == 1){
  
        fill(100, 100, random(100), random(100));
      } else {
        fill(0);
      }
    }
  }
  
}

class Pixel{
  constructor(){
    this.angle = createVector();
    this.vel = createVector(0, 0, 0);
    this.amp = createVector(random(20, width/2), random(20, height/2), random(20, height/2));
    this.rad = random(height*0.1);
    this.ts = random(5);
    this.color = random(250,300);
    this.sat = random(100);
    this.lum = random(100);
    this.alpha = 100;
  }

  run(){
    this.update();
    this.display();
  }
  
  update(){
    this.accel = createVector(random(-0.001, 0.001), random(-0.001, 0.001), random(-0.001, 0.001));
    this.vel.add(this.accel);
    this.angle.add(this.vel);
  }
  
  display(){
    let x = sin(this.angle.x) * this.amp.x;
    let y = sin(this.angle.y) * this.amp.y;
    let z = sin(this.angle.z) * this.amp.z;
    push();
    fill(this.color, this.sat, this.lum, random(10,70));
    // fill(255, 10)
    // noStroke();
    strokeWeight(3);
    // translate(this.loc);
    translate(x, y, z);
    box(this.rad);
    pop();
  }
  
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
}