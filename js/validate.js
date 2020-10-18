'use strict';

(function () {
  // Импортируемые данные
  const address = window.constant.inputAdress;
  const adForm = window.constant.adForm;

  const roomNumber = adForm.querySelector('#room_number'); // Количество комнат
  const capacity = adForm.querySelector('#capacity'); // Количество гостей
  const title = adForm.querySelector('#title');
  const price = adForm.querySelector('#price');
  const type = adForm.querySelector('#type');
  const timein = adForm.querySelector('#timein');
  const timeout = adForm.querySelector('#timeout');
  const avatar = adForm.querySelector('#avatar');
  const images = adForm.querySelector('#images');

  // Валидация количество комнат - количество гостей
  const onRoomNumberCapacityChange = function () {
    if ((roomNumber.value === '1') && (capacity.value !== '1')) {
      roomNumber.setCustomValidity('1 комната только для 1 гостя');
    } else if ((roomNumber.value === '2') && ((capacity.value === '3') || (capacity.value === '0'))) {
      roomNumber.setCustomValidity('Для 2 и менее гостей');
    } else if ((roomNumber.value === '3') && (capacity.value === '0')) {
      roomNumber.setCustomValidity('Для 3 или менее гостей');
    } else if ((roomNumber.value === '100') && (capacity.value !== '0')) {
      roomNumber.setCustomValidity('Не для гостей');
    } else {
      roomNumber.setCustomValidity('');
    }
    roomNumber.reportValidity();
  };
  capacity.addEventListener(`change`, onRoomNumberCapacityChange);
  roomNumber.addEventListener(`change`, onRoomNumberCapacityChange);

  // Валидация Title
  title.setAttribute('required', 'required');
  const onTitleInput = function () {
    const MIN_TITLE_LENGTH = 30;
    const MAX_TITLE_LENGTH = 100;
    let valueLength = title.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      title.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_TITLE_LENGTH) {
      title.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
    } else {
      title.setCustomValidity('');
    }
    title.reportValidity();
  };
  title.addEventListener('input', onTitleInput);

  // Валидация максимальной цены
  price.setAttribute('max', '1000000');
  price.setAttribute('required', 'required');
  const onPriceInput = function () {
    const MAX_PRICE_VALUE = 1000000;
    if (price.value > MAX_PRICE_VALUE) {
      price.setCustomValidity('Максимальная цена ' + MAX_PRICE_VALUE);
    } else {
      price.setCustomValidity('');
    }
    price.reportValidity();
  };
  price.addEventListener('input', onPriceInput);

  // Валидация тип жилья - цена
  const onTypePriceChange = function () {
    if ((type.value === `bungalow`) && (price.value < 0)) {
      price.setCustomValidity('Для бунгало минимальная цена за ночь 0р');
      price.setAttribute('placeholder', '0');
      price.setAttribute('min', '0');
    } else if ((type.value === `flat`) && (price.value < 1000)) {
      price.setCustomValidity('Для квартиры минимальная цена за ночь 1000р');
      price.setAttribute('placeholder', '1000');
      price.setAttribute('min', '1000');
    } else if ((type.value === `house`) && (price.value < 5000)) {
      price.setCustomValidity('Для дома минимальная цена за ночь 5000р');
      price.setAttribute('placeholder', '5000');
      price.setAttribute('min', '5000');
    } else if ((type.value === `palace`) && (price.value < 10000)) {
      price.setCustomValidity('Для дворца минимальная цена за ночь 10000р');
      price.setAttribute('placeholder', '10000');
      price.setAttribute('min', '10000');
    } else {
      price.setCustomValidity('');
    }
    price.reportValidity();
  };
  price.addEventListener('change', onTypePriceChange);
  type.addEventListener('change', onTypePriceChange);

  // Валидация адреса
  address.setAttribute('readonly', 'readonly');

  // Валидация Время заезда - Время выезда
  const onTimeinChange = function () {
    timeout.value = timein.value;
  };
  const onTimeoutChange = function () {
    timein.value = timeout.value;
  };
  timein.addEventListener('change', onTimeinChange);
  timeout.addEventListener('change', onTimeoutChange);

  // Валидация "Ваша фотография" и "Фотография жилья"
  avatar.setAttribute('accept', 'image/*');
  images.setAttribute('accept', 'image/*');

})();
