export class Card {
  constructor(card, myId, templateSelector, handleCardClick, popupDelete, handlerLike) {
    this._name = card.name;
    this._link = card.link;
    this._myId = myId
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._popupDelete = popupDelete;
    this.cardID = card._id;
    this.owner = card.owner._id;
    this._handlerLike = handlerLike;
    this.islike = false
    console.log(card, this.owner)
    this._likeArray = card.likes?? [];
    this._likesCounter = card.likes?.length || 0;
    this._element = this.#getElementBySelector(document, this._templateSelector).content.firstElementChild.cloneNode(true);
    this._likes = this.#getElementBySelector(this._element, '.cards__like-counter');
    this._likeButton = this.#getElementBySelector(this._element, '.cards__button');
    this._toggleLikeState()
  }

  likesCounterUpdate(data) {
    this._likes.textContent = data.length;
  }
  _checkUserLike() {
    return this._likeArray.some((item) => item._id === this._myId);
  }

  _toggleLikeState() {
    if (this._checkUserLike()) {
      this.likeCard();
    } else {
      this.unLikeCard();
    }
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
    console.log(deleteButton);
    if (this._myId !== this.owner){
      deleteButton.remove()
    }
    
    this.#addListener(deleteButton, 'click', () => {
      this._popupDelete(this)
    });
    
    this.#addListener(this._likeButton, 'click',() => {
      console.log("call handler"); this._handlerLike(this)});
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