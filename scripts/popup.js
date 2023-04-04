const popupTypesSelectors = {
  allPopups: '.popup',
  popupEditProfile: '.popup_edit',
  popupAddPlace: '.popup_add',
  popupImage: '.popup_image',
}

const popupStateClasses = {
  opened: {
    class: 'popup_opened',
    selector: '.popup_opened'
  },
  close: {
    class: 'popup__close',
    selector: '.popup__close',
  },
}

const popupExtendedClasses = {
  popupImageImg: '.popup__img',
  popupFigcaption: '.popup__figcaption',
}

const profileEditSelectors = {
  nameInput: '.form__input_name',
  jobInput: '.form__input_job'
}

const allPopups = document.querySelectorAll(popupTypesSelectors.allPopups);
const popupEditProfile = document.querySelector(popupTypesSelectors.popupEditProfile);
const popupAddPlace = document.querySelector(popupTypesSelectors.popupAddPlace);
const popupImage = document.querySelector(popupTypesSelectors.popupImage);

const popupImageImg = popupImage.querySelector(popupExtendedClasses.popupImageImg);
const nameImgClicked = popupImage.querySelector(popupExtendedClasses.popupFigcaption);

const profileEditNameInput = document.querySelector(profileEditSelectors.nameInput);
const profileEditJobInput = document.querySelector(profileEditSelectors.jobInput);

const closeByEscBtn = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector(popupStateClasses.opened.selector);
    closePopup(activePopup);
  };
};

const openPopup = (popupElement) => {
  popupElement.classList.add(popupStateClasses.opened.class);
  document.addEventListener('keydown', closeByEscBtn);
};

export const closePopup = (popup) => {
  popup.classList.remove(popupStateClasses.opened.class);
  document.removeEventListener('keydown', closeByEscBtn);
};

allPopups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains(popupStateClasses.opened.class)) {
      closePopup(popup)
    }
    if (evt.target.classList.contains(popupStateClasses.close.class)) {
      closePopup(popup)
    }
  })
})

export function openEditProfilePopup(name, job) {
  console.log(name, job);
  profileEditNameInput.value = name;
  profileEditJobInput.value = job;
  openPopup(popupEditProfile);
}

export function openAddPlacePopup() {
  openPopup(popupAddPlace);
}

export function openImagePopup(title, link) {
  popupImageImg.src = link; /* вставляем ссылку */
  popupImageImg.alt = title; /* вставляем описание */
  nameImgClicked.textContent = title;
  openPopup(popupImage);
}
