// Основной файл

import './pages/index.css';
import { createCard, deleteCard } from './scripts/card.js';
import { initialCards } from './scripts/cards.js';

// DOM узел списка карточек
const placesList = document.querySelector('.places__list');

// вывод всех карточек на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard);
  placesList.append(cardElement);
});
