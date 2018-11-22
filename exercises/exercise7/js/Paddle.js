function Paddle() {


this.w = 160;
this.h = 20;

this.isMovingLeft = false;
this.isMovingRight = false;

this.pos = createVector(width/ 2, height -60);

this.display = function () {
  rect(this.pos.x, this.pos.y, this.w, this.h);

}

this.move = function(Move) {
  this.pos.x += Move ;
}

this.update = function () {
  if (this.isMovingLeft) {
    this.move(-20);
  }
  else if (this.isMovingRight) {
    this.move(20);
  }
}
}

function keyPressed() {

if (key ==='ArrowLeft') {
  paddle.isMovingLeft = true;
}
else if (key ==='ArrowRight') {
  paddle.isMovingRight = true;
}
}

function keyReleased(){
  paddle.isMovingLeft = false;
  paddle.isMovingRight = false;
}
