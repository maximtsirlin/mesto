import { Card, FormValidator, PopupWithImage, UserInfo, PopupWithForm, Section, PopupWithConfirm, Api } from './classes/index.js';
import { initialCards } from './const.js';
import './pages/index.css';

const profileImageButton = document.querySelector('.profile__image-overlay');

const cardDelete = document.querySelector('.cards__delete');

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

const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-64/',
  headers: {
    authorization: '8b7f26ff-df87-4fed-b7d8-0d5c2987dff7',
    'content-type': 'application/json'
  }
  }
);


const profileEditFormElement = document.getElementById('profileEditForm');
const profileEditFormValidator = new FormValidator(formsValidationConfig, profileEditFormElement);
profileEditFormValidator.enableValidation();

const formCard = document.getElementById('addPlaceForm');
const validationForm = new FormValidator(formsValidationConfig, formCard);
validationForm.enableValidation();

const formAvatar = document.getElementById('addAvatar');
const validationAvatar = new FormValidator(formsValidationConfig, formAvatar);
validationAvatar.enableValidation();



const cardPopup = new PopupWithImage('.popup_image');
cardPopup.setEventListeners()

const handlerDelete = (card) => {
popupConfirm.open(card)
}

const handlerLike = (card) => {
  console.log("in handler")
  if (card.isLike) {
    api.like(card.cardID, true).then(elem => {
      card.unLikeCard()
      card.likesCounterUpdate(elem.likes)
      console.log("unset like", elem)
    })
    console.log("unset like")
  } else {
    console.log('ff');
    api.like(card.cardID, false).then(elem => {
      card.likeCard()
      card.likesCounterUpdate(elem.likes)
    })
  }
}


const generateCard = (data, popup) => {
  const card = new Card(data, api._myId, '#cards__template', (name, link) => (popup.open(name, link)), handlerDelete, handlerLike);
  const el = card.getItemElement();
  return el;
}

//ссылка куда отправляется запрос
var section;

api.getCards()
  .then((result) => {
    console.log(result);
    section = new Section({ items: result, renderer: (data) => generateCard(data, cardPopup) }, '.cards');

    section.render();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  }); 

// const section = new Section({ items: initialCards, renderer: (data) => generateCard(data, cardPopup) }, '.cards');

// section.render();





const handlerProfileEdit = (props) => {
  userInfo.setUserInfo(props);
  profileEditFormValidator.disableButton();

  api.patchProfile({
    name: props.name,
    about: props.job,
    link: props.link
  })
  
  popupEdit.close()
}



const handlerAddPost = (props) => {
  const element = generateCard(props, cardPopup)
  section.addItem(element);
  validationForm.disableButton();

  api.postCard({
    name: props.name,
    link: props.link
  })   
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  }); 
  popupAddCard.close()
}




const handlerAddAvatar = (props) => {

  validationForm.disableButton();

  api.setUserAvatar({
    link: props.link
  })   
  .then(data => {
    console.log(data)
    userInfo.setUserAvatar(data.avatar)
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  }); 
  popupAddAvatar.close()
}

const handlerConfirm = (props) => {
  console.log(props);
  api.deleteCard(props.cardID)
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  }); 
  // props.card._deleteCard()
}




// const handlerDelete = () => {
//   popupConfirm.open()
// }


const popupEdit = new PopupWithForm('.popup_edit', handlerProfileEdit);
const popupAddCard = new PopupWithForm('.popup_add', handlerAddPost); //создание экземпляра класса
const popupAddAvatar = new PopupWithForm('.popup_avatar', handlerAddAvatar);
const popupConfirm = new PopupWithConfirm('.popup_confirm', handlerConfirm);
popupEdit.setEventListeners()
popupAddCard.setEventListeners()
popupAddAvatar.setEventListeners()
popupConfirm.setEventListeners()

// const popupConfirm = new PopupWithConfirm('.profile__image-overlay', handlerProfileEdit);
// const popupAddCard = new PopupWithConfirm('.popup_add', handlerAddPost); //создание экземпляра класса


const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  infoSelector: '.profile__description',
  avatarSelector: '.profile__image'
});


api.getProfile()
  .then((result) => {
    userInfo.setUserInfo({name: result.name, job: result.about, avatar: result.avatar})
    console.log(result);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
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



profileImageButton.addEventListener('click', () => {
  // validatorChangeAvatar.setButtonInactive() 
  popupAddAvatar.open()
})


// cardDelete.addEventListener('click', () => {
//   // validatorChangeAvatar.setButtonInactive() 
//   popupConfirm.open()
// })