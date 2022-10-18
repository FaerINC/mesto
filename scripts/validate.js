const jobInput = document.querySelector(".form__input_add_about");
const inputCardName = document.getElementById("inputNameCardNew"); // нашли инпут имени новой карты
const inputCardLink = document.getElementById("inputLinkCardNew"); // инпут ссылки на новую картинку
const buttonAddNewCard = document.getElementById("buttonAddNewCard"); //кнопка добавления новой карточки
const formElement = document.querySelector(".form_edit-profile");
const formInput = formElement.querySelector(".form__input");
const nameInput = document.querySelector(".form__input_add_name");

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
}

//вызываем ошибки
function updateInputValidation(settings, input) {
  const errorSpan = input.parentNode.querySelector(`#${input.id}-error`);
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
