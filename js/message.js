import { isEscapeKey } from './util.js';
const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');
const bodyElement = document.querySelector('body');

const hideMessage = () => {
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  existElement.remove();
  bodyElement.removeEventListener('keydown', onDocumentKeydown);
};

const onCloseButton = () => {
  hideMessage();
};

function onBodyClick(evt) {
  const existElement = document.querySelector('.success__inner') || document.querySelector('.error__inner');
  if (evt.target === existElement || evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  hideMessage();
}

function onDocumentKeydown(evt) {
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  if (isEscapeKey(evt) && existElement) {
    evt.stopPropagation();
    hideMessage();
  }
}

const showMessage = (elementParametr, classButton) => {
  bodyElement.append(elementParametr);
  elementParametr.addEventListener('click', onBodyClick);
  bodyElement.addEventListener('keydown', onDocumentKeydown);
  elementParametr.querySelector(classButton).addEventListener('click', onCloseButton);
};

const showSuccessMessage = () => {
  showMessage(successMessageElement, '.success__button');
};

const showErrorMessage = () => {
  showMessage(errorMessageElement, '.error__button');
};

export { showSuccessMessage, showErrorMessage };
