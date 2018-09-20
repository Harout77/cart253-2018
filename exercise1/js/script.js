// Exercise 1 - Moving pictures
// Pippin Barr
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

// The added image of a red aballon
  var balloon ;

// The starting position of the balloon
  var balloonX = 0;
  var balloonY = 0;

  // //cirlcle variables
  var cirlceX = 0;
  var circleY = 0;
  var CircleSize = 250;

// preload()
//
// Load the two images we're using before the program starts

function preload() {
  clownImage = loadImage("assets/images/clown.png");
  feltTextureImage = loadImage("assets/images/black-felt-texture.png");
  balloon = loadImage("assets/images/balloon.png");
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

}


// // draw()
// //
// // Moves the felt image linearly
// // Moves the clown face toward the current mouse location
//
function draw() {


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
//   // Display the balloon images

// // Draw a red cirlcle
    
    
    
 /* ellipseMode(CORNER)
  ellipse(cirlceX,circleY,CircleSize,CircleSize);
  fill(255,0,0,1);
  stroke(255,0,0,1); */


  imageMode(CORNER);
  image(balloon,balloonX,balloonY);
  image(balloon,0,0);

// Make the circle move from left to right
  cirlceX += 1;
  balloonX += 1;
    balloonY += 1;
        

}
