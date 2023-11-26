import { getRenderedPhotos } from './photos-renderer.js';
import { showBigPhoto } from './show-photo.js';

const pictureContainerElement = document.querySelector('.pictures');

let cachedPhotos;

const startGallery = function () {
  pictureContainerElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    const thumbnailElement = evt.target.closest('[data-photo-id]');
    const photoId = thumbnailElement.dataset.photoId;
    const currentPhoto = cachedPhotos.find((photo) => `${photo.id}` === photoId);

    showBigPhoto(currentPhoto);
  });
};

const updatePhotos = function (photos) {
  cachedPhotos = photos;
  const renderedPhotos = getRenderedPhotos(photos);
  const currentPicturesElements = pictureContainerElement.querySelectorAll('.picture');
  currentPicturesElements.forEach((item) => item.remove());
  pictureContainerElement.appendChild(renderedPhotos);
};

export { startGallery, updatePhotos };
