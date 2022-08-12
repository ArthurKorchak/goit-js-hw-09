import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
  useIcon: false,
  timeout: 5000,
});
const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      };
    }, delay);
  });
};

form.addEventListener('submit', event => {
  event.preventDefault();
  const amount = Number(document.querySelector('input[name=amount]').value);
  const step = Number(document.querySelector('input[name=step]').value);
  let delay = Number(document.querySelector('input[name=delay]').value);
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  };
});