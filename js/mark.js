'use strict';

(function () {
  const PIN_HEIGHT = 70;
  const PIN_WIDTH = 50;
  const map = window.constant.map;

  const createCard = window.card.create;

  // Клонирование метки
  const getMark = function (pin) {
    const similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

    const mark = similarPinTemplate.cloneNode(true);

    mark.style.left = pin.location.x - (PIN_WIDTH / 2) + 'px';
    mark.style.top = pin.location.y - PIN_HEIGHT + 'px';
    mark.querySelector('img').src = pin.author.avatar;
    mark.querySelector('img').alt = pin.offer.title;

    //  Открытие карточки
    const openCard = function () {
      closeCard();
      createCard(pin);
      const card = map.querySelector('.map__card');
      card.querySelector('.popup__close').addEventListener('click', closeCard);
      document.addEventListener('keydown', onCardEscPress);
    };
    // Закрытие карточки
    const closeCard = function () {
      const card = map.querySelector('.map__card');
      if (card) {
        map.removeChild(card);
        mark.removeEventListener('click', onMarkClick);
        mark.removeEventListener('keydown', onMarkEnterClick);
        card.querySelector('.popup__close').removeEventListener('click', closeCard);
        document.removeEventListener('keydown', onCardEscPress);
      }
    };

    const onCardEscPress = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeCard();
      }
    };
    const onMarkClick = function () {
      openCard();
    };
    const onMarkEnterClick = function (evt) {
      if (evt.key === 'Enter') {
        openCard();
      }
    };

    mark.addEventListener('click', onMarkClick);
    mark.addEventListener('keydown', onMarkEnterClick);

    return mark;
  };

  //  Функция для добавления меток на карту
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
