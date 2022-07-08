import { api, resetPage, addPage, page } from './api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { render } from './render';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
let searchTag = '';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  buttonMore: document.querySelector('.btn-primary'),
  spinner: document.querySelector('.spinner-border'),
  smallImg: document.querySelector('.photo-card__img'),
};
const addPart = card => {
  refs.gallery.insertAdjacentHTML('beforeend', render(card));
  refs.buttonMore.classList.remove('d-none');
};
function cleanInput() {
  refs.gallery.innerHTML = '';
}
function addLoader() {
  refs.spinner.classList.remove('d-none');
}
function removeLoader() {
  refs.spinner.classList.add('d-none');
}
function lastPage(res) {
  if (Math.ceil(res.totalHits / 40) === page) {
    Notify.failure(
      `We're sorry, but you've reached the end of search results.`
    );
    refs.buttonMore.classList.add('d-none');
  }
}
function onClickImg(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  var lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
  });
  console.log(lightbox);
}
refs.form.addEventListener('submit', async event => {
  event.preventDefault();

  searchTag = refs.form.elements.searchQuery.value.trim();
  if (searchTag === '') {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again'
    );
  }
  resetPage();
  cleanInput();
  addLoader();
  refs.buttonMore.classList.add('d-none');
  api(searchTag).then(card => {
    addPart(card);
    removeLoader();
    refs.buttonMore.classList.remove('d-none');
    Notify.success(`Success operation, we are added ${card.totalHits} cards`);
    lastPage(card);
    // refs.smallImg.addEventListener();
  });
});
refs.buttonMore.addEventListener('click', () => {
  addPage();
  api(searchTag).then(card => {
    addPart(card);
    lastPage(card);
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
    lightbox().refresh();
  });
});

refs.gallery.addEventListener('click', onClickImg);
