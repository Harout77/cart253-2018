  // Pong
  // by Pippin Barr
  //
  // A primitive implementation of Pong with no scoring system
  // just the ability to play the game with the keyboard.

  // Game colors
  // var bgColor = 0;
  // var fgColor;

  // BALL

  // Basic definition of a ball object with its key properties of
  // position, size, velocity, and speed
  var ball = {
    x: 0,
    y: 0,
    size: 20,
    vx: 0,
    vy: 0,
    speed: 5,
  }

  // PADDLES

  // How far in from the walls the paddles should be drawn on x
  var paddleInset = 50;

  //////// New ////////
  // LEFT PADDLE

  // Basic definition of a left paddle object with its key properties of
  // position, size, velocity, and speed
  var leftPaddle = {
    x: 0,
    y: 0,
    w: 20,
    h: 70,
    vx: 0,
    vy: 0,
    speed: 7,
    upKeyCode: 87, // The key code for W
    downKeyCode: 83, // The key code for S
    score: 0,
  }

  // RIGHT PADDLE

  // Basic definition of a left paddle object with its key properties of
  // position, size, velocity, and speed
  var rightPaddle = {
    x: 0,
    y: 0,
    w: 20,
    h: 70,
    vx: 0,
    vy: 0,
    speed: 7,
    upKeyCode: 38, // The key code for the UP ARROW
    downKeyCode: 40, // The key code for the DOWN ARROW
    score: 0,
  }
  // set up color for random rgb
  var r, g, b;
  // background colour chaning variables
  let amt, startColor, newColor;
  //////// END New ////////
  // A variable to hold the beep sound we will play on bouncing
  var beepSFX;

  // preload()
  //
  // Loads the beep audio for the sound of bouncing
  function preload() {
    beepSFX = new Audio("assets/sounds/beep.wav");
  }
  // setup()
  //
  // Creates the canvas, sets up the drawing modes,
  // Sets initial values for paddle and ball positions
  // and velocities.
  function setup() {
    // Create canvas and set drawing modes
    createCanvas(640,480);
    rectMode(CENTER);
    noStroke();
    //setup the background colours
      startColor = color(255,255,255);
      newColor = color(random(255),random(255),random(255));
      amt = 0;

    // fgColor = color(255,0,0);
    // fill(fgColor);

    setupPaddles();
    setupBall();


  }

  // setupPaddles()
  //
  // Sets the positions of the two paddles
  function setupPaddles() {
    // Initialise the left paddle
    leftPaddle.x = paddleInset;
    leftPaddle.y = height/2;

    // Initialise the right paddle
    rightPaddle.x = width - paddleInset;
    rightPaddle.y = height/2;
  }

  // setupBall()
  //
  // Sets the position and velocity of the ball
  function setupBall() {
    ball.x = width/2;
    ball.y = height/2;
    ball.vx = ball.speed;
    ball.vy = ball.speed;
  }

  // draw()
  //
  // Calls the appropriate functions to run the game
  function draw() {
    // Fill the background using lerp randomizer
    backgroundrandomizer()
    // Handle input
    // Notice how we're using the SAME FUNCTION to handle the input
    // for the two paddles!
    handleInput(leftPaddle);
    handleInput(rightPaddle);

    // Update positions of all objects
    // Notice how we're using the SAME FUNCTION to handle the input
    // for all three objects!
    updatePosition(leftPaddle);
    updatePosition(rightPaddle);
    updatePosition(ball);

    // Handle collisions
    handleBallWallCollision();
    handleBallPaddleCollision(leftPaddle);
    handleBallPaddleCollision(rightPaddle);

    // Handle the ball going off screen
    handleBallOffScreen();

    // Display the paddles and ball
    displayPaddle(leftPaddle);
    displayPaddle(rightPaddle);
    displayBall();
    win();
  }


  // handleInput(paddle)
  //
  // Updates the paddle's velocity based on whether one of its movement
  // keys are pressed or not.
  // Takes one parameter: the paddle to handle.
  function handleInput(paddle) {

    // Set the velocity based on whether one or neither of the keys is pressed

    // NOTE how we can change properties in the object, like .vy and they will
    // actually CHANGE THE OBJECT PASSED IN, this allows us to change the velocity
    // of WHICHEVER paddle is passed as a parameter by changing it's .vy.

    // UNLIKE most variables passed into functions, which just pass their VALUE,
    // when we pass JAVASCRIPT OBJECTS into functions it's the object itself that
    // gets passed, so we can change its properties etc.

    // Check whether the upKeyCode is being pressed
    // NOTE how this relies on the paddle passed as a parameter having the
    // property .upKey
    if (keyIsDown(paddle.upKeyCode)) {
      // Move up
      paddle.vy = -paddle.speed;
    }
    // Otherwise if the .downKeyCode is being pressed
    else if (keyIsDown(paddle.downKeyCode)) {
      // Move down
      paddle.vy = paddle.speed;
    }
    else {
      // Otherwise stop moving
      paddle.vy = 0;
    }
  }

  // updatePosition(object)
  //
  // Sets the position of the object passed in based on its velocity
  // Takes one parameter: the object to update, which will be a paddle or a ball
  //
  // NOTE how this relies on the object passed in have .x, .y, .vx, and .vy
  // properties, which is true of both the two paddles and the ball
  function updatePosition(object) {
    object.x += object.vx;
    object.y += object.vy;
  }

  // handleBallWallCollision()
  //
  // Checks if the ball has overlapped the upper or lower 'wall' (edge of the screen)
  // and is so reverses its vy
  function handleBallWallCollision() {

    // Calculate edges of ball for clearer if statement below
    var ballTop = ball.y - ball.size/2;
    var ballBottom = ball.y + ball.size/2;
    var ballLeft = ball.x - ball.size/2;
    var ballRight = ball.x + ball.size/2;

    // Check for ball colliding with top and bottom
    if (ballTop < 0 || ballBottom > height) {
      // If it touched the top or bottom, reverse its vy
      ball.vy = -ball.vy;
      // Play our bouncing sound effect by rewinding and then playing
      beepSFX.currentTime = 0;
      beepSFX.play();
    }
  }

  // handleBallPaddleCollision(paddle)
  //
  // Checks if the ball overlaps the specified paddle and if so
  // reverses the ball's vx so it bounces
  function handleBallPaddleCollision(paddle) {

    // Calculate edges of ball for clearer if statements below
    var ballTop = ball.y - ball.size/2;
    var ballBottom = ball.y + ball.size/2;
    var ballLeft = ball.x - ball.size/2;
    var ballRight = ball.x + ball.size/2;

    // Calculate edges of paddle for clearer if statements below
    var paddleTop = paddle.y - paddle.h/2;
    var paddleBottom = paddle.y + paddle.h/2;
    var paddleLeft = paddle.x - paddle.w/2;
    var paddleRight = paddle.x + paddle.w/2;

    // First check it is in the vertical range of the paddle
    if (ballBottom > paddleTop && ballTop < paddleBottom) {
      // Then check if it is touching the paddle horizontally
      if (ballLeft < paddleRight && ballRight > paddleLeft) {
        // Then the ball is touching the paddle so reverse its vx
        ball.vx = -ball.vx;
        // Play our bouncing sound effect by rewinding and then playing
        beepSFX.currentTime = 0;
        beepSFX.play();
      }
    }
  }

  // handleBallOffScreen()
  //
  // Checks if the ball has gone off screen to the left or right
  // and moves it back to the centre if so
  function handleBallOffScreen() {

    // Calculate edges of ball for clearer if statement below
    var ballLeft = ball.x - ball.size/2;
    var ballRight = ball.x + ball.size/2;

    // Check for ball going off the sides
    if (ballRight < 0 || ballLeft > width) {
      // If it went off either side, reset it to the centre
      ball.x = width/2;
      ball.y = height/2;
      // NOTE that we don't change its velocity here so it just
      // carries on moving with the same velocity after its
      // position is reset.
      // This is where we would count points etc!
    }
    //////// New ////////

    // Update score
    if (ballLeft > width) {
      leftPaddle.score ++;

      // // console.log("leftPaddle.score")
      //
      if (leftPaddle.score === 1) {
        leftPaddle.h = 50
      }
      if (leftPaddle.score === 2 ) {
        leftPaddle.h = 30;

      }
      if (leftPaddle.score === 3 ) {
      leftPaddle.h = 10;
      }
      // else if (leftPaddle.score < 1) {
      // }
      reset(-1);
    }
    if (ballRight < 0) {
      rightPaddle.score ++;
      // console.log("rightPaddle.score")
      if (leftPaddle.score === 1) {
        rightPaddle.h = 50
      }
      if (leftPaddle.score === 2 ) {
        rightPaddle.h = 30;

      }
      if (leftPaddle.score === 3 ) {
        rightPaddle.h = 10;
      }
          reset(1);

    }
  }
  // reset
  function reset(winner) {
    ball.x = width/2;
    ball.y = height/2;
    ball.vx = winner * ball.speed
    ball.vy = random(5,10);

    // Change colors randomly at each reset
    r = random(255);
    g = random(255);
    b = random(255);
    //change the background colour randomly
    // background(random(255), random(255), random(255),);
    }
  // displayBall()
  //
  // Draws ball on screen based on its properties
  function displayBall() {
    push()
    fill(r, g, b);
    ellipse(ball.x,ball.y,ball.size,ball.size);
    pop()
  }

  ///// END NEW /////

  // displayPaddle(paddle)
  //
  // Draws the specified paddle on screen based on its properties
  function displayPaddle(paddle) {

    rect(paddle.x,paddle.y,paddle.w,paddle.h);
    fill(r, g, b);


  }
  function backgroundrandomizer(){
    background(lerpColor(startColor, newColor, amt));
    amt += 0.01;
    if(amt >= 1){
      amt = 0.0;
      startColor = newColor;
      newColor = color(random(255),random(255),random(255)); }
  }
  function win(){
  if (leftPaddle.score === 4 ) {

    background(0);
    textSize(64);
      textAlign(CENTER,CENTER);
      fill(255);
      text('Player Left Win',width/2,height/2);
      textSize(24);
      text("PRESS RETURN OR ENTER TO PLAY AGAIN",width/2 ,height/1.5);
         if (keyIsDown(13)) {
      location.reload();    }  }

  else if (rightPaddle.score === 4) {
     background(0);
     textSize(64);
       textAlign(CENTER,CENTER);
       fill(255);
       text('Player Right Win',width/2,height/2);
       textSize(24);
       text("PRESS RETURN OR ENTER TO PLAY AGAIN",width/2 ,height/1.5);
          if (keyIsDown(13)) {
      location.reload();    }
   }
  }
