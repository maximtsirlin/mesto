import { Card, FormValidator, Popup } from './classes/index.js';
import { initialCards } from './const.js';
import { openEditProfilePopup, openAddPlacePopup, openImagePopup, closePopup, popupTypesSelectors } from './popup.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_edit');

// выделяем заголовок
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const placeAddButton = document.querySelector('.profile__add-button')

const popupAdd = document.querySelector('.popup_add');


// нахожу форму попапа 1
const profileEditForm = document.querySelector('.popup_edit');
const profileEditNameInput = profileEditForm.querySelector('.form__input_name');
const profileEditJobInput = profileEditForm.querySelector('.form__input_job');

// нахожу форму попапа 2
const addPlaceForm = document.querySelector('.popup_add');

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

const appendCards = (cards) => {
  cards.forEach((card) => {
  cardsListContainer.prepend(card)
  })
}

const generatePlaceCard = (card) => {
  const newCard = new Card(card, '#cards__template', openImagePopup)
  const newItem = newCard.getItemElement();
  return newItem;
}





const createPopup = (popupSelector) => {
  const popupElement = document.querySelector(popupSelector);
  return new Popup(popupElement);
};

const openPopup = (popup) => {
  popup.open();
};

const closePopup = (popup) => {
  popup.close();
};










// Пробегаемся по массиву мест и генерируем карточки
const generatedCards = [];


initialCards.forEach((card) => {
generatedCards.push(generatePlaceCard(card))
})

cardsListContainer.prepend(...generatedCards)




const addNewCard = (evt) => {
  evt.preventDefault();
  const title = evt.target.title.value;
  const link = evt.target.link.value;

  if (title && link) {
    const card = { name: title, link: link }
    cardsListContainer.prepend(generatePlaceCard(card))

  }

  evt.target.reset()
  closePopup(popupAdd)
  addPlaceFormValidator.reset()

};

// Добавление слушателей на сабмит формы
profileEditForm.addEventListener('submit', handleProfileFormSubmit);
addPlaceForm.addEventListener('submit', addNewCard);


