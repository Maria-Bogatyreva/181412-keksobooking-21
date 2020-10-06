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

//  Функция для добавления меток на карту - Отрисовка похожих объявлений на карте
const addPins = function (preparedPins) {
  const similarListPins = document.querySelector('.map__pins');
  const fragment = document.createDocumentFragment();

  preparedPins.forEach(function (element) {
    fragment.appendChild(getPin(element));
  });

  similarListPins.appendChild(fragment);
};

const pins = generatePins(AMOUNT_PINS); // Сгененировали массив пинов
//  8. Личный проект: больше деталей (часть 2). Отображение карточки объявления*

const typesListRus = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};
const createCard = function (templateCard) {
  const map = document.querySelector('.map');
  const mapFiltersContainer = map.querySelector('.map__filters-container');
  const similarCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  const cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = templateCard.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = templateCard.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${templateCard.offer.price}₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = typesListRus[templateCard.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${templateCard.offer.rooms} комнаты для ${templateCard.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${templateCard.offer.checkin}, выезд до ${templateCard.offer.checkout}`;
  cardElement.querySelector('.popup__description').textContent = templateCard.offer.description;
  cardElement.querySelector('.popup__avatar').src = templateCard.author.avatar;

  //  Для добавления фото
  if (templateCard.offer.photos.length === 0) {
    cardElement.querySelector(`.popup__photos`).style.display = "none";
  } else {
    const photosBlock = cardElement.querySelector('.popup__photos'); // Блок, куда вставляем фото
    const photoItem = photosBlock.querySelector('.popup__photo'); // Фото
    const photos = templateCard.offer.photos; // Массив вставляемых фото

    photosBlock.innerHTML = '';
    const fragmentPhotos = document.createDocumentFragment();

    photos.forEach(function (element) {
      const copyPhotoItem = photoItem.cloneNode(true);
      copyPhotoItem.src = element;
      fragmentPhotos.appendChild(copyPhotoItem);
    });
    photosBlock.appendChild(fragmentPhotos);
  }
  //  Для добавления удобств
  if (templateCard.offer.photos.length === 0) {
    cardElement.querySelector(`.popup__features`).style.display = "none";
  } else {
    const featuresBlock = cardElement.querySelector('.popup__features'); // Блок с преимуществами
    const featuresItem = featuresBlock.querySelector('.popup__feature'); // Преимущество
    const features = templateCard.offer.features; // Массив вставляемых удобств
    featuresBlock.innerHTML = '';
    const fragmentFeatures = document.createDocumentFragment();

    features.forEach(function (value) {
      const copyFeaturesItem = featuresItem.cloneNode(true);
      copyFeaturesItem.classList.add(`popup__feature--${value}`);
      fragmentFeatures.appendChild(copyFeaturesItem);
    });
    featuresBlock.appendChild(fragmentFeatures);
  }
  map.insertBefore(cardElement, mapFiltersContainer);
};
// createCard(pins[0]);

//  10. Личный проект: доверяй, но проверяй (часть 1). Активация карты. Валидация формы
const mapPin = document.querySelector('.map__pin--main'); // Метка на карте
const MAP_PIN_WIDTH = 65;
const MAP_PIN_HEIGHT = 84;

const mapFilter = document.querySelector('.map__filters-container'); // Фильтр на карте
const adForm = document.querySelector('.ad-form'); // Форма добавления объявления
const inputAdress = adForm.querySelector('#address'); // Адрес в форме

//  Функция для блокировки формы
const blockForm = function (form) {
  const formElements = Array.from(form.children);
  formElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

//  Функция для РАЗблокировки формы
const unblockForm = function (form) {
  const formElements = Array.from(form.children);
  formElements.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
};
//  Функция для получения значения адреса _активной_ карты
const getActiveMapAdressValue = function () {
  const mapPinX = parseInt(mapPin.style.left, 10); // Нач. коорд. X
  const mapPinY = parseInt(mapPin.style.top, 10); // Нач. коорд. Y
  inputAdress.value = `${mapPinX + Math.round(MAP_PIN_WIDTH / 2)}, ${mapPinY + MAP_PIN_HEIGHT}`;
};
//  Функция для получения значения адреса _НЕактивной_ карты
const getDeactiveMapAdressValue = function () {
  const mapPinX = parseInt(mapPin.style.left, 10); // Нач. коорд. X
  const mapPinY = parseInt(mapPin.style.top, 10); // Нач. коорд. Y
  //  Адрес на неактивной карте- коорд. центра КРУГЛОЙ метки
  inputAdress.value = `${mapPinX + Math.round(MAP_PIN_WIDTH / 2)}, ${mapPinY + Math.round(MAP_PIN_WIDTH / 2)}`;
};

// ФУНКЦИЯ ДЛЯ АКТИВАЦИИ СТРАНИЦЫ (и отрисовки похожих объявлений)
const activateMap = function () {
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');

  addPins(pins);

  unblockForm(adForm);
  unblockForm(mapFilter);
  getActiveMapAdressValue();
};

const deactivateMap = function () {
  blockForm(adForm); // Заблокировали форму объявления
  blockForm(mapFilter); // Заблокировали фильтр на карте
  getDeactiveMapAdressValue();
};

//  Функция для включения карты по движению мыши
const onMapPinMousedown = function (evt) {
  if (evt.button === 0) {
    activateMap();
  }
};
//  Функция для включения карты по нажатию Enter
const onMapPinEnterPress = function (evt) {
  if (evt.key === "Enter") {
    activateMap();
  }
};
deactivateMap();
mapPin.addEventListener('mousedown', onMapPinMousedown, {once: true});
mapPin.addEventListener('keydown', onMapPinEnterPress, {once: true});

//  ВАЛИДАЦИЯ ФОРМЫ
const inputRoomNumber = adForm.querySelector('#room_number'); // Количество комнат
const inputCapacity = adForm.querySelector('#capacity'); // Количество гостей

const checkValidityRoomCapasity = function () {
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

inputCapacity.addEventListener(`change`, checkValidityRoomCapasity);
inputRoomNumber.addEventListener(`change`, checkValidityRoomCapasity);
