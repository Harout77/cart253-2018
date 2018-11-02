// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor      /// FIXED this line should be commented

// Sets the properties with the provided arguments or defaults   ///// FIXED This line should be commented also be commented
function Paddle(x,y,w,h,speed,downKey,upKey) {  /// FIXED the typo for the word paddle
  this.x = x;
  this.y = y;
  this.vx = 0;  ///// FIXED typo vx
  this.yv = 0;  ///// FIXED typo vy
  this.w = w;
  this.h = h;
  this.speed = speed; //// FIXED typo extra e
  this.downKey = downKey;
  this.upKey = upKey;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() {   //// FIXED typo mistake in the word prototype
  if (keyIsDownDown(upKey)) {   ///// FIXED typo keyIsDown()
    this.vy = -this.speed;
  }
  else if (keyIsDown(downKey)) {   ///// FIXED typo keyIsDown()
    this.vy = -this.speed;
  }
  else {
    this.vy = 0;  ///// FIXED added this code so that the paddles don't move if not pressing any key
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constrain(this.y,0,height,this.h);   ////// FIXED typo height and switched the - into a ,
}    ////// FIXED the typo constrain

// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() {   //////   FIXED typo to word display and removed an extra )
  rect(this.x,this.y,this.w,this.h);  ///// FIXED rect
}
