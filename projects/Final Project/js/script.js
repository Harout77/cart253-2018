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
  paddle.update();
  paddle.edges();


  //// Ball functions /////

  ball.display();
  ball.update();
  ball.bounce();
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
}
this.mousePressed = function()
{
    this.sceneManager.showNextScene();
}
}

/////////////// END OF GAME 1 /////////////


function Game2(){

     this.draw = function()
     {
       background("blue")
       fill("black");
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
