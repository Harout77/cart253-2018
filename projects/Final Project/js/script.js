/////////****************************************
/////////*                                      *
/////////*     FINAL GAME PROJECT !!!!!         *
/////////*                                      *
/////////*    By HAROUT KULLUKIAN               *
/////////****************************************



// by Harout Kullukian
//
// A Collection of 2 of my final games created combined
// together with a p5.js library Scene Manager.
// SceneManager let's you put together as many as canvases as you want
// on a sigle program and switch between canvas however you want to
//
//
// Written with JavaScript OOP and P5.js.





/// Scene manager variable
var mgr;

function setup() {
createCanvas(displayWidth,displayHeight);
// background(0);
mgr = new SceneManager();

/// Pre loading SCENES (CANVAS)
mgr.addScene ( Intro );
mgr.addScene ( Game1 );
mgr.addScene ( Game2 );
mgr.addScene ( Outro );


mgr.showNextScene();

}

function draw() {
mgr.draw();

}

//// mousePressed EVENT
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
            case '4':
                mgr.showScene( Outro );
                break;
    }

    // ... then dispatch via the SceneManager.
    mgr.handleEvent("keyPressed");
}
///////// BEGIN INTRO /////////////////

function Intro () {

this.draw = function()

////// INTRO TITLE SCENE /////////////
  {
    background("black")
    textFont(pixelfont);
    fill("red");
    textAlign(CENTER);
    textSize(64);
    text('Master Game Project V 1.0', displayWidth / 2, displayHeight /2.5);
    fill("yellow");
    textAlign(CENTER);
    textSize(36);
    text('Choose the game you want to play by clicking left mouse button ', displayWidth / 2, displayHeight /2);
    fill("green")
    text('More games to come in the future', displayWidth / 2, displayHeight /1.8);

    /////////// Function to switch canvas on mouse click ///////////
  }
    this.mousePressed = function()
    {
        this.sceneManager.showNextScene();
    }
}
//////////// END OF INTRO /////////////

/////////// BEGIN GAME 1 ///////////////


/////// Assigning Variables //////////
var paddle;
var ball;
var star = [];
var playing = false;
var win = false;
var intro1 = true;

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
if (intro1){
  Intro1();

} else if (!intro1) {
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

/////////// Function to switch canvas on mouse click ///////////

this.mousePressed = function()
{
    this.sceneManager.showNextScene();
}
}

function Intro1() {

////////// Intro title scene ///////////

  background(0)
  textFont(pixelfont);
  textSize(46);
  fill(255, 0, 0);
  text("BRICK BREAKER", width / 2, height / 5);
  textSize(22)
  textAlign(CENTER)
  text("Brick Breaker is a simple game of breaking shapes",width / 2 , height / 4)
  text("Destroy all the stars to win the game ",width / 2, height / 3.5)
  text("use the arrow keys to move the paddles! ",width / 2, height / 3)
  textSize(22);
  text("Press Enter to begin the game", width / 2, height /2.5)
  if (keyIsDown(13)) {
    intro1 = false
    playing =true

  }
}

}
/////////////// END OF GAME 1 /////////////

/////////////// BEGIN  OF GAME 2 /////////////

function Game2(){
  // Variable to contain the objects representing our Ball1 and Paddle1s
  var balls;
  var leftPaddle1;
  var rightPaddle1;
  var gameOver = false ;
  var intro = true;
  var startGame = false;
  this.setup = function() {

    //// create fullscreen canvas /////
    createCanvas(displayWidth,displayHeight);
    ///// setup variables
    balls = new Ball1(width/2,height/2,5,5,10,5);
    // Create the right Paddle1 with UP and DOWN as controls
    rightPaddle1 = new Paddle1(width - 20, height / 2, 10, 60, 10, DOWN_ARROW, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, 0);
    // Create the left Paddle1 with W and S as controls
    // Keycodes 83 and 87 are W and S respectively
    leftPaddle1 = new Paddle1(5, height / 2, 10, 60, 10, 83, 87, 65, 68, 0);

    //setup the background colours
    startColor = color(255, 255, 255);
    newColor = color(random(255), random(255), random(255));
    amt = 0;
  }

  this.draw = function() {
if(intro) {
  Intro();
}
else if (startGame ){

 //////// Load all functions  /////////////
  backgroundRandomizer();
  displayScore();
  leftPaddle1.handleInput();
  rightPaddle1.handleInput();

  balls.update();
  leftPaddle1.update();
  rightPaddle1.update();

  balls.handleCollision(leftPaddle1);
  balls.handleCollision(rightPaddle1);

  balls.display();
  leftPaddle1.display();
  rightPaddle1.display();

  //////////// Check if ball is off screen and which side add a point /////////////

  if (balls.isOffScreen() && balls.vx > 0) {
      leftPaddle1.score++;
      balls.reset();
    } else if (balls.isOffScreen() && balls.vx < 0) {
      rightPaddle1.score++;
      balls.reset();
    }

    if (rightPaddle1.score === 11 || leftPaddle1.score === 11) {
         gameOver = true;}
       }  if (gameOver) {
        gameover();
    }

}

///////////// Randomize BaCKGROUND Colore ////////////
  function backgroundRandomizer() {
    background(lerpColor(startColor, newColor, amt));
    amt += 0.01;
    if (amt >= 1) {
      amt = 0.0;
      startColor = newColor;
      newColor = color(random(255), random(255), random(255));
    }
  }

  //////////// DISPLAY SCORE /////////////
  function displayScore() {

  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  text(rightPaddle1.score, width / 4 * 3, height / 2);
  text(leftPaddle1.score, width / 4, height / 2);

}
function Intro() {

////////// Intro title scene ///////////

  background(0)
  textFont(pixelfont);
  textSize(46);
  fill(255, 0, 0);
  text("PONG DELUX", width / 2, height / 5);
  textSize(22)
  textAlign(CENTER)
  text("The world is a lonely place. Play pong alone in this big world",width / 2 , height / 4)
  text("Controle both paddle, whichever side gets 11pts you win ! ",width / 2, height / 3.5)
  text("You are a winner anywways, we are all winners in this big vast lonely world ! ",width / 2, height / 3)
  textSize(22);
  text("Press Enter to begin the game", width / 2, height /2.5)
  if (keyIsDown(13)) {
    intro = false
    startGame =true

  }
}
////////// Game Over title scene ///////////
function gameover() {
  startGame = false
  intro = false
  background(0)
  textFont(pixelfont);
  textSize(38);

  ////////// Determine which side won !! ////////////

  if (rightPaddle1.score === 11) {
    fill(0, 255, 0);
    text("RIGHT WON", width / 2, height / 2);
  } else if (leftPaddle1.score === 11) {
    fill(0, 0, 255);
    text("LEFT WON", width / 2, height / 2);
  }

  textSize(18);
  text("PRESS RETURN OR ENTER TO PLAY AGAIN", width / 2, height / 2 + 60);
  if (keyIsDown(13)) {
    location.reload();
  }
}

/////////// Function to switch canvas on mouse click ///////////

this.mousePressed = function()
{
    this.sceneManager.showNextScene();
}
  }
  /////////////// END OF GAME 2 /////////////
  ///////// BEGIN outro /////////////////

  function Outro () {

  this.draw = function()

  ////// INTRO TITLE SCENE /////////////
    {
      background("black")
      fill("red");
      textAlign(CENTER);
      textSize(64);
      text('THANK YOU FOR PLAYING', displayWidth / 2, displayHeight /2.5);
      fill("yellow");
      textAlign(CENTER);
      textSize(36);
      text('Mouse Click to Play again', displayWidth / 2, displayHeight /2);
      fill("green")
      text('Game experience made by Harout Kullukian', displayWidth / 2, displayHeight /1.8);



      /////////// Function to switch canvas on mouse click ///////////
    }
      this.mousePressed = function()
      {
          this.sceneManager.showNextScene();
      }
  }
  //////////// END OF outro /////////////
