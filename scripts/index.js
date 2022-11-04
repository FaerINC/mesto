import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { popupImg, openPopup, closePopup } from "./utils.js";
import { initialCards } from "./data.js";

//обьект с настройками для валидации
const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-btn",
  activeButtonClass: "form__save-btn_active",
  inputErrorClass: "form__input_type_error",
  errorClass: "error-span_visible",
};

// попап эдит профайл с его штучками...
const buttonOpenEditProfile = document.querySelector(".profile__edit-button");
const buttonExitFormEdit = document.querySelector(".popup__close-btn");
const popupEditForm = document.querySelector(".popup_edit_profile");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

//ищем список куда мы будем добавлять карточки i.t.d.
const popupAddCard = document.querySelector(".popup_add_card");
const formAddCard = popupAddCard.querySelector(".form"); //попап с добавлением карточки
const buttonOpenAddCardForm = document.querySelector(".profile__add-button"); //кнопка открытия эдд кард попапа
const buttonCloseAddCardForm = popupAddCard.querySelector(".popup__close-btn"); //кнопка закрытия эдд кард попапа

const buttonClosePopupImage = document.querySelector(".popup-image__close-btn");

//формы
const jobInput = document.querySelector(".form__input_add_about");
const inputCardName = formAddCard.querySelector(".form__input_add_name"); // нашли инпут имени новой карты
const inputCardLink = formAddCard.querySelector(".form__input_add_link"); // инпут ссылки на новую картинку
const buttonAddNewCard = formAddCard.querySelector(".form__save-btn"); //кнопка добавления новой карточки
const formEditProfile = document.querySelector(".form_edit-profile");
const nameInput = document.querySelector(".form__input_add_name");
const cardsContainer = document.querySelector(".elements__list"); // nashli sam spisok kyda bydem vstavl9tb elements
const formValidatorAddCard = new FormValidator(validationConfig, formAddCard);
const formValidatorEditProfile = new FormValidator(
  validationConfig,
  formEditProfile
);

// включили валидацию
formValidatorEditProfile.enableValidation();
formValidatorAddCard.enableValidation();

//перебор массива с карточками и вызов функции создания
initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  cardsContainer.prepend(card);
});

//создание карточки
function createCard(cardData) {
  const card = new Card(cardData, ".element_template");
  const newCard = card.generateCard();
  return newCard;
}

//добавляем нашу новую карточку
function handleAddNewCard() {
  const userCardNew = {
    name: inputCardName.value,
    link: inputCardLink.value,
  };
  const card = createCard(userCardNew);
  cardsContainer.prepend(card);
  closePopup(popupAddCard);
  formValidatorAddCard.disableButtonSubmit();
}

//сабмитим новые значения профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(popupEditForm);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener("submit", handleProfileFormSubmit);

//закрываем добавлятель карточек
buttonCloseAddCardForm.addEventListener("click", () => {
  closePopup(popupAddCard);
});

//открываем добавлятель карточек
buttonOpenAddCardForm.addEventListener("click", () => {
  formAddCard.reset();

  openPopup(popupAddCard);
});

//открываем редакт профиля
buttonOpenEditProfile.addEventListener("click", () => {
  nameInput.textContent = profileName.value;
  jobInput.textContent = profileAbout.value;

  openPopup(popupEditForm);
});

// закрываем редакт профиля
buttonExitFormEdit.addEventListener("click", () => {
  closePopup(popupEditForm);
});

//закрываем попап с фоткой
buttonClosePopupImage.addEventListener("click", () => {
  closePopup(popupImg);
});

//добавляем новую карточку
buttonAddNewCard.addEventListener("click", handleAddNewCard);
