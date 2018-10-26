// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor
//




// Sets the properties with the provided arguments or defaults
function Paddle(x,y,w,h,speed,downKey,upKey,curve,score) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
  ///// New /////
  // vARIABLE FOR THE SCORE
  this.score = score;
  this.curve = 50;
  // this.inset = 10;
  ///// END NEW //////
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() {
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(this.downKey)) {
    this.vy = this.speed;
  }
  else {
    this.vy = 0;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constrain(this.y,0,height-this.h);

}

// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() {
  fill(r, g, b);
  noStroke();
  rect(this.x,this.y,this.w,this.h,this.curve);
}

///// NEW

    Paddle.prototype.Score = function() {
        this.score ++ ;

        if (this.score === 1) {
          this.h = 40;
        }
        if (this.score === 2) {
          this.h = 30;
        }
        if (this.score === 3) {
          this.h = 20;
        }
      }

      Paddle.prototype.winner = function() {

/// If you score 4 points you win
        if (this.score === 4) {
          this.vx = 0;
          this.vy = 0;
          this.x = width/2;
          this.y = height/2;

// a win screen pops ou when you win
    background(0)

     textSize(50);
     textAlign(CENTER);
     fill (0,255,0);
     text("WIN",width/2,height/2);
     fill (0,255,0);
     textSize(24);
     text("PRESS RETURN OR ENTER TO PLAY AGAIN",width/2 ,height/2 + 60);
       if (keyIsDown(13)) {
     location.reload();    }

        }
      }
//// END NEW
