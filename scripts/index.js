
const buttonAbout = document.querySelector('.profile__icon');
const popup = document.querySelector('.popup');
const buttonClose = popup.querySelector('.popup__close');
const title = document.querySelector('.profile__title');
const description = document.querySelector('.profile__description');

let myName = document.querySelector('.profile__title');
let aboutPerson = document.querySelector('.profile__description');
let formElement = document.querySelector('.popup__input-container');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');


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
    myName.textContent = nameInput.value;
    aboutPerson.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', handleFormElementSubmit);
buttonAbout.addEventListener('click', handleAboutButtonClick);
buttonClose.addEventListener('click', closePopup);

