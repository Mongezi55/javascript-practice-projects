setInterval(displayTime, 1000);


function displayTime(){
    let time = new Date();

    time.toLocaleString();

    document.getElementById("clock").innerHTML = formatTime(time);

    function formatTime(time){
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();
        let amOrpm = hours <= 12 ? "AM" : "PM"

        hours = formatZeros(hours);
        minutes = formatZeros(minutes);
        seconds = formatZeros(seconds);

        return `${hours}:${minutes}:${seconds} ${amOrpm}`;
    }
    function formatZeros(value){
        value = String(value);
        if(value.length < 2){
            value = "0" + value;
        }else{
            value = value;
        }
        return value;
    }
}
