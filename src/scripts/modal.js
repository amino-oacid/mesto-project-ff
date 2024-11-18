// Файл с функциями для работы модальных окон

// Функция открытия модельного окна
export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('mousedown', handleOverlayClick);
  document.addEventListener('keydown', handleEscapePress);
}

// Функция закрытия модельного окна
export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('mousedown', handleOverlayClick);
  document.removeEventListener('keydown', handleEscapePress);
}

// Функция-обработчик клика на оверлей
function handleOverlayClick(event) {
  if(event.target == event.currentTarget) {
    closeModal(event.target);
  }
}

// Функция-обработчик нажатия на Escape
function handleEscapePress(event) {
  if(event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}

