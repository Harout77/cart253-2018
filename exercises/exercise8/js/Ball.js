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

  //// boune off the edges of the canvas to prevent off screen
  this.bounce = function() {
    if (this.pos.x < this.r && this.d.x < 0)
             this.d.x *= -1;
    else if (this.pos.x > width - this.r && this.d.x > 0)
             this.d.x *= -1;
    else if (this.pos.y < this.r && this.d.y < 0)
            this.d.y *= -1;
    // else if (this.pos.y > height - this.r && this.d.y > 0)
    //          this.d.y *= -1;
      }

      this.collides = function(paddle) {
      if (this.pos.y < paddle.pos.y &&
          this.pos.y > paddle.pos.y - this.r &&
          this.pos.x > paddle.pos.x - this.r &&
          this.pos.x < paddle.pos.x + paddle.w + this.r)
          {
            return true;
          } else return false ;
      }
      this.break = function(star) {
   var d = dist(this.pos.x, this.pos.y, star.pos.x, star.pos.y);
   if (d < star.r + this.r) {
     return true;
   } else {
     return false;
   }
 }

}
