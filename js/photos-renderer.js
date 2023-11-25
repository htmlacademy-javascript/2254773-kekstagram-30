const templateFragmentElement = document.querySelector('#picture').content;

const templateElement = templateFragmentElement.querySelector('.picture');

const getRenderedPhotos = (photos) => {
  const pictureFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoElement = templateElement.cloneNode(true);
    const imgElement = photoElement.querySelector('.picture__img');
    imgElement.src = photo.url;
    imgElement.alt = photo.description;
    const commentsElement = photoElement.querySelector('.picture__comments');
    commentsElement.textContent = photo.comments.length;
    const likesElement = photoElement.querySelector('.picture__likes');
    likesElement.textContent = photo.likes;
    photoElement.dataset.photoId = photo.id;
    pictureFragment.appendChild(photoElement);
  });

  return pictureFragment;
};

export { getRenderedPhotos };
