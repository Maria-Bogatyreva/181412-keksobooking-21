'use strict';
(function () {

  const AMOUNT_PINS = 8;

  const pins = window.data.generatePins(AMOUNT_PINS); // Сгенерировали массив пинов

  window.card.createCard(pins[0]); // Отображение на карте карточки объявления (первой)

  window.map.deactivateMap();

  window.constant.mapPin.addEventListener('mousedown', window.map.onMapPinMousedown);
  window.constant.mapPin.addEventListener('keydown', window.map.onMapPinEnterPress);




})();
