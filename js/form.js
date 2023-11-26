import { sendNewPhoto } from './data-service.js';
import { isEscapeKey } from './util.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const HASHTAG_LENGTH_COUNT = 5;
const COMMENT_LENGTH_COUNT = 140;
const SCALE_STEP_COUNT = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const HASHTAG_REG_EXP = /^#[a-zа-яё0-9]{1,19}$/i;

const imgUploadInputElement = document.querySelector('.img-upload__input');
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const imgUploadCancelElement = document.querySelector('.img-upload__cancel');
const imgUploadFormElement = document.querySelector('.img-upload__form');
const hashtagInputElement = imgUploadFormElement.querySelector('.text__hashtags');
const commentInputElement = imgUploadFormElement.querySelector('.text__description');
const scaleControlSmallerElement = imgUploadFormElement.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = imgUploadFormElement.querySelector('.scale__control--bigger');
const scaleControlValueElement = imgUploadFormElement.querySelector('.scale__control--value');
const imgUploadPreviewElement = imgUploadFormElement.querySelector('.img-upload__preview img');
const effectSliderElement = imgUploadFormElement.querySelector('.effect-level__slider');
const effectLevelValueElement = imgUploadFormElement.querySelector('.effect-level__value');
const effectsListElement = imgUploadFormElement.querySelector('.effects__list');
const sliderWrapperElement = imgUploadFormElement.querySelector('.img-upload__effect-level');
const submitButtonElement = imgUploadFormElement.querySelector('.img-upload__submit');
const effectsPreviewElement = imgUploadFormElement.querySelectorAll('.effects__preview');

let currentScale, currentEffect, pristine, slider;

const SubmitButtonCaption = {
  SUBMITTING: 'Отправляю...',
  IDLE: 'Отправить'
};

const toggleSubmitButton = function (isDisabled) {
  submitButtonElement.disabled = isDisabled;
  if (isDisabled) {
    submitButtonElement.textContent = SubmitButtonCaption.SUBMITTING;
  } else {
    submitButtonElement.textContent = SubmitButtonCaption.IDLE;
  }
};

const stopEscapePropagation = function (evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const onHashtagKeydown = function (evt) {
  stopEscapePropagation(evt);
};

const onCommentKeydown = function (evt) {
  stopEscapePropagation(evt);
};


const onDocumentKeydown = function (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
};

const hideSlider = function () {
  sliderWrapperElement.style.display = 'none';
};

const initEffectSlider = function () {
  if (!slider) {
    slider = noUiSlider.create(effectSliderElement, {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
      connect: 'lower',
    });
    slider.on('update', () => {
      const sliderValue = slider.get();
      let filterValue = null;
      effectLevelValueElement.value = Number(sliderValue);
      switch (currentEffect) {
        case 'chrome':
          filterValue = `grayscale(${sliderValue})`;
          break;
        case 'sepia':
          filterValue = `sepia(${sliderValue})`;
          break;
        case 'marvin':
          filterValue = `invert(${sliderValue}%)`;
          break;
        case 'phobos':
          filterValue = `blur(${sliderValue}px)`;
          break;
        case 'heat':
          filterValue = `brightness(${sliderValue})`;
          break;
        default:
      }
      imgUploadPreviewElement.style.filter = filterValue;
    });
  } else {
    slider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
  }
  hideSlider();
};

const showSlider = function () {
  sliderWrapperElement.style.display = 'block';
};

const submitForm = async function (formData) {
  if (!pristine.validate()) {
    return;
  }

  try {
    toggleSubmitButton(true);
    await sendNewPhoto(new FormData(formData));
    toggleSubmitButton(false);
    closeForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
    toggleSubmitButton(false);
  }
};

const onFormSubmit = function (evt) {
  evt.preventDefault();
  submitForm(evt.target);
};

const readAndSetImage = function () {
  const file = imgUploadInputElement.files[0];
  if (file) {
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      imgUploadPreviewElement.src = URL.createObjectURL(file);
    }
    effectsPreviewElement.forEach((effect) => {
      effect.style.backgroundImage = `url('${imgUploadPreviewElement.src}')`;
    });
  }
};

const changeImgScale = function (scaleFactor) {
  const newScale = currentScale + scaleFactor;
  if (newScale < SCALE_MIN || newScale > SCALE_MAX) {
    return false;
  }
  currentScale = newScale;
  scaleControlValueElement.value = `${currentScale}%`;
  imgUploadPreviewElement.style.transform = `scale(${currentScale / 100})`;
};

const onScaleSmallerClick = function () {
  changeImgScale(-SCALE_STEP_COUNT);
};

const onScaleBiggerClick = function () {
  changeImgScale(+SCALE_STEP_COUNT);
};

const onUploadCancelClick = function () {
  closeForm();
};

const onEffectChange = function () {
  const imgUploadFormData = new FormData(imgUploadFormElement);
  currentEffect = imgUploadFormData.get('effect');
  switch (currentEffect) {
    case 'chrome':
      slider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1
      });
      showSlider();
      break;
    case 'sepia':
      slider.updateOptions({
        range: {
          min: 0,
          max: 1
        },
        start: 1,
        step: 0.1
      });
      showSlider();
      break;
    case 'marvin':
      slider.updateOptions({
        range: {
          min: 0,
          max: 100
        },
        start: 100,
        step: 1
      });
      showSlider();
      break;
    case 'phobos':
      slider.updateOptions({
        range: {
          min: 0,
          max: 3
        },
        start: 3,
        step: 0.1
      });
      showSlider();
      break;
    case 'heat':
      slider.updateOptions({
        range: {
          min: 1,
          max: 3
        },
        start: 3,
        step: 0.1
      });
      showSlider();
      break;
    default:
      slider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      hideSlider();
  }
};

const fullStringLengthValidator = function (value) {
  return typeof value === 'string' && value.trim().length <= COMMENT_LENGTH_COUNT;
};

const hashtagValidator = function (value) {
  if (typeof value === 'string') {
    const hashtags = value
      .split(' ')
      .filter((hashtag) => Boolean(hashtag));
    return hashtags.every((hashtag) => hashtag.match(HASHTAG_REG_EXP)) ||
      value === '';
  }
  return false;
};

const duplicateHashtagsValidator = function (value) {
  const hashtags = value
    .toLowerCase()
    .split(' ')
    .filter((hashtag) => Boolean(hashtag));
  return hashtags.every((hashtag, index, array) => {
    for (let i = index + 1; i < array.length; i++) {
      if (hashtag === array[i]) {
        return false;
      }
    }
    return true;
  }) || value === '';
};

const countHashtagsValidator = function (value) {
  const hashtags = value
    .split(' ')
    .filter((hashtag) => Boolean(hashtag));
  return hashtags.length <= HASHTAG_LENGTH_COUNT;
};

const initFormValidation = function () {
  pristine = new Pristine(imgUploadFormElement, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
  });

  pristine.addValidator(commentInputElement, fullStringLengthValidator, 'Длина комментария больше 140 символов');
  pristine.addValidator(hashtagInputElement, hashtagValidator, 'Введен невалидный хэш-тег');
  pristine.addValidator(hashtagInputElement, duplicateHashtagsValidator, 'Хеш-теги повторяются');
  pristine.addValidator(hashtagInputElement, countHashtagsValidator, 'Превышено количество хеш-тегов');
};

const destroyFormValidation = function () {
  pristine.destroy();
};

const openForm = function () {
  currentScale = SCALE_DEFAULT;
  changeImgScale(0);
  hashtagInputElement.value = '';
  commentInputElement.value = '';
  imgUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  imgUploadCancelElement.addEventListener('click', onUploadCancelClick);
  imgUploadFormElement.addEventListener('submit', onFormSubmit);
  initFormValidation();
  hashtagInputElement.addEventListener('keydown', onHashtagKeydown);
  commentInputElement.addEventListener('keydown', onCommentKeydown);
  document.addEventListener('keydown', onDocumentKeydown);
  scaleControlSmallerElement.addEventListener('click', onScaleSmallerClick);
  scaleControlBiggerElement.addEventListener('click', onScaleBiggerClick);
  initEffectSlider();
  effectsListElement.addEventListener('change', onEffectChange);
  imgUploadFormElement.querySelector('#effect-none').checked = true;
  onEffectChange();
  readAndSetImage();
};

function closeForm() {
  imgUploadInputElement.value = '';
  imgUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  imgUploadCancelElement.removeEventListener('click', onUploadCancelClick);
  destroyFormValidation();
  imgUploadFormElement.removeEventListener('submit', onFormSubmit);
  hashtagInputElement.removeEventListener('keydown', onHashtagKeydown);
  commentInputElement.removeEventListener('keydown', onCommentKeydown);
  document.removeEventListener('keydown', onDocumentKeydown);
  scaleControlSmallerElement.removeEventListener('click', onScaleSmallerClick);
  scaleControlBiggerElement.removeEventListener('click', onScaleBiggerClick);
  effectsListElement.removeEventListener('change', onEffectChange);
}

const initImgUploader = function () {
  imgUploadFormElement.addEventListener('click', (evt) => {
    evt.stopPropagation();
  });
  imgUploadInputElement.addEventListener('change', () => {
    openForm();
  });
};

export { initImgUploader };
