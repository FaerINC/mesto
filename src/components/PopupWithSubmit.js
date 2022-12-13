import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupElement, handleSubmit) {
    super(popupElement);
    this._handleSubmit = handleSubmit;
    this._buttonSubmit = this._popupElement.querySelector(".popup__save-btn");
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonSubmit.addEventListener("click", (e) => {
      e.preventDefault();
      this._handleSubmit(this._card);
    });
  }

  getCurrentCard(card) {
    this._card = card;
  }
}
