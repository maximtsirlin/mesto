


/* принимает в конструктор её данные и селектор её template-элемента;

содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;

содержит приватные методы для каждого обработчика;

содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки. */


export class Card {
  constructor(card, templateSelector, openPopup) {
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
    this._openPopup = openPopup;
  }


  getItemElement() {
    const placeCardTemplate = this.#getElementBySelector(document, this._templateSelector).content;

    // клонирую содержимое шаблона чтобы получить новую карточку
    const newItemElement = placeCardTemplate.cloneNode(true);

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

    // берем заголовок
    const newItemTitle = this.#getElementBySelector(template, '.cards__description');

    // вставляем в карточку заголовок переданный в аргументах
    newItemTitle.textContent = name;

    // берем картинку
    const newItemImage = this.#getElementBySelector(template, '.cards__item');
    // вставляем ссылку
    newItemImage.src = link;
    // вставляем описание
    newItemImage.alt = name;

    this.#addCardListeners(newItemImage, template, name, link);
  }

  #addCardListeners(newItemImage, template, name, link) {
    // добавляем обработчик нажатия на картинку чтобы он открывал попап с картинкой
    this.#addListener(newItemImage, 'click', () => { this._openPopup(name, link) });

    // кнопка удаления
    const deleteButton = this.#getElementBySelector(template, '.cards__delete');

    this.#addListener(deleteButton, 'click', this.#deleteCard);

    // кнопка лайка
    const likeButton = this.#getElementBySelector(template, '.cards__button');
    this.#addListener(likeButton, 'click', this.#likeCard);
  }

  #likeCard(evt) {
    evt.target.classList.toggle('cards__button-active');
  }


  #deleteCard(evt) {
    const deleteButton = evt.target;
    const cell = deleteButton.closest('.cards__cell');
    cell.remove();
  }
}







