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

document.onkeydown = function(event) {
  var keyCode; 

  if(event == null)
  {
    keyCode = window.event.keyCode; 
  }
  else 
  {
    keyCode = event.keyCode; 
  }

  switch(keyCode)
  {
    // left 
    case 37:
      moveLeft();
      break;

    // up 
    case 38:
      moveUp();
      break; 

    // right 
    case 39:
      moveRight();
      break; 

    // down
    case 40:
      moveDown();
      break; 

    default: 
      break; 
  } 
};

function moveSnake(){
  switch(direction){
    case 'up':
      moveUp();
      break;

    case 'down':
      moveDown();
      break;

    case 'left':
      moveLeft();
      break;

    case 'right':
      moveRight();
      break;
  }
}

function whichWayToGo(axisType){  
  if (axisType=='x') {
    a = (currentPosition['x'] > canvas.width / 2) ? moveLeft() : moveRight();
  } else {
    a = (currentPosition['y'] > canvas.height / 2) ? moveUp() : moveDown();
  }
}

function moveUp(){
  if (upPosition() >= 0) {
    executeMove('up', 'y', upPosition());
  } else {
    whichWayToGo('x');
  }
}

function moveDown(){
  if (downPosition() < canvas.height) {
    executeMove('down', 'y', downPosition());    
  } else {
    whichWayToGo('x');
  }
}

function moveLeft(){
  if (leftPosition() >= 0) {
    executeMove('left', 'x', leftPosition());
  } else {
    whichWayToGo('y');
  }
}

function moveRight(){
  if (rightPosition() < canvas.width) {
    executeMove('right', 'x', rightPosition());
  } else {
    whichWayToGo('y');
  }
}

snakeBody = [];

function drawSnake() {
  snakeBody.push([currentPosition['x'], currentPosition['y']]);
  ctx.fillRect(currentPosition['x'], currentPosition['y'], gridSize, gridSize);
  if (snakeBody.length > 3) {
    var itemToRemove = snakeBody.shift();
    ctx.clearRect(itemToRemove[0], itemToRemove[1], gridSize, gridSize);
  }
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
