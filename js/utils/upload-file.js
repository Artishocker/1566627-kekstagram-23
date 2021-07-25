import {isEscEvent} from './util.js';
import {scaleSmallerButton, scaleBiggerButton, setNewScaleNumber, pictureScaleChange, scaleControlBiggerClickHandler, scaleControlSmallerClickHandler} from './picture-scale.js';
import {changeFilter} from './picture-effects.js';
import {showFormErrorMessage, showFormSuccessMessage} from './alert-popups.js';
import {sendData} from './api.js';

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
    if(hashtags[index].length > 20 || !re.test(hashtags[index])) {
      hashtagsInput.setCustomValidity(`Хэштэг №${index+1}: "${hashtags[index]}" \r\n не соответствует требованиям. ${ErrorMessages.HASHTAGS_LENGTH}`);
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

const uploadSubmit = (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  sendData(
    () => {
      showFormSuccessMessage();
      uploadCancel();
      uploadSelectImage.removeEventListener('submit', uploadSubmit);
    },
    () => {
      showFormErrorMessage();
      uploadCancel();
      uploadSelectImage.removeEventListener('submit', uploadSubmit);
    },
    formData,
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
