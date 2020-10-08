'use strict';
(function () {
  const adForm = document.querySelector('.ad-form'); // Форма добавления объявления
  const mapPin = document.querySelector('.map__pin--main'); // Главная метка на карте
  const mapFilter = document.querySelector('.map__filters-container'); // Фильтр на карте
  const MIN_Y = 130;
  const MAX_Y = 630;
  const MIN_X = 0;
  const MAX_X = 1200;

  window.constant = {
    adForm: adForm,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,
    MIN_X: MIN_X,
    MAX_X: MAX_X,
    mapPin: mapPin,
    mapFilter: mapFilter
  };
})();