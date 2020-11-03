'use strict';

// Импортируемые данные
const mapFilter = window.constant.mapFilter;
const housingType = mapFilter.querySelector(`#housing-type`);
const housingGuests = mapFilter.querySelector(`#housing-guests`);
const housingRooms = mapFilter.querySelector(`#housing-rooms`);
const housingPrice = mapFilter.querySelector(`#housing-price`);
const housingFeatures = mapFilter.querySelector(`#housing-features`);

// Функция для фильтрации меток по ТИПУ ЖИЛЬЯ
const filterByHousingType = (pin) => {
  if (housingType.value === `any`) {
    return true;
  }
  return pin.offer.type === housingType.value;
};

// Функция для фильтрации по КОЛИЧЕСТВУ ГОСТЕЙ
const filterByHousingQuests = (pin) => {
  if (housingGuests.value === `any`) {
    return true;
  }
  return pin.offer.guests === Number(housingGuests.value);
};

//  Функция для фильтрации по КОЛИЧЕСТВУ КОМНАТ
const filterByHousingRooms = (pin) => {
  if (housingRooms.value === `any`) {
    return true;
  }
  return pin.offer.rooms === Number(housingRooms.value);
};

//  Функция для фильтрации по ЦЕНЕ
const filterbyHousingPrice = (pin) => {
  const lowPrice = 10000;
  const highPrice = 50000;
  if (housingPrice.value === `any`) {
    return true;
  }
  if (housingPrice.value === `low`) {
    return pin.offer.price < lowPrice;
  }
  if (housingPrice.value === `middle`) {
    return pin.offer.price > lowPrice && pin.offer.price < highPrice;
  }
  return pin.offer.price > highPrice;
};

// Функция для фильтрации по УДОБСТВАМ
const filterByFeatures = (pin) => {
  const checkedFeatures = housingFeatures.querySelectorAll(`.map__checkbox:checked`);

  return Array.from(checkedFeatures).every(function (checkedFeature) {
    return (pin.offer.features.includes(checkedFeature.value));
  });
};

//  Функция для фильтрации по ВСЕМУ
const filter = (pins) => {
  let filteredPins = [];

  pins.forEach(function (pin) {
    if (filterByHousingType(pin)
      && filterByHousingRooms(pin)
      && filterByHousingQuests(pin)
      && filterbyHousingPrice(pin)
      && filterByFeatures(pin)

    ) {

      filteredPins.push(pin);
    }
  });
  return filteredPins;
};

window.filter = filter;
