// Основной файл

import './pages/index.css';
import { createCard } from './scripts/card.js';
import { openModal, closeModal } from './scripts/modal.js';
import { initialCards } from './scripts/cards.js';

// DOM элементы списка карточек, всех форм документа и всех кнопок-крестиков
const placesList = document.querySelector('.places__list');
const forms = document.forms;
const closeButtons = document.querySelectorAll('.popup__close');
// DOM элементы профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
// DOM элементы для открытия модального окна с изображением
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupFull = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
// DOM элементы для открытия модального окна с формой новой карточки
const newCardPopupAddButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = forms['new-place'];
const newCardFormElements = newCardForm.elements;
const cardNameInput = newCardFormElements['place-name'];
const cardLinkInput = newCardFormElements['link'];
// DOM элементы для открытия модального окна с формой редактирования профиля
const profilePopupEditButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_type_edit');
const profileForm = forms['edit-profile'];
const profileFormElements = profileForm.elements;
const nameInput = profileFormElements['name'];
const jobInput = profileFormElements['description'];

// Добавление слушателя для открытия формы редактирования профиля по клику
profilePopupEditButton.addEventListener('click', function(evt) {
  openModal(profilePopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

// Добавление слушателя для редактирования профиля
profileForm.addEventListener('submit', handleProfileFormSubmit);

// Функция-обработчик редактирования профиля
function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profilePopup);
}

// Добавление слушателя для открытия формы новой карточки по клику
newCardPopupAddButton.addEventListener('click', function(evt) {
  openModal(newCardPopup);
});

// Добавление слушателя для добавления новой карточки
newCardForm.addEventListener('submit', handleNewCardFormSubmit);

// Функция-обработчик добавления новой карточки
function handleNewCardFormSubmit(event) {
  event.preventDefault();
  const newCardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  renderCard(newCardData, "prepend");
  newCardForm.reset();
  closeModal(newCardPopup);
}

// Функция открытия попапа с изображением
export function openImagePopup(cardData) {
  openModal(imagePopup);
  imagePopupFull.setAttribute('src', cardData.link);
  imagePopupFull.setAttribute('alt', cardData.name);
  imagePopupCaption.textContent = cardData.name;
}

// Добавление слушателя на все кнопки-крестики для закрытия попапа по крестику
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup));
});

// Функция для вставки карточек на страницу с указанием метода вставки
function renderCard(cardData, method = "prepend") {
  const cardElement = createCard(cardData, openImagePopup);
  placesList[ method ](cardElement);
}

// Вывод всех карточек на страницу
initialCards.forEach((cardData) => {
  renderCard(cardData, "append");
});