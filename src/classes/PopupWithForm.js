import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback, avatarLink) {
    super(popupSelector, submitCallback);
    this._submitCallback = submitCallback;
    this._form = this._popupElement.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__input');
    this._submitButton = this._form.querySelector('.form__save');



    this._inputLink = this._form.querySelector('input[name="link"]');
    this._handleSubmit = this._handleSubmit.bind(this);


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
      this._submitButton.textContent = 'Сохранить';
    });
  }
  
  _handleSubmit(event) {
    event.preventDefault();
    const imageUrl = this._inputLink.value;
    const avatarImage = document.querySelector('.profile__avatar');
    avatarImage.setAttribute('src', imageUrl);
    this._submitButton.disabled = true;
  }
  

  close() {
    super.close();
    this._form.reset();
  }
}




