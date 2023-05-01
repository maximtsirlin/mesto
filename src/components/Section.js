export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  render() {
    this._items.forEach(item => {
      const renderedItem = this._renderer(item);
      this.addItem(renderedItem);
    });
  }
}

