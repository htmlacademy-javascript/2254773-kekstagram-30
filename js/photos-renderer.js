const templateFragmentElement = document.querySelector('#picture').content;
const templateElement = templateFragmentElement.querySelector('.picture');

const getRenderedPhotos = (photos) => {
  const pictureFragmentElement = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoElement = templateElement.cloneNode(true);
    const imgElement = photoElement.querySelector('.picture__img');
    const commentsElement = photoElement.querySelector('.picture__comments');
    const likesElement = photoElement.querySelector('.picture__likes');

    imgElement.src = photo.url;
    imgElement.alt = photo.description;
    commentsElement.textContent = photo.comments.length;
    likesElement.textContent = photo.likes;
    photoElement.dataset.photoId = photo.id;
    pictureFragmentElement.appendChild(photoElement);
  });

  return pictureFragmentElement;
};

export { getRenderedPhotos };
