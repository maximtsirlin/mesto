

const hiddenError = (errorElement, inputErrorClass) => {
    errorElement.innerText = '';
    errorElement.classList.remove(inputErrorClass);
  };
  
  const showError = (errorElement, message, inputErrorClass) => {
    errorElement.innerText = message;
    errorElement.classList.add(inputErrorClass);
  };
  
  const toggleInputState = (inputElement, options) => {
    const {inputSectionSelector, inputErrorSelector, inputErrorClass} = options;
    const isValid = inputElement.validity.valid;
    const inputSectionElement = inputElement.closest(inputSectionSelector);
    const errorElement = inputSectionElement.querySelector(inputErrorSelector);
    if (isValid) {
      hiddenError(errorElement, options.inputErrorClass);
    } else {
      showError(errorElement, inputElement.validationMessage, inputErrorClass);
    }
  };
  
  
  const enableButton = (buttonElement, disabledButtonClass) => {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(disabledButtonClass);
  }; 
  
  
    const disableButton = (buttonElement, disabledButtonClass) => {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(disabledButtonClass);
  };
  
  
  const toggleButtonState = (inputs, submitElement, disabledButtonClass) => { /* первым аргументом принимает массив инпута а вторым кнопку */
  const formIaValid = inputs.every(inputElement => inputElement.validity.valid);
  
  if (formIaValid) {
    enableButton(submitElement, disabledButtonClass);
  } else {
    disableButton(submitElement, disabledButtonClass);
  }
  };
  
  const setEventListeners = (form, options) => {
    const submitElement = form.querySelector(options.submitSelector); /* находим кнопку 56:50 */
    const inputs = Array.from(form.querySelectorAll(options.inputSelector));
  
    inputs.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        toggleInputState(inputElement, options);
        toggleButtonState(inputs, submitElement, options.disabledButtonClass);
      });
    });
    
    toggleButtonState(inputs, submitElement, options.disabledButtonClass);
  };
  
  
  
  const enableValidation = (options) => {
    const forms = Array.from(document.querySelectorAll(options.formSelector));
    forms.forEach(form => {
      setEventListeners(form, options);
    });
  };
  
  