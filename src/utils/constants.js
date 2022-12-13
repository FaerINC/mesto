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
const popupEditForm = document.querySelector(".popup_edit_profile");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const inputAddNameProfileEdit = document.querySelector(".form__input_add_name");
const inputAddAboutProfileEdit = document.querySelector(
  ".form__input_add_about"
);

//ищем список куда мы будем добавлять карточки i.t.d.
const popupAddCard = document.querySelector(".popup_add_card");
const formAddCard = popupAddCard.querySelector(".form"); //попап с добавлением карточки
const inputAddNameCard = formAddCard.querySelector(".form__input_add_name");
const inputAddLinkCard = formAddCard.querySelector(".form__input_add_link");
const buttonOpenAddCardForm = document.querySelector(".profile__add-button"); //кнопка открытия эдд кард попапа

//формы
const formEditProfile = document.querySelector(".form_edit-profile");
const cardsContainer = document.querySelector(".elements__list"); // nashli sam spisok kyda bydem vstavl9tb elements
const buttonOpenEditAvatar = document.querySelector(".profile__pencil");
const formChangeAvatar = document.querySelector(".form_change-avatar");
const popupChangeAvatar = document.querySelector(".popup_change-avatar");
const profileAvatarka = document.querySelector(".profile__avatar");
const likeCounter = document.querySelector(".element__like-counter");
const popupSubmit = document.querySelector(".popup-submit");

export {
  validationConfig,
  popupImg,
  buttonOpenEditProfile,
  popupEditForm,
  profileName,
  profileAbout,
  inputAddNameProfileEdit,
  inputAddAboutProfileEdit,
  popupAddCard,
  formAddCard,
  buttonOpenAddCardForm,
  formEditProfile,
  cardsContainer,
  buttonOpenEditAvatar,
  formChangeAvatar,
  popupChangeAvatar,
  profileAvatarka,
  inputAddNameCard,
  inputAddLinkCard,
  likeCounter,
  popupSubmit,
};
