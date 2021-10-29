const focusTimeInputField = document.querySelector("#focus-time");
const breakTimeInputField = document.querySelector("#break-time");
const pauseBtn = document.querySelector(".pomodoro__buttons-pause");

focusTimeInputField.value = localStorage.getItem("focus-time");
breakTimeInputField.value = localStorage.getItem("break-time");

document.querySelector("form").addEventListener("input", (e) => {
  e.preventDefault();
  localStorage.setItem("focus-time", focusTimeInputField.value);
  localStorage.setItem("break-time", breakTimeInputField.value);
});

document.querySelector(".pomodoro__buttons-reset").addEventListener("click", () => {
  startBtn.style.transform = "scale(1)";
  clearTimeout(initial);
  setProgress(0);
  minDiv.textContent = 0;
  secDiv.textContent = "00";
});

pauseBtn.addEventListener("click", () => {
  if (paused === undefined) {
    return;
  }
  if (paused) {
    paused = false;
    initial = setTimeout("decrement()", 60);
    pauseBtn.textContent = "Pause";
    pauseBtn.classList.remove("pomodoro__buttons-resume");
  } else {
    clearTimeout(initial);
    pauseBtn.textContent = "Resume";
    pauseBtn.classList.add("pomodoro__buttons-resume");
    paused = true;
  }
});
