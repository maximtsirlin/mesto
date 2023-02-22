


const buttonAbout = document.querySelector('.profile__icon');
const popup = document.querySelector('.popup');
const buttonClose = popup.querySelector('.popup__close');
const title = document.querySelector('.profile__title');
const description = document.querySelector('.profile__description');
/* открытие попапа для кнопки add */
const aboutAddButton = document.querySelector('.profile__button') /* querySelectorAll выделяем кнопку */
const add = document.querySelector('.add');
/* закрытие попапа для кнопки add */
const closeAddButton = add.querySelector('.add__close');

let formElement = document.querySelector('.popup__input-container');
let nameInput = document.querySelector('.popup__form_input_name');
let jobInput = document.querySelector('.popup__form_input_job');


const handleAboutButtonClick = () => {
    nameInput.value = title.textContent;
    jobInput.value = description.textContent;
    popup.classList.add('popup_opened');
}

const closePopup = () =>  {
    popup.classList.remove('popup_opened');
}

const handleFormElementSubmit = (evt) => {
    evt.preventDefault();
    title.textContent = nameInput.value;
    description.textContent = jobInput.value;
    closePopup();
}


const handleAddButtonClick = () => {
    add.classList.add('add_opened');
} /* функция c добавлением булевого модификатора*/

const handleСloseAddButtonClick = () => {
    add.classList.remove('add_opened');
} /* функция закрытия*/



formElement.addEventListener('submit', handleFormElementSubmit);
buttonAbout.addEventListener('click', handleAboutButtonClick);
buttonClose.addEventListener('click', closePopup);

aboutAddButton.addEventListener('click', handleAddButtonClick); /* функция открытия */
closeAddButton.addEventListener('click', handleСloseAddButtonClick); /* функция закрытия */

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
const form = document.querySelector('.add_form'); /* нахожу форму */
const template = document.getElementById('cards__template').content;

const handleDelete = (evt) => {
    evt.target.closest('.cards__cell').remove();
}




const renderItem = (title, link) => {
    const newItemElement = template.cloneNode(true); /* клонирую форму */
    const newItemTitle = newItemElement.querySelector('.cards__description');
    newItemTitle.textContent = title;
    const newItemImage = newItemElement.querySelector('.cards__item');
    newItemImage.src = link;
    newItemImage.alt = title;

    const deleteButton = newItemElement.querySelector('.cards__delete');  /* кнопки */
    // const editButton = newItemElement.querySelector('.button__edit');
    // const dublicateButton = newItemElement.querySelector('.button__dublicate');
    deleteButton.addEventListener('click', handleDelete)


    cardsListContainer.append(newItemElement)
}  /* создает элемент, стрелочная функция */



initialCards.forEach((card)=> {
    renderItem(card.name, card.link)

}) /* функция которая должна что-то добавлять на страницу */