import {isEscEvent} from './util.js';

const COMMENTS_BATCH_QUANTITY = 5;

const commentsLoader = document.querySelector('.comments-loader');
const bigPictureWrap = document.querySelector('.big-picture');
const body = document.querySelector('body');
const socialCommentsLoader = document.querySelector('.social__comments-loader');
const bigPictureCancel = document.querySelector('.big-picture__cancel');

const renderComments = (Comments) => {
  const commentsBlock = document.querySelector('.social__comments');
  const commentTemplateFragment = document.querySelector('#socialComments').content;
  const commentTemplate = commentTemplateFragment.querySelector('li');
  const fragment = document.createDocumentFragment();
  for (let comm = 0; comm < Comments.length; comm++) {
    const element = commentTemplate.cloneNode(true);
    element.dataset.commId = Comments[comm].id;
    element.children[0].src = Comments[comm].avatar;
    element.children[0].alt = Comments[comm].name;
    element.children[1].textContent = Comments[comm].message;
    fragment.appendChild(element);
  }
  commentsBlock.innerHTML = '';
  commentsBlock.appendChild(fragment);
};

const showNextCommentsBatch = () => {
  const hiddenCommentsCollection = document.querySelectorAll('.social__comments .social__comment.hidden');
  const showHiddenCommentsLength = hiddenCommentsCollection.length < COMMENTS_BATCH_QUANTITY ? hiddenCommentsCollection.length : COMMENTS_BATCH_QUANTITY;
  for (let index = 0; index < showHiddenCommentsLength; index++) {
    hiddenCommentsCollection[index].classList.remove('hidden');
  }
  commentsLoader.classList.remove('hidden');
  if(document.querySelectorAll('.social__comments .social__comment.hidden').length === 0) {
    commentsLoader.classList.add('hidden');
  }
  const visibleCommentsCount = document.querySelectorAll('.social__comments .social__comment:not(.hidden)').length;
  document.querySelector('.social__comment-count').childNodes[0].textContent = `${visibleCommentsCount} из `;
};

const bigPictureInteractions = (evt) => {
  if(evt.target.classList.contains('big-picture__cancel') || isEscEvent(evt)) {
    bigPictureWrap.classList.add('hidden');
    body.classList.remove('modal-open');
    socialCommentsLoader.removeEventListener('click', showNextCommentsBatch);
    document.removeEventListener('keydown', bigPictureInteractions);
  }
};

export const renderBigPicture = (evt, pictures) => {
  if(evt.target.parentNode.classList.contains('picture')) {
    evt.preventDefault();
    const picId = evt.target.parentNode.dataset.picId;
    const chosenPicture = pictures.find( (item) => item.id === +picId);

    bigPictureWrap.querySelector('.big-picture__img img').src = chosenPicture.url;
    bigPictureWrap.querySelector('.likes-count').textContent = chosenPicture.likes;
    bigPictureWrap.querySelector('.comments-count').textContent = chosenPicture.comments.length;
    bigPictureWrap.querySelector('.social__caption').textContent = chosenPicture.description;
    renderComments(chosenPicture.comments);
    bigPictureWrap.classList.remove('hidden');
    showNextCommentsBatch();
    body.classList.add('modal-open');

    bigPictureCancel.addEventListener('click', bigPictureInteractions);
    document.addEventListener('keydown', bigPictureInteractions);
    socialCommentsLoader.addEventListener('click', showNextCommentsBatch);
  }
};
