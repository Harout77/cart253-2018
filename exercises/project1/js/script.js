/******************************************************

Game - Chaser
Pippin Barr

A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/

// Track whether the game is over
var gameOver = false;

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

// Prey position, size, velocity
var prey;
var preyX;
var preyY;
var preytX;
var preytY;
var preyRadius = 25;
var preyVX;
var preyVY;
var preyMaxSpeed = 4;

// Prey health
var preyHealth;
var preyMaxHealth = 100;
// Prey fill color
var preyFill = 200;

// Amount of health obtained per frame of "eating" the prey
var eatHealth = 10;
// Number of prey eaten during the game
var preyEaten = 0;

function preload() {
  ghost = loadImage("assets/images/ghost.png");
  prey = loadImage("assets/images/bones.png");
}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500,500);

  noStroke();

  setupPrey();
  setupghost();
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {

  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;

  preytX = random(0,1000);
  preytY = random(0,1000);
  preyX = width/5;
  preyY = height/5;

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
// updates positions of prey and ghost,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  background(100,100,200);

  if (!gameOver) {
    handleInput();

    moveghost();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
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
function sprint() {
  // Srpint ability while pressing the space bar
  if (keyIsDown(32)) {
    ghostMaxSpeed = 10;
    ghostHealth = constrain(ghostHealth - 1,0,ghostMaxHealth);

  }
  else {
    ghostMaxSpeed = 2;

  }
}


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
// Check if the ghost overlaps the prey and updates health of both
function checkEating() {
  // Get distance of ghost to prey
  var d = dist(ghostX,ghostY,preyX,preyY);
  // Check if it's an overlap
  if (d < ghostRadius + preyRadius) {
    // Increase the ghost health
    ghostHealth = constrain(ghostHealth + eatHealth,0,ghostMaxHealth);
    // Reduce the prey health
    preyHealth = constrain(preyHealth - eatHealth,0,preyMaxHealth);

    // Check if the prey died
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0,width);
      preyY = random(0,height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten++;
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Change the prey's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the prey
  // will change direction on 5% of frames
    // Set velocity based on random values to get a new direction
    // and speed of movement
    // Use map() to convert from the 0-1 range of the random() function
    // to the appropriate range of velocities for the prey
    preyVX = map(noise(preytX),0,1,-preyMaxSpeed,preyMaxSpeed);
    preyVY = map(noise(preytY),0,1,-preyMaxSpeed,preyMaxSpeed);


  // Update prey position based on velocity
   preyX += preyVX;
   preyY += preyVY;

   if (preyX < 0) {
     preyX += width;
   }
   else if (preyX > width) {
     preyX -= width;
   }

   if (preytY < 0) {
     preyY += height;
   }
   else if (preyY > height) {
     preyY -= height;
   }

   preytX += 0.01;
   preytY += 0.01;

}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  // fill(preyFill,preyHealth);
  image(prey,preyX,preyY,preyRadius*2);
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
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  textSize(32);
  textAlign(CENTER,CENTER);
  fill(0);
  var gameOverText = "GAME OVER\n";
  gameOverText += "You ate " + preyEaten + " prey\n";
  gameOverText += "before you died."
  text(gameOverText,width/2,height/2);
}
