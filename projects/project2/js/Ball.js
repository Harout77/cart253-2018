// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Ball constructor
//
// set up color for random rgb

// Sets the properties with the provided arguments
function Ball(x, y, vx, vy, size, speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
}
////// NEW //////
///// Properties for the bad ball ///////
function BadBall(x, y, vx, vy, size, speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
}

//// NEW /////
var r, g, b;
var hitsound;
var losesound;
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
  hitsound = new Audio("assets/sounds/hit.wav");
  losesound = new Audio("assets/sounds/lose.wav");
}

////// END NEW ///////
// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Ball.prototype.update = function() {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y, 0, height - this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    this.vy = -this.vy;

    ///// NEW /////
    /// Play beep at each collision
    beepSFX.currentTime = 0;
    beepSFX.play();
  }
}
BadBall.prototype.update = function() {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y, 0, height - this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    this.vy = -this.vy;

    ///// NEW /////
    /// Play beep at each collision
    hitsound.currentTime = 0;
    hitsound.play();
  }
}
// isOffScreen()
//
// Checks if the ball has moved off the screen and, if so, returns true.
// Otherwise it returns false.
Ball.prototype.isOffScreen = function() {
  // Check for going off screen and reset if so
  if (this.x + this.size < 0 || this.x > width) {
    ////// NEW /////
    ///Play sound at each collision
    losesound.currentTime = 0;
    losesound.play();
    ///// END NEW //////
    return true;
  } else {
    return false;
  }
}
BadBall.prototype.isOffScreen = function() {
  // Check for going off screen and reset if so
  if (this.x + this.size < 0 || this.x > width) {
    return true;
  } else {
    return false;
  }
}
// display()
//
// Draw the ball as a rectangle on the screen
Ball.prototype.display = function() {
  ////// NEW ///////
  //// Randomize the color of the ball
  fill(r, g, b);
  noStroke();
  rect(this.x, this.y, this.size, this.size);
}
BadBall.prototype.display = function() {
  ////// NEW ///////
  //// Randomize the color of the ball
  fill(255, 0, 0);
  noStroke();
  rect(this.x, this.y, this.size, this.size);
}
// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Ball.prototype.handleCollision = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so, move ball back to previous position (by subtracting current velocity)
      this.x -= this.vx;
      this.y -= this.vy;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
      this.vy = -this.vy;

      ////// NEW /////
      ///Play sound at each collision
      beepSFX.currentTime = 0;
      beepSFX.play();
      ///// END NEW //////
    }
  }
}
/////// NEW //////

BadBall.prototype.handleCollision = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so, move ball back to previous position (by subtracting current velocity)
      this.x -= this.vx;
      this.y -= this.vy;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
      this.vy = -this.vy;

      // if (leftPaddle === paddle){
      //   leftPaddle.score-- ;
      // }
      //   if (paddle === rightPaddle){
      //   rightPaddle.score--;
      // }

      paddle.score-- ;
      paddle.score = constrain(paddle.score,0,11)




      ////// NEW /////
      ///Play sound at each collision
      hitsound.currentTime = 0;
      hitsound.play();
      ///// END NEW //////
    }
  }
}
// reset()
//
// Set position back to the middle of the screen
Ball.prototype.reset = function(winner) {
  this.x = width / 2;
  this.y = height / 2;
  ///// NEW ////
  this.vy = random(-5, 10);
  // //  Speed increase with each RESET
  this.speed = -this.speed;
  this.vx = -1 * this.vx;
  // ball gets bigger also;
  this.size = random(7, 30);


  // Change colors randomly at each reset
  r = random(255);
  g = random(255);
  b = random(255);
  /////  End New ////
}
// Set position back to the middle of the screen
BadBall.prototype.reset = function(winner) {
  this.x = width / 2;
  this.y = height / 2;
  ///// NEW ////
  this.vy = random(-5, 10);
  // //  Speed increase with each RESET
  this.speed = -this.speed;
  this.vx = -1 * this.vx;
  // ball gets bigger also;
  this.size = random(7, 30);
}
