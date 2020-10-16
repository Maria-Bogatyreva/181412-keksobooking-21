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

  // Действия при нажатии Esc на успешном объявлени
  const onSuccessNoticeEscPress = function (evt) {
      if (evt.key === 'Escape') {
       evt.preventDefault();
       successNotice.remove();
      };
    }
  // Функция для показа успешного объявления
  const showSuccessNotice = function () {
    document.body.insertAdjacentElement('afterbegin', successNotice);

    document.addEventListener('keydown', onSuccessNoticeEscPress);
    document.addEventListener('click', hideSuccessNotice);
  };

  // Функция для сокрытия успешного объявления
  const hideSuccessNotice = function () {
    successNotice.remove();
    document.removeEventListener('keydown', onSuccessNoticeEscPress);
    document.removeEventListener('click', hideSuccessNotice);
  };

  //  Действия, если данные отправились успешно
  const saveHandler = function () {
    deleteMarks(); // Удалили метки
    deactivateMap(); // Деактивировали карту
    adForm.reset(); // Очистили форму
    showSuccessNotice(); // Вывели успешное сообщение
  };
  //  ОТПРАВКА ДАННЫХ ФОРМЫ
  adForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      save(saveHandler, function () {}, new FormData(adForm));
    });

})();
