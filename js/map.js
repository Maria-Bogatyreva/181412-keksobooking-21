'use strict';

// Импортируемые данные
const MAP_PIN_WIDTH = window.constant.MAP_PIN_WIDTH;
const MAP_PIN_HEIGHT = window.constant.MAP_PIN_HEIGHT;
const mapPin = window.constant.mapPin;
const adForm = window.constant.adForm;
const mapFilter = window.constant.mapFilter;
const onMousedown = window.move.onMousedown;
const inputAdress = window.constant.inputAdress;
const load = window.backend.load;
const successHandler = window.mark.successHandler;
const errorHandler = window.mark.errorHandler;

const mapPinPosition = {
  x: mapPin.offsetLeft,
  y: mapPin.offsetTop
};

//  Функция для блокировки формы
const blockForm = (form) => {
  const formElements = Array.from(form.children);
  formElements.forEach((element) => {
    element.setAttribute(`disabled`, `disabled`);
  });
};

//  Функция для РАЗблокировки формы
const unblockForm = (form) => {
  const formElements = Array.from(form.children);
  formElements.forEach((element) => {
    element.removeAttribute(`disabled`, `disabled`);
  });
};
//  Функция для получения значения адреса _активной_ карты
const getActiveMapAdressValue = () => {
  const mapPinX = parseInt(mapPin.style.left, 10);
  const mapPinY = parseInt(mapPin.style.top, 10);
  inputAdress.value = `${mapPinX + Math.round(MAP_PIN_WIDTH / 2)}, ${mapPinY + MAP_PIN_HEIGHT}`;
};
//  Функция для получения значения адреса _НЕактивной_ карты
const getDeactiveMapAdressValue = () => {
  const mapPinX = parseInt(mapPin.style.left, 10);
  const mapPinY = parseInt(mapPin.style.top, 10);

  inputAdress.value = `${mapPinX + Math.round(MAP_PIN_WIDTH / 2)}, ${mapPinY + Math.round(MAP_PIN_WIDTH / 2)}`;
};

// ФУНКЦИЯ ДЛЯ АКТИВАЦИИ СТРАНИЦЫ
const activateMap = () => {
  document.querySelector(`.map`).classList.remove(`map--faded`);
  document.querySelector(`.ad-form`).classList.remove(`ad-form--disabled`);

  load(successHandler, errorHandler);

  unblockForm(adForm);
  unblockForm(mapFilter);
  getActiveMapAdressValue();

  mapPin.removeEventListener(`mousedown`, onMapPinMousedown);
  mapPin.removeEventListener(`keydown`, onMapPinEnterPress);
  mapPin.addEventListener(`mousedown`, onMousedown);
};

//  ФУНКЦИЯ ДЛЯ ДЕАКТИВАЦИИ СТРАНИЦЫ
const deactivateMap = () => {
  document.querySelector(`.map`).classList.add(`map--faded`);
  document.querySelector(`.ad-form`).classList.add(`ad-form--disabled`);

  blockForm(adForm);
  blockForm(mapFilter);

  mapPin.addEventListener(`mousedown`, onMapPinMousedown);
  mapPin.addEventListener(`keydown`, onMapPinEnterPress);

  mapPin.style.left = mapPinPosition.x + `px`;
  mapPin.style.top = mapPinPosition.y + `px`;

  getDeactiveMapAdressValue();
};

//  Функция для включения карты по движению мыши
const onMapPinMousedown = (evt) => {
  if (evt.button === 0) {
    activateMap();
  }
};
//  Функция для включения карты по нажатию Enter
const onMapPinEnterPress = (evt) => {
  if (evt.key === `Enter`) {
    activateMap();
  }
};

window.map = {
  deactivate: deactivateMap,
  onMousedown: onMapPinMousedown,
  onEnterPress: onMapPinEnterPress,
  inputAdress
};

