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

const addPlaceForm = document.querySelector('.popup_add'); /* нахожу форму попапа 2 */


const allPopups = document.querySelectorAll('.popup') /* нашли все попапы */



const openPopup = (popup) => { /* включает видимость попапа */
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}





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




const closePopupOnEscape = (event) => {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};
document.addEventListener('keydown', closePopupOnEscape);


const handleAddPlaceSubmit = (evt) => {
  evt.preventDefault();
  const newCardTitle = addPlaceForm.querySelector('.form__input_name').value;
  const newCardImage = addPlaceForm.querySelector('.form__input_job').value;
  const newCard = getItemElement(newCardTitle, newCardImage);
  cardsListContainer.prepend(newCard);
  closePopup(popupAdd);
}

addPlaceForm.addEventListener('submit', handleAddPlaceSubmit);


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
const placeCardTemplate = document.getElementById('cards__template').content;

const deleteCard = (evt) => {
  const deleteButton = evt.target;
  const cell = deleteButton.closest('.cards__cell');
  cell.remove();
}

const openPopupImage = (title, link) => {
  popupImageImg.src = link; /* вставляем ссылку */
  popupImageImg.alt = title; /* вставляем описание */
  nameImgClicked.textContent = title;
  openPopup(popupImage);
}




const getItemElement = (title, link) => {
  const newItemElement = placeCardTemplate.cloneNode(true); /* клонирую содержимое шаблона чтобы получить новую карточку */

  const newItemTitle = newItemElement.querySelector('.cards__description'); /* берем заголовок */
  newItemTitle.textContent = title;  /* вставляем в карточку заголовок переданный в аргументах */

  const newItemImage = newItemElement.querySelector('.cards__item'); /* берем картинку */
  newItemImage.src = link; /* вставляем ссылку */
  newItemImage.alt = title; /* вставляем описание */
  newItemImage.addEventListener('click', () => { openPopupImage(title, link) }) /* добавляем обработчик нажатия на картинку чтобы он открывал попап с картинкой */

  const deleteButton = newItemElement.querySelector('.cards__delete');  /* кнопка удаления */
  deleteButton.addEventListener('click', deleteCard)

  const likeButton = newItemElement.querySelector('.cards__button'); /* кнопка лайка */
  likeButton.addEventListener("click", (event) => {
    event.target.classList.toggle('cards__button-active');
  });

  return newItemElement;
}  /* создает элемент, стрелочная функция которая принимает в себя заголовок и ссылку */

const generatePlaceCard = (title, link) => {
  const newItem = getItemElement(title, link)
  cardsListContainer.prepend(newItem)  /* вставляем в начало контейнера */
}

initialCards.forEach((place) => {  /* пробегаемся по массиву мест и генерируем карточки  */
  generatePlaceCard(place.name, place.link)
})



const addNewCard = (evt) => {
  evt.preventDefault();
  const title = evt.target.title.value;
  const link = evt.target.link.value;
  if (title, link) {
    generatePlaceCard(title, link);
  }
  evt.target.reset()
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



