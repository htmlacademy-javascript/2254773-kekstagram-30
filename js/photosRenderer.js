const templateFragment = document.querySelector('#picture')?.content;

const template = templateFragment?.querySelector('.picture');

const getRenderedPhotos = (photos) => {
  const pictureFragment = document.createDocumentFragment();

  if (template) {
    photos?.forEach((photo) => {
      const photoElement = template.cloneNode(true);
      const img = photoElement.querySelector('.picture__img');
      if (img) {
        img.src = photo.url;
        img.alt = photo.description;
      }
      const comments = photoElement.querySelector('.picture__comments');
      if (comments) {
        comments.textContent = photo?.comments?.length;
      }
      const likes = photoElement.querySelector('.picture__likes');
      if (likes) {
        likes.textContent = photo.likes;
      }
      pictureFragment.appendChild(photoElement);
    });
  }
  return pictureFragment;
};

export { getRenderedPhotos };
