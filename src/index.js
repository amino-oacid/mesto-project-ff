// Основной файл

import './pages/index.css';
import { createCard } from './scripts/card.js';
import { openModal, closeModal } from './scripts/modal.js';
import { initialCards } from './scripts/cards.js';

// DOM элементы списка карточек и всех форм документа
const placesList = document.querySelector('.places__list');
const forms = document.forms;
// DOM элементы профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
// DOM элементы для открытия модального окна с изображением
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupFull = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');
// DOM элементы для открытия модального окна с формой новой карточки
const newCardPopupAddButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardPopupCloseButton = newCardPopup.querySelector('.popup__close');
const newCardForm = forms['new-place'];
const newCardFormElements = newCardForm.elements;
const cardNameInput = newCardFormElements['place-name'];
const cardLinkInput = newCardFormElements['link'];
// DOM элементы для открытия модального окна с формой редактирования профиля
const dataProfilePopupEditButton = document.querySelector('.profile__edit-button');
const dataProfilePopup = document.querySelector('.popup_type_edit');
const dataProfilePopupCloseButton = dataProfilePopup.querySelector('.popup__close');
const dataProfileForm = forms['edit-profile'];
const dataProfileFormElements = dataProfileForm.elements;
const nameInput = dataProfileFormElements['name'];
const jobInput = dataProfileFormElements['description'];

// Добавление слушателя для открытия формы редактирования профиля по клику
dataProfilePopupEditButton.addEventListener('click', function(evt) {
  openModal(dataProfilePopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

// Добавление слушателя для редактирования профиля
dataProfileForm.addEventListener('submit', handleFormSubmit);

// Функция-обработчик редактирования профиля
function handleFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(dataProfilePopup);
}

// Добавление слушателя для открытия формы новой карточки по клику
newCardPopupAddButton.addEventListener('click', function(evt) {
  openModal(newCardPopup);
});

// Добавление слушателя для добавления новой карточки
newCardForm.addEventListener('submit', addNewCard);

// Функция-обработчик добавления новой карточки
function addNewCard(event) {
  event.preventDefault();
  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  const cardElement = createCard(newCardData, openImagePopup);
  placesList.prepend(cardElement);
  newCardForm.reset();
  closeModal(newCardPopup);
}

// Функция открытия попапа с изображением
export function openImagePopup(event) {
  openModal(imagePopup);
  imagePopupFull.setAttribute('src', event.target.src);
  imagePopupFull.setAttribute('alt', event.target.alt);
  imagePopupCaption.textContent = event.target.alt;
}

// Функция закрытия попапа по кнопке
function closePopup(button, popup) {
  button.addEventListener('click', function(evt) {
    closeModal(popup);
  });
}
closePopup(imagePopupCloseButton, imagePopup);
closePopup(newCardPopupCloseButton, newCardPopup);
closePopup(dataProfilePopupCloseButton, dataProfilePopup);


// Вывод всех карточек на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, openImagePopup);
  placesList.append(cardElement);
});
