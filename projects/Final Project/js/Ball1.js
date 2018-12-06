// Ball1
//
// A class to define how a Ball1 behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Ball1 constructor
//
// Sets the properties with the provided arguments
function Ball1(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
}
function BadBall(x, y, vx, vy, size, speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
}
var r, g, b;
var hitsound;
var losesound;
function preload() {
  beepSFX = new Audio("assets/audio/beep.wav");
  hitsound = new Audio("assets/audio/hit.wav");
  losesound = new Audio("assets/audio/lose.wav");
}
// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Ball1.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y,0,height-this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    this.vy = -this.vy;
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
// Checks if the Ball1 has moved off the screen and, if so, returns true.
// Otherwise it returns false.
Ball1.prototype.isOffScreen = function () {
  // Check for going off screen and reset if so
  if (this.x + this.size < 0 || this.x > width) {
    losesound.currentTime = 0;
    losesound.play();
    return true;
  }
  else {
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
// Draw the Ball1 as a rectangle on the screen
Ball1.prototype.display = function () {
  fill(255);
  rect(this.x,this.y,this.size,this.size);
}

// handleCollision(paddle)
//
// Check if this Ball1 overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Ball1.prototype.handleCollision = function(paddle) {
  // Check if the Ball1 overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the Ball1 overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so, move Ball1 back to previous position (by subtracting current velocity)
      this.x -= this.vx;
       this.y -= this.vy;
       // Reverse x velocity to bounce
       this.vx = -this.vx;
       this.vy = -this.vy;
       beepSFX.currentTime = 0;
     beepSFX.play();
    }
  }
}

// reset()
//
// Set position back to the middle of the screen
Ball1.prototype.reset = function () {
  fill(r, g, b);
  noStroke();
  rect(this.x, this.y, this.size, this.size);
}
Ball1.prototype.reset = function () {
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
      paddle.score-- ;
      paddle.score = constrain(paddle.score,0,11)
      ///Play sound at each collision
      hitsound.currentTime = 0;
      hitsound.play();
    }
  }
}
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
