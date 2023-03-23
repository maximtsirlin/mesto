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
      link: 'images/nsk_cat.jpg'
    }
  ];


  const validationOptions = {
    formSelector: '.popup__container', //ищу попап
    inputSelector: '.form__input', //ищу инпут
    submitButtonSelector: '.form__save', //нахожу кнопку
    inactiveButtonClass: 'form__save_inactive', //не активная кнопка
    inputErrorClass: 'form__input_invalid', // ошибка в поле ввода 
    errorClass: 'form__input-error_active',
    errorText: '.form__input-error',
    errorClosestParent: '.form__section'
  };
  
  const cardTemplateOptions = {
    templateSelector: 'card-template',
    cardSelector: '.cards__cell',
    cardHeadingSelector: '.cards__description', // подпись у карточки
    deleteBtnSelector: '.cards__delete',
    likeBtnSelector: '.cards__button', // лайк
    imgSelector: '.cards__item',
    likeBtnClass: 'cards__button-active'
  }
  


export {initialCards, validationOptions, cardTemplateOptions}