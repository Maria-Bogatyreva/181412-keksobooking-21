'use strict';

// Импортируемые данные
const mapPin = window.constant.mapPin;
const deactivateMap = window.map.deactivate;
const onMapPinMousedown = window.map.onMousedown;
const onMapPinEnterPress = window.map.onPinEnterPress;

deactivateMap();
mapPin.addEventListener(`mousedown`, onMapPinMousedown);
mapPin.addEventListener(`keydown`, onMapPinEnterPress);

