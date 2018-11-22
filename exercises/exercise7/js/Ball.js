function Ball() {

  this.pos = createVector(width / 2, height / 2);
  this.r = 20;


  this.display = function() {
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  }


}
