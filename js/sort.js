'use strict';

(function () {
// Импортируемые данные
  const mapFilter = window.constant.mapFilter;
  const housingType = mapFilter.querySelector('#housing-type'); // Тип жилья
  const housingGuests = mapFilter.querySelector('#housing-guests'); // Количество гостей
  const housingRooms = mapFilter.querySelector('#housing-rooms'); // Количество комнат
  const housingPrice = mapFilter.querySelector('#housing-price'); // Цена

  // Функция для фильтрации меток по ТИПУ ЖИЛЬЯ
  const filterByHousingType = function (pin) {
    if (housingType.value === 'any') {
      return true;
    }
    return pin.offer.type === housingType.value;
  };

  // Функция для фильтрации по КОЛИЧЕСТВУ ГОСТЕЙ
  const filterByHousingQuests = function (pin) {
    if (housingGuests.value === 'any') {
      return true;
    }
    return pin.offer.guests === Number(housingGuests.value);
  };

  //  Функция для фильтрации по КОЛИЧЕСТВУ КОМНАТ
  const filterByHousingRooms = function (pin) {
    if (housingRooms.value === 'any') {
      return true;
    }
    return pin.offer.rooms === Number(housingRooms.value);
  };

  //  Функция для фильтрации по ЦЕНЕ
  const filterbyHousingPrice = function (pin) {
    if (housingPrice.value === 'any') {
      return true;
    }
    if (housingPrice.value === 'low') {
      return pin.offer.price < 10000;
    }
    if (housingPrice.value === 'middle') {
      return pin.offer.price > 10000 && pin.offer.price < 50000;
    }
    if (housingPrice.value === "high") {
      return pin.offer.price > 50000;
    }
  };



  //  Функция для фильтрации по ВСЕМУ
  const filter = function (pins) {
    let filteredPins = [];

    pins.forEach((pin) => {
      if (filterByHousingType(pin)
        && filterByHousingRooms(pin)
        && filterByHousingQuests(pin)
        && filterbyHousingPrice(pin)

        ) {

        filteredPins.push(pin);
      }
    });
    return filteredPins;
  };

  window.sort = {
    filter: filter
  };

})();
