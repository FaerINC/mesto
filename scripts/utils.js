// Открытие попапа с фоткой
const popupImg = document.querySelector(".popup-image");
const popupImgOpen = popupImg.querySelector(".popup-image__image");
const popupImageOpenTitle = popupImg.querySelector(".popup-image__title");

//Открытие
function openPopup(popupNow) {
  popupNow.classList.add("popup_opened");
  popupNow.addEventListener("click", handleClickClosePopup);
  document.addEventListener("keydown", handleCloseByEsc);
}

//закрытие по кнопке ESC
function handleCloseByEsc(e) {
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
function closePopup() {
  const popupNow = document.querySelector(".popup_opened");
  popupNow.classList.remove("popup_opened");
  popupNow.removeEventListener("click", handleClickClosePopup);
  document.removeEventListener("keydown", handleCloseByEsc);
}

function handleOpenImage(e) {
  popupImageOpenTitle.textContent = e.currentTarget.alt;
  popupImgOpen.alt = e.currentTarget.alt;
  popupImgOpen.src = e.currentTarget.currentSrc;
  openPopup(popupImg);
}

export {
  popupImg,
  popupImgOpen,
  popupImageOpenTitle,
  openPopup,
  handleCloseByEsc,
  handleClickClosePopup,
  closePopup,
  handleOpenImage,
};
