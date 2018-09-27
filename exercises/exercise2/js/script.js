/*********************************************************

Exercise 2 - The Artful Dodger V2.0
Harout Kullukian
Starter code for exercise 2.

*********************************************************/

// The position and size of our ship circle
var ship;
var shipX;
var shipY;
var shipSize = 100;
var shipSizeRandom;

// The speed and velocity of our ship circle

var shipSpeed = 10;
var shipVX = 0;
var shipVY = 0;
var shipSpeedRandom ;

// How many dodges the player has made
var dodges = 0;

//background image
var space;
var y;

// The position and size of the astroids
var asteroid;
var asteroidX;
var asteroidY;
var asteroidSize = 50;

// asteroid speed and velocity
var asteroidSpeed = 10;
var asteroidVX = 0;
var asteroidVY = 0;
var astroidSpeedIncrease = 0.5;

// The position and size of the astroids2
var bomb;
var bombX;
var bombY;
var bombSize = 50;

// bomb speed and velocity
var bombSpeed = 16;
var bombVX = 0;
var bombVY = 0;
var bombSpeedIncrease = 1;


// custom font
var star;

// pre load custom font
function preload() {
  star = loadFont("assets/STJEDISE.TTF");
}

// setup()
//
// Make the canvas, position the ship and anemy
function setup() {
  // Create our playing area
  createCanvas(windowWidth,windowHeight);

  // Loading assets
  space = loadImage("assets/space.jpg");
  asteroid = loadImage("assets/asteroid.png");
  ship = loadImage("assets/ship.png");
  bomb = loadImage("assets/bomb.png");

  // Put the ship in the centre
  shipX = width/2;
  shipY = height/2;


  // Put asteroid at random position
  asteroidX = 0;
  asteroidY = random(0,height);
  // Put asteroid at random position
  bombX = 0;
  bombY = random(0,height);
}

// draw()
//
// Handle moving the ship and enemy and checking for dodges and
// game over situations.
function draw() {

  // placing the background image

  background(space);

  stroke(226, 204, 0);
  line(0, y, width, y);

  y++;
  if (y > height) {
    y = 0;
  }
  // Default the ship's velocity to 0 in case no key is pressed this frame
  shipVX = 0;
  shipVY = 0;

  // Check which keys are down and set the ship's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    shipVX = -shipSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    shipVX = shipSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    shipVY = -shipSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    shipVY = shipSpeed;
  }

  // Move the ship according to its calculated velocity
  shipX = shipX + shipVX;
  shipY = shipY + shipVY;

 // astroid velocity speed
  asteroidVX = asteroidSpeed;
  asteroidX = asteroidX + asteroidVX;


  // Check if the asteroid and ship overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the asteroid
  // and the centre of the ship is less that their combined radii

  if (dist(asteroidX,asteroidY,shipX,shipY) < asteroidSize/2 + shipSize/2) {
    // Tell the player they lost
    // console.log("YOU LOSE!");
    // Reset the astroid's position
    asteroidX = 0;
    asteroidY = random(0,height);
    // Reset the enemy's size and speed
    asteroidSize = 50;
    asteroidSpeed = 5;
    // Reset the ship's position
    shipX = width/2;
    shipY = height/2;
    // Reset the dodge counter
    dodges = 0;
  }
  if (dist(bombX,bombY,shipX,shipY) < bombSize/2 + shipSize/2) {
    // Tell the player they lost
    // console.log("YOU LOSE!");
    // Reset the astroid's position
    bombX = 0;
    bombY = random(0,height);
    // Reset the astroid's size and speed
    bombSize = 50;
    bombSpeed = 5;
    // Reset the ship's position
    shipX = width/2;
    shipY = height/2;
    // Reset the dodge counter
    dodges = 0;
  }

  // Check if the ship has gone off the screen (cheating!)
  if (shipX < 0 || shipX > width || shipY < 0 || shipY > height) {
    // If they went off the screen they lose in the same way as above.
    // console.log("YOU LOSE!");
    asteroidX = 0;
    asteroidY = random(0,height);
    asteroidSize = 50;
    asteroidSpeed = 5;
    shipX = width/2;
    shipY = height/2;
    dodges = 0;
  }
  // Check if the ship has gone off the screen (cheating!)
  if (shipX < 0 || shipX > width || shipY < 0 || shipY > height) {
    // If they went off the screen they lose in the same way as above.
    // console.log("YOU LOSE!");
    bombX = 0;
    bombY = random(0,height);
    bombSize = 50;
    bombSpeed = 5;
    shipX = width/2;
    shipY = height/2;
    dodges = 0;
  }

  // Check if the astroid has moved all the way across the screen
  if (asteroidX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    // Reset the astroid's position to the left at a random height
    asteroidX = 0;
    asteroidY = random(0,height);
    // Increase the astroid's speed and size to make the game harder
    asteroidSpeed = asteroidSpeed + astroidSpeedIncrease;

    // Ship speed and size randomizer at every score
     shipSpeedRandom = random (-10,20);
     shipSizeRandom = random (-100,100);
     // This is where the speed and size changes at every score
     shipSpeed = shipSpeed + shipSpeedRandom ;
     shipSize = shipSize + shipSizeRandom ;


    // Limit the speed and size randomizer ;
     shipSpeed = constrain(shipSpeed,10,20);
     shipSizeRandom = constrain(shipSize,50,100);

  }

  // Adding a bomb obstacle if the score is 5 and above
  if (dodges >= 5 )
  {
    image(bomb,bombX,bombY);
    bombVX = bombSpeed;
    bombX = bombX + bombVX;
    if ( asteroidX && bombX  > width) {
      // This means the player dodged so update its dodge statistic
      // dodges = dodges + 1;
      // Tell them how many dodges they have made
      // Reset the astroids's position to the left at a random height
      bombX = 0;
      bombY = random(0,height);

      // Increase the astroids's speed and size to make the game harder
      bombSpeed = bombSpeed + bombSpeedIncrease;
    }
  }

 //Display score
  textFont(star);
  textSize(75);
  fill(255,255,255);
  textAlign(CENTER);
  text("Score " + dodges, width/2, height/8);

// Display the astroids and the ship images
image(asteroid,asteroidX,asteroidY);
image(ship,shipX,shipY,shipSize);
}
