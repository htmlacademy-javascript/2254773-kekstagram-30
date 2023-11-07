const getRenderedComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentContent = `
    <img src="${comment.avatar}" alt="${comment.name}" class="social__picture" width="35" height="35">
    <p class="social__text">${comment.message}</p>
    `;
    const commentElement = document.createElement('li');
    commentElement.classList.add('social_comment');
    commentElement.innerHTML = commentContent;

    fragment.appendChild(commentElement);
  });

  return fragment;
};

export { getRenderedComments };
