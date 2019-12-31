const clockDisplay = document.getElementById("display");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

let minutes = 0;
let seconds = 10;

function prependZero(number) {
    if (number < 10) {
        return "0" + number;
    }   else {
        return number;
    }
}

clockDisplay.innerHTML = prependZero(minutes) + ":" + prependZero(seconds);

const timerGoes = function() {
    if (seconds < 1 && minutes > 0) {
        seconds = 59;
        minutes--;
    }   else {
        seconds--;
    }
    clockDisplay.innerHTML = prependZero(minutes) + ":" + prependZero(seconds);
    if (minutes == 0 && seconds == 0) {
        stopTimer();
    }
}

const timer = setInterval(()=> {
    timerGoes();
}, 1000);

const stopTimer = ()=> {
    clearInterval(timer);
}

startButton.addEventListener("click", ()=> {
    if (minutes > 0 || seconds > 0) {
        timer;
    }   else {
        stopTimer();
    }
});

stopButton.addEventListener("click", ()=> {
    stopTimer();
});

resetButton.addEventListener("click", ()=> {
    stopTimer();
    minutes = 24;
    seconds = 0;
    clockDisplay.innerHTML = "24:00";
});