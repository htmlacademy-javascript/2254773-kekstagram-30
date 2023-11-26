import { getRenderedComments } from './comments-renderer.js';
import { cleanUpChildren, isEscapeKey } from './util.js';

const SHOW_COMMENTS_COUNT = 5;

const bigPictureElement = document.querySelector('.big-picture');
const imgElement = bigPictureElement.querySelector('.big-picture__img > img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentsContainerElement = bigPictureElement.querySelector('.social__comments');
const descriptionElement = bigPictureElement.querySelector('.social__caption');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const bodyElement = document.querySelector('body');
const pictureCancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');

let currentComments = [];
let startIndex = 0;

const renderPartialComments = function () {
  const renderedCommentsElement = getRenderedComments(currentComments
    .slice(startIndex, startIndex + SHOW_COMMENTS_COUNT));
  commentsContainerElement.appendChild(renderedCommentsElement);
  startIndex += SHOW_COMMENTS_COUNT;
  if (startIndex >= currentComments.length) {
    startIndex = currentComments.length;
    commentsLoaderElement.classList.add('hidden');
  }
  commentTotalCountElement.textContent = currentComments.length.toString();
  commentsShownCountElement.textContent = startIndex;
};

const onCommentsLoaderClick = function () {
  renderPartialComments();
};

const onDocumentKeydown = function (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideModal();
  }
};

const onCancelButtonClick = function (evt) {
  evt.preventDefault();
  hideModal();
};

const showModal = function () {
  bigPictureElement.classList.remove('hidden');
  commentCountElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
  pictureCancelButtonElement.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

function hideModal() {
  bigPictureElement.classList.add('hidden');
  commentCountElement.classList.remove('hidden');
  commentsLoaderElement.classList.remove('hidden');
  bodyElement.classList.remove('modal-open');
  commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  pictureCancelButtonElement.removeEventListener('click', onCancelButtonClick);
}

const showBigPhoto = function (photo) {
  imgElement.src = photo.url;
  likesCountElement.textContent = photo.likes;
  commentsShownCountElement.textContent = photo.comments.length.toString();
  descriptionElement.textContent = photo.description;
  currentComments = photo.comments;
  startIndex = 0;
  cleanUpChildren(commentsContainerElement);
  renderPartialComments();
  showModal();
};

export { showBigPhoto };
