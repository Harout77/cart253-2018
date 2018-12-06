// Paddle1
//
// A class that defines how a Paddle1 behaves, including the ability
// to specify the input keys to move it up and down

// Paddle1 constructor
//
// Sets the properties with the provided arguments or defaults
function Paddle1(x, y, w, h, speed, downKey, upKey, leftKey, rightKey, score) {
  this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.w = w;
    this.h = h;
    this.speed = speed;
    this.downKey = downKey;
    this.upKey = upKey;
    /////// NEW //////
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.score = score;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle1.prototype.handleInput = function() {
  if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
    } else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
    }
    ////// NEW //////
    else if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    } else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;

    } else {
      this.vy = 0;
      this.vx = 0
    }
  }

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle1.prototype.update = function() {
  this.y += this.vy;
    this.y = constrain(this.y, 0, height - this.h);
    this.x += this.vx;
    this.x = constrain(this.x, 0, width - this.w);
}

// display()
//
// Draw the Paddle1 as a rectangle on the screen
Paddle1.prototype.display = function() {
  fill(r, g, b);
    noStroke();
    rect(this.x, this.y, this.w, this.h);}
