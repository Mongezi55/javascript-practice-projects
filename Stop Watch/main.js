
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");
const timeDisplay = document.querySelector("#timerDisplay");

let startTime = 0;
let currentTime = 0;
let elapsedTime = 0;
let paused = true;
let timerId;
let hours = 0;
let minuetes = 0;
let seconds = 0;

startBtn.addEventListener("click", () =>{
    if(paused){
        paused = false;
        startTime = Date.now() - elapsedTime;
        timerId = setInterval(updateTime, 1000);
    }
});
pauseBtn.addEventListener("click", () =>{
    if(!paused){
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(timerId);
    }
});
resetBtn.addEventListener("click", () =>{
    paused = true;
    startTime = 0;
    currentTime = 0;
    elapsedTime = 0;
    hours = 0;
    minuetes = 0;
    seconds = 0;
    
    clearInterval(timerId);
    timeDisplay.textContent = "00:00:00";

});

function updateTime(){
    elapsedTime = Date.now() - startTime; //This will intially set the time to zero and save time passed
    
    seconds = Math.floor(elapsedTime / 1000) % 60;
    minuetes = Math.floor(elapsedTime / (60 * 1000)) % 60;
    hours = Math.floor(elapsedTime / (60 * 60 * 1000)) % 60;

    seconds = formatZeros(seconds);
    minuetes = formatZeros(minuetes);
    hours = formatZeros(hours);

    timeDisplay.textContent = `${hours}:${minuetes}:${seconds}`;

    function formatZeros(time){
        //return (("0") + time).length > 2 ? time : "0" + time;
        return (("0") + time).length <= 2 ? "0" + time : time;
    }
}
