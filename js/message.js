import { isEscapeKey } from './util.js';

const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');
const bodyElement = document.querySelector('body');

const hideMessage = function () {
  const existMessageElement = document.querySelector('.success') || document.querySelector('.error');
  existMessageElement.remove();
  bodyElement.removeEventListener('keydown', onBodyKeydown);
};

const onInnerClick = function (evt) {
  const existInnerElement = document.querySelector('.success__inner') || document.querySelector('.error__inner');
  if (evt.target === existInnerElement || evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  hideMessage();
};

function onBodyKeydown(evt) {
  const existMessageElement = document.querySelector('.success') || document.querySelector('.error');
  if (isEscapeKey(evt) && existMessageElement) {
    evt.stopPropagation();
    hideMessage();
  }
}

const onCloseMessageButtonClick = function () {
  hideMessage();
};

const showMessage = function (messageElement, closeMessageButtonClass) {
  bodyElement.append(messageElement);
  messageElement.addEventListener('click', onInnerClick);
  bodyElement.addEventListener('keydown', onBodyKeydown);
  messageElement.querySelector(closeMessageButtonClass)
    .addEventListener('click', onCloseMessageButtonClick);
};

const showSuccessMessage = function () {
  showMessage(successMessageElement, '.success__button');
};

const showErrorMessage = function () {
  showMessage(errorMessageElement, '.error__button');
};

export { showSuccessMessage, showErrorMessage };
