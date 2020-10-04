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

// Функция для получения случайного числа в указанном диапазоне
const getRandomNumber = function (min, max) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

// Функция для получения случайного элемента массива
const getRandomElement = function (elements) {
  return elements[Math.floor(Math.random() * elements.length)];
};

// Функция для получения массива случайной длины
const getRandomArray = function (primaryElements) {
  // Клонируем исходный массив
  const copyElements = primaryElements.slice();
  // Перетасовываем клон-массив
  let j;
  let temp;
  for (let i = copyElements.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = copyElements[i];
    copyElements[i] = copyElements[j];
    copyElements[j] = temp;
  }
  //  Отрезаем кусок случайной длины
  return copyElements.slice(getRandomNumber(0, copyElements.length));
};

// Клонирование метки
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
};

// Функция для генерации массива объектов меток
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
  return pinsList;
};

// Функция для добавления меток на карту - Отрисовка похожих объявлений на карте
const addPins = function (preparedPins) {
  const similarListPins = document.querySelector('.map__pins');
  const fragment = document.createDocumentFragment();

  preparedPins.forEach(function (element) {
    fragment.appendChild(getPin(element));
  });

  similarListPins.appendChild(fragment);
};
// Функция активации карты (и отрисовки похожих объявлений)
const activateMap = function (elements) {
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  addPins(elements);
};

const pins = generatePins(AMOUNT_PINS);
// Функция активирует карту и отрисовывает похожие объвления на карте
// activateMap(pins);


//ЗАДАНИЕ 10
const mapPin = document.querySelector('.map__pin--main'); // Метка на карте
const MAP_PIN_WIDTH = 65;
const MAP_PIN_HEIGHT = 84;
const MAP_PIN_X = parseInt(mapPin.style.left, 10); // Нач. коорд. X
const MAP_PIN_Y = parseInt(mapPin.style.top, 10); // Нач. коорд. Y

const mapFilter = document.querySelector ('.map__filters-container'); // Фильтр на карте
const adForm = document.querySelector('.ad-form'); // Форма добавления объявления
const inputAdress = adForm.querySelector('#address'); // Адрес в форме

//  Функция для блокировки формы
const blockForm = function (form, classFormElements) {
  const formElements = form.querySelectorAll(classFormElements);
  formElements.forEach((element) => {
  element.setAttribute('disabled', 'disabled')
  });
};

//  Функция для разблокировки формы
const unblockForm = function (form, classFormElements) {
  const formElements = form.querySelectorAll(classFormElements);
  formElements.forEach((element) => {
  element.removeAttribute('disabled', 'disabled')
  });
};
//  Функция для получения значения адреса
const getInitialAdressValue = function () {
  inputAdress.value = `${MAP_PIN_X + Math.round(MAP_PIN_WIDTH / 2)}, ${MAP_PIN_Y + MAP_PIN_HEIGHT}`;
}

blockForm(adForm,'.ad-form__element'); //Заблокировали форму объявления
blockForm(mapFilter, 'select'); // Заблокировали фильтр на карте

//  Адрес на неактивной карте- коорд. центра КРУГЛОЙ метки
inputAdress.value = `${MAP_PIN_X + Math.round(MAP_PIN_WIDTH / 2)}, ${MAP_PIN_Y + Math.round(MAP_PIN_WIDTH / 2)}`;

//  Активация страницы
mapPin.addEventListener('mousedown', function () {
  if (event.button === 0) {
    activateMap(pins);
    unblockForm(adForm,'.ad-form__element');
    unblockForm(mapFilter, 'select');
    getInitialAdressValue();
  }
});

mapPin.addEventListener('keydown', function (evt) {
  if (evt.key === "Enter") {
    activateMap(pins);
    unblockForm(adForm,'.ad-form__element');
    unblockForm(mapFilter, 'select');
    getInitialAdressValue()
  }
});

