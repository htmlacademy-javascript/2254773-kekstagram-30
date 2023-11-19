import { isEscapeKey } from './util.js';

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
let pristine;
let slider;

const HASHTAG_REG_EXP = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_LENGTH_COUNT = 5;
const COMMENT_LENGTH_COUNT = 140;

const SCALE_STEP_COUNT = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;
let currentScale, currentEffect;

function stopEscapePropogation(evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

function escapeKeyHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

function destroyEffectSlider() {
  slider.destroy();
}

function initEffectSlider() {
  slider = noUiSlider.create(effectSliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });
  hideSlider();
  slider.on('update', () => {
    const sliderValue = slider.get();
    let filterValue = null;
    effectLevelValueElement.value = sliderValue;
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
}

function showSlider() {
  sliderWrapperElement.style.display = 'block';
}

function hideSlider() {
  sliderWrapperElement.style.display = 'none';
}

function openForm() {
  currentScale = SCALE_DEFAULT;
  changeImgScale(0);
  hashtagInputElement.value = '';
  commentInputElement.value = '';
  imgUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  imgUploadCancelElement.addEventListener('click', closeForm);
  initFormValidation();
  imgUploadFormElement.addEventListener('submit', submitFormHandler);
  hashtagInputElement.addEventListener('keydown', stopEscapePropogation);
  commentInputElement.addEventListener('keydown', stopEscapePropogation);
  document.addEventListener('keydown', escapeKeyHandler);
  scaleControlSmallerElement.addEventListener('click', decreaseImgScale);
  scaleControlBiggerElement.addEventListener('click', increaseImgScale);
  initEffectSlider();
  effectsListElement.addEventListener('change', effectChangeHandler);
  imgUploadFormElement.querySelector('#effect-none').checked = true;
  effectChangeHandler();
}

function effectChangeHandler() {
  const imgUploadForm = new FormData(imgUploadFormElement);
  currentEffect = imgUploadForm.get('effect');
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
}
function decreaseImgScale() {
  changeImgScale(-SCALE_STEP_COUNT);
}
function increaseImgScale() {
  changeImgScale(+SCALE_STEP_COUNT);
}

function changeImgScale(scaleFactor) {
  const newScale = currentScale + scaleFactor;
  if (newScale < SCALE_MIN || newScale > SCALE_MAX) {
    return false;
  }
  currentScale = newScale;
  scaleControlValueElement.value = `${currentScale}%`;
  imgUploadPreviewElement.style.transform = `scale(${currentScale / 100})`;
}

function closeForm() {
  imgUploadInputElement.value = '';
  imgUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  imgUploadCancelElement.removeEventListener('click', closeForm);
  destroyFormValidation();
  imgUploadFormElement.removeEventListener('submit', submitFormHandler);
  hashtagInputElement.removeEventListener('keydown', stopEscapePropogation);
  commentInputElement.removeEventListener('keydown', stopEscapePropogation);
  document.removeEventListener('keydown', escapeKeyHandler);
  scaleControlSmallerElement.removeEventListener('click', decreaseImgScale);
  scaleControlBiggerElement.removeEventListener('click', increaseImgScale);
  destroyEffectSlider();
  effectsListElement.removeEventListener('change', effectChangeHandler);
}

function submitFormHandler(evt) {
  evt.preventDefault();
  if (!pristine.validate()) {
    return false;
  }
}

function fullStringLengthValidator(value) {
  return typeof value === 'string' && value.trim().length <= COMMENT_LENGTH_COUNT;
}

function hashtagValidator(value) {
  if (typeof value === 'string') {
    const hashtags = value
      .split(' ')
      .filter((hashtag) => Boolean(hashtag));
    const result = hashtags.every((hashtag) => hashtag.match(HASHTAG_REG_EXP)) ||
      value === '';
    return result;
  }
  return false;
}

function dublicateHashtagsValidator(value) {
  const hashtags = value
    .toLowerCase()
    .split(' ')
    .filter((hashtag) => Boolean(hashtag));
  const result = hashtags.every((hashtag, index, array) => {
    for (let i = index + 1; i < array.length; i++) {
      if (hashtag === array[i]) {
        return false;
      }
    }
    return true;
  }) ||
    value === '';
  return result;
}

function countHashtagsValidator(value) {
  const hashtags = value
    .split(' ')
    .filter((hashtag) => Boolean(hashtag));
  return hashtags.length <= HASHTAG_LENGTH_COUNT;
}

function initFormValidation() {
  pristine = new Pristine(imgUploadFormElement, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
  });

  pristine.addValidator(commentInputElement, fullStringLengthValidator, 'Длина комментария больше 140 символов');
  pristine.addValidator(hashtagInputElement, hashtagValidator, 'Введен невалидный хэш-тег');
  pristine.addValidator(hashtagInputElement, dublicateHashtagsValidator, 'Хеш-теги повторяются');
  pristine.addValidator(hashtagInputElement, countHashtagsValidator, 'Превышено количество хеш-тегов');

}

function destroyFormValidation() {
  pristine.destroy();
}

function initImgUploader() {
  imgUploadFormElement.addEventListener('click', (evt) => {
    evt.stopPropagation();
  });
  imgUploadInputElement.addEventListener('change', openForm);
}

export { initImgUploader };
