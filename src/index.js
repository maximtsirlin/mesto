import { Card, FormValidator, PopupWithImage, UserInfo, PopupWithForm, Section, PopupWithConfirm, Api } from './components/index.js';
import { initialCards } from './utills/const.js';
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

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-64/',
  headers: {
    authorization: '8b7f26ff-df87-4fed-b7d8-0d5c2987dff7',
    'content-type': 'application/json'
  }
}
);


const profileEditFormElement = document.querySelector('#profileEditForm');
const profileEditFormValidator = new FormValidator(formsValidationConfig, profileEditFormElement);
profileEditFormValidator.enableValidation();

const formCard = document.querySelector('#addPlaceForm');
const validationForm = new FormValidator(formsValidationConfig, formCard);
validationForm.enableValidation();

const formAvatar = document.querySelector('#addAvatar');
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
    api.like(card.cardID, true)
      .then(elem => {
        card.unLikeCard()
        card.likesCounterUpdate(elem.likes)
        console.log("unset like", elem)
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))

    console.log("unset like")
  } else {
    console.log('ff');
    api.like(card.cardID, false)
      .then(elem => {
        card.likeCard()
        card.likesCounterUpdate(elem.likes)
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
  }
}


const generateCard = (data, popup) => {
  const card = new Card(data, api._myId, '#cards__template', (name, link) => (popup.open(name, link)), handlerDelete, handlerLike);
  const el = card.getItemElement();
  return el;
}

//ссылка куда отправляется запрос
let section;







const handlerProfileEdit = (props) => {
  profileEditFormValidator.disableButton();

  api.patchProfile({
    name: props.name,
    about: props.job,
    link: props.link
  })
    .then((result) => {
      userInfo.setUserInfo(props);
      popupEdit.close()
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))

}



const handlerAddPost = (props) => {
  validationForm.disableButton();

  api.postCard({
    name: props.name,
    link: props.link
  })
    .then((result) => {
      const element = generateCard(result, cardPopup)
      section.addItem(element);
      popupAddCard.close()
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
}




const handlerAddAvatar = (props) => {

  validationForm.disableButton();

  api.setUserAvatar({
    link: props.link
  })
    .then(data => {
      console.log(data)
      userInfo.setUserAvatar(data.avatar)
      popupAddAvatar.close()
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
}

const handlerConfirm = (props) => {
  console.log(props);
  api.deleteCard(props.cardID)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
}



const popupEdit = new PopupWithForm('.popup_edit', handlerProfileEdit);
const popupAddCard = new PopupWithForm('.popup_add', handlerAddPost); //создание экземпляра класса
const popupAddAvatar = new PopupWithForm('.popup_avatar', handlerAddAvatar);
const popupConfirm = new PopupWithConfirm('.popup_confirm', handlerConfirm);
popupEdit.setEventListeners()
popupAddCard.setEventListeners()
popupAddAvatar.setEventListeners()
popupConfirm.setEventListeners()


const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  infoSelector: '.profile__description',
  avatarSelector: '.profile__image'
});


api.getProfile()
  .then((result) => {
    userInfo.setUserInfo({ name: result.name, job: result.about, avatar: result.avatar })
    api.getCards()
      .then((result) => {
        console.log(result);
        section = new Section({ items: result, renderer: (data) => generateCard(data, cardPopup) }, '.cards');
        section.render();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });



const { name, info } = userInfo.getUserInfo();



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
  popupAddAvatar.open()
})

