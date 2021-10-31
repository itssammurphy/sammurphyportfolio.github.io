const screenText = document.querySelector(".value");

function clearCalculator() {
  screenText.value = '';
}
function division() {
  screenText.value += '/';
}
function multiply() {
  screenText.value += '*';
}
function subtract() {
  screenText.value += '-';
}
function add() {
  screenText.value += '+';
}
function number(n) {
  screenText.value += n;
}
function decimal() {
  screenText.value += '.';
}
function evaluateCalculation() {
  screenText.value = eval(screenText.value);
}
