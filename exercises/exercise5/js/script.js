// Advanced OO Pong
// by Harout Kullukian
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;
////// NEW /////
let amt, startColor, newColor;

var beepSFX;

///// END NEW /////
// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640, 480);
  // Create a ball
  ball = new Ball(width / 2, height / 2, 5, 5, 10, 5);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width - 20, height / 2, 10, 60, 10, DOWN_ARROW, UP_ARROW, 50, 0);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(10, height / 2, 10, 60, 10, 83, 87, 50, 0);

  //// NEW /////
  //setup the background colours
  startColor = color(255, 255, 255);
  newColor = color(random(255), random(255), random(255));
  amt = 0;

  //// END NEW //////
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);
  backgroundRandomizer();
  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();
  ///// NEW /////
  if (ball.isOffScreen() && ball.vx > 0) {
    leftPaddle.Score();
    ball.reset();
  } else if (ball.isOffScreen() && ball.vx < 0) {
    rightPaddle.Score();
    ball.reset();
  }
  // rightPaddle.Score();
  ///// END NEW ////

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  ///// NEW /////
  leftPaddle.winner();
  rightPaddle.winner();
  ///// END NEW ////
  leftPaddle.display();
  rightPaddle.display();
}
