import { handleOpenImage } from "./utils.js";

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const templateElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return templateElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".element__image");
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector(".element__text").textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._elementLike = this._element.querySelector(".element__like-button");
    this._elementImage.addEventListener("click", handleOpenImage);
    this._element
      .querySelector(".element__trash-icon")
      .addEventListener("click", (e) => {
        this._handleDelete(e);
      });
    this._elementLike.addEventListener("click", (e) => {
      this._handleLike(e);
    });
  }

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

  _handleLike() {
    this._elementLike.classList.toggle("element__like-button_active");
    this._elementLike.classList.toggle("opacity");
  }
}
