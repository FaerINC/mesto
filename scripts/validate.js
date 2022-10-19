//вызываем функцию и передаём ей наши классы
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-btn",
  activeButtonClass: "form__save-btn_active",
  inputErrorClass: "form__input_type_error",
  errorClass: "error-span_visible",
});

//вешаем слушатели на формы
function enableValidation(settings) {
  const allForms = document.querySelectorAll(settings.formSelector);

  for (let form of allForms) {
    setListeners(settings, form);
  }
}

//вешаем обработчики на инпуты
function setListeners(settings, form) {
  const allInputs = form.querySelectorAll(settings.inputSelector);
  const submitButton = form.querySelector(settings.submitButtonSelector);

  for (let input of allInputs) {
    input.addEventListener("input", () => {
      updateInputValidation(settings, input);
      updateSubmitButton(settings, submitButton, form.checkValidity());
    });
  }

  form.addEventListener("reset", (evt) => {
    updateSubmitButton(settings, submitButton, false);
  });
}

//вызываем ошибки
function updateInputValidation(settings, input) {
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
function updateSubmitButton(settings, button, valid) {
  if (valid) {
    button.removeAttribute("disabled");
    button.classList.add(settings.activeButtonClass);
  } else {
    button.setAttribute("disabled", true);
    button.classList.remove(settings.activeButtonClass);
  }
}
