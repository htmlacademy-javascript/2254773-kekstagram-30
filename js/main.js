import { startGallery } from './gallery.js';
import { initImgUploader } from './form.js';
import { getPhotosData } from './data.servis.js';
import { showErrorMessage } from './util.js';
import { startFilter } from './filters.js';

initImgUploader();

const bootstrap = async () => {
  try {
    const photos = await getPhotosData();
    startGallery(photos);
    startFilter(photos);
  } catch (error) {
    showErrorMessage();
  }
};

bootstrap();
