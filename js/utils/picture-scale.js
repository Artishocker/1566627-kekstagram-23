const ScaleOptions = {
  'MIN_VALUE': 25,
  'MAX_VALUE': 100,
  'VALUE_STEP': 25,
  'DEFAULT_VALUE': 100,
};

export const scaleBiggerButton = document.querySelector('.scale__control--bigger');
export const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const getCurrentScaleNum = () => +(document.querySelector('.scale__control--value').value.slice(0, -1));

export const setNewScaleNumber = (newScaleNumber) => {
  document.querySelector('.scale__control--value').value = `${newScaleNumber}%`;
};

export const pictureScaleChange = () => {
  const newScaleNumber = getCurrentScaleNum();
  document.querySelectorAll('.img-upload__scale button').forEach( (item) => {
    item.disabled = false;
  });
  if(newScaleNumber >= ScaleOptions.MAX_VALUE) {
    scaleBiggerButton.disabled = true;
  }
  if(newScaleNumber <= ScaleOptions.MIN_VALUE) {
    scaleSmallerButton.disabled = true;
  }
  imgUploadPreview.style.transform = `scale(${newScaleNumber / 100})`;
};

export const scaleControlBiggerClickHandler = () => {
  setNewScaleNumber(getCurrentScaleNum() + ScaleOptions.VALUE_STEP);
  pictureScaleChange();
};

export const scaleControlSmallerClickHandler = () => {
  setNewScaleNumber(getCurrentScaleNum() - ScaleOptions.VALUE_STEP);
  pictureScaleChange();
};
