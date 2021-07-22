import {isEscEvent} from './util.js';
import {scaleSmallerButton, scaleBiggerButton, setNewScaleNumber, pictureScaleChange, scaleControlBiggerClickHandler, scaleControlSmallerClickHandler} from './picture-scale.js';
import {changeFilter} from './picture-effects.js';

const DEFAULT_SCALE = 100;
const COMMENT_MAX_LENGTH = 140;
const ErrorMessages = {
  HASHTAGS_QUANTITY: 'Нельзя указать больше пяти хэштегов',
  HASHTAGS_REPEAT: 'Хэштеги не должны повторяться',
  HASHTAGS_TEMPLATE: 'Хэштег должен начинаться со знака #, не может содержать пробелы, спецсимволы, символы пунктуации, эмодзи. (хэштеги разделяются пробелом) ',
  HASHTAGS_LENGTH: 'Длина Хэштега не может превышать 20 символов (включая #)',
  COMMENT_LENGTH: 'Длина комментария не может превышать 140 символов',
};

const commentInput = document.querySelector('.img-upload__form .text__description');
const hashtagsInput = document.querySelector('.img-upload__form .text__hashtags');
const cancelUploadButton = document.querySelector('#upload-cancel');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadSelectImage = document.querySelector('#upload-select-image');
const effectsRadioCollection = document.querySelectorAll('.effects__radio');

const keyDownFocusedInput = (evt) => {
  evt.stopPropagation();
};

const isUniqueHastags = (hashtags) => {
  let tempStr = '';
  for (let index = 0; index < hashtags.length; index++) {
    const curHashtagLowerCaseAndSeparator = `${hashtags[index].toLowerCase()}_`;
    if(tempStr.indexOf(curHashtagLowerCaseAndSeparator) !== -1) {
      return false;
    }
    tempStr += curHashtagLowerCaseAndSeparator;
  }
  return true;
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

const uploadCancel = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadSelectImage.reset();

  scaleSmallerButton.removeEventListener('click', scaleControlSmallerClickHandler);
  scaleBiggerButton.removeEventListener('click', scaleControlBiggerClickHandler);

  effectsRadioCollection.forEach( (item) => {
    item.removeEventListener('change', changeFilter);
  });

  cancelUploadButton.removeEventListener('click', uploadCancel);

  commentInput.removeEventListener('input', fastValidateCommentInput);
  hashtagsInput.removeEventListener('input', fastValidateHashtagsInput);
  commentInput.removeEventListener('keydown', keyDownFocusedInput);
  hashtagsInput.removeEventListener('keydown', keyDownFocusedInput);
};

const keyDownHandler = (evt) => {
  if(isEscEvent(evt)) {
    uploadCancel();
    document.removeEventListener('keydown', keyDownHandler);
  }
};

const showFormSuccessMessage = () => {
  const formSuccessMessageTemplateFragment = document.querySelector('#success').content;
  const formSuccessMessageTemplate = formSuccessMessageTemplateFragment.querySelector('section.success');
  const fragment = document.createDocumentFragment();
  const element = formSuccessMessageTemplate.cloneNode(true);
  fragment.appendChild(element);
  body.appendChild(fragment);
  const successSection = document.querySelector('section.success');

  const formSuccessKeyDownHandler = (evt) => {
    if(isEscEvent(evt)) {
      successSection.remove();
      document.removeEventListener('keydown', formSuccessKeyDownHandler);
    }
  };
  const closeFormSuccessMessage = () => {
    successSection.remove();
    document.removeEventListener('keydown', formSuccessKeyDownHandler);
  };

  const formSuccessButtonClickHandler = () => {
    closeFormSuccessMessage();
  };
  const formSuccessOverlayClickHandler = (evt) => {
    if(evt.target.classList.contains('success')) {
      closeFormSuccessMessage();
    }
  };

  document.addEventListener('keydown', formSuccessKeyDownHandler);
  document.querySelector('.success__button').addEventListener('click', formSuccessButtonClickHandler);
  successSection.addEventListener('click', formSuccessOverlayClickHandler);
};

const showFormErrorMessage = () => {
  const formErrorMessageTemplateFragment = document.querySelector('#error').content;
  const formErrorMessageTemplate = formErrorMessageTemplateFragment.querySelector('section.error');
  const fragment = document.createDocumentFragment();
  const element = formErrorMessageTemplate.cloneNode(true);
  fragment.appendChild(element);
  body.appendChild(fragment);
  const errorSection = document.querySelector('section.error');

  const formErrorKeyDownHandler = (evt) => {
    if(isEscEvent(evt)) {
      errorSection.remove();
      document.removeEventListener('keydown', formErrorKeyDownHandler);
    }
  };
  const closeFormErrorMessage = () => {
    errorSection.remove();
    document.removeEventListener('keydown', formErrorKeyDownHandler);
  };
  const formErrorOverlayClick = (evt) => {
    if(evt.target.classList.contains('error')) {
      closeFormErrorMessage();
    }
  };

  document.addEventListener('keydown', formErrorKeyDownHandler);
  document.querySelector('.error__button').addEventListener('click', closeFormErrorMessage);
  errorSection.addEventListener('click', formErrorOverlayClick);
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
        showFormSuccessMessage();
        uploadCancel();
        uploadSelectImage.removeEventListener('submit', uploadSubmit);
        return;
      }
      throw new Error('Произошла ошибка');
    },
  ).catch(
    () => {
      showFormErrorMessage();
      uploadCancel();
      uploadSelectImage.removeEventListener('submit', uploadSubmit);
    },
  );
};

const uploadFileInputChange = () => {
  setNewScaleNumber(DEFAULT_SCALE);
  pictureScaleChange();
  changeFilter();

  scaleSmallerButton.addEventListener('click', scaleControlSmallerClickHandler);
  scaleBiggerButton.addEventListener('click', scaleControlBiggerClickHandler);

  effectsRadioCollection.forEach( (item) => {
    item.addEventListener('change', changeFilter);
  });

  cancelUploadButton.addEventListener('click', uploadCancel);
  uploadSelectImage.addEventListener('submit', uploadSubmit);

  commentInput.addEventListener('input', fastValidateCommentInput);
  hashtagsInput.addEventListener('input', fastValidateHashtagsInput);
  commentInput.addEventListener('keydown', keyDownFocusedInput);
  hashtagsInput.addEventListener('keydown', keyDownFocusedInput);

  document.addEventListener('keydown', keyDownHandler);

  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
};

document.querySelector('#upload-file').addEventListener('change', uploadFileInputChange);
