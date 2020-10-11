'use strict';

(function () {
  const PIN_HEIGHT = 70;
  const PIN_WIDTH = 50;

  // Клонирование метки
  const getMark = function (pin) {
    const similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

    const pinElement = similarPinTemplate.cloneNode(true);

    pinElement.style.left = pin.location.x - (PIN_WIDTH / 2) + 'px';
    pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;

    return pinElement;
  };

  //  Функция для добавления меток на карту - Отрисовка похожих объявлений на карте
  const addMarks = function (pins) {
    const similarListPins = document.querySelector('.map__pins');
    const fragment = document.createDocumentFragment();

    pins.forEach(function (element) {
      fragment.appendChild(getMark(element));
    });

    similarListPins.appendChild(fragment);
  };

  window.mark = {
    add: addMarks
  };
})();
