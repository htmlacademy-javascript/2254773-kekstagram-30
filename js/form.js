import { isEscapeKey } from './util.js';

const imgUploadInputElement = document.querySelector('.img-upload__input');
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const imgUploadCancelElement = document.querySelector('.img-upload__cancel');
const imgUploadFormElement = document.querySelector('.img-upload__form');
const hashtagInputElement = imgUploadFormElement.querySelector('.text__hashtags');
const commentInputElement = imgUploadFormElement.querySelector('.text__description');

let pristine;

const HASHTAG_REG_EXP = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_LENGTH_COUNT = 5;
const COMMENT_LENGTH_COUNT = 140;

function stopEscapePropogation(evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}

function escapeKeyHandler(evt) {
  if (isEscapeKey(evt)) {
    // evt.preventDefault();
    closeForm();
  }
}

function openForm() {
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
  if (typeof value === 'string') {
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
}

function countHashtagsValidator(value) {
  if (typeof value === 'string') {
    const hashtags = value
      .split(' ')
      .filter((hashtag) => Boolean(hashtag));
    return hashtags.length <= HASHTAG_LENGTH_COUNT;
  }
  return false;
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
