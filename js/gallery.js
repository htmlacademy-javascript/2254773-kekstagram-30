import { getPhotosData } from './data.js';
import { getRenderedPhotos } from './photosRenderer.js';
import { showBigPhoto } from './show-photo.js';


const photos = getPhotosData();
const renderedPhotos = getRenderedPhotos(photos);

const pictureContainer = document.querySelector('.pictures');

pictureContainer.addEventListener('click', (event) => {
  const thumbnail = event.target.closest('[data-photo-id]');
  event.preventDefault();

  const photoId = thumbnail.dataset.photoId;

  const currentPhoto = photos.find((photo) => photo.id === photoId);

  showBigPhoto(currentPhoto);
});

pictureContainer.appendChild(renderedPhotos);
