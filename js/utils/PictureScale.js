const scaleOptions = {
  'MIN_VALUE': 25,
  'MAX_VALUE': 100,
  'VALUE_STEP': 25,
  'DEFAULT_VALUE': 100,
};
const scaleBiggerBtn = document.querySelector('.scale__control--bigger');
const scaleSmallerBtn = document.querySelector('.scale__control--smaller');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const getCurrentScaleNum = () => +(document.querySelector('.scale__control--value').value.slice(0, -1));

export const setNewScaleNum = (newScaleNum) => {
  document.querySelector('.scale__control--value').value = `${newScaleNum}%`;
};
export const pictureScaleChange = () => {
  const newScaleNum = getCurrentScaleNum();
  document.querySelectorAll('.img-upload__scale button').forEach( (item) => {
    item.removeAttribute('disabled');
  });
  if(newScaleNum >= scaleOptions.MAX_VALUE) {
    scaleBiggerBtn.setAttribute('disabled', true);
  }
  if(newScaleNum <= scaleOptions.MIN_VALUE) {
    scaleSmallerBtn.setAttribute('disabled', true);
  }
  imgUploadPreview.style.transform = `scale(${newScaleNum / 100})`;
};
const scaleControlBiggerClickHandler = () => {
  setNewScaleNum(getCurrentScaleNum() + scaleOptions.VALUE_STEP);
  pictureScaleChange();
};
const scaleControlSmallerClickHandler = () => {
  setNewScaleNum(getCurrentScaleNum() - scaleOptions.VALUE_STEP);
  pictureScaleChange();
};

scaleSmallerBtn.addEventListener('click', scaleControlSmallerClickHandler);
scaleBiggerBtn.addEventListener('click', scaleControlBiggerClickHandler);

export * from './PictureScale.js';
