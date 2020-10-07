'use strict';
(function () {
  window.card.createCard(window.data.pins[0]); // Отображение на карте карточки объявления (первой)
  window.map.deactivateMap();
  window.constant.mapPin.addEventListener('mousedown', window.map.onMapPinMousedown);
  window.constant.mapPin.addEventListener('keydown', window.map.onMapPinEnterPress);
})();
