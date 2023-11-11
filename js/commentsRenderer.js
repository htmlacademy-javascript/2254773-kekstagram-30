const templateCommentElement = document.querySelector('#comment').content;
const templateElement = templateCommentElement.querySelector('.social__comment');

const getRenderedComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = templateElement.cloneNode(true);
    const imgElement = commentElement.querySelector('.social__picture');
    const pElement = commentElement.querySelector('.social__text');
    imgElement.src = comment.avatar;
    imgElement.alt = comment.name;
    pElement.textContent = comment.message;

    fragment.appendChild(commentElement);
  });

  return fragment;
};

export { getRenderedComments };
