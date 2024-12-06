// Файл с утилитами

// Функция проверки ответа
export function checkResponse(res) {
  if(!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

// Функция изменения текста кнопки во время загрузки
function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
  if(isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

// Функция обработчик загрузки
export function handleSubmit(request, event, loadingText = 'Сохранение...') {
  event.preventDefault();

  const submitButton = event.submitter;
  const initialText = submitButton.textContent;

  renderLoading(true, submitButton, initialText, loadingText);

  request()
    .then(() => {
      event.target.reset();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}