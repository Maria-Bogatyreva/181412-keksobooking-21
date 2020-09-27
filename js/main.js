'use strict';
const minY = 130;
const maxY = 630;
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
const typeList = ['palace', 'flat', 'house', 'bungalow'];

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

var getPins = function () {
  var pinsArray = [];

  for (var i = 0; i < 8; i++) {
      pinsArray[i] = {
        "author": {
          "avatar": 'img/avatars/user0' + (i + 1) + '.png'
         },
        "offer": {
            "title": 'Уютная студия у метро',
            "address": '600, 350',
            "price": 10000,
            "type": getRandomElement(typeList),
            "rooms": 1,
            "guests": 2,
            "checkin": getRandomElement(checkinOptions),
            "checkout": getRandomElement(checkoutOptions),
            "features": getRandomArray(featuresList),
            "description": 'Хорошая квартира-студия для комфортного проживания',
            "photos": getRandomArray(photosList)
          },
        "location": {
            "x": 2,
            "y": getRandomNumber(minY, maxY)
          }
      } //закончился объект
  } //закончился  цикл
  return pinsArray;
}

console.log(getPins());
/*
{
    "author": {
        "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
    },
    "offer": {
        "title": 'Уютная студия у метро';
        "address": '600, 350';
        "price": 10000;
        "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalow
        "rooms": 1;
        "guests": 2;
        "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
        "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
        "description": 'Хорошая квартира-студия для комфортного проживания',
        "photos": массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
    },
    "location": {
        "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
        "y": случайное число, координата y метки на карте от 130 до 630.
    }
}
*/
