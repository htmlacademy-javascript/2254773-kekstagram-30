import { startGallery, updatePhotos } from './gallery.js';
import { initImgUploader } from './form.js';
import { getPhotosData } from './data-service.js';
import { showErrorMessage } from './util.js';
import { startFilter } from './filters.js';

const bootstrap = async function () {
  initImgUploader();

  try {
    const photos = await getPhotosData();
    startGallery();
    updatePhotos(photos);
    startFilter(photos);
  } catch (error) {
    showErrorMessage();
  }
};

bootstrap();
