'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

// Импортируемые данные
const address = window.constant.inputAdress;
const adForm = window.constant.adForm;

const roomNumber = adForm.querySelector(`#room_number`);
const capacity = adForm.querySelector(`#capacity`);
const title = adForm.querySelector(`#title`);
const price = adForm.querySelector(`#price`);
const type = adForm.querySelector(`#type`);
const timein = adForm.querySelector(`#timein`);
const timeout = adForm.querySelector(`#timeout`);
const images = adForm.querySelector(`#images`);
const avatar = adForm.querySelector(`.ad-form__field input[type=file]`);
const avatarPreview = adForm.querySelector(`.ad-form-header__preview img`);
const defaultAvatarUrl = `img/muffin-grey.svg`;
const imagesPreview = adForm.querySelector(`.ad-form__photo`);

// Валидация количество комнат - количество гостей
const onRoomNumberCapacityChange = () => {
  if ((roomNumber.value === `1`) && (capacity.value !== `1`)) {
    roomNumber.setCustomValidity(`1 комната только для 1 гостя`);
  } else if ((roomNumber.value === `2`) && ((capacity.value === `3`) || (capacity.value === `0`))) {
    roomNumber.setCustomValidity(`Для 2 и менее гостей`);
  } else if ((roomNumber.value === `3`) && (capacity.value === `0`)) {
    roomNumber.setCustomValidity(`Для 3 или менее гостей`);
  } else if ((roomNumber.value === `100`) && (capacity.value !== `0`)) {
    roomNumber.setCustomValidity(`Не для гостей`);
  } else {
    roomNumber.setCustomValidity(``);
  }
  roomNumber.reportValidity();
};
capacity.addEventListener(`change`, onRoomNumberCapacityChange);
roomNumber.addEventListener(`change`, onRoomNumberCapacityChange);

// Валидация Title
title.setAttribute(`required`, `required`);
const onTitleInput = () => {
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  let valueLength = title.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    title.setCustomValidity(`Ещё ` + (MIN_TITLE_LENGTH - valueLength) + ` симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    title.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_TITLE_LENGTH) + ` симв.`);
  } else {
    title.setCustomValidity(``);
  }
  title.reportValidity();
};
title.addEventListener(`input`, onTitleInput);

// Валидация максимальной цены
price.setAttribute(`max`, `1000000`);
price.setAttribute(`required`, `required`);
const onPriceInput = () => {
  const MAX_PRICE_VALUE = 1000000;
  if (price.value > MAX_PRICE_VALUE) {
    price.setCustomValidity(`Максимальная цена ` + MAX_PRICE_VALUE);
  } else {
    price.setCustomValidity(``);
  }
  price.reportValidity();
};
price.addEventListener(`input`, onPriceInput);

// Валидация тип жилья - цена
const onTypePriceChange = () => {
  const PRICES = {
    low: 1000,
    middle: 5000,
    high: 10000
  };

  if ((type.value === `bungalow`) && (price.value < 0)) {
    price.setCustomValidity(`Для бунгало минимальная цена за ночь 0р`);
    price.setAttribute(`placeholder`, `0`);
    price.setAttribute(`min`, `0`);
  } else if ((type.value === `flat`) && (price.value < PRICES.low)) {
    price.setCustomValidity(`Для квартиры минимальная цена за ночь 1000р`);
    price.setAttribute(`placeholder`, `1000`);
    price.setAttribute(`min`, `1000`);
  } else if ((type.value === `house`) && (price.value < PRICES.middle)) {
    price.setCustomValidity(`Для дома минимальная цена за ночь 5000р`);
    price.setAttribute(`placeholder`, `5000`);
    price.setAttribute(`min`, `5000`);
  } else if ((type.value === `palace`) && (price.value < PRICES.high)) {
    price.setCustomValidity(`Для дворца минимальная цена за ночь 10000р`);
    price.setAttribute(`placeholder`, `10000`);
    price.setAttribute(`min`, `10000`);
  } else {
    price.setCustomValidity(``);
  }
  price.reportValidity();
};
price.addEventListener(`change`, onTypePriceChange);
type.addEventListener(`change`, onTypePriceChange);

// Валидация адреса
address.setAttribute(`readonly`, `readonly`);

// Валидация Время заезда - Время выезда
const onTimeinChange = () => {
  timeout.value = timein.value;
};
const onTimeoutChange = () => {
  timein.value = timeout.value;
};
timein.addEventListener(`change`, onTimeinChange);
timeout.addEventListener(`change`, onTimeoutChange);

// Валидация "Ваша фотография"
avatar.setAttribute(`accept`, `image/*`);

const onAvatarLoad = () => {
  const file = avatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

avatar.addEventListener(`change`, onAvatarLoad);

// Валидация "Фотография жилья"
images.setAttribute(`accept`, `image/*`);

const onImagesLoad = () => {
  const file = images.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      const imagePreview = document.createElement(`img`);

      imagesPreview.innerHTML = ``;
      imagePreview.src = reader.result;
      imagePreview.classList.add(`ad-form__photo-preview`);
      imagesPreview.append(imagePreview);
    });
    reader.readAsDataURL(file);
  }
};

images.addEventListener(`change`, onImagesLoad);

window.validate = {
  avatarPreview,
  imagesPreview,
  defaultAvatarUrl
};
