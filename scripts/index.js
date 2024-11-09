// темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узел списка карточек
const placesList = document.querySelector('.places__list');

// функция создания карточки
function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;

  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', function(evt) {
    const cardToDelete = evt.target.closest('.card');
    deleteCard(cardToDelete);
  });

  return cardElement;
}

// функция удаления карточки
function deleteCard(cardToDelete) {
  cardToDelete.remove();
}

// вывод всех карточек на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard);
  placesList.append(cardElement);
});
