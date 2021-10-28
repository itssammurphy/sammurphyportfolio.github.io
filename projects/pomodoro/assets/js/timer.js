const clockElement = document.querySelector(".pomodoro__clock");
const audio = document.querySelector("audio");

const minDiv = document.querySelector(".pomodoro__clock-mins");
const secDiv = document.querySelector(".pomodoro__clock-secs");

const startBtn = document.querySelector(".pomodoro__buttons-start");
localStorage.setItem("btn", "focus");

let initial, totalsecs, perc, paused, mins, seconds;

startBtn.addEventListener("click", () => {
  let btn = localStorage.getItem("btn");

  if (btn === "focus") {
    mins = +localStorage.getItem("focus-time") || 1;
  } else {
    mins = +localStorage.getItem("break-time") || 1;
  }

  seconds = mins * 60;
  totalsecs = mins * 60;
  setTimeout(decrement(), 60);
  startBtn.style.transform = "scale(0)";
  paused = false;
});

function decrement() {
  minDiv.textContent = Math.floor(seconds / 60);
  secDiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;
  if (circle.classList.contains("nearly-complete")) {
    circle.classList.remove("nearly-complete");
  }

  if (seconds > 0) {
    perc = Math.ceil(((totalsecs - seconds) / totalsecs) * 100);
    setProgress(perc);
    seconds--;
    initial = window.setTimeout("decrement()", 1000);
    if (seconds < 10) {
      circle.classList.add("nearly-complete");
    }
  } else {
    mins = 0;
    seconds = 0;
    audio.play();
    let btn = localStorage.getItem("btn");

    if (btn === "focus") {
      startBtn.textContent = "Start Break";
      startBtn.classList.add(".pomodro__buttons-break");
      localStorage.setItem("btn", "break");
    } else {
      startBtn.classList.remove(".pomodro__buttons-break");
      startBtn.textContent = "Start Focus Period";
      localStorage.setItem("btn", "focus");
    }
    startBtn.style.transform = "scale(1)";
  }
}
