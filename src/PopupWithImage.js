import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupselector) {
    super(popupselector);
    this._image = this._popupselector.querySelector(".popup-image__image");
    this._name = this._popupselector.querySelector(".popup-image__title");
  }

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._name.textContent = name;
    super.open();
  }
}
