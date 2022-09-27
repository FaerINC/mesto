// попап эдит профайл с его штучками...
const buttonOpenEditProfile = document.querySelector(".profile__edit-button");
const buttonExitFormEdit = document.querySelector(".popup__close-btn");
const popupEditForm = document.querySelector(".popup_edit_profile");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const formElement = document.querySelector(".form_edit-profile");
const nameInput = document.querySelector(".form__input_add_name");
const jobInput = document.querySelector(".form__input_add_about");

//ищем список куда мы будем добавлять карточки i.t.d.
const popupAddCard = document.querySelector(".popup_add_card"); //попап с добавлением карточки
const buttonOpenAddCardForm = document.querySelector(".profile__add-button"); //кнопка открытия эдд кард попапа
const buttonCloseAddCardForm = document.getElementById("closeaddcard"); //кнопка закрытия эдд кард попапа
const cardList = document.getElementById("elements__list"); // nashli sam spisok kyda bydem vstavl9tb elements
const InputCardName = document.getElementById("nameofnewcard"); // нашли инпут имени новой карты
const InputCardLink = document.getElementById("linkimage"); // инпут ссылки на новую картинку
const buttonAddNewCard = document.getElementById("addnewcardbutton"); //кнопка добавления новой карточки
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
  const item = renderItem(InputCardName.value, InputCardLink.value);
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
}

//закрытие
function closePopup(popupElem) {
  popupElem.classList.remove("popup_opened");
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
  InputCardName.value = "";
  InputCardLink.value = "";
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
