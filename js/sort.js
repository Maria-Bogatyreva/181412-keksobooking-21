'use strict';

(function () {
// Импортируемые данные
  const mapFilter = window.constant.mapFilter;
  const housingType = mapFilter.querySelector('#housing-type'); // Тип жилья
  const housingGuests = mapFilter.querySelector('#housing-guests'); // Количество гостей

  // Функция для фильтрации меток по ТИПУ ЖИЛЬЯ
  const filterByHousingType = function (pin) {
    if (housingType.value === 'any') {
      return true;
    }
    return pin.offer.type === housingType.value;
  };

  // Функция для фильтрация по КОЛИЧЕСТВУ ГОСТЕЙ

  const filterByHousingQuests = function (pin) {
    if (housingGuests.value === 'any') {
      return true;
    }
    return pin.offer.guests === Number(housingGuests.value);
  };




  //  Функция для фильтрации меток по типу жилья
  const filter = function (pins) {
    return pins.filter(filterByHousingQuests)
  };

  window.sort = {
    filter: filter
  };

})();
