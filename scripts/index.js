import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
//import { popupImg } from "./utils.js";
import { initialCards } from "./data.js";
import Section from "./section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";

//обьект с настройками для валидации
const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-btn",
  activeButtonClass: "form__save-btn_active",
  inputErrorClass: "form__input_type_error",
  errorClass: "error-span_visible",
};

const popupImg = document.querySelector(".popup-image");
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
const formEditProfile = document.querySelector(".form_edit-profile");
const nameInput = document.querySelector(".form__input_add_name");
const cardsContainer = document.querySelector(".elements__list"); // nashli sam spisok kyda bydem vstavl9tb elements

const formValidatorAddCard = new FormValidator(validationConfig, formAddCard);
const formValidatorEditProfile = new FormValidator(
  validationConfig,
  formEditProfile
);
const popupCard = new Popup(popupAddCard);
const popupEdit = new Popup(popupEditForm);
const popupImage = new Popup(popupImg);
const imagePopup = new PopupWithImage(popupImg);

// включили валидацию
formValidatorEditProfile.enableValidation();
formValidatorAddCard.enableValidation();

//обработка карточек из массива
const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card(data, ".element_template", handleCardClick);
      const element = card.generateCard();
      cardList.addItem(element);
    },
  },
  ".elements__list"
);

//вызываем метод обработки карточек из массива
cardList.renderer();

//добавляем нашу новую карточку
function handleAddNewCard() {
  const userCardNew = {
    name: inputCardName.value,
    link: inputCardLink.value,
  };
  const card = new Card(userCardNew, ".element_template", handleCardClick);
  const element = card.generateCard();
  cardsContainer.prepend(element);
  popupCard.close();
  formValidatorAddCard.disableButtonSubmit();
}

//открываем попап профиля
function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

//сабмитим новые значения профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  popupEdit.close();
}

// Прикрепляем обработчик к форме:
formEditProfile.addEventListener("submit", handleProfileFormSubmit);

//закрываем добавлятель карточек
buttonCloseAddCardForm.addEventListener("click", () => {
  popupCard.close();
});

//открываем добавлятель карточек
buttonOpenAddCardForm.addEventListener("click", () => {
  formAddCard.reset();
  popupCard.open();
  // openPopup(popupAddCard);
});

//открываем редакт профиля
buttonOpenEditProfile.addEventListener("click", () => {
  nameInput.textContent = profileName.value;
  jobInput.textContent = profileAbout.value;
  popupEdit.open();
});

// закрываем редакт профиля
buttonExitFormEdit.addEventListener("click", () => {
  popupEdit.close();
});

//закрываем попап с фоткой
buttonClosePopupImage.addEventListener("click", () => {
  popupImage.close();
});

//добавляем новую карточку
formAddCard.addEventListener("submit", handleAddNewCard);
