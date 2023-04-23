export class FormValidator {
  constructor(validationConfig, formElement) {
    this.validationConfig = validationConfig;
    this.formElement = formElement;
  }

  #hiddenError(errorElement, inputErrorClass) {
    errorElement.innerText = '';
    errorElement.classList.remove(inputErrorClass);
  };

  #hideInputError(inputElement, inputInvalidClass) {
    inputElement.classList.remove(inputInvalidClass);
  };



  #showError(errorElement, message, inputErrorClass) {
    errorElement.innerText = message;
    errorElement.classList.add(inputErrorClass);
  };


  #showInputError(inputElement, inputInvalidClass) {
    inputElement.classList.add(inputInvalidClass);
  };

  #enableButton(buttonElement, disabledButtonClass) {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(disabledButtonClass);
  };


  #disableButton(buttonElement, disabledButtonClass) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(disabledButtonClass);
  };

  #toggleInputState(inputElement, options) {
    const { inputSectionSelector, inputErrorSelector, inputErrorClass } = options;
    const isValid = inputElement.validity.valid;
    const inputSectionElement = inputElement.closest(inputSectionSelector);
    const errorElement = inputSectionElement.querySelector(inputErrorSelector);
    if (isValid) {
      this.#hideInputError(inputElement, options.inputInvalidClass);
      this.#hiddenError(errorElement, options.inputErrorClass);
    } else {
      this.#showInputError(inputElement, options.inputInvalidClass);
      this.#showError(errorElement, inputElement.validationMessage, inputErrorClass);
    }
  };

  #toggleButtonState(inputs, submitElement, disabledButtonClass) {
    const formIsValid = inputs.every(inputElement => inputElement.validity.valid);

    if (formIsValid) {
      this.#enableButton(submitElement, disabledButtonClass);
    } else {
      this.#disableButton(submitElement, disabledButtonClass);
    }
  };

  #setEventListeners(form, options) {
    this._submitElement = form.querySelector(options.submitSelector);
    const inputs = Array.from(form.querySelectorAll(options.inputSelector));

    inputs.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this.#toggleInputState(inputElement, options);
        this.#toggleButtonState(inputs, this._submitElement, options.disabledButtonClass);
      });
    });

    this.#toggleButtonState(inputs, this._submitElement, options.disabledButtonClass);
  };

  #disableSubmitButton() {
    this._submitElement.disabled = true;
  }

  enableValidation() {
    this.#setEventListeners(this.formElement, this.validationConfig);
    this.#disableSubmitButton();

  }


  reset() {
    this.#disableSubmitButton();
    this.#disableButton();
  }

}