// Exercise 1 - Moving pictures
// Harout Kullukian
//
// Starter code for exercise 1.
// It moves two pictures around on the canvas.
// One moves linearly down the screen.
// One moves toward the mouse cursor.


// The image of a clown face
var clownImage;
// The current position of the clown face
var clownImageX;
var clownImageY;

// The transparent image of "felt" that wipes down the canvas
var feltTextureImage;
// The current position of the transparent image of "felt"
var feltTextureImageX;
var feltTextureImageY;

// The variable for the balloon
var balloon;

// The starting position of the balloon
var balloonX =0;
var balloonY =0;

// The variable for the added candy
var candy;

// The current position of the candy
var candyX;
var candyY;

// The variable for the added emoji
var emoji;

// The current position of the emoji
var emojiX;
var emojiY;

// The image of a clown face
var wizard;
// The current position of the clown face
var wizardX;
var wizardY;

// preload()
//
// Load the two images we're using before the program starts

function preload() {
  clownImage = loadImage("assets/images/clown.png");
  feltTextureImage = loadImage("assets/images/black-felt-texture.png");

  // Load the images that I added for the exercise
  balloon = loadImage("assets/images/balloon.png");
  candy = loadImage("assets/images/candy.png");
  emoji = loadImage("assets/images/emoji.png");
  wizard = loadImage("assets/images/wizard.png");
}

// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);


  // Start the clown image at the centre of the canvas
  clownImageX = width/2;
  clownImageY = height/2;

  // Start the felt image perfectly off screen above the canvas
  feltTextureImageX = width/2;
  feltTextureImageY = 0 - feltTextureImage.height/2;

  // We'll use imageMode CENTER for this script
  imageMode(CENTER);

  // Position where the emoji spawn within the canvas
  emojiX = width/2;
  emojiY = height/2;


}

// // draw()
// //
// // Moves the felt image linearly
// // Moves the clown face toward the current mouse location
//
function draw() {

// Clear all repetitive images
  // fill(255,0,0);
  // stroke(100,0,0);
  // background(255,255,255);

   // Move the felt image down by increasing its y position
  feltTextureImageY += 1;
//
//   // Display the felt image
  image(feltTextureImage,feltTextureImageX,feltTextureImageY);
//
//   // Move the clown by moving it 1/10th of its current distance from the mouse
//
//   // Calculate the distance in X and in Y
  var xDistance = mouseX - clownImageX;
  var yDistance = mouseY - clownImageY;
//   // Add 1/10th of the x and y distance to the clown's current (x,y) location
  clownImageX = clownImageX + xDistance/10;
  clownImageY = clownImageY + yDistance/10;

//   // Display the clown image
  image(clownImage,clownImageX,clownImageY);
//
  // Display image of the ballon
  imageMode(CORNER);
  image(balloon,balloonX,balloonY);

  // Make the balloon move from left to right
  balloonX += 1;

  // Make the candy exactly follow the mnouse
  candyX = mouseX;
  candyY = mouseY;
  image(candy,candyX,candyY);
//
//   //   // Calculate the distance in X and in Y for the emoji face
//     var xDistance = mouseX - emojiX;
//     var yDistance = mouseY - emojiY;
// // Make the emoji move slower than the clown face
//   emojiX = emojiX + xDistance/15;
//   emojiY = emojiY + yDistance/15;

// Using lerp to make the emoji follow the mouse slower than the clown
var d = dist(emojiX,emojiY,mouseX,mouseY);

emojiX = lerp(emojiX,mouseX,2/d);
emojiY = lerp(emojiY,mouseY,2/d);

  //   // Display the emoji image
  image(emoji,emojiX,emojiY);


  wizardX += 1;
  wizardY += 1;


  image(wizard,wizardX,wizardY);


}
