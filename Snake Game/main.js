const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resumeBtn = document.querySelector("#resumeBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "lightgray"; // Game Background color
const snakeColor = "blue";
const snakeBoarder = "black";
const foodColor = "red";
const unitSize = 20;
let paused = null; // Checks if game is paused 
let gameTimer = null;
let gameSpeed = 80;
let running = false; // Game boolean status
let xVelocity = unitSize; //How many frames per snake movement
let yVelocity = 0;
let foodX; // X coordinate for food : randomly calculated;
let foodY; // Y coordinate for food : randomly calculated;
let score = 0;

/*
* Our snake will be an array of objects containing coordinates for the body
* We will iterate over these coordinates using them as the reference 
* where we draw our snake from.
*/
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0} // Snake Head
];


window.addEventListener("keydown", changedDirection);
resetBtn.addEventListener("click", resetGame);
pauseBtn.addEventListener("click", pauseGame);
resumeBtn.addEventListener("click", () => {
    
    if(paused){
        running = true;
        nextTick();
        paused = false;
    }
    
    /** 
     * Added benifit of encapsulating this in an if-statement and having a "paused" boolean
     * variable is eliminated 1 logic error
     *   Before the game/snake would would get faster and faster if you pressed the "resume" button when it wasn't paused
     *   This is becaused without the if statement the nextTick() function can run nestedly however many times you want
     */

});
gameStart();
pauseGame();

// Game Functions >>>
function gameStart(){
    running = true;
    scoreText.textContent = `${score}`;
    createFood();
    drawFood();
    nextTick();
};
// This is what will happen every round - everytime the timer is updated
function nextTick(){
    if(running){
        gameTimer = setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            //changeDifficulty();
            nextTick();
        }, (gameSpeed));
    }else{
        displayGameOver();
    }
};
// This function will repaint the board
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
// This will find a random place within our game board to place the food item
function createFood(){
    function randomFood(min, max){
        let randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    };
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameHeight - unitSize);
};
function drawFood(){
    /*
    * I want to make it so the food cannot be created where there is a body part
    */
    for(let j = 1; j < snake.length; j++){
        if(snake[j].x == foodX && snake[j].y == foodY){
            createFood();
        }
    }
    /************************************************************************ */
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};
function drawSnake(){
    ctx.strokeStyle = snakeBoarder;
    snake.forEach(snakePart => {
        if(snakePart.x == snake[0].x && snakePart.y == snake[0].y ){
            // This will give the head of the snake it's own unique color
            ctx.fillStyle = "darkblue";
            ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
            ctx.strokeRect(snake[0].x, snake[0].y, unitSize, unitSize);
        }else{
            ctx.fillStyle = snakeColor;
            ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
            ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
        }
    })
};
function moveSnake(){
    /*
    * To allow the snake to move continually
    * We will create a new head for the snake in the direction we are moving
    * Next we will eliminate the tai;
    */

    const newHead = {x:snake[0].x +xVelocity, y:snake[0].y + yVelocity};

    snake.unshift(newHead);

    // If food has been eaten 
    if(snake[0].x == foodX && snake[0].y == foodY){
        score+=1;
        scoreText.textContent = `${score}`;;
        createFood(); // Create new food after one has been eaten
    }else{
        //This will eliminate the tail
        snake.pop();
    }

};
function changedDirection(event){

    const keyPressed = event.keyCode;
    // KEYCODES FOR EACH MOVENT KEY
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    // Boolean representations for snake movement
    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);
    const goingRight = (xVelocity == unitSize);
    
    switch(true){
        case(keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == UP && !goingDown):
            yVelocity = -unitSize;
            xVelocity = 0;
            break;
        case(keyPressed == DOWN && !goingUp):
            yVelocity = unitSize;
            xVelocity = 0;
            break;
    }
};
function checkGameOver(){
    // Border condition for ending game
    switch(true){
        case(snake[0].x < 0):  // When snake hits left boarder
            running = false;
            break;
        case(snake[0].x >= gameWidth): // When snake hits right boarder
            running = false;
            break;
        case(snake[0].y >= gameHeight): // When snake hits bottom boarder
            running = false;
            break;
        case(snake[0].y < 0): // When snake hits upper boarder
            running = false;
            break;    
    }

    //If snake hits a body part game must end
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y ){
            running = false;
        }
    }

};
function displayGameOver(){
    
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    running = false;
};
function pauseGame(){
    if(running){
        clearTimeout(gameTimer);
        ctx.fillStyle = "black";
        ctx.font = "50px MV Boli";
        ctx.textAlign = "center";
        ctx.fillText("Game Paused!", gameWidth/ 2, gameHeight/ 2);
        running = false;
        paused = true;
    }
}
function resetGame(){
    //If you encapsulate this code inside and if(running) statement, the game will not restart if not paused or the game isn't over
    score = 0;
    xVelocity = unitSize; // Snake starts off moving to the right
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0} // Snake Head
    ];
    gameStart();
};
