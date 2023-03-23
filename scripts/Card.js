


/* принимает в конструктор её данные и селектор её template-элемента;

содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий;

содержит приватные методы для каждого обработчика;

содержит один публичный метод, который возвращает полностью работоспособный и наполненный данными элемент карточки. */


export class Card {
    constructor(element, templateSelector, openPopup) {
      this._name = element.name;
      this._link = element.link;
      this._templateSelector = templateSelector;
      this._openPopup = openPopup;
    }

    
    getItemElement = () => {
      const placeCardTemplate = document.querySelector(this._templateSelector).content;
      const name = this._name;
      const link = this._link;
      const newItemElement = placeCardTemplate.cloneNode(true); /* клонирую содержимое шаблона чтобы получить новую карточку */
    
      const newItemTitle = newItemElement.querySelector('.cards__description'); /* берем заголовок */
      newItemTitle.textContent = name;  /* вставляем в карточку заголовок переданный в аргументах */
    
      const newItemImage = newItemElement.querySelector('.cards__item'); /* берем картинку */
      newItemImage.src = link; /* вставляем ссылку */
      newItemImage.alt = name; /* вставляем описание */
      newItemImage.addEventListener('click', () => { this._openPopup(name, link) }) /* добавляем обработчик нажатия на картинку чтобы он открывал попап с картинкой */
    
      const deleteButton = newItemElement.querySelector('.cards__delete');  /* кнопка удаления */
      deleteButton.addEventListener('click', this.#deleteCard)
    
      const likeButton = newItemElement.querySelector('.cards__button'); /* кнопка лайка */
      likeButton.addEventListener('click', this.#likeCard)
      
    
      return newItemElement;
    } 

    #likeCard = (evt) => {
      evt.target.classList.toggle('cards__button-active');
    }


    #deleteCard = (evt) => {
      const deleteButton = evt.target;
      const cell = deleteButton.closest('.cards__cell');
      cell.remove();
    }


    
  }
  

  




