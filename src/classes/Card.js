export class Card {
  constructor(card, templateSelector, handleCardClick, popupDelete, handlerLike) {
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._popupDelete = popupDelete;
    this.cardID = card._id;
    this._handlerLike = handlerLike;
    // проверяем, определено ли свойство likes в объекте card с помощью optional chaining
    this._likesCounter = card.likes?.length || 0;

    this._element = this.#getElementBySelector(document, this._templateSelector).content.firstElementChild.cloneNode(true);
    this._likes = this.#getElementBySelector(this._element, '.cards__like-counter');
    this._likeButton = this.#getElementBySelector(this._element, '.cards__button');

    this.#addCardListeners(
      this.#getElementBySelector(this._element, '.cards__item'),
      this._element,
      this._name,
      this._link
    );

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
      this._popupDelete(this)
      // this.#deleteCard(deleteButton);
    });
    
    this.#addListener(this._likeButton, 'click',() => {this._handlerLike(this)});
  }

  likeCard() {
    console.log('___');
    this._likeButton.classList.add('cards__button-active');
    this.isLike = true;
  }


  unLikeCard() {
    this._likeButton.classList.remove('cards__button-active');
    this.isLike = false;
  }

  _deleteCard() {
    this._element.remove();
  }


}

