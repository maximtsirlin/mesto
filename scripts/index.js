
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