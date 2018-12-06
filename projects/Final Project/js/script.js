var mgr;

function setup() {
createCanvas(displayWidth,displayHeight);
// background(0);
mgr = new SceneManager();

mgr.addScene ( Intro );
mgr.addScene ( Game1 );
mgr.addScene ( Game2 );

mgr.showNextScene();

}

function draw() {
mgr.draw();

}

function mousePressed()
{
    mgr.handleEvent("mousePressed");
}

function keyPressed()
{
    // You can optionaly handle the key press at global level...
    switch(key)
    {
        case '1':
            mgr.showScene( Intro );
            break;
        case '2':
            mgr.showScene( Game1 );
            break;
        case '3':
            mgr.showScene( Game2 );
            break;
    }

    // ... then dispatch via the SceneManager.
    mgr.handleEvent("keyPressed");
}


function Intro () {

this.draw = function()
  {
    background("black")
    fill("red");
    textAlign(CENTER);
    textSize(64);
    text('Master Game Project V 1.0', displayWidth / 2, displayHeight /2.5);
    fill("yellow");
    textAlign(CENTER);
    textSize(36);
    text('Press any key to begin', displayWidth / 2, displayHeight /2);
  }
    this.mousePressed = function()
    {
        this.sceneManager.showNextScene();
    }
}
//////////// END OF INTRO /////////////

/////////// BEGIN GAME 1 ///////////////

var paddle;
var ball;
var star = [];
var playing = false;
var win = false

function Game1() {


this.setup = function() {

  //// create fullscreen canvas /////
  createCanvas(windowWidth, windowHeight);
  ///// setup variables
  paddle = new Paddle();
  ball = new Ball();
  // star = new Star();
  //// Array of star
  for (let i = 0; i < random(20, 50); i++) {
    star.push(new Star());
  }

}



this.draw = function() {

  background(0);

  //// Paddle functions /////
  paddle.display();
  if (playing) paddle.update();
  if (playing) paddle.edges();


  //// Ball functions /////

  ball.display();
  if (playing) ball.update();
  if (playing) ball.bounce();
  if (ball.collides(paddle) && ball.d.y > 0)
    ball.d.y *= -1;


  //// Shaped function /////
  for (var s = 0; s < star.length; s++) {
    star[s].display();

    if (ball.break(star[s])) {
      ///// break the star
      star.splice(s, 1);
    }
    ///// bounce back when break
    ball.d.y *= -1;
  }
  if (ball.pos.y > height) {
    plawing = false;
    ball.pos = createVector(width / 2, height / 2);
  }
  if (star.length === 0){
    win = true;
    playing = false;
  }
}
this.mousePressed = function()
{
    this.sceneManager.showNextScene();
}
}

/////////////// END OF GAME 1 /////////////


function Game2(){
  // Variable to contain the objects representing our Ball1 and Paddle1s
  var balls;
  var leftPaddle;
  var rightPaddle;
  ////// NEW //////
  // Track whether the game is over
  var gameOver = false;
  // var intro = true;

  var badballs = [];
  var numBalls = 2;

  this.setup = function() {

    //// create fullscreen canvas /////
    createCanvas(640, 480);
  // Create a ball
  balls = new Ball1(width / 2, height / 2, 5, 5, 10, 5);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle1(width - 20, height / 2, 10, 60, 10, DOWN_ARROW, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, 0);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle1(5, height / 2, 10, 60, 10, 83, 87, 65, 68, 0);
  //// NEW /////
  //setup the background colours
  startColor = color(255, 255, 255);
  newColor = color(random(255), random(255), random(255));
  amt = 0;
  for (var i = 0; i < numBalls; i++) {
  badballs.push(new BadBall(width / 2, height / 2, random(-5, 5), random(-5, 5), 10, 5));
  }
}



  this.draw = function() {
    background(0);
      // if (intro) {
      //   setTimeout(startGame, 3000);
      //   Intro1();
      // } else if (!gameOver) {

        backgroundRandomizer();
        displayScore();
        leftPaddle.handleInput();
        rightPaddle.handleInput();

        balls.update();
        leftPaddle.update();
        rightPaddle.update();

        ///// NEW /////
        if (balls.isOffScreen() && ball.vx > 0) {
          leftPaddle.score++;
          balls.reset();
        } else if (balls.isOffScreen() && ball.vx < 0) {
          rightPaddle.score++;
          balls.reset();
        }

        for (var i = 0; i < badballs.length; i++) {
          badballs[i].update();
          if (badballs[i].isOffScreen()) {
            badballs[i].reset();
          }
          badballs[i].handleCollision(leftPaddle);
          badballs[i].handleCollision(rightPaddle);
          badballs[i].display();
        }
        balls.handleCollision(leftPaddle);
        balls.handleCollision(rightPaddle);

        balls.display();
        leftPaddle.display();
        rightPaddle.display();


        if (rightPaddle.score === 11 || leftPaddle.score === 11) {
          gameOver = true;
        }
       else if (gameOver) {
        gameover();
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
    }
    }
