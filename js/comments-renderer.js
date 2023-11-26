const templateCommentElement = document.querySelector('#comment').content;
const templateElement = templateCommentElement.querySelector('.social__comment');

const getRenderedComments = function (comments) {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = templateElement.cloneNode(true);
    const socialPictureElement = commentElement.querySelector('.social__picture');
    const socialTextElement = commentElement.querySelector('.social__text');
    socialPictureElement.src = comment.avatar;
    socialPictureElement.alt = comment.name;
    socialTextElement.textContent = comment.message;
    fragment.appendChild(commentElement);
  });

  return fragment;
};

export { getRenderedComments };
