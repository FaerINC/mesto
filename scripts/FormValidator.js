import { formAddCard } from "./index.js";

export default class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._activeButtonClass = settings.activeButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = form;
  }
  //включили нашу валидацию
  enableValidation() {
    this._setListeners();
  }

  //вешаем обработчики на инпуты
  _setListeners = () => {
    const allInputs = this._form.querySelectorAll(this._inputSelector);
    const submitButton = this._form.querySelector(this._submitButtonSelector);

    for (let input of allInputs) {
      input.addEventListener("input", () => {
        this._updateInputValidation(input);
        this._updateSubmitButton(submitButton, this._form.checkValidity());
      });
    }

    formAddCard.addEventListener("reset", () => {
      this._updateSubmitButton(submitButton, false);
    });
  };

  //вызываем ошибки
  _updateInputValidation(input) {
    const errorSpan = document.querySelector(`#${input.id}-error`);
    errorSpan.textContent = input.validationMessage;
    if (errorSpan.textContent !== "") {
      input.classList.add(this._inputErrorClass);
      errorSpan.classList.add(this._errorClass);
    } else {
      input.classList.remove(this._inputErrorClass);
      errorSpan.classList.remove(this._errorClass);
    }
  }

  //работа с кнопкой
  _updateSubmitButton(button, valid) {
    if (valid) {
      button.removeAttribute("disabled");
      button.classList.add(this._activeButtonClass);
    } else {
      button.setAttribute("disabled", true);
      button.classList.remove(this._activeButtonClass);
    }
  }
}
