import { Card, FormValidator, PopupWithImage, UserInfo, PopupWithForm, Section } from './classes/index.js';
import { initialCards } from './const.js';
const profileEditButton = document.querySelector('.profile__edit-button');

// выделяем заголовок
// const profileTitle = document.querySelector('.profile__title');
// const profileDescription = document.querySelector('.profile__description');

const placeAddButton = document.querySelector('.profile__add-button')

// const popupAdd = document.querySelector('.popup_add'); //FIXME



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


// нахожу контейнер куда рендерить 
const cardsListContainer = document.querySelector('.cards');

const appendCards = (cards) => {
  cards.forEach((card) => {
    cardsListContainer.prepend(card)
  })
}


// Пробегаемся по массиву мест и генерируем карточки
const generatedCards = [];


const justButton = document.querySelector('.just__button');
const popupWithImage = new PopupWithImage('.popup_image');
const popupEdit = new PopupWithForm('.popup_edit', handlerProfileEdit);
const popupAddCard = new PopupWithForm('.popup_add', handlerProfileEdit); //создание экземпляра класса

// function generateCard(item) {
//   const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
//   const cardElement = cardTemplate.cloneNode(true);
//   cardElement.querySelector('.card__image').src = item.link;
//   cardElement.querySelector('.card__image').alt = item.name;
//   cardElement.querySelector('.card__title').textContent = item.name;
//   return cardElement;
// }


//создаем функцию отрисовки generateCard
function generateCard(cardData, templateSelector, handleCardClick) {
  const card = new Card(cardData, templateSelector, handleCardClick);
  return card.getItemElement();
}


//создаем экземпляр класса Section  
const cardsSection = new Section({  
  items: initialCards,
  renderer: generateCard
}, '.cards');

cardsSection.render();







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


document.querySelectorAll('.form__submit-button').forEach((ev) => {
  ev.addEventListener('click', (e) => {
    e.preventDefault()
  })
})

justButton.addEventListener('click', addPopupWithImageClass);



function openImagePopup(title, link) {
  popupWithImage.open( title, link );

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