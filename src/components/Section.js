export default class Section {
  constructor(renderer, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderer(cards) {
    cards.forEach((item) => {
      const card = this._renderer(item);
      this.addItem(card)
    });
  }

  addItem(card) {
    this._container.append(card);
  }
}
