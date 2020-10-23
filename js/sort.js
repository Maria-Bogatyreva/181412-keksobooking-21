'use strict';

(function () {
// Импортируемые данные
  const mapFilter = window.constant.mapFilter;
  const housingType = mapFilter.querySelector('#housing-type');

  // Функия для фильтрации меток по ТИПУ ЖИЛЬЯ
  const filterByHousingType = function (pin) {
    if (housingType.value === 'any') {
      return true;
    }
    return pin.offer.type === housingType.value;
  };


  //  Функция для фильтрации меток по типу жилья
  const filter = function (pins) {
    return pins.filter(filterByHousingType)
  };

  window.sort = {
    filter: filter
  };

})();
