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
      const cardClose = card.querySelector('.popup__close');
      cardClose.addEventListener('click', onCardCloseClick);
      document.addEventListener('keydown', onCardEscPress);
    };
    // Закрытие карточки
    const closeCard = function () {
      const card = map.querySelector('.map__card');
      if (card) {
        const cardClose = card.querySelector('.popup__close');
        map.removeChild(card);
        cardClose.removeEventListener('click', onCardCloseClick);
        document.removeEventListener('keydown', onCardEscPress);
      }
    };

    const onCardCloseClick = function () {
      closeCard();
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

  // Функция, если данные с сервера пришли успешно
    const successHandler =  function(pins) {
      const similarListPins = document.querySelector('.map__pins');
      const fragment = document.createDocumentFragment();

      pins.forEach(function (element) {
        fragment.appendChild(getMark(element));
      });

      similarListPins.appendChild(fragment);
    };

  // Функция, если при загрузке произошла ошибка
  const errorHandler = function (errorMessage) {
    const node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.mark = {
    successHandler: successHandler,
    errorHandler: errorHandler
  };
})();
