'use strict';

// Импортируемые данные
const map = window.constant.map;

const typesListRus = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`
};

const createCard = (templateCard) => {
  const mapFiltersContainer = map.querySelector(`.map__filters-container`);
  const similarCardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);

  const cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector(`.popup__title`).textContent = templateCard.offer.title;
  cardElement.querySelector(`.popup__text--address`).textContent = templateCard.offer.address;
  cardElement.querySelector(`.popup__text--price`).textContent = `${templateCard.offer.price}₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = typesListRus[templateCard.offer.type];
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${templateCard.offer.rooms} комнаты для ${templateCard.offer.guests} гостей`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${templateCard.offer.checkin}, выезд до ${templateCard.offer.checkout}`;
  cardElement.querySelector(`.popup__description`).textContent = templateCard.offer.description;
  cardElement.querySelector(`.popup__avatar`).src = templateCard.author.avatar;

  if (templateCard.offer.photos.length === 0) {
    cardElement.querySelector(`.popup__photos`).style.display = `none`;
  } else {
    const photosBlock = cardElement.querySelector(`.popup__photos`);
    const photoItem = photosBlock.querySelector(`.popup__photo`);
    const photos = templateCard.offer.photos;

    photosBlock.innerHTML = ``;
    const fragmentPhotos = document.createDocumentFragment();

    photos.forEach((element) => {
      const copyPhotoItem = photoItem.cloneNode(true);
      copyPhotoItem.src = element;
      fragmentPhotos.appendChild(copyPhotoItem);
    });
    photosBlock.appendChild(fragmentPhotos);
  }

  if (templateCard.offer.photos.length === 0) {
    cardElement.querySelector(`.popup__features`).style.display = `none`;
  } else {
    const featuresBlock = cardElement.querySelector(`.popup__features`);
    const featuresItem = featuresBlock.querySelector(`.popup__feature`);
    const features = templateCard.offer.features;
    featuresBlock.innerHTML = ``;
    const fragmentFeatures = document.createDocumentFragment();

    features.forEach((value) => {
      const copyFeaturesItem = featuresItem.cloneNode(true);
      copyFeaturesItem.classList.add(`popup__feature--${value}`);
      fragmentFeatures.appendChild(copyFeaturesItem);
    });
    featuresBlock.appendChild(fragmentFeatures);
  }
  map.insertBefore(cardElement, mapFiltersContainer);
};
  //  Открытие карточки
const openCard = (pin) => {
  closeCard();
  createCard(pin);

  const card = map.querySelector(`.map__card`);
  const cardClose = card.querySelector(`.popup__close`);
  cardClose.addEventListener(`click`, onCardCloseClick);
  document.addEventListener(`keydown`, onCardEscPress);
};

// Закрытие карточки
const closeCard = () => {
  const card = map.querySelector(`.map__card`);
  if (card) {
    const cardClose = card.querySelector(`.popup__close`);
    map.removeChild(card);
    cardClose.removeEventListener(`click`, onCardCloseClick);
    document.removeEventListener(`keydown`, onCardEscPress);
  }

};

const onCardCloseClick = () => {
  closeCard();
  map.querySelector(`.map__pin--active`).classList.remove(`map__pin--active`);
};

const onCardEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeCard();
    map.querySelector(`.map__pin--active`).classList.remove(`map__pin--active`);
  }
};

window.card = {
  create: createCard,
  open: openCard,
  close: closeCard
};

