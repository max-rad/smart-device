const validation = () => {
  const feedbackForm = document.querySelector('[data-form="feedback-form"]');
  const modalForm = document.querySelector('[data-form="modal-form"]');

  validateForm(feedbackForm);
  validateForm(modalForm);

  function validateForm(form) {
    let isStorageSupport = true;
    let storageName = '';
    let storagePhone = '';

    try {
      storageName = localStorage.getItem('name');
      storagePhone = localStorage.getItem('phone');
    } catch (err) {
      isStorageSupport = false;
    }

    const nameField = form.querySelector('[data-input="name-field"]');
    const phoneField = form.querySelector('[data-input="phone-field"]');
    const checkboxField = form.querySelector('[data-input="checkbox-field"]');
    const submitButton = form.querySelector('[data-button="button"]');

    const phonePattern = /^\+7\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}$/;

    if (storageName) {
      nameField.value = storageName;
    }

    if (storagePhone) {
      phoneField.value = storagePhone;
    }

    nameField.addEventListener('input', (evt) => {
      evt.preventDefault();
      const regName = /^[A-Za-zА-яа-я\s]+$/;
      let invalidMessage = [];
      nameField.setCustomValidity('');
      const name = nameField.value.trim();

      if (name.length !== 0) {
        if (!regName.test(name)) {
          invalidMessage.push('The name can contain only alphabetic characters.');
        }
      }

      if (name.length > 255) {
        invalidMessage.push('The name cannot be longer than 255 characters.');
      }

      if (invalidMessage.length > 0) {
        nameField.setCustomValidity(invalidMessage.join('\n'));
      }
      nameField.reportValidity();
    });

    phoneField.addEventListener('input', (evt) => {
      evt.preventDefault();
      const value = phoneField.value.replace(/\D+/g, '');
      const phoneLength = 11;
      const phonePrefix = '+7(';

      let result = '';

      for (let i = 0; i < value.length && i < phoneLength; i++) {
        switch (i) {
          case 0:
            result += phonePrefix;
            continue;
          case 4:
            result += ')';
            break;
          case 7:
            result += ' ';
            break;
          case 9:
            result += ' ';
            break;
          default:
            break;
        }
        result += value[i];
      }

      phoneField.value = result;
    });

    checkboxField.addEventListener('change', (evt) => {
      evt.preventDefault();
      let invalidMessage = '';
      checkboxField.setCustomValidity('');

      if (!checkboxField.checked) {
        invalidMessage = 'Consent required';
      }

      if (invalidMessage.length > 0) {
        checkboxField.setCustomValidity(invalidMessage);
      }

      checkboxField.reportValidity();
    });

    submitButton.addEventListener('click', (evt) => {
      if (nameField.value === '') {
        evt.preventDefault();
        nameField.setCustomValidity('Name is required.');
        nameField.reportValidity();
        nameField.focus();
      } else if (phoneField === '') {
        evt.preventDefault();
        phoneField.setCustomValidity('Phone is required.');
        phoneField.reportValidity();
        phoneField.focus();
      } else if (!phonePattern.test(phoneField.value)) {
        evt.preventDefault();
        phoneField.setCustomValidity('Invalid phone number.');
        phoneField.reportValidity();
        phoneField.focus();
      } else {
        phoneField.setCustomValidity('');
        phoneField.reportValidity();
        if (isStorageSupport) {
          localStorage.clear();
          /* localStorage.setItem('name', nameField.value);
          localStorage.setItem('phone', phoneField.value); */
        }
      }
    });

    /* form.addEventListener('submit', (evt) => {
      if (nameField.value === '') {
        evt.preventDefault();
        nameField.setCustomValidity('Name is required.');
        nameField.reportValidity();
        nameField.focus();
      } else if (phoneField === '') {
        evt.preventDefault();
        phoneField.setCustomValidity('Phone is required.');
        phoneField.reportValidity();
        phoneField.focus();
      } else {
        if (isStorageSupport) {
          localStorage.setItem('name', nameField.value);
          localStorage.setItem('phone', phoneField.value);
        }
      }
    }); */
  }
};

export {validation};
