import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupElement, callback) {
    super(popupElement);
    this._handleSubmit = callback;
    this._form = this._popupElement.querySelector(".form");
    this.formName = this._form.getAttribute("name");
    this._allInputs = this._form.querySelectorAll(".form__input");
    this._button = this._form.querySelector(".form__save-btn");
    this._buttonText = this._button.textContent;
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

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }

  loading(load) {
    if (load) {
      this._button.textContent = "Сохранение...";
      this._button.disabled = true;
    } else {
      this._button.textContent = this._buttonText;
      this._button.disabled = true;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}
