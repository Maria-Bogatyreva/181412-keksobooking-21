'use strict';
(function () {
  // Импортируемые данные
  const pins = window.data.pins;
  const mapPin = window.constant.mapPin;
  const createCard = window.card.create;
  const deactivateMap = window.map.deactivate;
  const onMapPinMousedown = window.map.onMousedown;
  const onMapPinEnterPress = window.map.onPinEnterPress;


  createCard(pins[0]); // Отображение на карте карточки объявления (первой)
  deactivateMap();
  mapPin.addEventListener('mousedown', onMapPinMousedown);
  mapPin.addEventListener('keydown', onMapPinEnterPress);
})();
