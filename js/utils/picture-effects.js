const slider = document.querySelector('.effect-level__slider');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const sliderWrap = document.querySelector('.img-upload__effect-level');

let effectName = '';
let extEffectVal = '';

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const sliderUpdateHandler = (values, handle) => {
  document.querySelector('.effect-level__value').value = values[handle];
  imgUploadPreview.style.filter = `${effectName}(${values[handle]}${extEffectVal})`;
};
slider.noUiSlider.on('update', sliderUpdateHandler);

export const changeFilter = () => {
  const newEffectClass = document.querySelector('.effects__radio:checked').parentNode.querySelector('.effects__preview').classList[1];
  imgUploadPreview.className = newEffectClass;
  sliderWrap.classList.remove('hidden');
  let sliderMin, sliderMax, sliderStep;
  extEffectVal = '';
  effectName = '';
  switch(newEffectClass) {
    case 'effects__preview--none':
      imgUploadPreview.className = '';
      imgUploadPreview.style.filter = '';
      sliderWrap.classList.add('hidden');
      return;
    case 'effects__preview--chrome':
      sliderMin = 0;
      sliderMax = 1;
      sliderStep = 0.1;
      effectName = 'grayscale';
      break;
    case 'effects__preview--sepia':
      sliderMin = 0;
      sliderMax = 1;
      sliderStep = 0.1;
      effectName = 'sepia';
      break;
    case 'effects__preview--heat':
      sliderMin = 0;
      sliderMax = 3;
      sliderStep = 0.1;
      effectName = 'brightness';
      break;
    case 'effects__preview--marvin':
      sliderMin = 0;
      sliderMax = 100;
      sliderStep = 1;
      extEffectVal = '%';
      effectName = 'invert';
      break;
    case 'effects__preview--phobos':
      sliderMin = 0;
      sliderMax = 3;
      sliderStep = 0.1;
      extEffectVal = 'px';
      effectName = 'blur';
      break;
  }
  slider.noUiSlider.updateOptions({
    range: {
      min: sliderMin,
      max: sliderMax,
    },
    start: sliderMax,
    step: sliderStep,
  });
};

export * from './picture-effects.js';
