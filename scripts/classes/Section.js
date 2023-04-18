


export class Section { //Создайте класс Section, который отвечает за отрисовку элементов на странице. Этот класс:
  constructor({ items, renderer }, containerSelector) {
    this._items = items; //Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса.
    this._renderer = renderer; //Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
    this._container = document.querySelector(containerSelector); //Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
  }

  addItem(element) { //Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
    this._container.prepend(element);
  }

  render() { //Содержит публичный метод, который отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
    this._items.forEach(item => {
      const renderedItem = this._renderer(item);
      this.addItem(renderedItem);
    });
  }
}