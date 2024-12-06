// Файл с функциями для работы с карточками

import { changeLikeStatus, deleteCard } from "./api.js";

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// функция создания карточки
export function createCard(cardData, profileId, openImagePopup, likeCardCallback = likeCard, deleteCardCallback = deleteCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-count');
  const cardId = cardData._id;
  
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardImage.addEventListener('click', () => openImagePopup(cardData));

  const isLiked = cardData.likes.some((like) => like._id === profileId);
  if (isLiked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  cardLikeButton.addEventListener('click', () => likeCardCallback(cardLikeButton, likeCounter, cardId));

  if (cardData.owner._id !== profileId) {
    cardDeleteButton.classList.add('card__delete-button-unactive');
  } else {
    cardDeleteButton.addEventListener('click', () => {
      deleteCardCallback(cardId)
        .then(() => {
          cardDeleteButton.closest('.places__item').remove();
        })
        .catch((err) => {
          console.log(err);
        })      
    });
  }

  return cardElement;
}

// Функция-обработчик лайка карточки
function likeCard(cardLikeButton, likeCounter, cardId) {
  const isLiked = cardLikeButton.classList.contains('card__like-button_is-active');
  changeLikeStatus(cardId, isLiked)
    .then((cardData) => {
      cardLikeButton.classList.toggle('card__like-button_is-active');
      likeCounter.textContent = cardData.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}