import { getRenderedPhotos } from './photos-renderer.js';
import { showBigPhoto } from './show-photo.js';

const startGallery = function (photos) {
  const renderedPhotos = getRenderedPhotos(photos);
  const pictureContainerElement = document.querySelector('.pictures');
  const currentPicturesElements = pictureContainerElement.querySelectorAll('.picture');

  pictureContainerElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    const thumbnailElement = evt.target.closest('[data-photo-id]');
    const photoId = thumbnailElement.dataset.photoId;
    const currentPhoto = photos.find((photo) => `${photo.id}` === photoId);

    showBigPhoto(currentPhoto);
  });
  currentPicturesElements.forEach((item) => item.remove());
  pictureContainerElement.appendChild(renderedPhotos);
};

export { startGallery };
