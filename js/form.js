'use strict';
(function () {
  const adForm = window.constant.adForm;
  const deactivateMap = window.map.deactivate;
  const save = window.backend.save;
  const deleteMarks = window.mark.delete;

  // Успешное сообщение
  const successNoticeTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
  const successNotice = successNoticeTemplate.cloneNode(true);

  // Ошибочное сообщение
  const errorNoticeTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
  const errorNotice = errorNoticeTemplate.cloneNode(true);

  // Действия при нажатии Esc на объявлени
  const onNoticeEscPress = function (evt) {
    if (evt.key === 'Escape') {
     evt.preventDefault();
      if (successNotice) {
        successNotice.remove();
      };
      if (errorNotice) {
        errorNotice.remove();
      }
    };
  };

  // Функция для показа ошибочного объявления
  const showErrorNotice = function () {
    document.querySelector('main').insertAdjacentElement('afterbegin', errorNotice);

    document.addEventListener('keydown', onNoticeEscPress);
    document.addEventListener('click', hideErrorNotice);
    errorNotice.querySelector('.error__button').addEventListener('click', hideErrorNotice);
  };

  // Функция для скрытия ошибочного объявления
  const hideErrorNotice = function () {
    errorNotice.remove();

    document.removeEventListener('keydown', onNoticeEscPress);
    document.removeEventListener('click', hideErrorNotice);
    errorNotice.querySelector('.error__button').removeEventListener('click', hideErrorNotice);
  }


  // Функция для показа успешного объявления
  const showSuccessNotice = function () {
    document.body.insertAdjacentElement('afterbegin', successNotice);

    document.addEventListener('keydown', onNoticeEscPress);
    document.addEventListener('click', hideSuccessNotice);
  };

  // Функция для скрытия успешного объявления
  const hideSuccessNotice = function () {
    successNotice.remove();
    document.removeEventListener('keydown', onNoticeEscPress);
    document.removeEventListener('click', hideSuccessNotice);
  };

  //  Действия, если данные отправились успешно
  const saveHandler = function () {
    deleteMarks(); // Удалили метки
    deactivateMap(); // Деактивировали карту
    adForm.reset(); // Очистили форму
    showSuccessNotice(); // Вывели успешное сообщение
  };
  const errorHandler = function () {
    showErrorNotice();
  }

  const submitHandler = function (evt) {
      evt.preventDefault();
      save(saveHandler, errorHandler, new FormData(adForm));
  };
  //  ОТПРАВКА ДАННЫХ ФОРМЫ
  adForm.addEventListener('submit', submitHandler);

  //  Обработчик кнопке очистки формы
  const clearForm = adForm.querySelector('.ad-form__reset');
  const onClearFormClick = function (evt) {
    evt.preventDefault();
    adForm.reset();
  };

  clearForm.addEventListener('click', onClearFormClick);

})();
