
const aboutButton = document.querySelector('.kusto__edit-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close');


const handleAboutButtonClick = () => {
    popup.classList.add('popup_opened');
}


const handleCloseButtonClick = () => {
    popup.classList.remove('popup_opened');
}


aboutButton.addEventListener('click', handleAboutButtonClick);
closeButton.addEventListener('click', handleCloseButtonClick);




let myName = document.querySelector ('.kusto__title');
let aboutPerson = document.querySelector ('.kusto__description');

let formElement = document.querySelector ('.popup');

let nameInput = document.querySelector ('.popup__input-name');
let jobInput = document.querySelector ('.popup__input-job');

let buttonSave = document.querySelector ('.popup__save');



function handleFormElementSubmit (evt) {
    evt.preventDefault();
    myName.textContent = nameInput.value;
    aboutPerson.textContent = jobInput.value;
}

formElement.addEventListener('click', handleFormElementSubmit); 
