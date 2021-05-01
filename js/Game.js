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

    runner1 = createSprite(10 ,200);
    runner1.addImage("boy", runners);

    runner2 = createSprite(10, 500);
    runner2.addImage("boy2",runners);

    // runner3 = createSprite(500,200);
    // runner3.addImage("car3",car3_img);
    // runner4 = createSprite(700,200);
    // runner4.addImage("car4",car4_img);
    contestants = [runner1, runner2];

    invisibleGround = createSprite(100, 480, width * 5, 20);
    invisibleGround.visible = false;

    invisibleGround2 = createSprite(100, 750, width * 5, 20);
    invisibleGround2.visible = false;
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    spawnObstacles();
    spawnObstacles2();

    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(trackImg, 0, -20, displayWidth * 5, displayHeight);

      //var display_position = 100;

      //index of the array
      var index = 0;


      //x and y position of the cars
      var x = 50;
      var y = 140;


      runner1.collide(invisibleGround);
      runner2.collide(invisibleGround2);

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        y = y + 200;

        //use data form the database to display the cars in y direction
        x = displayWidth - allPlayers[plr].distance;
        contestants[index-1].x = x;
        contestants[index-1].y = y;

        // contestants[index-1].velocityX = -2;
        if (index === player.index){
          //cars[index - 1].shapeColor = "red";
          fill("red");
          stroke(10);
          ellipse(x,y,60,60);
          text(player.name ,x-10,y + 60);
          text(player.distance,x-10 ,y + 70);
          camera.position.x = contestants[index-1].x;
          camera.position.y = contestants[index-1].y;

          player.x = x;
          player.y = y;

          if(keyIsDown("space")){
            contestants[index-1].velocityY = -4;
          }
        }

        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance += 10;
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
      player.rank = player.rank + 1;
      player.updatePlayersAtEnd(player.rank);
    }

    drawSprites();
  }


  end(){
    console.log("Game Ended");
  }
}

function spawnObstacles(){
  if(frameCount % 100 === 0){
    var hurdles = createSprite(width, 325);
    hurdles.velocityX = -2;
    hurdles.lifetime = width / 2;
    hurdles.addImage("Obstacles", hurdle);
  }
}

function spawnObstacles2(){
  if(frameCount % 100 === 0){
    var hurdles = createSprite(width, 585);
    hurdles.velocityX = -2;
    hurdles.lifetime = width / 2;
    hurdles.addImage("Obstacle2", hurdle);
  }
}
