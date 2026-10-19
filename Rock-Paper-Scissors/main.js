const playerText = document.querySelector("#playerText");
const computerText = document.querySelector("#computerText");
const resultText = document.querySelector("#resultText");
const choiceBtns = document.querySelectorAll(".gameBtn");
let player;
let computer;
let result;

choiceBtns.forEach(button => button.addEventListener("click", () => {
    player = button.textContent;
    computerTurn();

    playerText.textContent = `Player: ${player}`;
    computerText.textContent = `Computer: ${computer}`;
    resultText.textContent = "Result: " + checkWinner();
}))

function computerTurn(){
    let randNum = Math.floor(Math.random() * 3) + 1;
    switch(randNum){
        case 1:
            computer = "Rock";
            break;
        case 2:
            computer = "Paper";
            break;
        case 3:
            computer = "Scissors";
    }
}

function checkWinner(){
    if(player == computer){
        return "Draw!";
    }else if(computer == "Rock"){
        return player == "Paper" ? "You Win!" : "You Lose!";
    }else if(computer == "Paper"){
        return player == "Scissors" ? "You Win!" : "You Lose!";
    }else if(computer == "Scissors"){
        return player == "Rock" ? "You Win!" : "You Lose!";
    }
}


/*

// Alternative method

const rockBtn = document.querySelector("#rockBtn");
const paperBtn = document.querySelector("#paperBtn");
const scissorsBtn = document.querySelector("#scissorsBtn");

const playerText = document.querySelector("#playerText");
const computerText = document.querySelector("#computerText");
const resultText = document.querySelector("#resultText");

rockBtn.addEventListener("click", () => {
    randomNum = Math.floor((Math.random() * 3) + 1);
    playerText.textContent = "Player: Rock";
    let compChoice = computerChoice(randomNum);
    computerText.textContent = `Computer: ${compChoice}`;
    if(computerChoice == "Rock"){
        resultText.textContent = "Result: Draw";
    }
    else if(compChoice == "Scissors"){
        resultText.textContent = "Result: Win";
    }else{
        resultText.textContent = "Result: Lose";
    }
});
paperBtn.addEventListener("click", () => {
    randomNum = Math.floor((Math.random() * 3) + 1);
    playerText.textContent = "Player: Paper";
    computerText.textContent = `Computer: ${computerChoice(randomNum)}`;
});
scissorsBtn.addEventListener("click", () => {
    randomNum = Math.floor((Math.random() * 3) + 1);
    playerText.textContent = "Player Scissors";
    computerText.textContent = `Computer: ${computerChoice(randomNum)}`;
});

function computerChoice(number){
    switch(number){
        case 1: return "Rock";
            break;
        case 2: return "Paper";
            break;
        case 3: return "Scissors";
            break;
        default: return null;
            break; 
    }
};
*/