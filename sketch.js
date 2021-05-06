var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bird;
var backGround;

var score=0;

var obstaclestopGroup;

var obstaclesbottomGroup;

var gameOver;

var tunnel,tunnel1;



var space;

var die;




function preload(){
  birdImg = loadAnimation("bird1.png","bird2.png","bird3.png","bird4.png","bird5.png","bird6.png","bird7.png","bird8.png","bird9.png","bird10.png","bird11.png","bird12.png","bird13.png","bird14.png");
  tunneltopImg = loadImage("tunneltop.png");
  tunnelbottemImg = loadImage("tunnelbottem.png");
  backGroundImg = loadImage("bg.png");
  gameOverImg = loadImage("gameOver.png");
  spaceImg = loadImage("Space.png");
  die = loadSound("die.mp3");
  
}


function setup(){
  createCanvas(800,800);

  
  backGround1 = createSprite(400,20,1600,1000);
  backGround1.addImage("background",backGroundImg);
  backGround1.scale = 10;
 
  bird = createSprite(100,200,20,30);
  bird.addAnimation("bird",birdImg);
  bird.scale = 1.2;
  bird.setCollider("circle",0,0,20);
  

   gameOver = createSprite(400,400,20,20);
   gameOver.addImage("gameover",gameOverImg);

 

   space = createSprite(400,300,10,10);
   space.addImage("sp",spaceImg);
   space.scale = 0.3;

 
   

   gameOver.visible = false; 
   
   space.visible = false;


  obstaclestopGroup = new Group();

  obstaclesbottomGroup = new Group();

  

  

 
 

  





}

function draw(){

  background(255);
  



  if(gameState===PLAY){
    score = score + Math.round(getFrameRate()/50);
    
    bird.velocityY = bird.velocityY + 0.25;
    
    if(keyDown("UP_ARROW")){
      bird.velocityY = -4.5;
    }

    if(backGround1.x < 0){
      backGround1.x = backGround1.width/2;

    
    }
     
    
    backGround1.velocityX = -10
    console.log(bird);

    

    

    spawntopObstacles();
    spawnbottomObstacles();
    

    if(obstaclestopGroup.isTouching(bird)){
      gameState = END;
    }

    if(obstaclesbottomGroup.isTouching(bird)){
      gameState = END;
      die.play();
    }
  }

    if(gameState === END){
    
     

      backGround1.velocityX = 0
      obstaclestopGroup.setVelocityXEach(0);

      obstaclestopGroup.setLifetimeEach(-1);

      obstaclesbottomGroup.setVelocityXEach(0);

      obstaclesbottomGroup.setLifetimeEach(-1);

      bird.velocityY = 0;

      
      gameOver.visible = true;
      
      space.visible = true;

      if(keyDown("SPACE")){
        reset();
      }

      
      

      
    }

    if(keyDown("UP_ARROW")){
      bird.velocityY = -4.5;
    }
  


  
    drawSprites();
    textSize(25);
    text("Score: "+ score, 500,50);
}




function spawntopObstacles(){

  if(frameCount % 180 ===0){
    tunnel = createSprite(800,100,20,20);
  tunnel.addImage(tunneltopImg);
  tunnel.velocityX = -10.
  tunnel.lifetime = 300;
  tunnel.scale = 5;
  tunnel.setCollider("rectangle",0,0,40,40);
  
  obstaclestopGroup.add(tunnel);
  }
}

function spawnbottomObstacles(){

  if(frameCount % 120 ===0){
    tunnel1 = createSprite(800,700,20,20);
    tunnel1.addImage(tunnelbottemImg);
    tunnel1.velocityX = -10
    tunnel1.lifetime = 300
    tunnel1.scale = 5;
    tunnel1.setCollider("rectangle",0,0,40,40);

    obstaclesbottomGroup.add(tunnel1);
  }
}

function reset(){
gameState = PLAY
gameOver.visible = false;

space.visible = false;

bird.x = 100;
bird.y = 200;

obstaclesbottomGroup.destroyEach();
obstaclestopGroup.destroyEach();
score = 0;

}



