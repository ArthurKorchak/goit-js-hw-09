import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('button[data-start]');
let timer;

btn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        timer = selectedDates[0].getTime();
        if (options.defaultDate.getTime() > timer) {
            btn.disabled = true;
            Notify.failure('Please choose a date in the future');
        } else {
            btn.disabled = false;
        };
    },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
};

function addLeadingZero(data) {
    return data.toString().padStart(2, '0');
};

flatpickr(input, options);

btn.addEventListener('click', () => {
    btn.disabled = true;
    input.disabled = true;
    timer = timer - new Date().getTime();
    const ticker = setInterval(() => {
        const { days, hours, minutes, seconds } = convertMs(timer);
        document.querySelector('span[data-days]').innerHTML = addLeadingZero(days);
        document.querySelector('span[data-hours]').innerHTML = addLeadingZero(hours);
        document.querySelector('span[data-minutes]').innerHTML = addLeadingZero(minutes);
        document.querySelector('span[data-seconds]').innerHTML = addLeadingZero(seconds);
        if (timer < 1000) {
            clearInterval(ticker);
            Notify.info('The time has come!');
            input.disabled = false;
        };
        timer -= 1000;
    }, 1000);
});