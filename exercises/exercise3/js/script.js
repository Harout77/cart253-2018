/******************************************************************************
Where's Sausage Dog 2.0?
by Harout Kullukian

An algorithmic version of a Where's Wally searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
var targetX;
var targetY;
var targetImage;

//velocity
var vx;
var vy;
var speedChange = 1;
var maxSpeed = 2;
var radius = 100;

// The ten decoy images
var decoyImage1;
var decoyImage2;
var decoyImage3;
var decoyImage4;
var decoyImage5;
var decoyImage6;
var decoyImage7;
var decoyImage8;
var decoyImage9;
var decoyImage10;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
var numDecoys ;
var numDecoysMin  = 50;
var numDecoysMax  = 500

// randomizer
function randomizer() {
  numDecoys = random(numDecoysMin,numDecoysMax);
}
// Keep track of whether they've won
var gameOver = false;

//custom sound
var win = new Audio("assets/win.wav");

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");

  //preload the audio
  win = new Audio("assets/win.wav");

}
// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  reset();


}

function draw() {


  if (gameOver) {
    // clear the decoys
    background('#ffff00')
    // Prepare our typography
    textFont("Helvetica");
    textSize(128);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255));
    // Tell them they won!
    text("YASS YOU FOUND ME!!!!!",width/2,height/2);
    noFill();
    stroke(random(255));
    strokeWeight(10);
    ellipse(targetX,targetY,targetImage.width,targetImage.height, radius * 2);

    //text bottom to replay
    textFont("Helvetica");
    textSize(72);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255));
    // Tell them they won!
    text("PRESS ANY KEY TO CONTINUE",width/2 ,height/1.5);
    noFill();
    stroke(random(255));
    strokeWeight(10);

    vx += random(-speedChange,speedChange);
    vy += random(-speedChange,speedChange);
    targetX += vx;
    targetY += vy;
    win.play();

    if (keyIsPressed === true) {
      location.reload();    }
  }
}

// this sets up the game and also resets it
function reset() {
  background("#ffff00");

  imageMode(CENTER);

  // Make the decoys random at each refresh
  randomizer();
  // Use a for loop to draw as many decoys as we need
  for (var i = 0; i < numDecoys; i++) {
    // Choose a random location for this decoy
    var x = random(0,width);
    var y = random(0,height);
    // Generate a random number we can use for probability
    var r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough
    if (r < 0.1) {
      image(decoyImage1,x,y);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y);
    }
  }
  // Once we've displayed all decoys, we choose a location for the target

  targetX = random(0,width);
  targetY = random(0,height);

  // Prevent the target to spawn inder the searchbox
  while (targetX > windowWidth - 250 && targetY < 300){
    targetX = random(0,width);
    targetY = random(0,height);
  }
  // And draw it (this means it will always be on top)
  image(targetImage,targetX,targetY);

  gameOver = false ;
searchBox();

}
//searchbox function
function searchBox() {
  //draw the searchbox
  fill(0,255,0);
  rect(width-240,2,220,150);
  //Insert the target image inside the rectangle
  image(targetImage,width-100,50);
  // Insert text
  fill(0,0,0);
  textSize(32);
  textAlign(LEFT,CENTER);
  text('Find Me',width-190,125);

}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // Check if the mouse is in the x range of the target
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the mouse is also in the y range of the target
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }
}
