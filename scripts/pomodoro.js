const clockDisplay = document.getElementById("display");
const pomodoroButton = document.getElementById("pomodoro");
const quickBreakButton = document.getElementById("quick-break");
const longBreakButton = document.getElementById("long-break");
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

function updateDisplay() {
    clockDisplay.innerHTML = prependZero(minutes) + ":" + prependZero(seconds);
}

pomodoroButton.addEventListener("click", ()=> {
    minutes = 24;
    seconds = 0;
    updateDisplay();
});

quickBreakButton.addEventListener("click", ()=> {
    minutes = 5;
    seconds = 0;
    updateDisplay();
});

longBreakButton.addEventListener("click", ()=> {
    minutes = 10;
    seconds = 0;
    updateDisplay();
});

updateDisplay();

startButton.addEventListener("click", ()=> {
    const timerGoes = function() {
        if (seconds < 1 && minutes > 0) {
            seconds = 59;
            minutes--;
        }   else {
            seconds--;
        }
        updateDisplay();
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

    if (minutes > 0 || seconds > 0) {
        timer;
    }   else {
        stopTimer();
    }

    stopButton.addEventListener("click", ()=> {
        stopTimer();
    });
    
    resetButton.addEventListener("click", ()=> {
        stopTimer();
        minutes = 24;
        seconds = 0;
        clockDisplay.innerHTML = "24:00";
    });
});

