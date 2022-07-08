export const render = card => {
  const markup = card.hits
    .map(hit => {
      return `
      <div class="col-sm-3 ">
      <div class="photo-card card m-3">
      <a class="photo-card__img" href="${hit.largeImageURL}">
        <img
          src="${hit.webformatURL}"
          alt=""
          loading="lazy"
          class="card-img-top "
        />
        </a>
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
  return markup;
};
