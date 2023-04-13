import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__input');
    this._submitButton = this._form.querySelector('.form__submit-button');
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitButton.textContent = 'Сохранение...';
      this._submitCallback(this._getInputValues())
        .finally(() => {
          this._submitButton.textContent = 'Сохранить';
        });
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
