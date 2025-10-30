import { changeFilter} from './images-filters.js';
import { renderImages } from './thumbnail-render.js';
import { sortArrayRandom, debounce } from './util.js';

const SORT_IMAGES_DELAY = 500;
const RANDOM_IMAGES_COUNT = 10;
const filters = document.querySelector('.img-filters__form');

const sortArrayByComments = (a, b) => b.comments.length - a.comments.length;

const renderImagesByFilter = (filterType, pictures, onPictureClick) => {
  let sortingPictures = pictures;
  switch (filterType) {
    case 'filter-random':
      sortingPictures = sortArrayRandom(pictures.slice()).slice(0, RANDOM_IMAGES_COUNT);
      break;
    case 'filter-discussed':
      sortingPictures = pictures.slice().sort(sortArrayByComments);
      break;
    default:
      sortingPictures = pictures;
      break;
  }
  renderImages(sortingPictures, onPictureClick);
};
const renderImagesByFilterWithTimeOut = debounce(renderImagesByFilter, SORT_IMAGES_DELAY);

const sortImages = (pictures, onPictureClick) => {
  filters.addEventListener('click', ({ target }) => {
    const button = target.closest('.img-filters__button');
    if (button) {
      changeFilter(button);
      const filterType = button.id;
      renderImagesByFilterWithTimeOut(filterType, pictures, onPictureClick);
    }
  });
};

export { sortImages };
