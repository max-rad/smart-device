const initAccordion = () => {
  const accordionToggle = document.querySelectorAll('[data-accordion="toggle"]');
  const accordionItem = document.querySelectorAll('[data-accordion="accordion"]');

  for (let i = 0; i < accordionToggle.length; i++) {
    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
        accordionToggle[i].tabIndex = 0;
      } else {
        accordionToggle[i].tabIndex = -1;
      }
    });
  }

  for (let i = 0; i < accordionItem.length; i++) {
    accordionItem[i].classList.remove('accordion__item--no-js');
  }

  for (let i = 0; i < accordionToggle.length; i++) {
    accordionToggle[i].addEventListener('click', (evt) => {
      evt.preventDefault();
      for (let j = 0; j < accordionItem.length; j++) {
        if (accordionItem[j].classList.contains('accordion__item--active')) {
          accordionItem[j].classList.remove('accordion__item--active');
        } else if (i === j) {
          accordionItem[j].classList.toggle('accordion__item--active');
        }
      }
    });
  }
};

export {initAccordion};
