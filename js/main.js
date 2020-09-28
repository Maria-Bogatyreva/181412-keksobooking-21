'use strict';
const minY = 130;
const maxY = 630;
const PIN_HEIGHT = 70;
const PIN_WIDTH = 50;
const amountPins = 8;
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
const typesList = ['palace', 'flat', 'house', 'bungalow'];

const similarListPins = document.querySelector('.map__pins');
const minX = similarListPins.getBoundingClientRect().x;
const maxX = similarListPins.getBoundingClientRect().width;

//Переключение карты из неактивного состояние в активное
document.querySelector('.map').classList.remove('map--faded');

//Функция для получения случайного числа в указанном диапазоне
var getRandomNumber = function (min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

//Функция для получения случайного элемента массива
var getRandomElement = function (elements) {
  return elements[Math.floor(Math.random() * elements.length)];
}

//Функция для получения массива случайной длины
var getRandomArray = function (primaryArray) {
  var randomArray = [];
  var randomLength = Math.floor(Math.random() * primaryArray.length);

  for (var i = 0; i <= randomLength; i++ ) {
    randomArray[i] = primaryArray[i];
  }
  return randomArray;
}
//Клонирование метки
var getPin = function (templateObject) {
  var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = templateObject.location.x - (PIN_WIDTH / 2) + 'px';
  pinElement.style.top = templateObject.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = templateObject.author.avatar;
  pinElement.querySelector('img').alt = templateObject.offer.title;

  return pinElement;
}

//Функция для генерации массива объектов меток
var generatePins = function (amount) {
  var pinsArray = [];

  for (let i = 1; i <= amount; i++) {
    let x = getRandomNumber(minX, maxX);
    let y = getRandomNumber(minY, maxY);

    pinsArray.push({
      "author": {
        "avatar": 'img/avatars/user0' + i + '.png'
       },
      "offer": {
          "title": 'Уютная студия у метро',
          "address": x + ',' + y,
          "price": 10000,
          "type": getRandomElement(typesList),
          "rooms": 1,
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
  return pinsArray;

};
 var pins = generatePins(amountPins);
 console.log(pins);

//Функция для добавления меток в карту
var addPins = function () {
  var fragment = document.createDocumentFragment();

  for (let i = 0; i < 8; i++ ) {
    fragment.appendChild(getPin(pins[i]));
  }
  similarListPins.appendChild(fragment);
}

addPins();
