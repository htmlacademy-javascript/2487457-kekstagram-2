import { SCALE_VALUE_MAX_NUMBER, imagePreview, changeImageScale } from './image-scale.js';

const imageUploadEffectLevelFieldset = document.querySelector('.img-upload__effect-level');
const effectOriginal = document.querySelector('#effect-none');

const resetImageForm = (currentForm, currentFormValidator, resetEffects) => {
  currentFormValidator.reset();
  currentForm.reset();
  changeImageScale(SCALE_VALUE_MAX_NUMBER);
  imagePreview.style.transform = 'scale(1)';
  imagePreview.style.filter = 'none';
  resetEffects();
  effectOriginal.checked = true;
};

export { resetImageForm, effectOriginal, imageUploadEffectLevelFieldset };
