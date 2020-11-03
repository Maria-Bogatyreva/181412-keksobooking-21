'use strict';

const MIN_Y = 130;
const MAX_Y = 630;
const MIN_X = 0;
const MAX_X = 1200;
const MAP_PIN_WIDTH = 65;
const MAP_PIN_HEIGHT = 84;

const adForm = document.querySelector(`.ad-form`); // Форма добавления объявления
const mapPin = document.querySelector(`.map__pin--main`); // Главная метка на карте
const mapFilter = document.querySelector(`.map__filters`); // Фильтр на карте
const inputAdress = adForm.querySelector(`#address`); // Адрес в форме
const map = document.querySelector(`.map`);

window.constant = {
  adForm,
  MIN_Y,
  MAX_Y,
  MIN_X,
  MAX_X,
  mapPin,
  mapFilter,
  inputAdress,
  map,

  MAP_PIN_WIDTH,
  MAP_PIN_HEIGHT
};
