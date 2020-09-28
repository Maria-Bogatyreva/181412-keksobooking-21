'use strict';
const MIN_Y = 130;
const MAX_Y = 630;
const MIN_X = 0;
const MAX_X = 1200;
const PIN_HEIGHT = 70;
const PIN_WIDTH = 50;
const AMOUNT_PINS = 8;
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

//Функция для переключения карты из неактивного состояние в активное
const activateMap = function () {
  document.querySelector('.map').classList.remove('map--faded');
};

//Функция для получения случайного числа в указанном диапазоне
const getRandomNumber = function (min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

//Функция для получения случайного элемента массива
const getRandomElement = function (elements) {
  return elements[Math.floor(Math.random() * elements.length)];
}

//Функция для получения массива случайной длины
const getRandomArray = function (primaryElements) {
  //Перетасовываем исходный массив
    let j, temp;
    for(let i = primaryElements.length - 1; i > 0; i--){
      j = Math.floor(Math.random()*(i + 1));
      temp = primaryElements[i];
      primaryElements[i] = primaryElements[j];
      primaryElements[j] = temp;
    }
  //Отрезаем кусок случайной длины
    const randomLengthElements = [];
    const randomLength = Math.floor(Math.random() * primaryElements.length);

    for (let i = 0; i <= randomLength; i++ ) {
    randomLengthElements[i] = primaryElements[i];
  }
  return randomLengthElements;
}

//Клонирование метки
const getPin = function (templateObject) {
  const similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  const pinElement = similarPinTemplate.cloneNode(true);

  pinElement.style.left = templateObject.location.x - (PIN_WIDTH / 2) + 'px';
  pinElement.style.top = templateObject.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = templateObject.author.avatar;
  pinElement.querySelector('img').alt = templateObject.offer.title;

  return pinElement;
}

//Функция для генерации массива объектов меток
const generatePins = function (amount) {
  const pinsArray = [];

  for (let i = 1; i <= amount; i++) {
    let x = getRandomNumber(MIN_X, MAX_X);
    let y = getRandomNumber(MIN_Y, MAX_Y);

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
 const pins = generatePins(AMOUNT_PINS);
 console.log(pins);

//Функция для добавления меток в карту
const addPins = function (arrPins) {
  const similarListPins = document.querySelector('.map__pins');
  const fragment = document.createDocumentFragment();

  arrPins.forEach(function (element) {
    fragment.appendChild(getPin(element));
  });

  similarListPins.appendChild(fragment);

  activateMap();
}

addPins(pins);
