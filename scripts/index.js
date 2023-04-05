import { Card, FormValidator } from './classes/index.js';

import { initialCards } from './const.js';
import { openEditProfilePopup, openAddPlacePopup, openImagePopup, closePopup, popupTypesSelectors } from './popup.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_edit');

// выделяем заголовок
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const placeAddButton = document.querySelector('.profile__add-button')

const popupAdd = document.querySelector('.popup_add');

// выделяем кнопку создать
const popupAddSaveButton = popupAdd.querySelector('.form__save');

// нахожу форму попапа 1
const profileEditForm = document.querySelector('.popup_edit');
const profileEditNameInput = profileEditForm.querySelector('.form__input_name');
const profileEditJobInput = profileEditForm.querySelector('.form__input_job');

// нахожу форму попапа 2
const addPlaceForm = document.querySelector('.popup_add');

const handleAddPlaceSubmit = (evt) => {
  evt.preventDefault();
  // удалил классы 
  const newCardTitle = addPlaceForm.value;
  const newCardImage = addPlaceForm.value;
  const newCard = getItemElement(newCardTitle, newCardImage);
  cardsListContainer.prepend(newCard);
  closePopup(popupAdd);
}

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  // добавляем его к инпуту 
  profileTitle.textContent = profileEditNameInput.value;
  profileDescription.textContent = profileEditJobInput.value;
  // закрытие popup 
  closePopup(popupEdit)
}

// Добавление слушателей на открытие попапов
profileEditButton.addEventListener('click', () => openEditProfilePopup(profileTitle.textContent, profileDescription.textContent));
placeAddButton.addEventListener('click', openAddPlacePopup);


// нахожу контейнер куда рендерить 
const cardsListContainer = document.querySelector('.cards');

const generatePlaceCard = (card) => {
  const newCard = new Card(card, '#cards__template', openImagePopup)
  const newItem = newCard.getItemElement();
  // вставляем в начало контейнера 
  cardsListContainer.prepend(newItem)
}

// Пробегаемся по массиву мест и генерируем карточки  
initialCards.forEach((card) => {
  generatePlaceCard(card)
})



const addNewCard = (evt) => {
  evt.preventDefault();
  const title = evt.target.title.value;
  const link = evt.target.link.value;

  if (title && link) {
    const card = { name: title, link: link }
    generatePlaceCard(card);
  }

  evt.target.reset()
  popupAddSaveButton.disabled = true;

  closePopup(popupAdd)
};

// Добавление слушателей на сабмит формы
profileEditForm.addEventListener('submit', handleProfileFormSubmit);
addPlaceForm.addEventListener('submit', addNewCard);

const formsValidationConfig = {
  submitSelector: '.form__save',
  inputSelector: '.form__input',
  inputInvalidClass: 'form__input_invalid',
  inputSectionSelector: '.form__section',
  inputErrorClass: '.form__input-error_active',
  inputErrorSelector: '.form__input-error',
  disabledButtonClass: '.form__save_inactive',
};

const profileEditFormElement = document.getElementById('profileEditForm');
const profileEditFormValidator = new FormValidator(formsValidationConfig, profileEditFormElement);
profileEditFormValidator.enableValidation();

const addPlaceFormElement = document.getElementById('addPlaceForm');
const addPlaceFormValidator = new FormValidator(formsValidationConfig, addPlaceFormElement);
addPlaceFormValidator.enableValidation();

