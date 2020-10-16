'use strict';
(function () {
  const adForm = window.constant.adForm;
  const deactivateMap = window.map.deactivate;
  const save = window.backend.save;
  const deleteMarks = window.mark.deleteMarks;

//  ОТПРАВКА ДАННЫХ ФОРМЫ
adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    save(saveHandler, function () {}, new FormData(adForm));


})();
