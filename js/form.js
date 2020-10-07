'use strict';

(function () {
  const inputRoomNumber = window.constant.adForm.querySelector('#room_number'); // Количество комнат
  const inputCapacity = window.constant.adForm.querySelector('#capacity'); // Количество гостей

  const onSelectChange = function () {
    if ((inputRoomNumber.value === '1') && (inputCapacity.value !== '1')) {
      inputRoomNumber.setCustomValidity('1 комната только для 1 гостя');
    } else if ((inputRoomNumber.value === '2') && ((inputCapacity.value === '3') || (inputCapacity.value === '0'))) {
      inputRoomNumber.setCustomValidity('Для 2 и менее гостей');
    } else if ((inputRoomNumber.value === '3') && (inputCapacity.value === '0')) {
      inputRoomNumber.setCustomValidity('Для 3 или менее гостей');
    } else if ((inputRoomNumber.value === '100') && (inputCapacity.value !== '0')) {
      inputRoomNumber.setCustomValidity('Не для гостей');
    } else {
      inputRoomNumber.setCustomValidity('');
    }
    inputRoomNumber.reportValidity();
  };

  inputCapacity.addEventListener(`change`, onSelectChange);
  inputRoomNumber.addEventListener(`change`, onSelectChange);


})();
