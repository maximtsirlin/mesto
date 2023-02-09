
const buttonAbout = document.querySelector('.kusto__icon');
const popup = document.querySelector('.popup');
const buttonClose = popup.querySelector('.popup__close');
const buttonSave = popup.querySelector('.popup__save');


let myName = document.querySelector ('.kusto__title');
let aboutPerson = document.querySelector ('.kusto__description');

let formElement = document.querySelector ('.popup');

let nameInput = document.querySelector ('.popup__input_name');
let jobInput = document.querySelector ('.popup__input_job');


formElement.addEventListener("submit", () => {
    console.log("Событие отправки формы")
})

const handleAboutButtonClick = () => {
    nameInput.value = document.querySelector ('.kusto__title').textContent;
    jobInput.value = document.querySelector ('.kusto__description').textContent;
    popup.classList.add('popup_opened');
}

const handleCloseButtonClick = () => {
    popup.classList.remove('popup_opened');
}

function handleFormElementSubmit (evt) {
    evt.preventDefault();
    myName.textContent = nameInput.value;
    aboutPerson.textContent = jobInput.value;  
}

formElement.addEventListener('click', handleFormElementSubmit); 
buttonAbout.addEventListener('click', handleAboutButtonClick);
buttonClose.addEventListener('click', handleCloseButtonClick);
buttonSave.addEventListener('click', handleCloseButtonClick);
