import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

//обьект с настройками для валидации
const settings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-btn",
  activeButtonClass: "form__save-btn_active",
  inputErrorClass: "form__input_type_error",
  errorClass: "error-span_visible",
};

//cам массив с нашими местами

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

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

// Открытие попапа с фоткой
const popupImg = document.querySelector(".popup-image");
const popupImgOpen = popupImg.querySelector(".popup-image__image");
const popupImageOpenTitle = popupImg.querySelector(".popup-image__title");
const buttonClosePopupImage = document.querySelector(".popup-image__close-btn");

//формы
const jobInput = document.querySelector(".form__input_add_about");
const inputCardName = formAddCard.querySelector(".form__input_add_name"); // нашли инпут имени новой карты
const inputCardLink = formAddCard.querySelector(".form__input_add_link"); // инпут ссылки на новую картинку
const buttonAddNewCard = formAddCard.querySelector(".form__save-btn"); //кнопка добавления новой карточки
const formElement = document.querySelector(".form_edit-profile");
const formInput = formElement.querySelector(".form__input");
const nameInput = document.querySelector(".form__input_add_name");
const cardList = document.querySelector(".elements__list"); // nashli sam spisok kyda bydem vstavl9tb elements
const cardTemplate = document.querySelector(".element_template").content; //нашли содержимое темплейта
const card = cardTemplate.querySelector(".element"); //нашли саму карточку

//перебор массива с карточками и вызов функции создания
initialCards.forEach(function (item) {
  const items = new Card(item.name, item.link, ".element_template");
  const itemCard = items.generateCard();
  cardList.prepend(itemCard);
});

//Добавление карточек
function handleSubmit() {
  const items = new Card(
    inputCardName.value,
    inputCardLink.value,
    ".element_template"
  );
  const itemCard = items.generateCard();
  cardList.prepend(itemCard);
  closePopup(popupAddCard);
}

//функции открытия закрытия попапов
//Открытие
function openPopup(popupElem) {
  popupElem.classList.add("popup_opened");
  popupElem.addEventListener("click", handleClickClosePopup);
  document.addEventListener("keydown", closeEsc);
}

//закрытие по кнопке ESC
function closeEsc(e) {
  if (e.key === "Escape") {
    const popupElem = document.querySelector(".popup_opened");
    closePopup(popupElem);
  }
}

// закрытие по оверлею
function handleClickClosePopup(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup();
  }
}

//закрытие
export default function closePopup() {
  const popupElem = document.querySelector(".popup_opened");
  popupElem.classList.remove("popup_opened");
  popupElem.removeEventListener("click", handleClickClosePopup);
  document.removeEventListener("keydown", closeEsc);
}

//сабмитим новые значения профиля
function handleSubmitForm(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(popupEditForm);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleSubmitForm);

//закрываем добавлятель карточек
buttonCloseAddCardForm.addEventListener("click", () => {
  closePopup(popupAddCard);
});

//открываем добавлятель карточек
buttonOpenAddCardForm.addEventListener("click", () => {
  formAddCard.reset();
  const formValidatorAddCard = new FormValidator(settings, formAddCard);
  formValidatorAddCard.enableValidation(settings, formAddCard);
  openPopup(popupAddCard);
});

//открываем редакт профиля
buttonOpenEditProfile.addEventListener("click", () => {
  nameInput.textContent = profileName.value;
  jobInput.textContent = profileAbout.value;
  const formValidatorEditProfile = new FormValidator(settings, formElement);
  formValidatorEditProfile.enableValidation(settings, formElement);
  openPopup(popupEditForm);
});

// закрываем редакт профиля
buttonExitFormEdit.addEventListener("click", () => {
  closePopup(popupEditForm);
});

//добавляем новую карточку
buttonAddNewCard.addEventListener("click", handleSubmit);

//закрываем попап с фоткой
buttonClosePopupImage.addEventListener("click", () => {
  closePopup(popupImg);
});

export {
  popupImg,
  popupImgOpen,
  popupImageOpenTitle,
  openPopup,
  closeEsc,
  handleClickClosePopup,
  closePopup,
};
