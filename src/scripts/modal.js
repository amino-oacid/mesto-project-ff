// Файл с функциями для работы модальных окон

// Функция открытия модельного окна
export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('mousedown', overlayClick);
  document.addEventListener('keydown', escapePress);
}

// Функция закрытия модельного окна
export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('mousedown', overlayClick);
  document.removeEventListener('keydown', escapePress);
}

// Функция-обработчик клика на оверлей
function overlayClick(event) {
  closeModal(event.target);
}

// Функция-обработчик нажатия на Escape
function escapePress(event) {
  if(event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

