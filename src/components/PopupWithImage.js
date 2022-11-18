import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._image = this._popupElement.querySelector(".popup-image__image");
    this._name = this._popupElement.querySelector(".popup-image__title");
  }

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._name.textContent = name;
    super.open();
  }
}
