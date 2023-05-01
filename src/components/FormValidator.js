export class FormValidator {
  constructor(validationConfig, formElement) {
    this.validationConfig = validationConfig;
    this.formElement = formElement;
    this._submitButton = formElement.querySelector(validationConfig.submitSelector);
    this._errorElement = formElement.querySelector(validationConfig.inputErrorSelector);
  }

  #hiddenError(errorElement) {
    errorElement.innerText = '';
    errorElement.classList.remove(this.validationConfig.inputErrorClass);
  };

  #hideInputError(inputElement) {
    inputElement.classList.remove(this.validationConfig.inputErrorClass);
  };



  #showError(errorElement, message) {
    errorElement.innerText = message;
    errorElement.classList.add(this.validationConfig.inputErrorClass);
  };


  #showInputError(inputElement) {
    inputElement.classList.add(this.validationConfig.inputInvalidClass);
  };

  #enableButton() {
    this._submitButton.removeAttribute('disabled');
    this._submitButton.classList.remove(this.validationConfig.disabledButtonClass);
  };


  #disableButton() {
    this._submitButton.setAttribute('disabled', true);
    this._submitButton.classList.add(this.validationConfig.disabledButtonClass);
  };

  #toggleInputState(inputElement) {
    const isValid = inputElement.validity.valid;
    const inputSectionElement = inputElement.closest(this.validationConfig.inputSectionSelector);
    const errorElement = inputSectionElement.querySelector(this.validationConfig.inputErrorSelector);
    if (isValid) {
      this.#hideInputError(inputElement);
      this.#hiddenError(errorElement);
    } else {
      this.#showInputError(inputElement);
      this.#showError(errorElement, inputElement.validationMessage);
    }
  };

  #toggleButtonState(inputs) {
    const formIsValid = inputs.every(inputElement => inputElement.validity.valid);

    if (formIsValid) {
      this.#enableButton();
    } else {
      this.#disableButton();
    }
  };

  #setEventListeners() {
    const inputs = Array.from(this.formElement.querySelectorAll(this.validationConfig.inputSelector));
    inputs.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this.#toggleInputState(inputElement);
        this.#toggleButtonState(inputs);
      });
    });

    this.#toggleButtonState(inputs);
  };



  #disableSubmitButton() {
    this._submitButton.disabled = true;
    this._submitButton.classList.add(this.validationConfig.disabledButtonClass);
  }




  enableValidation() {
    this.#setEventListeners();
    this.#disableSubmitButton();
  }


  disableButton() {
    this._submitButton.disabled = true;
    this._submitButton.classList.add(this.validationConfig.disabledButtonClass);
  }
}

