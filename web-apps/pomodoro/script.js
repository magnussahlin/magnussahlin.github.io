var cycle = 1;
var minutes = 25;
var seconds = 0;
var position = 0;
var workBreak = "work";
var time = document.getElementById("time");
var pointer = document.getElementById("pointer");
var paused = false;

updateTime();
var timer = setInterval(tick, 1000);

function pause() {
    if (paused == false) {clearInterval(timer); paused = true}
}


function start() {
    if (paused == true) {timer = setInterval(tick, 1000); paused = false}
}

function tick() {
    seconds--;
    if (seconds == -1) {minutes--; seconds = 59;}
    if (minutes == -1) {newCycle();}
    updateTime();
    updatePointer();
    updateTitle();
}

function newCycle() {
    cycle++;
    if (cycle == 1) {position = 0}
    if (cycle == 8) {
        cycle = 0;
        minutes = 15;
        seconds = 0;
        color("#99C24D");
        workBreak = "break";
    } else if (cycle % 2 == 0) {
        minutes = 5;
        seconds = 0;
        color("#99C24D");
        workBreak = "break";
    } else {
        minutes = 25;
        seconds = 0;
        color("#0E79B2");
        workBreak = "work";
    }
}

function updateTime() {
    time.innerHTML = addZero(minutes) + ":" + addZero(seconds);
}

function updatePointer() {
    position++;
    pointer.style.left = position/78 + "%"
}

function updateTitle() {
    document.title = addZero(minutes) + ":" + addZero(seconds) + " " + workBreak;
}

function color(newColor) {
    time.style.color = newColor;
}

function addZero(number) {
    if (number < 10) {return '0'+number;}
    else {return number}
}