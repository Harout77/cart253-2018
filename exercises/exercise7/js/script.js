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
var star = [];


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
// star = new Star();
//// Array of star
for (let i = 0; i < random(20,50); i++) {
    star.push(new Star());
}



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
if (ball.collides(paddle) && ball.d.y > 0 )
    ball.d.y *= -1;


//// Shaped function /////
for (var s = 0; s < star.length; s++) {
  star[s].display();

   if (ball.break(star[s])) {

       star.splice(s, 1);
     }
     ball.d.y *= -1;
   }
 }
