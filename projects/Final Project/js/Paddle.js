function Paddle() {

  //// width and height f the paddle ////
  this.w = 160;
  this.h = 20;
  ///// check if it's moving /////
  this.isMovingLeft = false;
  this.isMovingRight = false;

  ///// display the position of the paddle ////
  this.pos = createVector(width / 2, height - 60);

  ///// Display the paddle //////
  this.display = function() {
    fill(57, 255, 20);
    rect(this.pos.x, this.pos.y, this.w, this.h);

  }

  ////// move the paddle /////
  this.move = function(Move) {
    this.pos.x += Move;
  }
  ///// chose the side to move /////
  this.update = function() {
    ////// MOVE LEFT //////
    if (this.isMovingLeft) {
      this.move(-20);
    }
    ////// MOVE RIGHT //////
    else if (this.isMovingRight) {
      this.move(20);
    }
  }

  ///// DETECT CANVAS EGES //////

  this.edges = function() {
    if (this.pos.x < 0) this.pos.x = 0;
    else if (this.pos.x > width - this.w) this.pos.x = width - this.w;
  }


}
////// MOVE WITH ARROW KEYS ////
function keyPressed() {
  ///// LEFT ARROW KEY /////
  if (key === 'ArrowLeft') {
    paddle.isMovingLeft = true;
  }
  ///// RIGHT ARROW KEY ////
  else if (key === 'ArrowRight') {
    paddle.isMovingRight = true;
  }
  else if (key ==='a') {
    playing = true;
    win = false;

  }
}
///// STOP IF NOW PRESSING /////
function keyReleased() {
  paddle.isMovingLeft = false;
  paddle.isMovingRight = false;
}
