function Paddle() {


this.w = 160;
this.h = 20;

// this.isMovingLeft = false;
// this.isMovingRight = false;

this.pos = createVector(width/ 2, height -40);

this.display = function () {
  rect(this.pos.x, this.pos.y, this.w, this.h);

}

this.move = function(Move) {
  this.pos.x += Move ;
}

}
