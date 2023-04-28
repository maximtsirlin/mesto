export class Card {
  constructor(card, templateSelector, handleCardClick, popupDelete) {
    this._name = card.name;
    this._link = card.link;
    this._likesCounter = card.likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._element = this.#getElementBySelector(document, this._templateSelector).content.firstElementChild.cloneNode(true);
    this._likes = this.#getElementBySelector(this._element, '.cards__like-counter');
    this._popupDelete = popupDelete;
    this.cardID = card.cardID; 
    console.log(this._likesCounter);
  }

  getItemElement() {
    this.#fillTemplate(this._element);
    return this._element;
  }

  #addListener(element, event, handler) {
    element.addEventListener(event, handler)
  }

  #getElementBySelector(element, selector) {
    return element.querySelector(selector);
  }

  #fillTemplate(template) {
    const name = this._name;
    const link = this._link;
    const newItemTitle = this.#getElementBySelector(template, '.cards__description');
    newItemTitle.textContent = name;
    const newItemImage = this.#getElementBySelector(template, '.cards__item');
    newItemImage.src = link;
    newItemImage.alt = name;
    this._likes.textContent = this._likesCounter;
    this.#addCardListeners(newItemImage, template, name, link);
  }

  #addCardListeners(newItemImage, template, name, link) {
    this.#addListener(newItemImage, 'click', () => {
      this._handleCardClick(name, link);
    });
  
    const deleteButton = this.#getElementBySelector(template, '.cards__delete');
    
    this.#addListener(deleteButton, 'click', () => {
      this._popupDelete.open(this)
      // this.#deleteCard(deleteButton);

    });
  
    const likeButton = this.#getElementBySelector(template, '.cards__button');
    this.#addListener(likeButton, 'click', this.#likeCard);
  }

  #likeCard(evt) {
    evt.target.classList.toggle('cards__button-active');
  }

  _deleteCard() {
    this._element.remove();
  }


}

