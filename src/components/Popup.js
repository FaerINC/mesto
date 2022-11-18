export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement;
    this._closeBtn = this._popupElement.querySelector(".popup__close-btn");
    this._handleEscCloseRef = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscCloseRef);
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscCloseRef);
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
