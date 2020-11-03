'use strict';

const adForm = window.constant.adForm;
const deactivateMap = window.map.deactivate;
const save = window.backend.save;
const deleteMarks = window.mark.delete;
const closeCard = window.card.close;
const avatarPreview = window.validate.avatarPreview;
const imagesPreview = window.validate.imagesPreview;
const defaultAvatarUrl = window.validate.defaultAvatarUrl;

// Успешное сообщение
const successNoticeTemplate = document.querySelector(`#success`)
.content
.querySelector(`.success`);
const successNotice = successNoticeTemplate.cloneNode(true);

// Ошибочное сообщение
const errorNoticeTemplate = document.querySelector(`#error`)
.content
.querySelector(`.error`);
const errorNotice = errorNoticeTemplate.cloneNode(true);

// Действия при нажатии Esc на сообщении
const onNoticeEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    if (successNotice) {
      successNotice.remove();
    }
    if (errorNotice) {
      errorNotice.remove();
    }
  }
};

// Функция для показа ошибочного объявления
const showErrorNotice = () => {
  document.querySelector(`main`).insertAdjacentElement(`afterbegin`, errorNotice);

  document.addEventListener(`keydown`, onNoticeEscPress);
  document.addEventListener(`click`, hideErrorNotice);
  errorNotice.querySelector(`.error__button`).addEventListener(`click`, hideErrorNotice);
};

// Функция для скрытия ошибочного объявления
const hideErrorNotice = () => {
  errorNotice.remove();

  document.removeEventListener(`keydown`, onNoticeEscPress);
  document.removeEventListener(`click`, hideErrorNotice);
  errorNotice.querySelector(`.error__button`).removeEventListener(`click`, hideErrorNotice);
};

// Функция для показа успешного объявления
const showSuccessNotice = () => {
  document.body.insertAdjacentElement(`afterbegin`, successNotice);

  document.addEventListener(`keydown`, onNoticeEscPress);
  document.addEventListener(`click`, hideSuccessNotice);
};

// Функция для скрытия успешного объявления
const hideSuccessNotice = () => {
  successNotice.remove();
  document.removeEventListener(`keydown`, onNoticeEscPress);
  document.removeEventListener(`click`, hideSuccessNotice);
};


const resetForm = () => {
  avatarPreview.src = defaultAvatarUrl;
  imagesPreview.innerHTML = ``;
  adForm.reset();
  deleteMarks();
  closeCard();
  deactivateMap();
};

const saveHandler = () => {
  resetForm();
  showSuccessNotice();
};

const errorHandler = () => {
  closeCard();
  showErrorNotice();
};

const submitHandler = (evt) => {
  evt.preventDefault();
  save(saveHandler, errorHandler, new FormData(adForm));
};
//  ОТПРАВКА ДАННЫХ ФОРМЫ
adForm.addEventListener(`submit`, submitHandler);

//  Действия при очистке формы
const clearForm = adForm.querySelector(`.ad-form__reset`);

const onClearFormClick = (evt) => {
  evt.preventDefault();
  resetForm();
};

clearForm.addEventListener(`click`, onClearFormClick);
