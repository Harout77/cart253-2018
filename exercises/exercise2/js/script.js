/*********************************************************

Exercise 2 - The Artful Dodger V2.0
Harout Kullukian
Starter code for exercise 2.

*********************************************************/

// The position and size of our ship circle
var ship;
var shipX;
var shipY;
var shipSize = 50;

// The speed and velocity of our ship circle
var shipSpeed = 10;
var shipVX = 0;
var shipVY = 0;


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
var asteroid2;
var asteroid2X;
var asteroid2Y;
var asteroid2Size = 50;

// asteroid2 speed and velocity
var asteroid2Speed = 11;
var asteroid2VX = 0;
var asteroid2VY = 0;
var astroid2SpeedIncrease = 0.5;


// custom font
var star;

// pre load custom font
function preload() {
  star = loadFont("assets/STJEDISE.ttf");
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
  asteroid2 = loadImage("assets/asteroid2.png");

  // Put the ship in the centre
  shipX = width/2;
  shipY = height/2;


  // Put asteroid at random position
  asteroidX = 0;
  asteroidY = random(0,height);
  // Put asteroid at random position
  asteroid2X = 0;
  asteroid2Y = random(0,height);
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
  if (dist(asteroid2X,asteroid2Y,shipX,shipY) < asteroid2Size/2 + shipSize/2) {
    // Tell the player they lost
    // console.log("YOU LOSE!");
    // Reset the astroid's position
    asteroid2X = 0;
    asteroid2Y = random(0,height);
    // Reset the astroid's size and speed
    asteroid2Size = 50;
    asteroid2Speed = 5;
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
    asteroid2X = 0;
    asteroid2Y = random(0,height);
    asteroid2Size = 50;
    asteroid2Speed = 5;
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

  }
  // // Display the current number of successful in the console
  // console.log(dodges);

  // Check if the astroid has moved all the way across the screen
  if (asteroid2X > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    // Reset the astroids's position to the left at a random height
    asteroid2X = 0;
    asteroid2Y = random(0,height);

    // Increase the astroids's speed and size to make the game harder
    asteroidSpeed = asteroidSpeed + astroid2SpeedIncrease;
  }

  // adding the second asteroid if the score is above 5
  if (dodges > 5 )
  {
    asteroid2VX = asteroid2Speed;
    asteroid2X = asteroid2X + asteroid2VX;
    image(asteroid2,asteroid2X,asteroid2Y);
  }





 //Display score
  textFont(star);
  textSize(75);
  fill(255,255,255);
  textAlign(CENTER);
  text("Score " + dodges, width/2, height/8);



image(asteroid,asteroidX,asteroidY);
image(ship,shipX,shipY);




}
