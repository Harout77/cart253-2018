// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Ball constructor
//
// Sets the properties with the provided arguments
function Ball(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
}
// set up color for random rgb
  var r, g, b;

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Ball.prototype.update = function () {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y,0,height-this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    this.vy = -this.vy;

    beepSFX.currentTime = 0;
    beepSFX.play();
  }
}

// isOffScreen()
//
// Checks if the ball has moved off the screen and, if so, returns true.
// Otherwise it returns false.
Ball.prototype.isOffScreen = function () {
  // Check for going off screen and reset if so
  if (this.x + this.size < 0 || this.x > width) {
    return true;
  }
  else {
    return false;
  }
}

// display()
//
// Draw the ball as a rectangle on the screen
Ball.prototype.display = function () {
  fill(255);
  ellipse(this.x,this.y,this.size,this.size);
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

      beepSFX.currentTime = 0;
      beepSFX.play();
    }
  }

}

// reset()
//
///// NEW /////
// Set position back to the middle of the screen
Ball.prototype.reset = function (winner) {
  this.x = width/2;
  this.y = height/2;
  // this.vx = winner * ball.speed
  // this.vy = random(5,10);

  // Change colors randomly at each reset
  r = random(255);
  g = random(255);
  b = random(255);
}
function backgroundRandomizer(){
    background(lerpColor(startColor, newColor, amt));
    amt += 0.01;
    if(amt >= 1){
      amt = 0.0;
      startColor = newColor;
      newColor = color(random(255),random(255),random(255)); }
  }

    Ball.prototype.score = function() {
    // Update score
    if (ball > width) {
      leftPaddle.score ++;

      // // console.log("leftPaddle.score")
      //
      if (leftPaddle.score === 1) {
        leftPaddle.h = 50
      }
      if (leftPaddle.score === 2 ) {
        leftPaddle.h = 30;

      }
      if (leftPaddle.score === 3 ) {
      leftPaddle.h = 10;
      }
      // else if (leftPaddle.score < 1) {
      // }
      ball.reset(-1);
    }
    if (ball < 0) {
      rightPaddle.score ++;
      // console.log("rightPaddle.score")
      if (leftPaddle.score === 1) {
        rightPaddle.h = 50
      }
      if (leftPaddle.score === 2 ) {
        rightPaddle.h = 30;

      }
      if (leftPaddle.score === 3 ) {
        rightPaddle.h = 10;
      }
          ball.reset(1);

    }
  }






////// END NEW //////
