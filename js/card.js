'use strict';

(function () {
  // Отображение карточки объявления (первой)
    const typesListRus = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  const createCard = function (templateCard) {
    const map = document.querySelector('.map');
    const mapFiltersContainer = map.querySelector('.map__filters-container');
    const similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

    const cardElement = similarCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = templateCard.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = templateCard.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = `${templateCard.offer.price}₽/ночь`;
    cardElement.querySelector('.popup__type').textContent = typesListRus[templateCard.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = `${templateCard.offer.rooms} комнаты для ${templateCard.offer.guests} гостей`;
    cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${templateCard.offer.checkin}, выезд до ${templateCard.offer.checkout}`;
    cardElement.querySelector('.popup__description').textContent = templateCard.offer.description;
    cardElement.querySelector('.popup__avatar').src = templateCard.author.avatar;

    //  Для добавления фото
    if (templateCard.offer.photos.length === 0) {
      cardElement.querySelector(`.popup__photos`).style.display = "none";
    } else {
      const photosBlock = cardElement.querySelector('.popup__photos'); // Блок, куда вставляем фото
      const photoItem = photosBlock.querySelector('.popup__photo'); // Фото
      const photos = templateCard.offer.photos; // Массив вставляемых фото

      photosBlock.innerHTML = '';
      const fragmentPhotos = document.createDocumentFragment();

      photos.forEach(function (element) {
        const copyPhotoItem = photoItem.cloneNode(true);
        copyPhotoItem.src = element;
        fragmentPhotos.appendChild(copyPhotoItem);
      });
      photosBlock.appendChild(fragmentPhotos);
    }
    //  Для добавления удобств
    if (templateCard.offer.photos.length === 0) {
      cardElement.querySelector(`.popup__features`).style.display = "none";
    } else {
      const featuresBlock = cardElement.querySelector('.popup__features'); // Блок с преимуществами
      const featuresItem = featuresBlock.querySelector('.popup__feature'); // Преимущество
      const features = templateCard.offer.features; // Массив вставляемых удобств
      featuresBlock.innerHTML = '';
      const fragmentFeatures = document.createDocumentFragment();

      features.forEach(function (value) {
        const copyFeaturesItem = featuresItem.cloneNode(true);
        copyFeaturesItem.classList.add(`popup__feature--${value}`);
        fragmentFeatures.appendChild(copyFeaturesItem);
      });
      featuresBlock.appendChild(fragmentFeatures);
    }
    // map.insertBefore(cardElement, mapFiltersContainer);
  };

  window.card = {
    createCard: createCard
  }


})();
