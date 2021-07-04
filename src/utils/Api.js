export class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._getResponseData)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._getResponseData)
  }

  changeUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ 
        name: data.name, 
        about: data.job 
      }),
    })
    .then(this._getResponseData)
  }

  changeUserImage(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(this._getResponseData)
  }
  
  addCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ 
        name: name, 
        link: link 
      }),
    })
    .then(this._getResponseData)
  }

  deleteCard(data) {
    return fetch(`${this._baseUrl}/cards/${data}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getResponseData)
  }
  
  setLike(data) {
    return fetch(`${this._baseUrl}/cards/likes/${data._id}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._getResponseData)
  }

  deleteLike(data) {
    return fetch(`${this._baseUrl}/cards/likes/${data._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._getResponseData)
  }

}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: 'a161955b-22e4-44f7-ad97-c36f2565c1c8',
    'Content-Type': 'application/json'
  }
});

export default api