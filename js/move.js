'use strict';

const MAP_PIN_WIDTH = window.constant.MAP_PIN_WIDTH;
const MAP_PIN_HEIGHT = window.constant.MAP_PIN_HEIGHT;
const MIN_Y = window.constant.MIN_Y;
const MAX_Y = window.constant.MAX_Y;
const MIN_X = window.constant.MIN_X;
const MAX_X = window.constant.MAX_X;
const mapPin = window.constant.mapPin;
const inputAdress = window.constant.inputAdress;

const onMousedown = (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if ((mapPin.offsetTop - shift.y) < (MIN_Y - MAP_PIN_HEIGHT)) {
      mapPin.style.top = (MIN_Y - MAP_PIN_HEIGHT) + `px`;
    } else if (((mapPin.offsetTop - shift.y) > (MAX_Y - MAP_PIN_HEIGHT))) {
      mapPin.style.top = (MAX_Y - MAP_PIN_HEIGHT) + `px`;
    } else {
      mapPin.style.top = (mapPin.offsetTop - shift.y) + `px`;
    }

    if ((mapPin.offsetLeft - shift.x) < (MIN_X - Math.round(MAP_PIN_WIDTH / 2))) {
      mapPin.style.left = (MIN_X - Math.round(MAP_PIN_WIDTH / 2)) + `px`;
    } else if (((mapPin.offsetLeft - shift.x) > (MAX_X - Math.round(MAP_PIN_WIDTH / 2)))) {
      mapPin.style.left = (MAX_X - Math.round(MAP_PIN_WIDTH / 2)) + `px`;
    } else {
      mapPin.style.left = (mapPin.offsetLeft - shift.x) + `px`;
    }

    inputAdress.value = `${(parseInt(mapPin.style.left, 10)) + Math.round(MAP_PIN_WIDTH / 2)}, ${(parseInt(mapPin.style.top, 10)) + MAP_PIN_HEIGHT}`;
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};

window.move = {
  onMousedown
};
