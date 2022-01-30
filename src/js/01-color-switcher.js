const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let currentIntervalId = null;
refs.stopBtn.disabled = true;
refs.startBtn.addEventListener('click', onStartBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function changeBackgroundColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}
function onStartBtnClick() {
  currentIntervalId = setInterval(changeBackgroundColor, 1000);
  changeBtnCondition();
  refs.stopBtn.addEventListener('click', onStopBtnClick);
  refs.startBtn.removeEventListener('click', onStartBtnClick);
}
function onStopBtnClick() {
  clearInterval(currentIntervalId);
  changeBtnCondition();
  refs.stopBtn.removeEventListener('click', onStopBtnClick);
  refs.startBtn.addEventListener('click', onStartBtnClick);
}
function changeBtnCondition() {
  refs.stopBtn.disabled = !refs.stopBtn.disabled;
  refs.startBtn.disabled = !refs.startBtn.disabled;
}
