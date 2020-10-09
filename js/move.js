'use strict';
(function () {

  const MAP_PIN_WIDTH = 65;
  const MAP_PIN_HEIGHT = 84;
  const MIN_Y = window.constant.MIN_Y;
  const MAX_Y = window.constant.MAX_Y;
  const MIN_X = window.constant.MIN_X;
  const MAX_X = window.constant.MAX_Y;
  const mapPin = window.constant.mapPin;
  const inputAdress = window.map.inputAdress;

  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };


      // Ограничиваем передвижение

      if ((mapPin.offsetTop - shift.y) <= 130) {
        mapPin.style.top = 130 + 'px';
      } else {
        mapPin.style.top = (mapPin.offsetTop - shift.y) + 'px';
      }


      // mapPin.style.top = (mapPin.offsetTop - shift.y) + 'px'; // верх, от 130 до 630
      mapPin.style.left = (mapPin.offsetLeft - shift.x) + 'px'; // горизонталь от 0 до 1200





    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      inputAdress.value = `${(parseInt(mapPin.style.left, 10)) + Math.round(MAP_PIN_WIDTH / 2)}, ${(parseInt(mapPin.style.top, 10)) + MAP_PIN_HEIGHT}`;

      document.removeEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

