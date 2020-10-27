'use strict';
(function () {
  const adForm = window.constant.adForm;
  const mapPin = window.constant.mapPin;
  const deactivateMap = window.map.deactivate;
  const save = window.backend.save;
  const deleteMarks = window.mark.delete;
  const closeCard = window.card.close;

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

  // Действия при нажатии Esc на сообщении
  const onNoticeEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      if (successNotice) {
        successNotice.remove();
      }
      if (errorNotice) {
        errorNotice.remove();
      }
    }
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
  };

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

  const resetForm = function () {
    adForm.reset();
    deleteMarks();
    closeCard();
    deactivateMap();
  }

  //  Действия, если данные отправились успешно
  const saveHandler = function () {
    resetForm();
    showSuccessNotice(); // Вывели успешное сообщение
  };
  // Действия, если что-то пошло не так
  const errorHandler = function () {
    closeCard();
    showErrorNotice();
  };

  const submitHandler = function (evt) {
    evt.preventDefault();
    save(saveHandler, errorHandler, new FormData(adForm));
  };
  //  ОТПРАВКА ДАННЫХ ФОРМЫ
  adForm.addEventListener('submit', submitHandler);

  //  Действия при очистке формы
  const clearForm = adForm.querySelector('.ad-form__reset');

  const onClearFormClick = function (evt) {
    evt.preventDefault();
    resetForm();
  };

  clearForm.addEventListener('click', onClearFormClick);

})();
