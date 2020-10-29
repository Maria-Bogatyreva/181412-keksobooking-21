'use strict';

const PIN_HEIGHT = 70;
const PIN_WIDTH = 50;
const AMOUNT_MARKS = 5;

const map = window.constant.map;
const openCard = window.card.open;
const closeCard = window.card.close;
const mapFilter = window.constant.mapFilter;
const filter = window.sort.filter;
const debounce = window.debounce;

// Клонирование метки
const getMark = function (pin) {
  if (pin.offer !== undefined) {
    const similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

    const mark = similarPinTemplate.cloneNode(true);

    mark.style.left = pin.location.x - (PIN_WIDTH / 2) + 'px';
    mark.style.top = pin.location.y - PIN_HEIGHT + 'px';
    mark.querySelector('img').src = pin.author.avatar;
    mark.querySelector('img').alt = pin.offer.title;

    const onMarkClick = function () {
      let activeMark = map.querySelector('.map__pin--active');

      if (activeMark) {
        activeMark.classList.remove('map__pin--active');
      }

      openCard(pin);
      mark.classList.add('map__pin--active');
    };
    const onMarkEnterClick = function (evt) {
      if (evt.key === 'Enter') {
        openCard(pin);
        mark.classList.add('map__pin--active');
      }
    };

    mark.addEventListener('click', onMarkClick);
    mark.addEventListener('keydown', onMarkEnterClick);

    return mark;
  } return false;
};

//  Функция для добавления меток на карту
const addMarks = function (pins) {
  const similarListPins = document.querySelector('.map__pins');
  const fragment = document.createDocumentFragment();

  let count = (AMOUNT_MARKS < pins.length) ? AMOUNT_MARKS : pins.length;

  pins.slice(0, count).forEach(function (element) {
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
