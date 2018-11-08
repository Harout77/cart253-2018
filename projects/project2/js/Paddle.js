// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults
function Paddle(x,y,w,h,speed,downKey,upKey,leftKey,rightKey,score) {
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
  ////// END NEW /////
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
  ////// NEW //////
  else if (keyIsDown(this.leftKey)) {
    this.vx = -this.speed;
  }
  else if (keyIsDown(this.rightKey)) {
    this.vx = this.speed;

  }
  else {
    this.vy = 0;
    this.vx = 0
  }
}
// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constrain(this.y,0,height-this.h);
  this.x += this.vx;
  this.x = constrain(this.x,0,width-this.w);
}
//////END NEW ////

// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() {
  /////// NEW /////////
  fill(r, g, b);
  noStroke();
  ////// END NEW ////
  rect(this.x,this.y,this.w,this.h);
}

// Paddle.prototype.winner = function() {

// /// If you score 4 points you win
//         if (this.score === 1) {
//           gameOver = true;
//         }
//        }


///// NEW
//
    // Paddle.prototype.Score = function() {
    //     this.score ++ ;
    //     th
    //   }
        //
        // if (this.score === 1) {
        //   this.h = 40;
        // }
        // if (this.score === 2) {
        //   this.h = 30;
        // }
        // if (this.score === 3) {
        //   this.h = 20;
        // }

      ///// END NEW ////
//
//       }
//
//       Paddle.prototype.winner = function() {
//
// /// If you score 4 points you win
//         if (this.score === 1) {
//           this.vx = 0;
//           this.vy = 0;
//           this.x = width/2;
//           this.y = height/2;
//
// // a win screen pops ou when you win
//     background(0)
//
//      textSize(50);
//      textAlign(CENTER);
//      fill (0,255,0);
//      text("WIN",width/2,height/2);
//      fill (0,255,0);
//      textSize(24);
//      text("PRESS RETURN OR ENTER TO PLAY AGAIN",width/2 ,height/2 + 60);
//        if (keyIsDown(13)) {
//      location.reload();    }
//
//         }
//       }
// //// END NEW
