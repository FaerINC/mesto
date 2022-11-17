import "./index.css"; //Добавили стили для вебпака

//добавили классы в проект
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards } from "../utils/data.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Userinfo from "../components/UserInfo.js";

//принесли все наши константы
import {
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
} from "../utils/constants.js";

//валидация форм
const formValidatorAddCard = new FormValidator(validationConfig, formAddCard);
const formValidatorEditProfile = new FormValidator(
  validationConfig,
  formEditProfile
);

// включили валидацию
formValidatorEditProfile.enableValidation();
formValidatorAddCard.enableValidation();

//сделали попап Img
const imagePopup = new PopupWithImage(popupImg);

//навесили слушатели
imagePopup.setEventListeners();

//шаблон создания карточки
function createCard(data) {
  const card = new Card(data, ".element_template", handleCardClick);
  const cardNew = card.generateCard();
  return cardNew;
}

//обработка карточек из массива
const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const newCard = createCard(data);
      cardList.addItem(newCard);
    },
  },
  ".elements__list"
);

//вызываем метод обработки карточек из массива
cardList.renderer();

//попап добавления карточек
const profileCard = new PopupWithForm(
  popupAddCard,
  ({ inputAddNameCard, inputAddLinkCard }) => {
    const userCardNew = {
      name: inputAddNameCard,
      link: inputAddLinkCard,
    };
    const newCard = createCard(userCardNew);
    cardsContainer.prepend(newCard);
    profileCard.close();
    formValidatorAddCard.disableButtonSubmit();
  }
);

//навесили слушатели на попап кардс
profileCard.setEventListeners();

//передает значения между попапами карт и Имаге
function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

//информация профиля
const userInfo = new Userinfo({
  profileName: profileName,
  profileAbout: profileAbout,
});

//попап редактирования профиля
const profileForm = new PopupWithForm(popupEditForm, (inputValues) => {
  userInfo.setUserInfo(inputValues);
  profileForm.close();
});

//навесии слушатели
profileForm.setEventListeners();

//открываем добавлятель карточек
buttonOpenAddCardForm.addEventListener("click", () => {
  formValidatorAddCard.cleanErrors();
  profileCard.open();
});

//открываем редакт профиля
buttonOpenEditProfile.addEventListener("click", () => {
  formValidatorEditProfile.cleanErrors();
  inputAddNameProfileEdit.value = userInfo.getUserInfo().name;
  inputAddAboutProfileEdit.value = userInfo.getUserInfo().about;
  profileForm.open();
});
