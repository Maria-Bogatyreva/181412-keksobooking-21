'use strict';
(function () {
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
      const x = window.util.getRandomNumber(MIN_X, MAX_X);
      const y = window.util.getRandomNumber(MIN_Y, MAX_Y);

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
    //map.insertBefore(cardElement, mapFiltersContainer);
  };
  createCard(pins[0]);

  //  10. Личный проект: доверяй, но проверяй (часть 1). Активация карты
  const mapPin = document.querySelector('.map__pin--main'); // Метка на карте
  const MAP_PIN_WIDTH = 65;
  const MAP_PIN_HEIGHT = 84;

  const mapFilter = document.querySelector('.map__filters-container'); // Фильтр на карте
  const inputAdress = window.constant.adForm.querySelector('#address'); // Адрес в форме

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

    unblockForm(window.constant.adForm);
    unblockForm(mapFilter);
    getActiveMapAdressValue();

    mapPin.removeEventListener('mousedown', onMapPinMousedown);
    mapPin.removeEventListener('keydown', onMapPinEnterPress);
  };

  const deactivateMap = function () {
    blockForm(window.constant.adForm); // Заблокировали форму объявления
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
  mapPin.addEventListener('mousedown', onMapPinMousedown);
  mapPin.addEventListener('keydown', onMapPinEnterPress);

})();
