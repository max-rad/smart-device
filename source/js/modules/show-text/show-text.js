const showText = () => {
  const content = document.querySelector('[data-show-text="content"]');
  const button = document.querySelector('[data-show-text="button"]');
  const buttonText = button.textContent;

  content.classList.remove('about__content-wrapper--no-js');

  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    content.classList.toggle('about__content-wrapper--show');
    if (button.textContent === buttonText) {
      button.textContent = 'Скрыть';
    } else {
      button.textContent = 'Подробнее';
    }
  });
};

export {showText};
