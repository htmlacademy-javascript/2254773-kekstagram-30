import { getRenderedPhotos } from './photos-renderer.js';
import { showBigPhoto } from './show-photo.js';

function startGallery(photos) {
  const renderedPhotos = getRenderedPhotos(photos);

  const pictureContainerElement = document.querySelector('.pictures');

  pictureContainerElement.addEventListener('click', (event) => {
    event.preventDefault();
    const thumbnail = event.target.closest('[data-photo-id]');

    const photoId = thumbnail.dataset.photoId;

    const currentPhoto = photos.find((photo) => `${photo.id}` === photoId);

    showBigPhoto(currentPhoto);
  });
  const currentPictures = pictureContainerElement.querySelectorAll('.picture');
  currentPictures.forEach((item) => item.remove());
  pictureContainerElement.appendChild(renderedPhotos);
}

export { startGallery };
