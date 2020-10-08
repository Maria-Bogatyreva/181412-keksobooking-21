'use strict';

(function () {
  // Импортируемые данные
  const mapPin = window.constant.mapPin;
  const adForm = window.constant.adForm;
  const mapFilter = window.constant.mapFilter;
  const addPins = window.pin.addPins;
  const pins = window.data.pins;


  const MAP_PIN_WIDTH = 65;
  const MAP_PIN_HEIGHT = 84;
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

    mapPin.removeEventListener('mousedown', onMapPinMousedown);
    mapPin.removeEventListener('keydown', onMapPinEnterPress);
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

  window.map = {
    deactivateMap: deactivateMap,
    onMapPinMousedown: onMapPinMousedown,
    onMapPinEnterPress: onMapPinEnterPress
  };
})();