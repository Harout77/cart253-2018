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
  var leftPaddle1;
  var rightPaddle1;

  this.setup = function() {

    //// create fullscreen canvas /////
    createCanvas(windowWidth, windowHeight);
    ///// setup variables
    balls = new Ball1(width/2,height/2,5,5,10,5);
    // Create the right Paddle1 with UP and DOWN as controls
    rightPaddle1 = new Paddle1(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW);
    // Create the left Paddle1 with W and S as controls
    // Keycodes 83 and 87 are W and S respectively
    leftPaddle1 = new Paddle1(0,height/2,10,60,10,83,87);

  }



  this.draw = function() {

    background(0);

  leftPaddle1.handleInput();
  rightPaddle1.handleInput();

  balls.update();
  leftPaddle1.update();
  rightPaddle1.update();

  if (balls.isOffScreen()) {
    balls.reset();
  }

  balls.handleCollision(leftPaddle1);
  balls.handleCollision(rightPaddle1);

  balls.display();
  leftPaddle1.display();
  rightPaddle1.display();
  }
  }
