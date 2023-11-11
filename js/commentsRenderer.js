const templateComment = document.querySelector('#comment').content;
const template = templateComment.querySelector('.social__comment');

const getRenderedComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = template.cloneNode(true);
    const img = commentElement.querySelector('.social__picture');
    const p = commentElement.querySelector('.social__text');
    img.src = comment.avatar;
    img.alt = comment.name;
    p.textContent = comment.message;

    fragment.appendChild(commentElement);
  });

  return fragment;
};

export { getRenderedComments };
