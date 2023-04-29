import {Popup} from "./Popup.js";

export class PopupWithConfirm extends Popup {
    constructor(selector, submitCallback) {
        super (selector)
        this._submitCallback = submitCallback;
        this._buttonSubmit = this._popupElement.querySelector('.form__save');
        this._buttonSubmitText = this._buttonSubmit.value;
    };

    open(card) {
        super.open();
        
        this.cardId = card.cardID;
        this.card = card;
    };

    setEventListeners() {
        super.setEventListeners();

        this._buttonSubmit.addEventListener('click', (event) => {
            event.preventDefault()
            // this._submitCallback(this)
            this.card._deleteCard()
            this.close(); // close the popup
        });
    };

    renderLoading(isLoading, loadingText) {
        if (!this._buttonSubmit) return;
        if (isLoading) {
            this._buttonSubmit.value = loadingText;
        } else {
          this._buttonSubmit.value = this._buttonSubmitText
        }
    };
}