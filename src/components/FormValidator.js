export default class FormValidator {
  constructor(settings, form) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._activeButtonClass = settings.activeButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = form;
    this._inputList = this._form.querySelectorAll(this._inputSelector);
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }
  //включили нашу валидацию
  enableValidation = () => {
    this._setListeners();
  };

  disableButtonSubmit = () => {
    this._submitButton.setAttribute("disabled", true);
    this._submitButton.classList.remove(this._activeButtonClass);
  };

  //вешаем обработчики на инпуты
  _setListeners = () => {
    for (let input of this._inputList) {
      input.addEventListener("input", () => {
        this._updateInputValidation(input);
        this._updateSubmitButton();
      });
    }
  };

  //вызываем ошибки
  _updateInputValidation = (input) => {
    const errorSpan = document.querySelector(`#${input.id}-error`);
    errorSpan.textContent = input.validationMessage;
    if (errorSpan.textContent !== "") {
      input.classList.add(this._inputErrorClass);
      errorSpan.classList.add(this._errorClass);
    } else {
      input.classList.remove(this._inputErrorClass);
      errorSpan.classList.remove(this._errorClass);
    }
  };

  //работа с кнопкой
  _updateSubmitButton = () => {
    if (this._form.checkValidity()) {
      this._submitButton.removeAttribute("disabled");
      this._submitButton.classList.add(this._activeButtonClass);
    } else {
      this.disableButtonSubmit();
    }
  };

  cleanErrors() {
    this._inputList.forEach((input) => {
      const errorSpan = document.querySelector(`#${input.id}-error`);
      input.classList.remove(this._inputErrorClass);
      errorSpan.classList.remove(this._errorClass);
      errorSpan.textContent = "";
    });
  }
}
