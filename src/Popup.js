export default class Popup {
  constructor(popupselector) {
    this._popupselector = popupselector;
    this._closeBtn = this._popupselector.querySelector(".popup__close-btn");
  }

  open() {
    this._popupselector.classList.add("popup_opened");
    document.addEventListener("keydown", (e) => {
      this._handleEscClose(e);
    });
    this.setEventListeners();
  }

  close() {
    this._popupselector.classList.remove("popup_opened");
    document.removeEventListener("keydown", (e) => {
      this._handleEscClose(e);
    });
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupselector.addEventListener("click", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });

    this._closeBtn.addEventListener("click", () => {
      this.close();
    });
  }
}
