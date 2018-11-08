

let amt, startColor, newColor;

var gameover;


var pixelfont;


//
//
function preload() {
pixelfont = loadFont("assets/font/pixel.ttf");
beepSFX = new Audio("assets/sounds/beep.wav");

//
 }

function Intro() {

background(0)
  textFont(pixelfont);
  textSize(38);
  fill(255,0,0);
  text("PONG DELUX", width/5 ,height/2);
}

function startGame(){
  intro =false;
}

// function to randomize the background colour
function backgroundRandomizer(){
    background(lerpColor(startColor, newColor, amt));
    amt += 0.01;
    if(amt >= 1){
      amt = 0.0;
      startColor = newColor;
      newColor = color(random(255),random(255),random(255)); }
  }





  ///// NEW

function gameover() {

background(0)
textFont(pixelfont);
textSize(38);
fill(0,255,0);
text("PONG DELUX", width/5 ,height/2);
}
  //// END NEW
