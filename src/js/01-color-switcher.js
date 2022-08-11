const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let control = false;
let timerId;

startBtn.addEventListener('click', () => {
    if (!control) {
        control = true;
        timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
        }, 1000);
    };
});

stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    control = false;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};