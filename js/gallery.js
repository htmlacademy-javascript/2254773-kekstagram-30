import { getPhotosData } from './data.js';
import { getRenderedPhotos } from './photosRenderer.js';
import { showBigPhoto } from './show-photo.js';

function startGallery() {
  const photos = getPhotosData();
  const renderedPhotos = getRenderedPhotos(photos);

  const pictureContainerElement = document.querySelector('.pictures');

  pictureContainerElement.addEventListener('click', (event) => {
    event.preventDefault();
    const thumbnail = event.target.closest('[data-photo-id]');

    const photoId = thumbnail.dataset.photoId;

    const currentPhoto = photos.find((photo) => photo.id === photoId);

    showBigPhoto(currentPhoto);
  });

  pictureContainerElement.appendChild(renderedPhotos);
}

export { startGallery };
