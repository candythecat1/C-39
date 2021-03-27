var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;
var cars1_img, cars2_img, cars3_img, cars4_img, trackImg;

function preload()
{
  cars1_img = loadImage("images/car1.png");
  cars2_img = loadImage("images/car2.png");
  cars3_img = loadImage("images/car3.png");
  cars4_img = loadImage("images/car4.png");
  trackImg = loadImage("images/track.jpg");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
}
