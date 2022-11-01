export default class FormValidator {
  constructor(settings, form) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._activeButtonClass = settings.activeButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = form;
  }
  //включили нашу валидацию
  enableValidation(settings, form) {
    this._setListeners(settings, form);
  }

  //вешаем обработчики на инпуты
  _setListeners = (settings, form) => {
    const allInputs = form.querySelectorAll(settings.inputSelector);
    const submitButton = form.querySelector(settings.submitButtonSelector);

    for (let input of allInputs) {
      input.addEventListener("input", () => {
        this._updateInputValidation(settings, input);
        this._updateSubmitButton(settings, submitButton, form.checkValidity());
      });
    }

    form.addEventListener("reset", (evt) => {
      this._updateSubmitButton(settings, submitButton, false);
    });
  };

  //вызываем ошибки
  _updateInputValidation(settings, input) {
    const errorSpan = document.querySelector(`#${input.id}-error`);
    errorSpan.textContent = input.validationMessage;
    if (errorSpan.textContent !== "") {
      input.classList.add(settings.inputErrorClass);
      errorSpan.classList.add(settings.errorClass);
    } else {
      input.classList.remove(settings.inputErrorClass);
      errorSpan.classList.remove(settings.errorClass);
    }
  }

  //работа с кнопкой
  _updateSubmitButton(settings, button, valid) {
    if (valid) {
      button.removeAttribute("disabled");
      button.classList.add(settings.activeButtonClass);
    } else {
      button.setAttribute("disabled", true);
      button.classList.remove(settings.activeButtonClass);
    }
  }
}
