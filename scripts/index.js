


const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_edit');

const profileTitle = document.querySelector('.profile__title'); /* выделяем заголовок */
const profileDescription = document.querySelector('.profile__description');

const placeAddButton = document.querySelector('.profile__add-button') 

const popupAdd = document.querySelector('.popup_add');
const popupAddSaveButton = popupAdd.querySelector('.popup__save'); /* выделяем кнопку создать */

const popupImage = document.querySelector('.popup_image')
const popupImageImg = popupImage.querySelector('.popup__img')
const nameImgClicked = popupImage.querySelector('.popup__figcaption'); /* выделяем заголовок попапа */


let profileEditForm = document.querySelector('.popup__input-container');
let profileEditNameInput = document.querySelector('.popup__form_input_name');
let profileEditJobInput = document.querySelector('.popup__form_input_job');

const addPlaceForm = document.querySelector('.popup__input-add'); /* нахожу форму */



const allPopups = document.querySelectorAll('.popup') /* нашли все попапы */



const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}

allPopups.forEach((popup) => { /* пробегаемся по списку попапов ь */
  const closeBtn = popup.querySelector('.popup__close')
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {closePopup(popup)}) /* навешиваем на кнопку закрытия обработчик */
  }
})

const profileEditOpenHandler = () => {
    profileEditNameInput.value = profileTitle.textContent;
    profileEditJobInput.value = profileDescription.textContent;
    openPopup(popupEdit)
}

const profileEditSaveHandler = (evt) => {
    evt.preventDefault();
    profileTitle.textContent = profileEditNameInput.value; /* добавляем его к инпуту */
    profileDescription.textContent = profileEditJobInput.value;
    closePopup(popupEdit)
}

const closePopupEdit = () =>  {
  closePopup(popupEdit)
}

const addPlaceOpen = () => {
    openPopup(popupAdd)
} /* функция c добавлением булевого модификатора*/

const addPlaceSave = () => {
    closePopup(popupAdd)
} /* функция закрытия*/



profileEditForm.addEventListener('submit', profileEditSaveHandler);
profileEditButton.addEventListener('click', profileEditOpenHandler);

placeAddButton.addEventListener('click', addPlaceOpen); /* функция открытия */
popupAddSaveButton.addEventListener('click', addPlaceSave); /* функция закрытия */


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

const placeDeleteHandler = (evt) => {
    evt.target.closest('.cards__cell').remove();
}

const openPopupImage = (title, link) => {
  popupImageImg.src = link; /* вставляем ссылку */
  popupImageImg.alt = title; /* вставляем описание */
  nameImgClicked.textContent = title;
  openPopup(popupImage);
}


const getItemElement = (title, link) => {
    const newItemElement = placeCardTemplate.cloneNode(true); /* клонирую карточку */

    const newItemTitle = newItemElement.querySelector('.cards__description'); /* берем заголовок */
    newItemTitle.textContent = title;  /* вставляем в карточку заголовок переданный в аргументах */

    const newItemImage = newItemElement.querySelector('.cards__item'); /* берем картинку */
    newItemImage.src = link; /* вставляем ссылку */
    newItemImage.alt = title; /* вставляем описание */
    newItemImage.addEventListener('click', () => { openPopupImage(title, link)})

    const deleteButton = newItemElement.querySelector('.cards__delete');  /* кнопка удаления */
    deleteButton.addEventListener('click', placeDeleteHandler)

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

initialCards.forEach((place)=> {  /* пробегаемся по массиву мест и генерируем карточки  */
  generatePlaceCard(place.name, place.link)
})



const addPlaceSaveHandler = (evt) => {
  evt.preventDefault();
  const title = evt.target.title.value;
  const link = evt.target.link.value;
  if (title, link) {
    generatePlaceCard(title, link);
  }
  evt.target.title.value = '';
  evt.target.link.value = '';
};

addPlaceForm.addEventListener('submit', addPlaceSaveHandler)

///////////////////////////////////////////////////////////////////
