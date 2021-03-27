class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(cars1_img);
    car2 = createSprite(300,200);
    car2.addImage(cars2_img);
    car3 = createSprite(500,200);
    car3.addImage(cars3_img);
    car4 = createSprite(700,200);
    car4.addImage(cars4_img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      image(trackImg, 0, -height*4, width, height*5);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = x+205;
      var y = height-100;

      for(var plr in allPlayers){
        

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
       // console.log(index + " " + cars[index]);
        y = displayHeight - allPlayers[plr].distance;
        cars[index].x = x;
        cars[index].y = y;

       

        if (index === player.index){
          cars[index].shapeColor = "red";
          camera.position.x = width/2;
          camera.position.y = cars[index].y
        }
       //add 1 to the index for every loop
       index = index + 1 ;
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
      console.log(player.distance)
    }

    drawSprites();
  }
}
