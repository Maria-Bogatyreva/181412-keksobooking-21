'use strict';
(function () {
  // Импортируемые данные
  const getRandomNumber = window.util.getRandomNumber;
  const getRandomElement = window.util.getRandomElement;
  const getRandomArray = window.util.getRandomArray;
  const MIN_X = window.constant.MIN_X;
  const MAX_X = window.constant.MAX_X;
  const MIN_Y = window.constant.MIN_Y;
  const MAX_Y = window.constant.MAX_Y;

  // Функция для генерации массива объектов меток
  const typesList = ['palace', 'flat', 'house', 'bungalow'];
  const checkinOptions = ['12:00', '13:00', '14:00'];
  const checkoutOptions = ['12:00', '13:00', '14:00'];
  const featuresList = [
    "wifi",
    "dishwasher",
    "parking",
    "washer",
    "elevator",
    "conditioner",
  ];
  const photosList = [
    "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
    "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
    "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
  ];
  const AMOUNT_PINS = 8;

  const generatePins = function (amount) {
    const pinsList = [];

    for (let i = 1; i <= amount; i++) {
      const x = getRandomNumber(MIN_X, MAX_X);
      const y = getRandomNumber(MIN_Y, MAX_Y);

      pinsList.push({
        "author": {
          "avatar": 'img/avatars/user0' + i + '.png'
        },
        "offer": {
          "title": 'Уютная студия у метро',
          "address": x + ',' + y,
          "price": 10000,
          "type": getRandomElement(typesList),
          "rooms": 2,
          "guests": 2,
          "checkin": getRandomElement(checkinOptions),
          "checkout": getRandomElement(checkoutOptions),
          "features": getRandomArray(featuresList),
          "description": 'Хорошая квартира-студия для комфортного проживания',
          "photos": getRandomArray(photosList)
        },
        "location": {
          "x": x,
          "y": y
        }
      });
    }
    return pinsList;
  };
  const pins = generatePins(AMOUNT_PINS); // Сгенерировали массив пинов


  window.data = {
    pins: pins
  };


})();
