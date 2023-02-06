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



