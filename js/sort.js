'use strict';

(function () {
// Импортируемые данные
  const mapFilter = window.constant.mapFilter;
  const housingType = mapFilter.querySelector('#housing-type');

  //  Функция для фильтрации меток по типу жилья
  const filter = function (pins) {
    let selectedType = housingType.value;
    return pins.filter(function (pin) {
      if (selectedType === 'any') {
        return pins;
      } else {
        return pin.offer.type === selectedType;
      }
    });
  };

  window.sort = {
    filter: filter
  };

})();
