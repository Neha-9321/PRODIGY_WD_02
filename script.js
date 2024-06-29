// script.js

let startTime;
let running = false;
let elapsedTime = 0;
let interval;

const stopwatchTime = document.getElementById('stopwatchTime');
const lapTimes = document.getElementById('lapTimes');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');

function formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateStopwatch() {
    const currentTime = Math.floor((Date.now() - startTime) / 1000) + elapsedTime;
    stopwatchTime.textContent = formatTime(currentTime);
}

function startStopwatch() {
    if (!running) {
        startTime = Date.now() - elapsedTime * 1000;
        interval = setInterval(updateStopwatch, 1000);
        running = true;
    }
}

function pauseStopwatch() {
    if (running) {
        clearInterval(interval);
        running = false;
        elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    }
}

function resetStopwatch() {
    clearInterval(interval);
    running = false;
    elapsedTime = 0;
    stopwatchTime.textContent = formatTime(elapsedTime);
    lapTimes.innerHTML = '';
}

function lapStopwatch() {
    if (running) {
        const lapTime = Math.floor((Date.now() - startTime) / 1000);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapTimes.childElementCount + 1}: ${formatTime(lapTime)}`;
        lapTimes.appendChild(lapItem);
    }
}

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', lapStopwatch);
