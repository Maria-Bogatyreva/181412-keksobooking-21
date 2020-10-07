'use strict';

(function () {
  const PIN_HEIGHT = 70;
  const PIN_WIDTH = 50;

    // Клонирование метки
  const getPin = function (templateObject) {
    const similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

    const pinElement = similarPinTemplate.cloneNode(true);

    pinElement.style.left = templateObject.location.x - (PIN_WIDTH / 2) + 'px';
    pinElement.style.top = templateObject.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = templateObject.author.avatar;
    pinElement.querySelector('img').alt = templateObject.offer.title;

    return pinElement;
  };

  //  Функция для добавления меток на карту - Отрисовка похожих объявлений на карте
  const addPins = function (preparedPins) {
    const similarListPins = document.querySelector('.map__pins');
    const fragment = document.createDocumentFragment();

    preparedPins.forEach(function (element) {
      fragment.appendChild(getPin(element));
    });

    similarListPins.appendChild(fragment);
  };

  window.pin = {
    addPins: addPins
  }

})();
