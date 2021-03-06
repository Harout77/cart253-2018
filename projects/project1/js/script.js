/******************************************************

Game - halloween Chaser
Harout Kullukian
A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/

// Track whether the game is over
var gameOver = false;

var title = true;
// ghost position, size, velocity
var ghost;
var ghostX;
var ghostY;
var ghostRadius = 50;
var ghostVX = 0;
var ghostVY = 0;
var ghostMaxSpeed = 2;
// ghost health
var ghostHealth;
var ghostMaxHealth = 255;
// ghost fill color
var ghostFill = 50;

// new ghost level up
var ghost2;
var ghost3;

// bones position, size, velocity
var bones;
var bonesX
var bonesY
var bonestX;
var bonestY;
var bonesRadius = 25;
var bonesVX;
var bonesVY;
var bonesMaxSpeed = 4;

// bones health
var bonesHealth;
var bonesMaxHealth = 100;
// bones fill color
var bonesFill = 200;

// Amount of health obtained per frame of "eating" the bones
var eatHealth = 10;
// Number of bones eaten during the game
var bonesEaten = 0;

// halloween background image, font and sound
var backgroundimage;
var halloweenFont;
var halloweenSound;

//////////// NEW////////
function preload() {
  ghost = loadImage("assets/images/ghost.png");
  ghost2 = loadImage("assets/images/ghost2.png");
  ghost3 = loadImage("assets/images/ghost3.png");
  bones = loadImage("assets/images/bones.png");
  backgroundimage = loadImage("assets/images/background.jpg");
  halloweenFont = loadFont("assets/halloween.ttf");
  halloweenSound = new Audio("assets/sounds/sound.wav");
  }
//////////// END NEW////////
// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(1000,700);
  noStroke();
  setupbones();
  setupghost();
  halloweenSound.play();
  //setTimeout(titlescreen,10000);
}
// setupbones()
//
// Initialises bones's position, velocity, and health
function setupbones() {

  bonesVX = -bonesMaxSpeed;
  bonesVY = bonesMaxSpeed;
  bonesHealth = bonesMaxHealth;

  bonestX = random(0,1000);
  bonestY = random(0,1000);
  bonesX = random(0,width);
  bonesY = random(0,height);
}

// setupghost()
//
// Initialises ghost position and health
function setupghost() {
  ghostX = 4*width/5;
  ghostY = height/2;
  ghostHealth = ghostMaxHealth;

}

// draw()
//
// While the game is active, checks input
// updates positions of bones and ghost,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  background(backgroundimage);
  if (title){
    setTimeout(startGame,3000);
    titlescreen();
  }
  else if (!gameOver) {
    handleInput();
    ui()
    moveghost();
    movebones();
    updateHealth();
    checkEating();
    drawbones();
    drawghost();
  }
  else {
    showGameOver();

}
}
// handleInput()
//
// Checks arrow keys and adjusts ghost velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    ghostVX = -ghostMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    ghostVX = ghostMaxSpeed;
  }
  else {
    ghostVX = 0;
  }
  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    ghostVY = -ghostMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    ghostVY = ghostMaxSpeed;
  }
  else {
    ghostVY = 0;
  }
}
//////////// NEW////////
function sprint() {
  // Srpint ability while pressing the space bar
  if (keyIsDown(32)) {
    ghostMaxSpeed = 10;
    // lose health while sprinting
    ghostHealth = constrain(ghostHealth - 1,0,ghostMaxHealth);
  }
  //reset speed if not sprinting
  else {
    ghostMaxSpeed = 2;
  }
}
//////////// END NEW////////
// moveghost()
//
// Updates ghost position based on velocity,
// wraps around the edges.
function moveghost() {
  // Update position
  ghostX += ghostVX;
  ghostY += ghostVY;

  // Wrap when ghost goes off the canvas
  if (ghostX < 0) {
    ghostX += width;
  }
  else if (ghostX > width) {
    ghostX -= width;
  }

  if (ghostY < 0) {
    ghostY += height;
  }
  else if (ghostY > height) {
    ghostY -= height;
  }
  sprint();
}

// updateHealth()
//
// Reduce the ghost's health (every frame)
// Check if the ghost is dead
function updateHealth() {
  // Reduce ghost health, constrain to reasonable range
  ghostHealth = constrain(ghostHealth - 0.5,0,ghostMaxHealth);
  // Check if the ghost is dead
  if (ghostHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}
// checkEating()
//
// Check if the ghost overlaps the bones and updates health of both
function checkEating() {
  // Get distance of ghost to bones
  var d = dist(ghostX,ghostY,bonesX,bonesY);
  // Check if it's an overlap
  if (d < ghostRadius + bonesRadius) {
    // Increase the ghost health
    ghostHealth = constrain(ghostHealth + eatHealth,0,ghostMaxHealth);
    // Reduce the bones health
    bonesHealth = constrain(bonesHealth - eatHealth,0,bonesMaxHealth);

    // Check if the bones died
    if (bonesHealth === 0) {
      // Move the "new" bones to a random position
      bonesX = random(0,width);
      bonesY = random(0,height);
      // Give it full health
      bonesHealth = bonesMaxHealth;
      // Track how many bones were eaten
      bonesEaten++;
    }
  }
}
// movebones()
//
// Moves the bones based on random velocity changes
function movebones() {
  // Change the bones's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the bones
  // will change direction on 5% of frames
    // Set velocity based on random values to get a new direction
    // and speed of movement
    // Use map() to convert from the 0-1 range of the random() function
    // to the appropriate range of velocities for the bones
    bonesVX = map(noise(bonestX),0,1,-bonesMaxSpeed,bonesMaxSpeed);
    bonesVY = map(noise(bonestY),0,1,-bonesMaxSpeed,bonesMaxSpeed);

  // Update bones position based on velocity
   bonesX += bonesVX;
   bonesY += bonesVY;

   if (bonesX < 0) {
     bonesX += width;
   }
   else if (bonesX > width) {
     bonesX -= width;
   }

   if (bonestY < 0) {
     bonesY += height;
   }
   else if (bonesY > height) {
     bonesY -= height;
   }
   bonestX += 0.01;
   bonestY += 0.01;
}
// drawbones()
//
// Draw the bones as an ellipse with alpha based on health
function drawbones() {
  // fill(bonesFill,bonesHealth);
  image(bones,bonesX,bonesY,bonesRadius*2);
}
// drawghost()
//
// Draw the ghost as an ellipse with alpha based on health
function drawghost() {
  push();
  tint(255,ghostHealth);
  // fill(ghostFill,ghostHealth);
  image(ghost,ghostX,ghostY,ghostRadius*2,ghostRadius*2);
  pop();

//////////// NEW////////
// add a next level
  if (bonesEaten >= 5){
    push();
    tint(255,ghostHealth);
    image(ghost2,ghostX,ghostY,ghostRadius*2,ghostRadius*2);
    pop();
  }
  if (bonesEaten >= 10){
    push();
    tint(255,ghostHealth);
    image(ghost3,ghostX,ghostY,ghostRadius*2,ghostRadius*2);
    pop();
  }
  if (bonesEaten === 15 ){
    showWin ();

  }
  //////////// END NEW////////
}
// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  textFont(halloweenFont);
  textSize(64);
  textAlign(CENTER,CENTER);
  fill(255,165,0);
  strokeWeight(4);
  stroke(255,165,0);
  var gameOverText = "GAME OVER\n";
  gameOverText += "You ate " + bonesEaten + " bones\n";
  gameOverText += "before you died."
  text(gameOverText,width/2,height/2);

}
//////////// NEW////////
function showWin () {
    textFont(halloweenFont);
    textSize(64);
    textAlign(CENTER,CENTER);
    fill(255,165,0)
    var wintext = "YOU WIN\n";
    wintext += "You ate " + bonesEaten + " bones\n";
    text(wintext,width/2,height/2);
    textSize(36);
     text("PRESS RETURN OR ENTER TO PLAY AGAIN",width/2 ,height/1.5);
    if (keyIsDown(13)) {
      location.reload();    }
}
function ui () {
  textFont(halloweenFont);
  textSize(24);
  fill(255,165,0);
  text("You ate " + bonesEaten + " bones" ,800,20);
  text("Press the spacebar to sprint", 650,650);

}
function titlescreen(){

  textFont(halloweenFont);
  textSize(64);
  fill(255,165,0);
  text("HALOOWEEN CHASER", 160 ,350);
  textSize(32);
  text("Feed the ghost to stay alive !", 300 ,400);


}

function startGame(){
  title =false;
}
//////////// END NEW////////
