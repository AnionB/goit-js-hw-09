import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
let selectedDate = {};
let intervalId = null;
const refs = {
  startBtn: document.querySelector('[data-start]'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
  input: document.querySelector('#datetime-picker'),
};
document.querySelector('.timer').style.display = 'flex';
document.querySelectorAll('.value').forEach(element => {
  element.style.fontSize = '40px';
});
document.querySelectorAll('.field').forEach(element => {
  element.style.display = 'flex';
  element.style.flexDirection = 'column';
  element.style.paddingRight = '20px';
});
document.querySelectorAll('.label').forEach(element => {
  element.textContent = element.textContent.toUpperCase();
});

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0].days());
    selectDate(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

function activeBtn() {
  refs.startBtn.disabled = false;
  refs.startBtn.addEventListener('click', onStartBtnClick);
}
function disactiveBtn() {
  refs.startBtn.disabled = true;
  refs.startBtn.removeEventListener('click', onStartBtnClick);
}

function selectDate(date) {
  if (date < Date.now()) {
    Notify.failure('Please choose a date in the future');
    disactiveBtn();
    return;
  }

  if (convertMs(date - Date.now()).days > '99') {
    Notify.failure('Please select a date closer');
    disactiveBtn();
    return;
  }

  Notify.success('You choose valid date');
  activeBtn();
  fillPage(date);
  selectedDate = date;
}
function fillPage(date) {
  if (date < Date.now()) {
    clearInterval(intervalId);
    disactiveBtn();
    refs.input.disabled = false;
    Notify.success('The time has come!!!');
    return;
  }
  const timerDate = convertMs(date - Date.now());

  refs.daysValue.textContent = addLeadingZero(timerDate.days);
  refs.hoursValue.textContent = addLeadingZero(timerDate.hours);
  refs.minutesValue.textContent = addLeadingZero(timerDate.minutes);
  refs.secondsValue.textContent = addLeadingZero(timerDate.seconds);
}
function onStartBtnClick() {
  intervalId = setInterval(() => {
    fillPage(selectedDate);
  }, 1000);
  disactiveBtn();
  refs.input.disabled = true;
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  if (value > 9) {
    return value;
  }
  return value.toString().padStart(2, '0');
}
