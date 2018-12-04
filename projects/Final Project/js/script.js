var mgr;

function setup() {
createCanvas(displayWidth,displayHeight);
// background(0);
mgr = new SceneManager();

mgr.addScene ( Intro );
mgr.addScene ( Game1 );

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
        // case '3':
        //     mgr.showScene( game2 );
        //     break;
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

function Game1(){

     this.draw = function()
     {
       background("green")
       fill("red");
       textAlign(CENTER);
       textSize(64);
       text('Master Game Project V 1.0', displayWidth / 2, displayHeight /2.5);
       fill("blue");
       textAlign(CENTER);
       textSize(36);
       text('Press any key to begin', displayWidth / 2, displayHeight /2);
     }

     this.mousePressed = function()
     {
         this.sceneManager.showNextScene();
     }

}
