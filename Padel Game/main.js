
const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d"); //Board context
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "forestgreen";
const objectBoarder = "black";
const paddle1Color = "lightblue";
const paddle2Color = "red";
const ballColor = "yellow";
const ballRadius = 12.5;
const paddleSpeed = 50; //The distence each paddle will move (in px) each move press
let intervalId;
let ballSpeed = 1;
let ballX = gameWidth / 2; //The ball will start at the center of the board
let ballY = gameHeight / 2;
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
let paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
};
let paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameHeight - 100
};

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    createBall();
    nextTick();
};
function nextTick(){
    intervalId = setTimeout(() => {
        clearBoard();
        drawPaddles();
        moveBall();
        drawBall(ballX, ballY);
        checkCollision();
        nextTick();
    }, 10);
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function drawPaddles(){
    ctx.strokeStyle = objectBoarder;

    // this draws paddle 1
    ctx.fillStyle = paddle1Color;
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
    
    // this draws paddle 1
    ctx.fillStyle = paddle2Color;
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
    ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
};
// Makes ball move if random direction after being drawn
function createBall(){
    ballSpeed = 1;
    let randNum1 = Math.round(Math.random());
    let randNum2 = Math.round(Math.random());
    //Math.round(Math.random()) : this will return either 1 or 0
    if(randNum1 == 1){
        ballXDirection = 1; // goes right
    }else{
        ballXDirection = -1; // goes left
    }

    if(randNum2 == 1){
        ballYDirection = 1; // goes down
    }else{
        ballYDirection = -1; // goes up
    }

    ballX = gameWidth / 2;
    ballY = gameHeight / 2;
    drawBall(ballX, ballY);
};
function moveBall(){
    ballX += (ballSpeed * ballXDirection);
    ballY += (ballSpeed * ballYDirection);
};
function drawBall(ballX, ballY){
    ctx.strokeStyle = objectBoarder;
    ctx.fillStyle = ballColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    
};
function checkCollision(){
    if(ballY <= 0 + ballRadius){
        // Top wall collision
        ballYDirection *= -1;
    }else if(ballY >= gameHeight - ballRadius){
        // Bottom Wall collision
        ballYDirection *= -1;
    }

    if(ballX <= 0){
        // Left wall collision
        player2Score += 1;
        updateScore();
        createBall();
        return;
    }else if(ballX >= gameWidth){
        // Right wall collision
        player1Score +=1;
        updateScore();
        createBall();
        return;
    }

    // Paddle1 collision
    if(ballX <= paddle1.x + paddle1.width + ballRadius){
        if(ballY > paddle1.y && ballY < paddle1.y + paddle1.height){
            ballX = (paddle1.x + paddle1.width) + ballRadius; // if ball gets stuck
            ballXDirection *= -1; //reverses direction
            ballSpeed +=1;
        }
    }
    
    //Paddle2 collision
    if(ballX >= paddle2.x - ballRadius){
        if(ballY > paddle2.y && ballY < paddle2.y + paddle2.height){
            ballX = paddle2.x - ballRadius; // if ball gets stuck
            ballXDirection*= -1; //reverses direction
            ballSpeed +=1;
        }
    }
};
function changeDirection(event){
    const keypressed = event.keyCode;

    /** key codes for the control keys 
     *      player1: w-up , s - down
     *      player2: upArrow - up, downArrow - down
    */
    const paddle1Up = 87;
    const paddle1Down = 83;
    const paddle2Up = 38;
    const paddle2Down = 40;

    switch(keypressed){

        //Paddle1 Movement Controls
        case(paddle1Up):
            if(paddle1.y > 0){
                paddle1.y -= paddleSpeed;
            }
            break;
        case(paddle1Down):
        if(paddle1.y < gameHeight - paddle1.height){
            paddle1.y += paddleSpeed;
        }
        break;
        
        //Paddle Movement Controls
        case(paddle2Up):
            if(paddle2.y > 0){
                paddle2.y -= paddleSpeed;
            }
            break;
        case(paddle2Down):
        if(paddle2.y < gameHeight - paddle2.height){
            paddle2.y += paddleSpeed;
        }
        break;
    }
    
};
function updateScore(){
    scoreText.textContent =`${player1Score} : ${player2Score}`;
};
function resetGame(){
    player1Score = 0;
    player2Score = 0;
    
    paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0
    };
    paddle2 = {
        width: 25,
        height: 100,
        x: gameWidth - 25,
        y: gameHeight - 100
    };

    ballX = 0;
    ballY = 0;
    ballXDirection = 0;
    ballXDirection = 0;
    updateScore();
    clearInterval(intervalId);
    gameStart();
};