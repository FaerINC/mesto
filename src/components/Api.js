import { inputAddNameCard, inputAddLinkCard} from '../utils/constants.js'

export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  getUserInformation() {
    return fetch(`${this._baseUrl}/users/me`, {
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
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
         return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
      }})
  } //get

  getMyId() {
    return fetch(`${this._baseUrl}/users/me`, {
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
      .then((res) => {
        return res._id
      })
  }

  addNewCard({ inputAddNameCard, inputAddLinkCard }) {
    return fetch(`${this._baseUrl}/cards`, {
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
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
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
    return fetch(`${this._baseUrl}/users/me`, {
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
    return fetch(`${this._baseUrl}/users/me/avatar`, {
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
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
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
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
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
}
