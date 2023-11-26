const errorLoadPhotoElement = document.querySelector('#data-error').content.querySelector('.data-error');
const bodyElement = document.querySelector('body');

const REMOVE_MESSAGE_TIMEOUT = 5000;
const DEBOUNCE_DEFAULT_TIMEOUT = 500;

const showErrorMessage = function() {
  const errorTextElement = errorLoadPhotoElement.cloneNode(true);
  bodyElement.append(errorTextElement);
  setTimeout(() => {
    errorTextElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

const isEscapeKey = function(evt) {
  return evt.key === 'Escape';
};

const cleanUpChildren = function(htmlElement) {
  Array.from(htmlElement.children).forEach((element) => {
    htmlElement.removeChild(element);
  });
};

function debounce (callback, timeoutDelay = DEBOUNCE_DEFAULT_TIMEOUT) {
  let timeoutId;
  return function(...rest) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { isEscapeKey, cleanUpChildren, showErrorMessage, debounce };
