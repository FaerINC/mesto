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
  likeCounter,
  popupSubmit
} from "../utils/constants.js";

const api = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-54',
  headers: {
    authorization: 'eff7d243-9399-4d7f-b196-61b79a4d8723',
    'Content-Type': 'application/json'
  }
}

const ApiPresets = new Api(api);

//шаблон создания карточки
function createCard(data) {
  const card = new Card(data, ".element_template", handleCardClick, userInfo.id, handleDeleteCard, handleLikeCard);
  const cardNew = card.generateCard();
  return cardNew;
}

async function handleLikeCard(data, myId, likeElement, likeCount) {

   if(data.likes.some((element) => {return element._id === myId})) {
    ApiPresets.deleteLikeCard(data._id).then((res) => {
      likeCount.textContent = res.length
    })
    .catch((err) => {console.log(err);})
    .finally(() => {likeElement.classList.remove('element__like-button_active')})

  } else {
    await ApiPresets.setLikeCard(data._id).then((res) => {
      console.log(res);
      likeCount.textContent = res.length
    })
    .catch((err) => {console.log(err);})
    .finally(() => {likeElement.classList.add('element__like-button_active')})
  }
}

//обработка карточек c сервера
const cardList = new Section(createCard ,".elements__list");  //вызываем метод обработки карточек с сервера

const popupSubmits = new PopupWithSubmit(popupSubmit, handleSubmit)
popupSubmits.setEventListeners();

async function handleSubmit(card) {
  cardsContainer.innerHTML = ''
  await ApiPresets.deleteCard(card)
  await ApiPresets.getAllCards().then((res) => {
    cardList.renderer(res)
  })
  await popupSubmits.close()
}

function handleDeleteCard(card) {
  console.log(card);
  popupSubmits.getCurrentCard(card);
  popupSubmits.open();
}

ApiPresets.getUserInformation().then((profile) => {
  userInfo.setUserInfo(profile)
  userInfo.renderAvatar(profile.avatar)
})

//попап аватарки
const profileAvatar = new PopupWithForm(popupChangeAvatar, (avatar) => {
    profileAvatar.loading(true)
    formValidatorChangeAvatar.disableButtonSubmit()
    ApiPresets.setNewAvatar(avatar.inputAddLinkAvatar)
    .then((res) => {
      userInfo.renderAvatar(avatar.inputAddLinkAvatar)
      formValidatorChangeAvatar.disableButtonSubmit();
      profileAvatar.close();
    })
    .catch((err) => {console.log(err);})
    .finally(() => {profileAvatar.loading(false)})


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

const profileCard = new PopupWithForm(
  popupAddCard,
  (data) => {
    profileCard.loading(true);
    formValidatorAddCard.disableButtonSubmit();
    ApiPresets.addNewCard(data).then(async (res) => {
     await cardsContainer.prepend(createCard(res));
     await profileCard.close();
    })
    .catch((err) => {console.log(err);})
    .finally(() => {profileCard.loading(false);})

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
  profileForm.loading(true);
  formValidatorEditProfile.disableButtonSubmit()
  ApiPresets.setUserInformtion(inputValues)
  .then((res) => {
    console.log(res);
    userInfo.getServerProfileInfo(res);
    userInfo.renderProfile();
    userInfo.setUserInfo(inputValues);
    profileForm.close();
  })
  .catch((err) => {console.log(err);})
  .finally(() => {profileForm.loading(false)})
});

//навесии слушатели
profileForm.setEventListeners();



Promise.all([
  ApiPresets.getUserInformation(),
  ApiPresets.getAllCards()
])
  .then((res) => {
    userInfo.getServerProfileInfo(res[0]);
    userInfo.renderProfile();
    userInfo.renderAvatarServer();
    cardList.renderer(res[1]);
  })

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
});

// //шаблон создания карточки
// function createCard(data) {
//   const card = new Card(data, ".element_template", handleCardClick);
//   const cardNew = card.generateCard();
//   return cardNew;
// }

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
