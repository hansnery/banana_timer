const clockDisplay = document.getElementById("display");
const pomodoroButton = document.getElementById("pomodoro");
const quickBreakButton = document.getElementById("quick-break");
const longBreakButton = document.getElementById("long-break");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const setTimeButton = document.getElementById("set-time");
const setBreakButton = document.getElementById("set-break");

let minutes = 25;
let seconds = 0;
let pause = false;
let setBreak = false;

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

function resetDisplay() {
    minutes = 25;
    seconds = 0;
}

function cantFocus() {
    alert("Nobody can really focus for more than 60 minutes!");
}

pomodoroButton.addEventListener("click", ()=> {
    resetDisplay();
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

setTimeButton.addEventListener("click", ()=> {
    inputNumber = prompt("Please enter the number of minutes (max: 60).");
    if (isNaN(inputNumber)) {
        resetDisplay();
        return;
    }
    if (inputNumber <= 60) {
        minutes = inputNumber;
    }   else {
        cantFocus();
        return;
    }
    inputNumber = 0;
    inputNumber = prompt("Please enter the number of seconds.");
    if (isNaN(inputNumber)) {
        resetDisplay();
        return;
    }
    if (inputNumber > 59) {
        secondsLeft = inputNumber;
        inputNumber = inputNumber / 60;
        secondsLeft = secondsLeft - parseInt(inputNumber, 10) * 60;
        minutes = parseInt(minutes, 10) + parseInt(inputNumber, 10);
        seconds = secondsLeft;
        if (minutes > 60 && inputNumber > 0) {
            cantFocus();
            return;
        }
    }   else {
        if (minutes > 59 && inputNumber > 0) {
            cantFocus();
            return;
        }   else {
            seconds = inputNumber;
        }
    }
    updateDisplay();
});

setBreakButton.addEventListener("click", ()=> {
    inputNumber = prompt("Please enter the number of minutes (max: 60).");
    if (isNaN(inputNumber)) {
        resetDisplay();
        return;
    }
    if (inputNumber <= 60) {
        breakMinutes = inputNumber;
    }   else {
        cantFocus();
        return;
    }
    inputNumber = 0;
    inputNumber = prompt("Please enter the number of seconds.");
    if (isNaN(inputNumber)) {
        resetDisplay();
        return;
    }
    if (inputNumber > 59) {
        secondsLeft = inputNumber;
        inputNumber = inputNumber / 60;
        secondsLeft = secondsLeft - parseInt(inputNumber, 10) * 60;
        breakMinutes = parseInt(minutes, 10) + parseInt(inputNumber, 10);
        breakSeconds = secondsLeft;
        if (breakMinutes > 60 && inputNumber > 0) {
            cantFocus();
            return;
        }
    }   else {
        if (breakMinutes > 59 && inputNumber > 0) {
            cantFocus();
            return;
        }   else {
            breakSeconds = inputNumber;
        }
    }
    setBreak = true;
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
        if (minutes == 0 && seconds == 0 && pause == false) {
            if (setBreak) {
                minutes = breakMinutes;
                seconds = breakSeconds;
                setBreak = false;
            }   else {
                minutes = 5;
                seconds = 0;
            }
            pause = true;
        }
        if (minutes == 0 && seconds == 0 && pause == true) {
            stopTimer();
            pause = false;
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
        resetDisplay()
        updateDisplay();
    });
});

