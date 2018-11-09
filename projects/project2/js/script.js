// PONG DELUX
// by Harout Kullukian
//
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
////// NEW //////
// Track whether the game is over
var gameOver = false;
var intro = true;

var badballs = [];
var numBalls = 2;
// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640, 480);
  // Create a ball
  ball = new Ball(width / 2, height / 2, 5, 5, 10, 5);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width - 20, height / 2, 10, 60, 10, DOWN_ARROW, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, 0);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(5, height / 2, 10, 60, 10, 83, 87, 65, 68, 0);
  //// NEW /////
  //setup the background colours
  startColor = color(255, 255, 255);
  newColor = color(random(255), random(255), random(255));
  amt = 0;
  for (var i = 0; i < numBalls; i++) {
    badballs.push(new BadBall(width / 2, height / 2, random(-5, 5), random(-5, 5), 10, 5));
  }

  //// END NEW //////
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);
  if (intro) {
    setTimeout(startGame, 3000);
    Intro();
  } else if (!gameOver) {

    backgroundRandomizer();
    displayScore();
    leftPaddle.handleInput();
    rightPaddle.handleInput();

    ball.update();
    leftPaddle.update();
    rightPaddle.update();

    ///// NEW /////
    if (ball.isOffScreen() && ball.vx > 0) {
      leftPaddle.score++;
      ball.reset();
    } else if (ball.isOffScreen() && ball.vx < 0) {
      rightPaddle.score++;
      ball.reset();
    }

    for (var i = 0; i < badballs.length; i++) {
      badballs[i].update();
      if (badballs[i].isOffScreen()) {
        badballs[i].reset();
      }
      badballs[i].handleCollision(leftPaddle);
      badballs[i].handleCollision(rightPaddle);
      badballs[i].display();
    }
    ball.handleCollision(leftPaddle);
    ball.handleCollision(rightPaddle);

    ball.display();
    leftPaddle.display();
    rightPaddle.display();


    if (rightPaddle.score === 11 || leftPaddle.score === 11) {
      gameOver = true;
    }
  } else if (gameOver) {
    gameover();
  }

}
///// END NEW /////
