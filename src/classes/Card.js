export class Card {
  constructor(card, templateSelector, handleCardClick) {
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._element = this.getItemElement();
  }

  getItemElement() {
    const placeCardTemplate = this.#getElementBySelector(document, this._templateSelector);
    const newItemElement = placeCardTemplate.content.firstElementChild.cloneNode(true);
    this.#fillTemplate(newItemElement);
    return newItemElement;
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
    this.#addCardListeners(newItemImage, template, name, link);
  }

  #addCardListeners(newItemImage, template, name, link) {
    this.#addListener(newItemImage, 'click', () => {
      this._handleCardClick(name, link);
    });
  
    const deleteButton = this.#getElementBySelector(template, '.cards__delete');
    this.#addListener(deleteButton, 'click', () => {
      this.#deleteCard(deleteButton);
    });
  
    const likeButton = this.#getElementBySelector(template, '.cards__button');
    this.#addListener(likeButton, 'click', this.#likeCard);
  }

  #likeCard(evt) {
    evt.target.classList.toggle('cards__button-active');
  }

  #deleteCard(deleteButton) {
    const cardElement = deleteButton.closest('.cards__cell');
    cardElement.remove();
  }
}

