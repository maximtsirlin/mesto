import {Card} from './Card.js';



const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_edit');

const profileTitle = document.querySelector('.profile__title'); /* выделяем заголовок */
const profileDescription = document.querySelector('.profile__description');

const placeAddButton = document.querySelector('.profile__add-button')

const popupAdd = document.querySelector('.popup_add');
const popupAddSaveButton = popupAdd.querySelector('.form__save'); /* выделяем кнопку создать */

const popupImage = document.querySelector('.popup_image')
const popupImageImg = popupImage.querySelector('.popup__img')
const nameImgClicked = popupImage.querySelector('.popup__figcaption'); /* выделяем заголовок попапа */


const profileEditForm = document.querySelector('.form');  /* нахожу форму попапа 1 */
const profileEditNameInput = document.querySelector('.form__input_name');
const profileEditJobInput = document.querySelector('.form__input_job');
const profileEditLinkInput = document.querySelector('.form__input_link');

const addPlaceForm = document.querySelector('.popup_add'); /* нахожу форму попапа 2 */


const allPopups = document.querySelectorAll('.popup') /* нашли все попапы */



const openPopup = (popup) => { /* включает видимость попапа */
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscBtn);

};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscBtn);
};

const closeByEscBtn = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  };
};




allPopups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})






const handleAddPlaceSubmit = (evt) => {
  evt.preventDefault();
  const newCardTitle = addPlaceForm.value; /* удалил классы */
  const newCardImage = addPlaceForm.value;
  const newCard = getItemElement(newCardTitle, newCardImage);
  cardsListContainer.prepend(newCard);
  closePopup(popupAdd);
}



const openProfilePopup = () => {
  profileEditNameInput.value = profileTitle.textContent;
  profileEditJobInput.value = profileDescription.textContent;
  openPopup(popupEdit) /* открытие edit */
}

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = profileEditNameInput.value; /* добавляем его к инпуту */
  profileDescription.textContent = profileEditJobInput.value;
  closePopup(popupEdit) /* закрытие popup */
}


const openAddPlace = () => {
  openPopup(popupAdd)
} /* функция c добавлением булевого модификатора*/



profileEditForm.addEventListener('submit', handleProfileFormSubmit);
profileEditButton.addEventListener('click', openProfilePopup);

placeAddButton.addEventListener('click', openAddPlace); /* функция открытия */


///////////////////////////////////////////////////////////////////

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardsListContainer = document.querySelector('.cards'); /* нахожу контейнер куда рендерить */



const openPopupImage = (title, link) => {
  popupImageImg.src = link; /* вставляем ссылку */
  popupImageImg.alt = title; /* вставляем описание */
  nameImgClicked.textContent = title;
  openPopup(popupImage);
}



const generatePlaceCard = (place) => {
  const card = new Card(place, '#cards__template', openPopupImage)
  const newItem = card.getItemElement();
  cardsListContainer.prepend(newItem)  /* вставляем в начало контейнера */
}

initialCards.forEach((place) => {  /* пробегаемся по массиву мест и генерируем карточки  */
  generatePlaceCard(place)
})



const addNewCard = (evt) => {
  evt.preventDefault();
  const title = evt.target.title.value;
  const link = evt.target.link.value;
  if (title, link) {
    const place = {name: title, link: link}
    generatePlaceCard(place);
  }
  evt.target.reset()
  popupAddSaveButton.disabled = true;
  closePopup(popupAdd)
};

addPlaceForm.addEventListener('submit', addNewCard)

///////////////////////////////////////////////////////////////////
/* валидации */



const options = {
  formSelector: '.form',
  submitSelector: '.form__save',
  inputSelector: '.form__input',
  inputInvalidClass: 'form__input_invalid',
  inputSectionSelector: '.form__section',
  inputErrorClass: '.form__input-error_active',
  inputErrorSelector: '.form__input-error',
  disabledButtonClass: '.form__save_inactive',
};

enableValidation(options);