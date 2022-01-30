import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  form: document.querySelector('form'),
};

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  const step = evt.currentTarget.elements.step.value;
  const delay = evt.currentTarget.elements.delay.value;
  const amount = evt.currentTarget.elements.amount.value;
  let currentDelay = null;
  for (let i = 0; i < amount; i += 1) {
    if (!currentDelay) {
      currentDelay = +delay;
    } else {
      currentDelay += +step;
    }

    createPromise(i + 1, currentDelay)
      .then(({ position, delay }) =>
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`),
      )
      .catch(({ position, delay }) =>
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`),
      );
  }

  evt.currentTarget.reset();
}
