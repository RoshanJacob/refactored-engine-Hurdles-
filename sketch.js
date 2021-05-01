var runners;
var trackImg;
var hurdle;
var database;

var game, gameState = 0;
var player;
var playerCount = 0;
var distance = 0;
var form;

var runner1, runner2;
var contestants = [];


var invisibleGround;
var invisibleGround2;

var allPlayers = [];
function load(){
    runners = loadAnimation("b.png", "y.png", "p.png");
    trackImg = loadImage("pla.jpg");
    hurdle = loadImage("hurdle.png");
}
function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    database = firebase.database();

    game = new Game();
    game.getState();
    game.start()

}

function draw(){
    background(10, 10, 10);

    if(gameState === 1){
        clear();
        game.play();
    }

    if(playerCount === 2){
        game.update(1);
    }

    if(gameState === 2){
        game.end();
    }
}