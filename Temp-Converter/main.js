const temp = document.getElementById("tempField").value;

let choice1 = document.getElementById("celsiusBtn");
let choice2 = document.getElementById("fahrenheitBtn");

document.getElementById("myButton").onclick = function(){
    
    let value;

    if(choice1.checked == true){
        value = toCelsius(temp);
        //document.getElementById("resultLabel").innerHTML = `The result is ${value}°C`;
        
        document.getElementById("resultLabel").innerHTML =`The Result is ${value}`;

    } else if(choice2.checked == true){
        value = toFahrenheit(temp);
        //document.getElementById("resultLabel").innerHTML = "The Result is : " + value + "°F";
        
        document.getElementById("resultLabel").innerHTML =`The Result is ${value}`;
    
    }
}

function toCelsius(value){
    let result = (value -  32) * (5/9);
    result = result.toLocaleString(undefined, {style: "unit", unit : "celsius"});
    return result;
}

function toFahrenheit(value){
    let result = value * 9 / 5 + 32 ;
    result = result.toLocaleString(undefined, {style: "unit", unit : "fahrenheit"});
    return result;
}