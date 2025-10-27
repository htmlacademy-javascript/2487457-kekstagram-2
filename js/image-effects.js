import { EFFECTS, Effects } from './constants.js';
import { imagePreview } from './image-scale.js';
import { imageUploadEffectLevelFieldset } from './reset-image-form.js';

const SLIDER_DEFAULT_MIN = 0;
const SLIDER_DEFAULT_MAX = 1;
const SLIDER_DEFAULT_START = 1;
const SLIDER_DEFAULT_STEP = 0.1;

const effectSliderContainer = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const valueElement = document.querySelector('.effect-level__value');

let currentEffect = EFFECTS.NONE;

noUiSlider.create(effectSliderContainer, {
  range: {
    min: SLIDER_DEFAULT_MIN,
    max: SLIDER_DEFAULT_MAX,
  },
  start: SLIDER_DEFAULT_START,
  step: SLIDER_DEFAULT_STEP,
  format: {
    to: function (value) {
      return parseFloat(value);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
  connect: 'lower'
});

const renderImage = () => {
  const { style, units } = Effects[currentEffect];
  imagePreview.style.filter = `${style}(${valueElement.value}${units})`;
};

effectSliderContainer.noUiSlider.on('update', () => {
  valueElement.value = effectSliderContainer.noUiSlider.get();
  renderImage();
});

const updateSlider = () => {
  const { slider } = Effects[currentEffect];
  effectSliderContainer.noUiSlider.updateOptions(slider);
};

export const resetEffects = () => {
  imageUploadEffectLevelFieldset.classList.add('hidden');
  imagePreview.style.filter = '';
};

effectsList.addEventListener('change', (evt) => {
  currentEffect = evt.target.value;
  if (currentEffect === EFFECTS.NONE) {
    resetEffects();
  } else {
    updateSlider();
    imageUploadEffectLevelFieldset.classList.remove('hidden');
  }
});

resetEffects();
