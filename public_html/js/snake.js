/*-----------------------------------------------------------------------------
 * Variables
 * ----------------------------------------------------------------------------
 */

var snake;
var snakeLength;
var snakeSize;

var food;

var context;
var screenWidth;
var screenHeight;

/*-----------------------------------------------------------------------------
 * Executing Game Code
 * ----------------------------------------------------------------------------
 */

gameInitialize();
snakeInitialize(); 
foodInitialize();
setInterval(gameLoop, 1000/30);

/*-----------------------------------------------------------------------------
 * Game Functions
 * ----------------------------------------------------------------------------
 */

function gameInitialize(){
    var canvas = document.getElementById("game-screen");
    context = canvas.getContext("2d");
    
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    
    canvas.width = screenWidth;
    canvas.height = screenHeight;
}

function gameLoop(){
    gameDraw();
    snakeUpdate();
    snakeDraw();
    foodDraw();
}

function gameDraw(){
    context.fillStyle = "deepskyblue" ;  
    context.fillRect(0, 0, screenWidth, screenHeight);
}

/*-----------------------------------------------------------------------------
 * Snake Functions
 * ----------------------------------------------------------------------------
 */

function snakeInitialize(){
    snake = [];
    snakeLength = 5;
    snakeSize = 18;
    
    for(var index = snakeLength - 1; index >= 0; index--) {
        snake.push( {
            x: index,
            y: 0
        });
    }
}

function snakeDraw(){
    for(var index = 0; index < snake.length; index++) {
        context.fillStyle = "black";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}

function snakeUpdate(){
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;
    
    snakeHeadX++;
    
    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}

/*-----------------------------------------------------------------------------
 * Food Functions
 * ----------------------------------------------------------------------------
 */

function foodInitialize() {
    food = {
        x: 0,
        y: 0
    };
    setFoodPosition();
}

function foodDraw() {
    context.fillStyle = "black";
    context.fillRect(food.x, food.y, snakeSize, snakeSize);
}

function setFoodPosition(){
    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);
    
    food.x = randomX;
    food.y = randomY;
}
var dir;
 $(document).keydown(function (e) {
            switch(e.which) {
                case 38:
                    if(dir !== 2) {
                        newdir = 0;
                    }
                    break;
                case 39:
                    if(dir !== 3) {
                        newdir = 1;
                    }
                    break;
                case 40:
                    if(dir !== 0) {
                        newdir = 2;
                    }
                    break;
                case 37:
                    if(dir !== 1) {
                        newdir = 3;
                    }
                    break;
                case 32:
                    if(!gstarted) {
                        startGame();
                    }
                    else {
                        togglePause();
                    }
                    break;
            }
        });