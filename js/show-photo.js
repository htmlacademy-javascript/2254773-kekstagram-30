import { getRenderedComments } from './comments-renderer.js';
import { cleanUpChildren, isEscapeKey } from './util.js';

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

const SHOW_COMMENTS_COUNT = 5;
let currentComments = [], startIndex = 0;


const hideModal = () => {
  bigPictureElement.classList.add('hidden');
  commentCountElement.classList.remove('hidden');
  commentsLoaderElement.classList.remove('hidden');
  bodyElement.classList.remove('modal-open');

  commentsLoaderElement.removeEventListener('click', renderPartialComments);
  document.removeEventListener('keydown', escapeKeyHandler);
  pictureCancelButtonElement.removeEventListener('click', closeClickHandler);
};

function renderPartialComments() {

  const renderedComments = getRenderedComments(currentComments
    .slice(startIndex, startIndex + SHOW_COMMENTS_COUNT));
  commentsContainerElement.appendChild(renderedComments);
  startIndex += SHOW_COMMENTS_COUNT;
  if (startIndex >= currentComments.length) {
    startIndex = currentComments.length;
    commentsLoaderElement.classList.add('hidden');
  }
  commentTotalCountElement.textContent = currentComments.length;
  commentsShownCountElement.textContent = startIndex;
}

function escapeKeyHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideModal();
  }
}

function closeClickHandler(evt) {
  evt.preventDefault();
  hideModal();
}

const showModal = () => {
  bigPictureElement.classList.remove('hidden');
  commentCountElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  commentsLoaderElement.addEventListener('click', renderPartialComments);
  pictureCancelButtonElement.addEventListener('click', closeClickHandler);
  document.addEventListener('keydown', escapeKeyHandler);
};

const showBigPhoto = (photo) => {
  imgElement.src = photo.url;
  likesCountElement.textContent = photo.likes;
  commentsShownCountElement.textContent = photo.comments.length;
  descriptionElement.textContent = photo.description;

  currentComments = photo.comments;
  startIndex = 0;
  cleanUpChildren(commentsContainerElement);

  renderPartialComments();
  showModal();
};

export { showBigPhoto };
