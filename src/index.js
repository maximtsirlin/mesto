import { Card, FormValidator, PopupWithImage, UserInfo, PopupWithForm, Section } from './classes/index.js';
import { initialCards } from './const.js';
import './pages/index.css';


const profileEditButton = document.querySelector('.profile__edit-button');
const placeAddButton = document.querySelector('.profile__add-button')

const nameInput = document.querySelector('.form__input_name');
const jobInput = document.querySelector('.form__input_job');


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

const formCard = document.getElementById('addPlaceForm');
const validationForm = new FormValidator(formsValidationConfig, formCard);
validationForm.enableValidation();


const cardPopup = new PopupWithImage('.popup_image');
cardPopup.setEventListeners()

const generateCard = (data, popup) => { 
  const card = new Card(data, '#cards__template', (name, link) => (popup.open(name, link)));
  const el = card.getItemElement();
  return el;
}

const section = new Section({items: initialCards, renderer: (data) => generateCard(data, cardPopup)}, '.cards');

section.render();





const handlerProfileEdit = (props) => {
  userInfo.setUserInfo(props);
  profileEditFormValidator.disableButton();
  popupEdit.close()
}

const handlerAddPost = (props) => {
  const element = generateCard(props, cardPopup)
  section.addItem(element);
  validationForm.disableButton();
  popupAddCard.close()
}



const popupEdit = new PopupWithForm('.popup_edit', handlerProfileEdit);
const popupAddCard = new PopupWithForm('.popup_add', handlerAddPost); //создание экземпляра класса
popupEdit.setEventListeners()
popupAddCard.setEventListeners()



const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  infoSelector: '.profile__description',
});


const { name, info } = userInfo.getUserInfo();
// document.querySelector('.form__input_name').textContent = name;
// document.querySelector('.form__input_job').textContent = info;

// profileEditButton.addEventListener('click', () => {
//   const data = userInfo.getUserInfo()
//   document.querySelector('.form__input_name').value = data.name
//   document.querySelector('.form__input_job').value = data.info
//   popupEdit.open()
// })


profileEditButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo()
  nameInput.value = data.name
  jobInput.value = data.info
  popupEdit.open()
})


placeAddButton.addEventListener('click', () => { // повесил слушатель на click
  popupAddCard.open()
})



