export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._closeBtn = this._popupElement.querySelector(".popup__close-btn");
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });

    this._closeBtn.addEventListener("click", () => {
      this.close();
    });
  }
}
