// Файл с функциями для работы с карточками

// темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// функция создания карточки
export function createCard(cardData, openImagePopup, likeCardCallback = likeCard, deleteCardCallback = deleteCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardImage.addEventListener('click', openImagePopup);

  cardDeleteButton.addEventListener('click', function(evt) {
    const cardToDelete = evt.target.closest('.card');
    deleteCardCallback(cardToDelete);
  });

  cardLikeButton.addEventListener('click', function(evt) {
    likeCardCallback(cardLikeButton);
  });

  return cardElement;
}

// функция-обработчик удаления карточки
export function deleteCard(cardToDelete) {
  cardToDelete.remove();
}

// Функция-обработчик лайка карточки
function likeCard(cardLikeButton) {
  cardLikeButton.classList.toggle('card__like-button_is-active');
}