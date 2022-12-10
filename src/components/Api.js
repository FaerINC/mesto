import { inputAddNameCard, inputAddLinkCard} from '../utils/constants.js'

export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  getUserInformation() {
    const url = `${this._baseUrl}/users/me`;
    return fetch(url, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
        }
      })
  } //get

  getAllCards() {
    const url = `${this._baseUrl}/cards`;
    return fetch(url, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
         return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
      }})
  } //get

  getAllDataForStart() {
    return Promise.all([this.getUserInformation(), this.getAllCards()]);
  }

  addNewCard(inputAddNameCard, inputAddLinkCard) {
    const url = `${this._baseUrl}/cards`;
    return fetch(url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: `${inputAddNameCard}`,
        link: `${inputAddLinkCard}`,
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
         return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
      }})
  } //post

  deleteCard(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}`;

    return fetch(url, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) return Promise.resolve();
      return res.json()
      .then(res => {
        return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
      });
    });
  } //delete



  setUserInformtion({name, about}) {
    const url = `${this._baseUrl}/cards`;
    return fetch(url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`,
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
        }
      })
  } //patch

  setNewAvatar(avatar) {
    const url = `${this._baseUrl}/users/me/avatar`;
    return fetch(url, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
        }
      })
  } //patch

  setLikeCard(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}/likes`;

    return fetch(url, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
          return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
      }
    })
    .then(res => {
      return res.likes;
    });
  } //put

  deleteLikeCard(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}/likes`;

    return fetch(url, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
        }
      })
      .then(res => {
        return res.likes;
      });
  } //delete

  cardLikeToggle(cardId, isLiked) {
    if (isLiked) {
      return this._deleteLike(cardId);
    } else {
      return this._setLike(cardId);
    }
  }


}
