
var trex ,trex_running;
var trexF;
var chao, chaoImg;
var nuvemImg;
var cactus1,cactus2,cactus3,cactus4,cactus5,cactus6;
var grupoCactus;
var grupoNuvens;
var jogar = 1;
var encerar = 0;
var gameState = jogar;
var restart;
var gameOver;
var gameOverImg;
var botaoRestart;
var botaoRestartImg;

//carregar imagens e animações
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  chaoImg = loadImage("ground2.png");
  nuvemImg=loadImage("cloud.png");
  cactus1=loadImage("obstacle1.png");
  cactus2=loadImage("obstacle2.png");
  cactus3=loadImage("obstacle3.png");
  cactus4=loadImage("obstacle4.png");
  cactus5=loadImage("obstacle5.png");
  cactus6=loadImage("obstacle6.png");
  trexF=loadAnimation("trex_collided.png");
  gameOverImg=loadImage("gameOver.png");
  botaoRestartImg=loadImage("restart.png");
}

//adicionar as imagens e animações as variaveis
function setup(){
  createCanvas(600,300)

  //trex
  trex = createSprite(50,250,10,10);
  trex.addAnimation("trexrun", trex_running);
  trex.addAnimation("trexF", trexF);
  trex.scale=0.7;
  //chão
  chao = createSprite(300,290,600,20);
  chao.addImage(chaoImg);
  //grupo de nuvens e cactus
  grupoCactus = createGroup();
  grupoNuvens = createGroup();
  //texto de gamer over
  gameOver=createSprite(200,190,10,10);
  gameOver.addImage("gameOver", gameOverImg);
  //botao de game over
  botaoRestart=createSprite(200,120,10,10);
  botaoRestart.addImage("gameOver", botaoRestartImg);
}


function draw(){
  background("white");
  botaoRestart.visible=false;
  gameOver.visible=false;

  //estado do jogo jogar
  if(gameState==jogar){
    //pulo do trex
    if(keyDown("space")){
      trex.velocityY=-10;
    }
    //gravidade
    trex.velocityY=trex.velocityY + 0.8;
    //chão se movendo
    chao.velocityX=-4;
    if(chao.x<0){
      chao.x = chao.width/2;
    }
    //mudando estado de jogo
    if(trex.isTouching(grupoCactus)){
      gameState=encerar;
    }
  }
  //estado do jogo gamerOver
  else if (gameState==encerar){
    grupoCactus.setLifetimeEach(-1);
    grupoNuvens.setLifetimeEach(-1);
    grupoNuvens.setVelocityXEach(0);
    grupoCactus.setVelocityXEach(0);
    chao.velocityX=0;
    trex.changeAnimation("trexF",trexF);
    trex.velocityX=0;
    botaoRestart.visible=true;
    gameOver.visible=true;
    if(mousePressedOver(botaoRestart)){
      reset();
    }
  }

  trex.collide(chao);
  drawSprites();

  

  criarNuvens();
  cactus();
}

function criarNuvens(){
  if(frameCount % 60 ==0){
 var nuvem = createSprite(640, 60, 40, 40);
 nuvem.addImage(nuvemImg);
 nuvem.velocityX=-3;
 nuvem.y=Math.round(random(20,150));
 nuvem.lifetime=200;
 nuvem.depth=trex.depth;
 trex.depth=trex.depth+1;
 grupoNuvens.add(nuvem);
  }
}

function cactus(){
  if(frameCount % 90 ==0){
  var cactus = createSprite(640,265,12,12);
  var rand = Math.round(random(1,6));
  cactus.velocityX=-4;
  cactus.scale=0.6;
  grupoCactus.add(cactus);
  switch(rand){
    case 1:cactus.addImage(cactus1)
      break;
    case 2:cactus.addImage(cactus2)
      break;
    case 3:cactus.addImage(cactus3)
      break;
    case 4:cactus.addImage(cactus4)
      break;
    case 5:cactus.addImage(cactus5)
      break;
    case 6:cactus.addImage(cactus6)
      break;
      default:break;
   }
   cactus.lifetime=200;
  }
}

function reset(){
  botaoRestart.visible=false;
  gameOver.visible=false;
  gameState=jogar;
  trex.changeAnimation("trexrun", trex_running);
  grupoCactus.destroyEach();
  grupoNuvens.destroyEach();
}