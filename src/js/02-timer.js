import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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
        const ms = selectedDates[0].getTime();
        if (options.defaultDate.getTime() > ms) {
            btn.disabled = true;
            window.alert('Please choose a date in the future');
        } else {
            btn.disabled = false;
            timer = ms;
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

function dataFormater(data) {
    if (data < 10) {
        return '0' + data;
    } else {
        return data;
    };
}

flatpickr(input, options);

btn.addEventListener('click', () => {
    btn.disabled = true;
    timer = timer - new Date().getTime()
    const ticker = setInterval(() => {
        const { days, hours, minutes, seconds } = convertMs(timer);
        document.querySelector('span[data-days]').innerHTML = dataFormater(days);
        document.querySelector('span[data-hours]').innerHTML = dataFormater(hours);
        document.querySelector('span[data-minutes]').innerHTML = dataFormater(minutes);
        document.querySelector('span[data-seconds]').innerHTML = dataFormater(seconds);
        console.log(timer);
        if (timer < 1000) {
            clearInterval(ticker);
            btn.disabled = false;
        };
        timer -= 1000;
    }, 1000);
});