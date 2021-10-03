var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground,ground_image,invisible_ground;
var girl,girl_running,girl_collided,girlImage,zombie,zombie_running,zombie_attack;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4;
var jumpSound,dieSound,checkpointSound;
var score;
var gameOver,restart,gameOverImage,restartImage;

function preload(){
ground_image=loadImage("Background.png");
  girl_running=loadAnimation("Run (1).png");
  zombie_running=loadAnimation("Walk (1).png");
  zombie_attack=loadAnimation("Attack (2).png")
  obstacle1=loadImage("obstacle1.png");
  zombie_idle=loadImage("Stand.png");
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
  gameOverImage=loadImage("gameOver1.png");
  restartImage=loadImage("restart1.png");
  girl_collided=loadImage("Dead (30).png");
  girlImage=loadImage("Idle (1).png");
}

function setup() {
 createCanvas(600,500);
  
ground=createSprite(200,250,0,0);
  ground.shapeColor="white";
ground.addImage("ground_image",ground_image);
ground.scale=1.4;
   ground.velocityX=-1
  
   girl=createSprite(300,420,600,10);
  girl.addAnimation("girl_running",girl_running);
  girl.addImage("girl_collided",girl_collided);
  girl.addImage("girlImage",girlImage);
  girl.scale=0.05;
 // girl.velocityX=2;
  girl.debug=false;
  girl.setCollider("rectangle",0,0,girl.width,girl.height)
  
  
  zombie=createSprite(50,410,600,10);
  zombie.addAnimation("zombie_running",zombie_running);
  zombie.addAnimation("zombie_attack",zombie_attack);
  zombie.addImage("zombie_idle",zombie_idle);
  zombie.scale=0.2;
  zombie.debug=false;
 // zombie.velocityY=-13;
 // zombie.velocityX=Math.round(random(1,2));
  
  invisible_ground=createSprite(300,470,600,10);
  invisible_ground.visible=false;
  
   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5
  restart = createSprite(300,180);
  restart.addImage(restartImage);
  restart.scale = 0.05
  obstaclesGroup=new Group();
  
  score=0;
}

function draw() {
 background("black");
  
 // console.log(girl.y);
   //Gravity
girl.velocityY = girl.velocityY + 0.8;
girl.collide(invisible_ground); 
  
   //Gravity
zombie.velocityY = zombie.velocityY + 0.8;
zombie.collide(invisible_ground); 
  
  
   if (gameState===PLAY){
    gameOver.visible=false;
  restart.visible=false;
    //  zombie.y=girl.y;
   score = score + Math.round(getFrameRate()/60);
 
    spawnObstacles();
   if (obstaclesGroup.isTouching(zombie)){
     zombie.velocityY=-12;
   }
 ground.velocityX = -(4 + 3* score/100);
     
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
     if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    console.log(girl.y)
 if((keyDown("space")&& girl.y >= 418)) {
   girl.velocityY = -12;
    jumpSound.play();
  }  
  
  if (girl.isTouching(obstaclesGroup)){
    gameState=END;
     dieSound.play();
  }
  }
else if ( gameState===END) {
  gameOver.visible=true;
  restart.visible=true;
  ground.velocityX = 0;
     girl.velocityY = 0
    girl.changeImage("girlImage",girlImage);
  zombie.changeAnimation("zombie_attack",zombie_attack);
     zombie.x=girl.x;
  if (zombie.isTouching(girl)) {
    girl.changeImage("girl_collided",girl_collided);
    zombie.changeImage("zombie_idle",zombie_idle);
  }
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
   obstaclesGroup.setVelocityXEach(0);
  
    if(mousePressedOver(restart)) {
      reset();
    }
} 
  
 
  drawSprites();
  fill("red");
  textSize(20);
   text("Score: "+ score, 100,50);
}

function reset(){
  gameState=PLAY;
gameOver.visible=false;
restart.visible=false;
girl.changeAnimation("girl_running",girl_running);
  obstaclesGroup.destroyEach();
  score=0;
  zombie.x=50;
}

function spawnObstacles() {
   if (frameCount % 60 === 0){
   var obstacle = createSprite(600,450,10,40);
   obstacle.velocityX = -6 ;//+ score/100);
   
    //generate random obstacles
   var rand = Math.round(random(1,6));
     obstacle.addImage(obstacle1);
   obstacle.scale=0.1;
      obstaclesGroup.add(obstacle);
    obstacle.debug=false;
obstacle.setCollider("circle",0,0,1);
   }
     
}

