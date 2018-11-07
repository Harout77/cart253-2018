

let amt, startColor, newColor;

var intro;
var gameover;




//// NEW /////
//setup the background colours
startColor = color(255, 255, 255);
newColor = color(random(255), random(255), random(255));
amt = 0;

//// END NEW //////










// function to randomize the background colour
function backgroundRandomizer(){
    background(lerpColor(startColor, newColor, amt));
    amt += 0.01;
    if(amt >= 1){
      amt = 0.0;
      startColor = newColor;
      newColor = color(random(255),random(255),random(255)); }
  }
