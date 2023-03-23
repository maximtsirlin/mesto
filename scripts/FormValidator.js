


class FromValidator {
    constructor(validationOptions, form, submitElement) {
        this._form = form;
        this._options = validationOptions;
        this._submitElement = submitElement;
    };

    _showError (errorElement, inputElement) {
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._options.errorClass);
        inputElement.classList.add(this._options.inputErrorClass);
    };
      
    _hideError (errorElement, inputElement) {
        errorElement.textContent = '';
        errorElement.classList.remove(this._options.errorClass);
        inputElement.classList.remove(this._options.inputErrorClass);
    };

    _setButtonActive () {
        this._submitElement.removeAttribute('disabled');
        this._submitElement.classList.remove(this._options.inactiveButtonClass);
    };
      
    setButtonInactive () {
        this._submitElement.setAttribute('disabled', 'true');
        this._submitElement.classList.add(this._options.inactiveButtonClass);
    };

    _setInputState (inputElement, isValid) {
        const inputSectionElement = inputElement.closest(this._options.errorClosestParent);
        const errorElement = inputSectionElement.querySelector(this._options.errorText);
        if (isValid) {
          this._hideError (errorElement, inputElement);
        } else {
          this._showError (errorElement, inputElement);
        };
    };

    _toggleInputState = (inputElement) => {
        const isValid = inputElement.validity.valid;
        this._setInputState(inputElement, isValid);
    };

    _toggleBtnState = (inputs) => {
        const isFormValid = inputs.every((inputElement) => {
          return inputElement.validity.valid;
        });
    
        if (isFormValid) {
          this._setButtonActive();
        } else {
          this.setButtonInactive();
        }
      }

    _setEventListeners = (form) => {
        const inputs = Array.from(form.querySelectorAll(this._options.inputSelector));
      
        inputs.forEach(inputElement => {
          inputElement.addEventListener('input', () => {
            this._toggleInputState(inputElement);
            this._toggleBtnState(inputs);
          });
      })
      
        this._toggleBtnState(inputs)
    }

    enableValidation() {
        const form = this._form;
    
        this._setEventListeners(form);
    };
}

export default FromValidator;