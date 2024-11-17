// Файл с функциями для работы с карточками

// темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// функция создания карточки
export function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', function(evt) {
    const cardToDelete = evt.target.closest('.card');
    deleteCard(cardToDelete);
  });

  return cardElement;
}

// функция удаления карточки
export function deleteCard(cardToDelete) {
  cardToDelete.remove();
}