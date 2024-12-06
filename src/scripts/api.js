// Файл для работы с API

import { checkResponse } from "./utils.js";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-mag-4',
  headers: {
    authorization: 'fd26f244-7976-420d-9518-a53afadd5e52',
    'Content-Type': 'application/json'
  }
};

export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(checkResponse);
}

export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(checkResponse);
}

export function changeLikeStatus(cardId, isLiked) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: isLiked ? 'DELETE' : 'PUT'
  })
    .then(checkResponse);
}

export function editProfile(nameValue, jobValue) {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      name: nameValue,
      about: jobValue
    })
  })
    .then(checkResponse);
}

export function addCard(nameValue, linkValue) {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({
      name: nameValue,
      link: linkValue
    })
  })
    .then(checkResponse);
}

export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: 'DELETE'
  })
    .then(checkResponse);
}

export function changeUserAvatar(avatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
    .then(checkResponse);
}