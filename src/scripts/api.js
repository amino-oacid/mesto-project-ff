// Файл для работы с API

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
    .then((res) => {
      if(!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    });
}

export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then((res) => {
      if(!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }

      return res.json();
    });
}

export function changeLikeStatus(cardId, isLiked) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: isLiked ? 'DELETE' : 'PUT'
  })
    .then((res) => {
      if(!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }

      return res.json();
    });
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
    .then((res) => {
      if(!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }

      return res.json();
    });
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
    .then((res) => {
      if(!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }

      return res.json();
    });
}

export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: 'DELETE'
  })
    .then((res) => {
      if(!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }

      return res.json();
    });
}

export function changeUserAvatar(avatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
    .then((res) => {
      if(!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }

      return res.json();
    });
}

/*

export function changeAvatar(avatarLink) {
  return request('/users/me/avatar', {
    method: 'PATCH',
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  });
}

export function validateImageUrl(url) {
  const urlPattern = /\.(jpeg|jpg|gif|png)$/i;
  if (!urlPattern.test(url)) {
    console.error('Неверный формат URL изображения');
    return Promise.reject('Invalid image URL format');
  }
  return fetch(url, { method: 'HEAD', mode: 'no-cors' })
    .then((response) => response.ok)
}


*/