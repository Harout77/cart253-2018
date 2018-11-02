// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor      /// this line should be commented

// Sets the properties with the provided arguments or defaults   ///// This line should be commented also be commented
function Paddle(x,y,w,h,speed,downKey,upKey) {  /// fixed the typo for the word paddle
  this.x = x;
  this.y = y;
  this.vx = 0;  ///// Fixed typo vx
  this.yv = 0;  ///// Fixed typo vy
  this.w = w;
  this.h = h;
  this.speed = speed; //// Fixed typo extra e
  this.downKey = downKey;
  this.upKey = upKey;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() {   //// Fixed typo mistake in the word prototype
  if (keyIsDownDown(upKey)) {   ///// Fixed typo keyIsDown()
    this.vy = -this.speed;
  }
  else if (keyIsDown(downKey)) {   ///// Fixed typo keyIsDown()
    this.vy = -this.speed;
  }
  else {
    this.vy = 0;  ///// Fixed added this code so that the paddles don't move if not pressing any key
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constraint(this.y,0,height,this.h);   ////// Fixed typo height and switched the - into a ,
}

// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.disploy = function()) {
  rectangle(this.x,this.y,this.w,this.h);
}
