import {isEscEvent} from './util.js';
import {setNewScaleNumber, pictureScaleChange} from './picture-scale.js';
import {changeFilter} from './picture-effects.js';

const COMMENT_MAX_LENGTH = 140;
const commentInput = document.querySelector('.img-upload__form .text__description');
const hashtagsInput = document.querySelector('.img-upload__form .text__hashtags');
const ErrorMessages = {
  HASHTAGS_QUANTITY: 'Нельзя указать больше пяти хэштегов',
  HASHTAGS_REPEAT: 'Хэштеги не должны повторяться',
  HASHTAGS_TEMPLATE: 'Хэштег должен начинаться со знака #, не может содержать пробелы, спецсимволы, символы пунктуации, эмодзи. (хэштеги разделяются пробелом) ',
  HASHTAGS_LENGTH: 'Длина Хэштега не может превышать 20 символов (включая #)',
  COMMENT_LENGTH: 'Длина комментария не может превышать 140 символов',
};

const keyDownFocusedInput = (evt) => {
  evt.stopPropagation();
};

const uploadFileInputChange = () => {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  setNewScaleNumber(100);
  pictureScaleChange();
  changeFilter();
};

const uploadCancel = () => {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.querySelector('#upload-select-image').reset();
};

const keyDownHandler = (evt) => {
  if(isEscEvent(evt)) {
    uploadCancel();
  }
};

const fastValidateCommentInput = () => {
  const valueLength = commentInput.value.length;
  if(valueLength > COMMENT_MAX_LENGTH) {
    commentInput.setCustomValidity('Длина комментария не может превышать 140 символов');
  } else {
    commentInput.setCustomValidity('');
  }
  commentInput.reportValidity();
};

const isUniqueHastags = (hashtags) => {
  let tempStr = '';
  for (let index = 0; index < hashtags.length; index++) {
    const curHashtagLowerCaseAndseparator = `${hashtags[index].toLowerCase()}_`;
    if(tempStr.indexOf(curHashtagLowerCaseAndseparator) !== -1) {
      return false;
    }
    tempStr += curHashtagLowerCaseAndseparator;
  }
  return true;
};

const fastValidateHashtagsInput = () => {
  const hashtagsInputValue = hashtagsInput.value;
  hashtagsInput.setCustomValidity('');
  if(hashtagsInputValue === '') {
    return false;
  }

  const re = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
  const hashtags = hashtagsInputValue.split(' ');

  //Хэштэгов должно быть не больше пяти
  if(hashtags.length > 5) {
    hashtagsInput.setCustomValidity(ErrorMessages.HASHTAGS_QUANTITY);
    hashtagsInput.reportValidity();
    return false;
  }
  //Проверяем каждый хэштег на соответствие регулярному выражению
  for (let index = 0; index < hashtags.length; index++) {
    if(hashtags[index].length > 20) {
      hashtagsInput.setCustomValidity(`Хэштэг №${index+1}: "${hashtags[index]}" \r\n не соответствует требованиям. ${ErrorMessages.HASHTAGS_LENGTH}`);
      hashtagsInput.reportValidity();
      return false;
    }
    if(!re.test(hashtags[index])) {
      hashtagsInput.setCustomValidity(`Хэштэг №${index+1}: "${hashtags[index]}" \r\n не соответствует требованиям. ${ErrorMessages.HASHTAGS_TEMPLATE}`);
      hashtagsInput.reportValidity();
      return false;
    }
  }
  //Проверяем хэштэги на уникальность
  if(!isUniqueHastags(hashtags)) {
    hashtagsInput.setCustomValidity(ErrorMessages.HASHTAGS_REPEAT);
  }
  hashtagsInput.reportValidity();
};

const showFormSuccessMess = () => {
  const formSuccessMessTemplateFragment = document.querySelector('#success').content;
  const formSuccessMessTemplate = formSuccessMessTemplateFragment.querySelector('section.success');
  const fragment = document.createDocumentFragment();
  const element = formSuccessMessTemplate.cloneNode(true);
  fragment.appendChild(element);
  document.querySelector('body').appendChild(fragment);

  const formSuccessKeyDownHandler = (evt) => {
    if(isEscEvent(evt)) {
      document.querySelector('section.success').remove();
      document.removeEventListener('keydown', formSuccessKeyDownHandler);
    }
  };
  const closeFormSuccessMess = () => {
    document.querySelector('section.success').remove();
    document.removeEventListener('keydown', formSuccessKeyDownHandler);
  };
  const formSuccessOverlayClick = (evt) => {
    if(evt.target.classList.contains('success')) {
      closeFormSuccessMess();
    }
  };

  document.addEventListener('keydown', formSuccessKeyDownHandler);
  document.querySelector('.success__button').addEventListener('click', closeFormSuccessMess);
  document.querySelector('section.success').addEventListener('click', formSuccessOverlayClick);
};

const showFormErrorMess = () => {
  const formErrorMessTemplateFragment = document.querySelector('#error').content;
  const formErrorMessTemplate = formErrorMessTemplateFragment.querySelector('section.error');
  const fragment = document.createDocumentFragment();
  const element = formErrorMessTemplate.cloneNode(true);
  fragment.appendChild(element);
  document.querySelector('body').appendChild(fragment);

  const formErrorKeyDownHandler = (evt) => {
    if(isEscEvent(evt)) {
      document.querySelector('section.error').remove();
      document.removeEventListener('keydown', formErrorKeyDownHandler);
    }
  };
  const closeFormErrorMess = () => {
    document.querySelector('section.error').remove();
    document.removeEventListener('keydown', formErrorKeyDownHandler);
  };
  const formErrorOverlayClick = (evt) => {
    if(evt.target.classList.contains('error')) {
      closeFormErrorMess();
    }
  };

  document.addEventListener('keydown', formErrorKeyDownHandler);
  document.querySelector('.error__button').addEventListener('click', closeFormErrorMess);
  document.querySelector('section.error').addEventListener('click', formErrorOverlayClick);
};

const uploadSubmit = (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  fetch(
    'https://23.javascript.pages.academy/kekstagram',
    {
      'method': 'POST',
      'body': formData,
    },
  ).then(
    (response) => {
      if (response.ok) {
        showFormSuccessMess();
        return uploadCancel();
      }
      throw new Error('Произошла ошибка');
    },
  ).catch(
    () => {
      showFormErrorMess();
      return uploadCancel();
    },
  );
};

document.querySelector('#upload-file').addEventListener('change', uploadFileInputChange);
document.querySelector('#upload-cancel').addEventListener('click', uploadCancel);
document.querySelector('#upload-select-image').addEventListener('submit', uploadSubmit);
document.addEventListener('keydown', keyDownHandler);

commentInput.addEventListener('input', fastValidateCommentInput);
hashtagsInput.addEventListener('input', fastValidateHashtagsInput);
commentInput.addEventListener('keydown', keyDownFocusedInput);
hashtagsInput.addEventListener('keydown', keyDownFocusedInput);
