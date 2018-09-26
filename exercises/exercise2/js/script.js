/*********************************************************

Exercise 2 - The Artful Dodger V2.0
Harout Kullukian
Starter code for exercise 2.

*********************************************************/

// The position and size of our avatar circle
var avatarX;
var avatarY;
var avatarSize = 50;

// The speed and velocity of our avatar circle
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;


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
var asteroidSpeed = 5;
var asteroidVX = 0;
var asteroidVY = 0;


// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(750,450);

  // Loading assets
  space = loadImage("assets/space.jpg");
  asteroid = loadImage("assets/asteroid.png");

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;


  // Put asteroid at random position
  asteroidX = 0;
  asteroidY = random(0,height);
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
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
  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;


  asteroidVX = asteroidSpeed;
  asteroidX = asteroidX + asteroidVX;

  // Check if the asteroid and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the asteroid
  // and the centre of the avatar is less that their combined radii

  if (dist(asteroidX,asteroidY,avatarX,avatarY) < asteroidSize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    asteroidX = 0;
    asteroidY = random(0,height);
    // Reset the enemy's size and speed
    asteroidSize = 50;
    asteroidSpeed = 5;
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter
    dodges = 0;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    asteroidX = 0;
    asteroidY = random(0,height);
    asteroidSize = 50;
    asteroidSpeed = 5;
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
  }

  // Check if the enemy has moved all the way across the screen
  if (asteroidX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    // Reset the enemy's position to the left at a random height
    asteroidX = 0;
    asteroidY = random(0,height);
    // Increase the enemy's speed and size to make the game harder
  }
  // // Display the current number of successful in the console
  // console.log(dodges);


  // The player is black
  fill(0);
  // // Draw the player as a circle
  ellipse(avatarX,avatarY,avatarSize,avatarSize);
  //



 //Display score
  textSize(20);
  fill(255,255,255);
  text("Score: " + dodges, 50, 50);



image(asteroid,asteroidX,asteroidY);



}
