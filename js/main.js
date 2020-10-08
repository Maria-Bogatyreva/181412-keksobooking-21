'use strict';
(function () {
  // Импортируемые данные
  const pins = window.data.pins;
  const mapPin = window.constant.mapPin;
  const createCard = window.card.createCard;
  const deactivateMap = window.map.deactivateMap;
  const onMapPinMousedown = window.map.onMapPinMousedown;
  const onMapPinEnterPress = window.map.onMapPinEnterPress;



  createCard(pins[0]); // Отображение на карте карточки объявления (первой)
  deactivateMap();
  mapPin.addEventListener('mousedown', onMapPinMousedown);
  mapPin.addEventListener('keydown', onMapPinEnterPress);
})();
