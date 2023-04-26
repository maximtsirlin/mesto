export class FormValidator {
  constructor(validationConfig, formElement) {
    this.validationConfig = validationConfig;
    this.formElement = formElement;
    this._submitButton = formElement.querySelector(validationConfig.submitSelector);
    this._errorElement = formElement.querySelector(validationConfig.inputErrorSelector);
  }

  #hiddenError() {
    this._errorElement.innerText = '';
    this._errorElement.classList.remove(this.validationConfig.inputErrorClass);
  };

  #hideInputError(inputElement) {
    inputElement.classList.remove(this.validationConfig.inputErrorClass);
  };



  #showError( message) {
    this._errorElement.innerText = message;
    this._errorElement.classList.add(this.validationConfig.inputErrorClass);
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
    // const inputSectionElement = inputElement.closest(inputSectionSelector);
    // const errorElement = inputSectionElement.querySelector(inputErrorSelector);
    if (isValid) {
      this.#hideInputError(inputElement);
      this.#hiddenError();
    } else {
      this.#showInputError(inputElement);
      this.#showError(inputElement.validationMessage);
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

