let openeditprofile = document.querySelector(".profile__edit-button");
let savebutton = document.querySelector(".form__save-btn");
let exitbutton = document.querySelector(".popup__close-btn");
let formedit = document.querySelector(".popup");
let profilename = document.querySelector(".profile__name");
let profileabout = document.querySelector(".profile__about");
let formElement = document.querySelector(".form_edit-profile");
let nameInput = document.querySelector(".form__input_add_name");
let jobInput = document.querySelector(".form__input_add_about");

function openEditProfile() {
  formedit.classList.add("popup_opened");
  nameInput.textContent = profilename.value;
  jobInput.textContent = profileabout.value;
}

openeditprofile.addEventListener("click", openEditProfile);

function exitEditProfile() {
  formedit.classList.remove("popup_opened");
}

exitbutton.addEventListener("click", exitEditProfile);

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profilename.textContent = nameInput.value;
  profileabout.textContent = jobInput.value;
  exitEditProfile();
}

savebutton.addEventListener("click", formSubmitHandler);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);
