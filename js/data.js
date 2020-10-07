'use strict';
(function () {
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

  const generatePins = function (amount) {
    const pinsList = [];

    for (let i = 1; i <= amount; i++) {
      const x = window.util.getRandomNumber(window.constant.MIN_X, window.constant.MAX_X);
      const y = window.util.getRandomNumber(window.constant.MIN_Y, window.constant.MAX_Y);

      pinsList.push({
        "author": {
          "avatar": 'img/avatars/user0' + i + '.png'
        },
        "offer": {
          "title": 'Уютная студия у метро',
          "address": x + ',' + y,
          "price": 10000,
          "type": window.util.getRandomElement(typesList),
          "rooms": 2,
          "guests": 2,
          "checkin": window.util.getRandomElement(checkinOptions),
          "checkout": window.util.getRandomElement(checkoutOptions),
          "features": window.util.getRandomArray(featuresList),
          "description": 'Хорошая квартира-студия для комфортного проживания',
          "photos": window.util.getRandomArray(photosList)
        },
        "location": {
          "x": x,
          "y": y
        }
      });
    }
    return pinsList;
  };

window.data = {
  generatePins: generatePins
}


})();
