/*****************
BREAKER PROTOTYPE

HAROUT KULLUKIAN


This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// preload()
//
// Description of preload

///// VARIALES FOR MY GAME /////
var paddle;
var ball;


////// LOAD ASSETS /////

function preload() {

}


// setup()
//
// Description of setup

function setup() {

createCanvas(windowWidth, windowHeight);
paddle = new Paddle();
ball = new Ball();



}


// draw()
//
// Description of draw()

function draw() {

background(0);

//// Paddle functions /////
paddle.display();
paddle.update();
paddle.edges();


//// Ball functions /////

ball.display();
ball.update();
ball.bounce();




}
