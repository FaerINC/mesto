import {
  popupImg,
  popupImgOpen,
  popupImageOpenTitle,
  openPopup,
} from "./index.js";

export default class Card {
  constructor(text, link, selector) {
    this._name = text;
    this._link = link;
    this._selector = selector;
  }

  _getTemplate() {
    const templateElement = document
      .querySelector(this._selector)
      .content.querySelector(".element")
      .cloneNode(true);

    return templateElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    this._element.querySelector(".element__text").textContent = this._name;

    this._setEventListiners();

    return this._element;
  }

  _setEventListiners() {
    const cardImage = this._element.querySelector(".element__image");
    cardImage.addEventListener("click", (e) => {
      this._handleOpenImage(e);
    });
    this._element
      .querySelector(".element__trash-icon")
      .addEventListener("click", (e) => {
        this._handleDelete(e);
      });
    this._element
      .querySelector(".element__like-button")
      .addEventListener("click", (e) => {
        this._handleLike(e);
      });
  }

  _handleOpenImage(e) {
    popupImageOpenTitle.textContent = e.currentTarget.alt;
    popupImgOpen.alt = e.currentTarget.alt;
    popupImgOpen.src = e.currentTarget.currentSrc;
    openPopup(popupImg);
  }

  _handleDelete(e) {
    const cardNow = e.target.closest(".element");
    cardNow.remove();
  }

  _handleLike(event) {
    const likeNow = event.target.closest(".element__like-button");
    likeNow.classList.toggle("element__like-button_active");
    likeNow.classList.toggle("opacity");
  }
}
