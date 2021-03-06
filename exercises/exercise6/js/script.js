// Broken Basic OO Pong
// by Pippin Barr
//
// A broken primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
var ball;           ////////// FIXED typo to the word ball
var leftPaddle;
var rightPaddle;

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);   ///////// FIXED the word create
  noStroke();
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,10,5); ///// FIXED made the ball slower
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW);  ///// Fixed the controls to behave properly
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87); /////// FIXED the  open parameter with a )
}   ////////// FIXED by added missing closing bracket  }

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();/////// FIXED added the 2 ()
  leftPaddle.update();
  rightPaddle.update();

  if (ball.isOffScreen()) {   ///// FIXED typo isOffScreen and added a { because that's how an if statment begins
    ball.reset();   ////  FIXED added a definition to reset function
  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  rightPaddle.display(); ////// FIXED by closing the ()

}
  ////// FIXED I guess we needed this curley bracket
