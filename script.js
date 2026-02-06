let startTime = 0;
let elapsedTime = 0;
let timerRunning = false;
let animationFrameId;
let lapCount = 0;

const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const millisecondsEl = document.getElementById("milliseconds");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");

const lapsList = document.getElementById("lapsList");

function formatTime(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  return {
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
    milliseconds: String(milliseconds).padStart(2, "0")
  };
}

function updateDisplay(time) {
  const formatted = formatTime(time);
  minutesEl.textContent = formatted.minutes;
  secondsEl.textContent = formatted.seconds;
  millisecondsEl.textContent = formatted.milliseconds;
}

function runTimer(timestamp) {
  if (!startTime) startTime = timestamp;
  elapsedTime = timestamp - startTime;
  updateDisplay(elapsedTime);
  animationFrameId = requestAnimationFrame(runTimer);
}

startBtn.addEventListener("click", () => {
  if (!timerRunning) {
    timerRunning = true;
    startTime = performance.now() - elapsedTime;
    animationFrameId = requestAnimationFrame(runTimer);
    lapBtn.disabled = false;
  }
});

pauseBtn.addEventListener("click", () => {
  if (timerRunning) {
    timerRunning = false;
    cancelAnimationFrame(animationFrameId);
  }
});

resetBtn.addEventListener("click", () => {
  timerRunning = false;
  cancelAnimationFrame(animationFrameId);
  elapsedTime = 0;
  startTime = 0;
  lapCount = 0;
  updateDisplay(0);
  lapsList.innerHTML = "";
  lapBtn.disabled = true;
});

lapBtn.addEventListener("click", () => {
  lapCount++;
  const formatted = formatTime(elapsedTime);

  const li = document.createElement("li");
  li.innerHTML = `
    <span>Lap ${lapCount}</span>
    <span>${formatted.minutes}:${formatted.seconds}.${formatted.milliseconds}</span>
  `;
  lapsList.prepend(li);
});
