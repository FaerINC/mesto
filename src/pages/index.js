import "./index.css"; //Добавили стили для вебпака

//добавили классы в проект
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Userinfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";

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
  buttonOpenEditAvatar,
  formChangeAvatar,
  popupChangeAvatar,
  profileAvatarka,
  likeCounter
} from "../utils/constants.js";

const api = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-54',
  headers: {
    authorization: 'eff7d243-9399-4d7f-b196-61b79a4d8723',
    'Content-Type': 'application/json'
  }
}

const ApiPresets = new Api(api);

ApiPresets.getAllCards().then((response) => {
  //обработка карточек из массива
  const cardList = new Section(
    {
      items: response,
      renderer: (data) => {
        const newCard = createCard(data);
        cardList.addItem(newCard);
      },
    },
  ".elements__list"
  );  //вызываем метод обработки карточек из массива
    cardList.renderer();
});



ApiPresets.getUserInformation().then((profile) => {
  console.log(profile);
  const UserInf = new Userinfo({profileName, profileAbout, profileAvatarka})
  UserInf.setUserInfo(profile)
  ApiPresets.setNewAvatar(profile.avatar)
})

//попап аватарки
const profileAvatar = new PopupWithForm(popupChangeAvatar, (avatar) => {
  console.log(avatar);
    ApiPresets.setNewAvatar(avatar)
    profileAvatar.close();
    profileAvatarka.src = avatar
    formValidatorChangeAvatar.disableButtonSubmit();
});
profileAvatar.setEventListeners();

// const ownerId = ApiPresets.getUserInformation().then((profile) => {})
// console.log(ownerId);

//валидация форм
const formValidatorAddCard = new FormValidator(validationConfig, formAddCard);
const formValidatorChangeAvatar = new FormValidator(
  validationConfig,
  formChangeAvatar
);
const formValidatorEditProfile = new FormValidator(
  validationConfig,
  formEditProfile
);

// включили валидацию
formValidatorEditProfile.enableValidation();
formValidatorAddCard.enableValidation();
formValidatorChangeAvatar.enableValidation();


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

// //обработка карточек из массива
// const cardList = new Section(
//   {
//     items: initialCards,
//     renderer: (data) => {
//       const newCard = createCard(data);
//       cardList.addItem(newCard);
//     },
//   },
//   ".elements__list"
// );

// //вызываем метод обработки карточек из массива
// cardList.renderer();

//попап добавления карточек
// const profileCard = new PopupWithForm(
//   popupAddCard,
//   ({ inputAddNameCard, inputAddLinkCard }) => {
//     const userCardNew = {
//       name: inputAddNameCard,
//       link: inputAddLinkCard,
//     };
//     const newCard = createCard(userCardNew);
//     cardsContainer.prepend(newCard);
//     profileCard.close();
//     formValidatorAddCard.disableButtonSubmit();
//   }
// );

const profileCard = new PopupWithForm(
  popupAddCard,
  ({ inputAddNameCard, inputAddLinkCard }) => {
    const userCardNew = {
            name: inputAddNameCard,
            link: inputAddLinkCard,
          };
    const newCard = createCard(userCardNew);
    cardsContainer.prepend(newCard);
    ApiPresets.addNewCard(inputAddNameCard, inputAddLinkCard)
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
  profileAvatarka: profileAvatarka
});

//попап редактирования профиля
const profileForm = new PopupWithForm(popupEditForm, (inputValues) => {
  ApiPresets.setUserInformtion(inputValues)
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

buttonOpenEditAvatar.addEventListener("click", () => {
  profileAvatar.open();
  console.log("sss");
});
