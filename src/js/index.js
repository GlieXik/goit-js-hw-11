import { api } from './api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let searchTag = '';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  buttonMore: document.querySelector('.d-none'),
};
function render() {
  api(searchTag).then(data => {
    const markup = data
      .map(hit => {
        return `
        <div class="col-sm-3 ">
        <div class="photo-card card m-3">
          <img
            src="${hit.webformatURL}"
            alt=""
            loading="lazy"
            class="card-img-top "

          />
          <div class="info card-body d-flex justify-content-between align-items-center" style="font-size: 13px">
            <p class="info-item ">
              <b>Likes</b>
              <i>${hit.likes}</i>
            </p>
            <p class="info-item">
              <b>Views</b>
              <i>${hit.views}</i>
            </p>
            <p class="info-item">
              <b>Comments</b>
              <i>${hit.comments}</i>
            </p>
            <p class="info-item">
              <b>Downloads</b>
              <i>${hit.downloads}</i>
            </p>
          </div>
        </div>
      </div>

    `;
      })
      .join('');
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    refs.buttonMore.classList.remove('d-none');
  });
}
refs.form.addEventListener('submit', event => {
  event.preventDefault();
  restart();
  searchTag = refs.form.elements.searchQuery.value;
  if (searchTag === '') {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again'
    );
  }
  Notify.success('success');

  render();
});
function restart() {
  refs.gallery.innerHTML = '';
  refs.buttonMore.classList.add('d-none');
}
refs.buttonMore.addEventListener('click', () => {
  render();
});
