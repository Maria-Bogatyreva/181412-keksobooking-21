'use strict';

(function () {
  const PIN_HEIGHT = 70;
  const PIN_WIDTH = 50;
  const AMOUNT_MARKS = 5;

  const openCard = window.card.open;
  const closeCard = window.card.close;
  const mapFilter = window.constant.mapFilter;
  const filter = window.sort.filter;
  const debounce = window.debounce.debounce;

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

    const onMarkClick = function () {
      openCard(pin);
    };
    const onMarkEnterClick = function (evt) {
      if (evt.key === 'Enter') {
        openCard(pin);
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

    pins.slice(0, AMOUNT_MARKS).forEach(function (element) {
      fragment.appendChild(getMark(element));
    });

    similarListPins.appendChild(fragment);
  };

  // Функция для удаления меток с карты
  const deleteMarks = function () {
    const marks = document.querySelectorAll('.map__pin');

    marks.forEach(function (element) {
      if (!element.classList.contains('map__pin--main')) {
        element.remove();
      }
    });
  };

  //  Функция ОБНОВЛЕНИЯ меток после сортировки
  const updateMarks = function () {
    deleteMarks();
    addMarks(filter(pins));
    closeCard();
  };

  const onFilterChange = debounce(function () {
    updateMarks();
  });

  mapFilter.addEventListener('change', onFilterChange);

  let pins = []; // Сохраненный после загрузки массив пинов

  // Функция, если данные с сервера пришли успешно
  const successHandler = function (data) {
    pins = data;
    addMarks(data);
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
  };

  window.mark = {
    add: addMarks,
    delete: deleteMarks,
    update: updateMarks,
    successHandler: successHandler,
    errorHandler: errorHandler
  };
})();
