function Star(pos, r) {
  this.pos = createVector(random(100, width - 100), random(100, height - 400));
  this.r = random(20, 80);

  this.display = function() {
    push();
    translate(this.pos.x, this.pos.y);
    beginShape();





    beginShape();
    for(var i = 0; i < 10; i++) {


      var x = cos(radians(i * 36)) * this.r;
      var y = sin(radians(i * 36)) * this.r;
      vertex(x, y);


      if(this.r == 100) {
        this.r = 50;
      } else {
        this.r = 100;
      }
    }

    endShape(CLOSE);
    pop();
  }
}
