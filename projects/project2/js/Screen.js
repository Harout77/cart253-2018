/////// Screen /////
let amt, startColor, newColor;
var pixelfont;


//
//
///// Pre load  asserts
function preload() {
  pixelfont = loadFont("assets/font/pixel.ttf");
  beepSFX = new Audio("assets/sounds/beep.wav");

  ///// Title intro with delay of 3seconds
}

function Intro() {

  background(0)
  textFont(pixelfont);
  textSize(38);
  fill(255, 0, 0);
  text("PONG DELUX", width / 5, height / 2);
}

///// FUNCTION to start the game
function startGame() {
  intro = false;
}

// function to randomize the background colour
function backgroundRandomizer() {
  background(lerpColor(startColor, newColor, amt));
  amt += 0.01;
  if (amt >= 1) {
    amt = 0.0;
    startColor = newColor;
    newColor = color(random(255), random(255), random(255));
  }
}


////// Display the score of both players

function displayScore() {

  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  text(rightPaddle.score, width / 4 * 3, height / 2);
  text(leftPaddle.score, width / 4, height / 2);

}



////// Game Over screen

function gameover() {

  background(0)
  textFont(pixelfont);
  textSize(38);

  if (rightPaddle.score === 11) {
    fill(0, 255, 0);
    text("RIGHT WON", width / 2, height / 2);
  } else if (leftPaddle.score === 11) {
    fill(0, 0, 255);
    text("LEFT WON", width / 2, height / 2);
  }

  textSize(18);
  text("PRESS RETURN OR ENTER TO PLAY AGAIN", width / 2, height / 2 + 60);
  if (keyIsDown(13)) {
    location.reload();
  }

}
