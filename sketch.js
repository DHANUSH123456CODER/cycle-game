var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  bellSound = loadSound("salamisound-5494951-bicycle-bell-ring-the-bell.mp3");
  
  bellimage = loadImage("Screenshot (315).png")
    pinkc = loadImage("Screenshot (316).png")
    funnyc = loadImage("Screenshot (317).png")
  
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  gameoverr = loadImage("Screenshot (318).png");
  restartt = loadImage("Screenshot (319).png");
  obstaclee = loadImage("Screenshot (320) - Copy.png")

  

}

function setup(){
  
createCanvas(600,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -(6 +2*distance/150);

//creating boy running
mainCyclist  = createSprite(300,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
  
  bell = createSprite(200,30);
  bell.addImage(bellimage);
  bell.scale = 0.2
  
  gameover = createSprite(300,150,10,10)
  gameover.addImage(gameoverr)
  gameover.visible = false
  
  restart = createSprite(130,150,10,10)
  restart.addImage(restartt)
  restart.visible = false
  restart.scale = 0.4
  
  obstacleG = createGroup();

}

function draw() {
  background("black");

    drawSprites();

  
     edges= createEdgeSprites();
   if(mainCyclist.isTouching(edges))
     {
       gameState = END
     }
  
  if(gameState===PLAY){
  
   mainCyclist.y = World.mouseY;
    
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  distance = distance + Math.round(getFrameRate()/50)
    
    if(distance>100 && frameCount % 60 === 0)
      {
        obstacle = createSprite(700,10,10,10);
        obstacle.y = Math.round(random(50,250))
        obstacle.velocityX = -(5 +3 * distance/100)
        obstacle.addImage(obstaclee)
        obstacle.scale = 0.2
        obstacleG.add(obstacle)
      }
    
    if(mainCyclist.isTouching(obstacleG))
      {
        obstacleG.destroyEach();
        gameState = END;
      }
  

  
  //code to reset the background
  if(path.x < 0 ){
    path.x = path.width/2;
  }
   if(keyWentDown("space") && gameState === PLAY)
     {
       bellSound.play();
     }
     
     pink1();
    
    funny1();
 
  }else if(gameState === END) 
    {
      gameover.visible = true
      restart.visible = true
      path.velocityX = 0
      mainCyclist.visible = false
      bell.visible = false
      textSize(20)
      fill("orange")
      text("YOU LOSE",260,250)
      textSize(20)
      fill("yellow")
      text("THANKYOU FOR PLAYING",180,270)
      textSize(20)
      fill("LIGHTBLUE")
      text("PRESS ON RESTART BUTTON",150,30)
      
      if(mousePressedOver(restart) && gameState === END)
        {
          reset();
          
        }
    }
  

}


function pink1()
{
  pink = createSprite(70,220,10,10);
  pink.addImage(pinkc);
  pink.scale = 0.5
 
  
}


function funny1()
{
  funny = createSprite(450,90,10,10);
  funny.addImage(funnyc);
  funny.scale = 0.5
  
}


function reset()
{
  gameState = PLAY;
  mainCyclist.y = 150
  distance = Math.round(getFrameRate()/50)
  path.velocityX = -(6 + 2 * distance/150)
  gameover.visible = false
  restart.visible = false
  mainCyclist.visible = true
  bell.visible = true

}