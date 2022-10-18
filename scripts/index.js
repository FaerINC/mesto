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
const buttonCloseAddCardForm = document.getElementById(
  "buttonClosePopupAddCard"
); //кнопка закрытия эдд кард попапа
const cardList = document.getElementById("elements__list"); // nashli sam spisok kyda bydem vstavl9tb elements
const cardTemplate = document.querySelector(".element_template").content; //нашли содержимое темплейта
const card = cardTemplate.querySelector(".element"); //нашли саму карточку

// Открытие попапа с фоткой
const popupImg = document.querySelector(".popup-image");
const popupImgOpen = popupImg.querySelector(".popup-image__image");
const popupImageOpenTitle = popupImg.querySelector(".popup-image__title");
const buttonClosePopupImage = document.querySelector(".popup-image__close-btn");

//перебор массива с карточками и вызов функции создания
initialCards.forEach(function (value) {
  const item = renderItem(value.name, value.link);
  cardList.prepend(item);
});

//функция создания карточки
function renderItem(text, link) {
  const cardElemNew = card.cloneNode(true);
  const cardText = cardElemNew.querySelector(".element__text");
  const cardImage = cardElemNew.querySelector(".element__image");

  cardText.textContent = text;
  cardImage.src = link;
  cardImage.alt = text;

  setListenersForButtons(cardElemNew); //вешаем слушателей на карточки

  return cardElemNew;
}

//Добавление карточек
function handleSubmit() {
  const item = renderItem(inputCardName.value, inputCardLink.value);
  cardList.prepend(item);
  closePopup(popupAddCard);
}

// слушатели для карточек
function setListenersForButtons(el) {
  const buttonDeleteCard = el.querySelector(".element__trash-icon");
  buttonDeleteCard.addEventListener("click", handleDelete);
  const buttonLikeCard = el.querySelector(".element__like-button");
  buttonLikeCard.addEventListener("click", handleLike);
  const cardImage = el.querySelector(".element__image");
  cardImage.addEventListener("click", handleOpenImage);
}

//открытие фоточки
function handleOpenImage(imageOpen) {
  popupImageOpenTitle.textContent = imageOpen.currentTarget.alt;
  popupImgOpen.alt = imageOpen.currentTarget.alt;
  popupImgOpen.src = imageOpen.currentTarget.currentSrc;
  openPopup(popupImg);
}

//удаление карточки
function handleDelete(event) {
  const cardNow = event.target.closest(".element");
  cardNow.remove();
}

//кнопка лайка
function handleLike(event) {
  const likeNow = event.target.closest(".element__like-button");
  likeNow.classList.toggle("element__like-button_active");
  likeNow.classList.toggle("opacity");
}

//функции открытия закрытия попапов
//Открытие
function openPopup(popupElem) {
  popupElem.classList.add("popup_opened");
  popupElem.addEventListener("click", handleClickClosePopup);
}

// закрытие по оверлею
function handleClickClosePopup(evt) {
  const popupOpen = document.querySelector(".popup_opened");
  if (evt.target === popupOpen) {
    closePopup();
  }
}

//закрытие
function closePopup() {
  const popupElem = document.querySelector(".popup_opened");
  popupElem.classList.remove("popup_opened");
  popupElem.removeEventListener("click", handleClickClosePopup);
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

//добавляем новую карточку
buttonAddNewCard.addEventListener("click", handleSubmit);

//закрываем попап с фоткой
buttonClosePopupImage.addEventListener("click", () => {
  closePopup(popupImg);
});

//закрытие по кнопке ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closePopup();
  }
});
