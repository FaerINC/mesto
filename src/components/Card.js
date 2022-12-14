export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    myId,
    handleDeleteCard,
    handleLikeCard
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._myId = myId;
    this._cardDelete = handleDeleteCard;
    this._cardLike = handleLikeCard;
    this._isLiked = this._isCardLiked();
  }

  _getTemplate() {
    const templateElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return templateElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".element__image");
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector(".element__text").textContent = this._name;
    this._likeCounter = this._element.querySelector(".element__like-counter");

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._elementImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    this._elementLike = this._element.querySelector(".element__like-button");
    this._elementLike.addEventListener("click", () => {
      this._likeCard();
    });

    this._elementTrashIcon = this._element.querySelector(
      ".element__trash-icon"
    );
    this._elementTrashIcon.addEventListener("click", () => {
      this._handleDelete();
    });

    this._howManyLikes();

    if (this._data.owner._id != this._myId) {
      this._elementTrashIcon.remove();
      this._elementTrashIcon = null;
    }

    if (this._isLiked) {
      this._elementLike.classList.add("element__like-button_active");
    }
  }

  _likeCard() {
    this._cardLike(this, this._isLiked);
  }

  _isCardLiked() {
    return this._data.likes.some((cardLikes) => {
      return cardLikes._id === this._myId;
    });
  }

  setLikes(likes) {
    this._likeCounter.textContent = likes;
    if (this._isLiked) {
      this._elementLike.classList.remove("element__like-button_active");
      this._isLiked = false;
    } else {
      this._elementLike.classList.add("element__like-button_active");
      this._isLiked = true;
    }
  }

  _howManyLikes() {
    this._likeCounter.textContent = this._data.likes.length;
  }

  _handleDelete() {
    this._cardDelete(this);
  }
}
