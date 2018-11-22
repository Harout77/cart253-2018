function Ball() {
  /////// display the position of the ball ////
  this.pos = createVector(width / 2, height / 2);
  //// the radius of the ball/////
  this.r = 20;
  // ///// direction to move /////
  this.d = createVector(1,1);
  ///// velocity //////
  this.v = createVector(1,1).mult(8);

 ///// Displaying the ball
  this.display = function() {
    fill(255,0,0)
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);

  }
  /// Move the ball //// 
  this.update = function() {

    this.pos.x += this.v.x * this.d.x;
    this.pos.y += this.v.y * this.d.y;


  }

}
