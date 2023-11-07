import { getRenderedComments } from './commentsRenderer.js';
import { cleanUpChildren, isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const img = bigPicture.querySelector('.big-picture__img > img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsContainer = bigPicture.querySelector('.social__comments');
const description = bigPicture.querySelector('.social__caption');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const body = document.querySelector('body');
const pictureCancelButton = bigPicture.querySelector('.big-picture__cancel');

pictureCancelButton.addEventListener('click', closeClickHandler);

const hideModal = () => {
  bigPicture.classList.add('hidden');
  commentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  body.classList.remove('modal-open');

  document.addEventListener('keydown', escapeKeyHandler);
};

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
  bigPicture.classList.remove('hidden');
  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', escapeKeyHandler);
};

const showBigPhoto = (photo) => {
  img.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsShownCount.textContent = photo.comments.length;
  description.textContent = photo.description;

  const renderedComments = getRenderedComments(photo.comments);
  cleanUpChildren(commentsContainer);
  commentsContainer.appendChild(renderedComments);

  showModal();
};

export { showBigPhoto };
