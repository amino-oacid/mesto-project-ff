// Основной файл

import './pages/index.css';
import { createCard } from './scripts/card.js';
import { openModal, closeModal } from './scripts/modal.js';
import { validationConfig, enableValidation, clearValidation } from './scripts/validation.js';
import { getInitialCards, getUserInfo, editProfile, addCard, changeUserAvatar } from './scripts/api.js';

// DOM элементы списка карточек, всех форм документа и всех кнопок-крестиков
const placesList = document.querySelector('.places__list');
const forms = document.forms;
const closeButtons = document.querySelectorAll('.popup__close');
// DOM элементы профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image-picture');
let profileId;
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
// DOM элементы для открытия модального окна с формой обновления аватара пользователя
const avatarChangeButton = document.querySelector('.profile__image');
const avatarChangePopup = document.querySelector('.popup_type_avatar');
const avatarChangeForm = forms['change-avatar'];
const avatarChangeFormElements = avatarChangeForm.elements;
const avatarInput = avatarChangeFormElements['avatar-link'];

// Добавление слушателя для открытия формы редактирования профиля по клику
profilePopupEditButton.addEventListener('click', function(evt) {
  openModal(profilePopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);
});

// Добавление слушателя для редактирования профиля
profileForm.addEventListener('submit', handleProfileFormSubmit);

// Функция-обработчик редактирования профиля
function handleProfileFormSubmit(event) {
  event.preventDefault();
  renderLoading(true, event.submitter);
  editProfile(nameInput.value, jobInput.value)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(profilePopup);
    })
    .finally(() => renderLoading(false, event.submitter))
    
}

// Добавление слушателя для открытия формы обновления аватара по клику
avatarChangeButton.addEventListener('click', function(evt) {
  openModal(avatarChangePopup);
  clearValidation(avatarChangeForm, validationConfig);
});

// Добавление слушателя для обновления аватара
avatarChangeForm.addEventListener('submit', handleChangeAvatarSubmit);

// Функция-обработчик обновления аватара
function handleChangeAvatarSubmit(event) {
  event.preventDefault();
  renderLoading(true, event.submitter);
  changeUserAvatar(avatarInput.value)
    .then((res) => {
      profileImage.src = res.avatar;
      closeModal(avatarChangePopup);
    })
    .finally(() => renderLoading(false, event.submitter))
}

// Добавление слушателя для открытия формы новой карточки по клику
newCardPopupAddButton.addEventListener('click', function(evt) {
  openModal(newCardPopup);
  clearValidation(newCardForm, validationConfig);
});

// Добавление слушателя для добавления новой карточки
newCardForm.addEventListener('submit', handleNewCardFormSubmit);

// Функция-обработчик добавления новой карточки
function handleNewCardFormSubmit(event) {
  event.preventDefault();
  renderLoading(true, event.submitter);
  addCard(cardNameInput.value, cardLinkInput.value)
    .then((cardData) => {
      renderCard(cardData, profileId, "prepend");
      newCardForm.reset();
      closeModal(newCardPopup);
    }) 
    .finally(() => renderLoading(false, event.submitter))
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
function renderCard(cardData, profileId, method = "prepend") {
  const cardElement = createCard(cardData, profileId, openImagePopup);
  placesList[ method ](cardElement);
}

enableValidation(validationConfig);

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, initialCards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.src = userData.avatar;
    profileId = userData._id;
    initialCards.forEach((cardData) => {
      renderCard(cardData, profileId, "append");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Функция процесса загрузки
function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
  if(isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}