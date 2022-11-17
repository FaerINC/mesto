import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupselector, callback) {
    super(popupselector);
    this._handleSubmit = callback;
    this._form = this._popupselector.querySelector(".form");
    this.formName = this._form.getAttribute("name");
    this._allInputs = this._form.querySelectorAll(".form__input");
    this._closeBtn = this._popupselector.querySelector(".popup__close-btn");
  }

  _getInputValues() {
    this.inputValues = {};
    this._allInputs.forEach((input) => {
      this.inputValues[input.name] = input.value;
    });
    return this.inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._closeBtn.addEventListener("click", () => {
      this.close();
    });

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }

  open(values) {
    console.log(values);
    this._allInputs.forEach((input) => {
      input.textContent = values[input.name];
    });
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
