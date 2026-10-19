
const cells = document.querySelectorAll(".cell"); // Array holding all cells
const statusText = document.querySelector("#statusText"); // This will show who's turn it is, draws & wins 
const restartBtn = document.querySelector("#restartBtn"); // Button to restart the game

let currentPlayer = "X"; // initial player
let gameRunning = false; //initial game status

//Win conditions for the game - it will be a 2d array
//      - A player wins for getting a row will their mark
//      - A column with their mark or a diagonal.
//      - The numbers represent these possibilities
let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

//An array that will hold the values chosen by the players
let options = ["", "", "","", "", "","", "", ""];

initializeGame();

function initializeGame(){
    gameRunning = true;
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
}

//What happens when cell is clicked
function cellClicked(){

    const cellIndex = this.getAttribute("cellIndex"); //store clicked cell index

    //Check if cell is not empty - If so Do nothing
    if(options[cellIndex] != "" || !gameRunning){
        return;
    }else{
        //If cell is empty, update cell
        updateCell(this, cellIndex);
        checkWinner();
    }

}

//Funtion to update empty cells when clicked
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X" ? "O" : "X");
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;

    //Iterate over the winConditions array
    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i]; // This will save one row of the winConditions to this array
        
        const cellA = options[condition[0]]; 
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins`;
        gameRunning = false;
    }else if(!(options.includes(""))){
        statusText.textContent = "Draw!";
        gameRunning= false;
    }else{
        changePlayer();
    }

}

//Clear Grid and reset everything to original configuration
function restartGame(){
    gameRunning = true;
    currentPlayer = "X"
    options = ["", "", "","", "", "","", "", ""];
    cells.forEach(cell => cell.textContent = "");
    statusText.textContent = `${currentPlayer}'s turn`;
}
