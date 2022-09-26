let openeditprofile = document.querySelector(".profile__edit-button");
let exitbuttonformedit = document.querySelector(".popup__close-btn");
let formedit = document.querySelector(".popup_edit_profile");
let profilename = document.querySelector(".profile__name");
let profileabout = document.querySelector(".profile__about");
let formElement = document.querySelector(".form_edit-profile");
let nameInput = document.querySelector(".form__input_add_name");
let jobInput = document.querySelector(".form__input_add_about");

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

//ищем список куда мы будем добавлять карточки i.t.d.
//открываем добавлятель карточек
const openaddcardpopup = document.querySelector(".popup_add_card");
const openaddcardform = document.querySelector(".profile__add-button");
const closeaddcardform = document.getElementById("closeaddcard");
const cardlist = document.getElementById("elements__list"); // nashli sam spisok kyda bydem vstavl9tb elements
const listelemtemplate = document.querySelector(".element_template").content; //нашли содержимое темплейта
const addnewcardbutton = document.getElementById("addnewcardbutton"); // button save new card
const nameofcard = document.getElementById("nameofnewcard"); // search the name input
const imagelink = document.getElementById("linkimage"); // search the link unput

initialCards.forEach(function (value) {
  const item = renderItem(value.name, value.link);
});

function renderItem(text, link) {
  const newcardelement = listelemtemplate.cloneNode(true);
  const cardtext = newcardelement.querySelector(".element__text");
  const cardimage = newcardelement.querySelector(".element__image");

  cardtext.textContent = text;
  cardimage.src = link;
  cardimage.alt = text;

  setListenersForButtons(newcardelement); //вешаем слушателей на карточки
  cardlist.prepend(newcardelement);
  return newcardelement;
}

//Добавление карточек
function handleSubmit() {
  const item = renderItem(nameofcard.value, imagelink.value);
  cardlist.prepend(item);
  closePopup(openaddcardpopup);
}

closeaddcardform.addEventListener("click", () => {
  closePopup(openaddcardpopup);
});
openaddcardform.addEventListener("click", () => {
  nameofcard.value = "";
  imagelink.value = "";
  openPopup(openaddcardpopup);
});

// слушатели для карточек
function setListenersForButtons(el) {
  const carddeletebutton = el.getElementById("trashicon");
  carddeletebutton.addEventListener("click", handledelete);
  const cardLikeButton = el.getElementById("cardlike");
  cardLikeButton.addEventListener("click", handlelike);
  addnewcardbutton.addEventListener("click", handleSubmit);
  const cardimage = el.getElementById("cardimage");
  cardimage.addEventListener("click", handleOpenImage);
  const closeImagePopupButton = document.querySelector(".popup__close-btn");
  closeImagePopupButton.addEventListener("click", () => {
    closePopup(popupimg);
  });
}
// Открытие попапа с фоткой
const popupimg = document.querySelector(".popup-image");
const popupImgopen = popupimg.getElementById("img");
const popupImageOpenTitle = popupimg.querySelector(".popup-image__title");

function handleOpenImage(imageopen) {
  popupImageOpenTitle.textContent = imageopen.currentTarget.alt;
  popupImgopen.alt = imageopen.currentTarget.alt;
  popupImgopen.src = imageopen.currentTarget.currentSrc;
  openPopup(popupimg);
}

//удаление карточки
function handledelete(event) {
  const Cardnow = event.target.closest(".element");
  Cardnow.remove();
}
//кнопка лайка
function handlelike(event) {
  const likenow = event.target.closest(".element__like-button");
  likenow.classList.toggle("element__like-button_active");
  likenow.classList.toggle("opacity");
}

//функции открытия закрытия попапов
//Открытие
function openPopup(popupelem) {
  popupelem.classList.add("popup_opened");
}
//закрытие
function closePopup(popupelem) {
  popupelem.classList.remove("popup_opened");
}

//работа с профилем

openeditprofile.addEventListener("click", () => {
  nameInput.textContent = profilename.value;
  jobInput.textContent = profileabout.value;
  openPopup(formedit);
});

exitbuttonformedit.addEventListener("click", () => {
  closePopup(formedit);
});

function HandleSubmitform(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profilename.textContent = nameInput.value;
  profileabout.textContent = jobInput.value;
  closePopup(formedit);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", HandleSubmitform);
