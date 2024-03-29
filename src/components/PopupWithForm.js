import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector, submitCallback);
    this._submitCallback = submitCallback;
    this._form = this._popupElement.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__input');
    this._submitButton = this._form.querySelector('.form__save');
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
    this._submitButton.addEventListener('click', evt => {
      evt.preventDefault();
      this._submitButton.textContent = 'Сохранение...';
      this._submitCallback(this._getInputValues(), this._submitButton)
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}




