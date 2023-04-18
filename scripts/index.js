// import PopupWithImage from './classes/PopupWithImage.js';
import { Card, FormValidator, PopupWithImage, UserInfo } from './classes/index.js';
import { PopupWithForm } from './classes/PopupWithForm.js';
import { initialCards } from './const.js';
// import { openEditProfilePopup, openAddPlacePopup, popupTypesSelectors } from './popup.js'; //  closePopup,
const profileEditButton = document.querySelector('.profile__edit-button');

// выделяем заголовок
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const placeAddButton = document.querySelector('.profile__add-button')

const popupAdd = document.querySelector('.popup_add'); //FIXME






// нахожу форму попапа 1
// const profileEditForm = document.querySelector('.popup_edit');
// const profileEditNameInput = profileEditForm.querySelector('.form__input_name');
// const profileEditJobInput = profileEditForm.querySelector('.form__input_job');



const formsValidationConfig = {
  submitSelector: '.form__save',
  inputSelector: '.form__input',
  inputInvalidClass: 'form__input_invalid',
  inputSectionSelector: '.form__section',
  inputErrorClass: '.form__input-error_active',
  inputErrorSelector: '.form__input-error',
  disabledButtonClass: '.form__save_inactive',
}; //??? 

const profileEditFormElement = document.getElementById('profileEditForm');
const profileEditFormValidator = new FormValidator(formsValidationConfig, profileEditFormElement);
profileEditFormValidator.enableValidation();

const addPlaceFormElement = document.getElementById('addPlaceForm');
const addPlaceFormValidator = new FormValidator(formsValidationConfig, addPlaceFormElement);
addPlaceFormValidator.enableValidation();

const handlerProfileEdit = (props) => {
  // profileTitle.innerText = props.
  console.log(props);
}

// const handleAddPlaceSubmit = (evt) => {
//   evt.preventDefault();
//   // удалил классы 
//   const newCardTitle = addPlaceForm.value;
//   const newCardImage = addPlaceForm.value;
//   const newCard = getItemElement(newCardTitle, newCardImage);
//   cardsListContainer.prepend(newCard);
//   closePopup(popupAdd);
// }

// const handleProfileFormSubmit = (evt) => {
//   evt.preventDefault();
//   // добавляем его к инпуту 
//   profileTitle.textContent = profileEditNameInput.value;
//   profileDescription.textContent = profileEditJobInput.value;
//   // закрытие popup 
//   closePopup(popupEdit)
// }

// Добавление слушателей на открытие попапов
// profileEditButton.addEventListener('click', () => openEditProfilePopup(profileTitle.textContent, profileDescription.textContent));
// placeAddButton.addEventListener('click', openAddPlacePopup);


// нахожу контейнер куда рендерить 
const cardsListContainer = document.querySelector('.cards');

const appendCards = (cards) => {
  cards.forEach((card) => {
    cardsListContainer.prepend(card)
  })
}








// const createWithImagePopup = (popupSelector) => {
//   const popupElement = document.querySelector(popupSelector);
//   const popup = new PopupWithImage(popupElement);
//   console.log(popup._popupImage);
// };
// console.log("end");
// const openPopup = (popup) => {
//   popup.open();
// };

// const closePopup = (popup) => {
//   popup.close();
// };


// Пробегаемся по массиву мест и генерируем карточки
const generatedCards = [];







// const addNewCard = (evt) => {
//   evt.preventDefault();
//   const title = evt.target.title.value;
//   const link = evt.target.link.value;

//   if (title && link) {
//     const card = { name: title, link: link }
//     cardsListContainer.prepend(generatePlaceCard(card))

//   }

//   evt.target.reset()
//   closePopup(popupAdd)
//   addPlaceFormValidator.reset()

// };

// // Добавление слушателей на сабмит формы
// profileEditForm.addEventListener('submit', handleProfileFormSubmit);
// addPlaceForm.addEventListener('submit', addNewCard);








const justButton = document.querySelector('.just__button');
const popupWithImage = new PopupWithImage('.popup_image');
const popupEdit = new PopupWithForm('.popup_edit', handlerProfileEdit);
const popupAddCard = new PopupWithForm('.popup_add', handlerProfileEdit); //создание экземпляра класса

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  infoSelector: '.profile__description',
});



const { name, info } = userInfo.getUserInfo();
document.querySelector('.form__input_name').textContent = name;
document.querySelector('.form__input_job').textContent = info;




const addPopupWithImageClass = () => {
  popupWithImage.open('image', 'https://translate.google.com/');
};

profileEditButton.addEventListener('click', () => {
  popupEdit.open()
})


placeAddButton.addEventListener('click', () => { // повесил слушатель на click
  popupAddCard.open()
})

// placeAddButton.addEventListener('click', () => { // повесил слушатель на click
//   getInfo.open()
// }) 


document.querySelectorAll('.form__submit-button').forEach((ev) => {
  ev.addEventListener('click', (e) => {
    e.preventDefault()
  })
})

justButton.addEventListener('click', addPopupWithImageClass);



// justButton.addEventListener('click', addPopupWithImageClass);


// const addPopupWithImageClass = (card) => {
//   const popupWithImage = new PopupWithImage(card, '.just__button', addPopupWithImageClass);
//   const justButton = popupWithImage.querySelector('.popup_image');
//   return justButton;
// };


function openImagePopup(title, link) {
  popupWithImage.open( title, link );
  // popupImageImg.src = link; /* вставляем ссылку */
  // popupImageImg.alt = title; /* вставляем описание */
  // nameImgClicked.textContent = title;
  // openPopup(popupImage);
}





const generatePlaceCard = (card) => {
  const newCard = new Card(card, '#cards__template', openImagePopup)
  const newItem = newCard.getItemElement();
  return newItem;
}


initialCards.forEach((card) => {
  generatedCards.push(generatePlaceCard(card))
})

cardsListContainer.prepend(...generatedCards)