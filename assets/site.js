const filterBar = document.querySelector('.price-filters');
const catalog = document.querySelector('.catalog');
const priceStatus = document.querySelector('#price-status');

filterBar.hidden = false;
filterBar.addEventListener('click', (event) => {
  const chosen = event.target.closest('button[data-filter]');
  if (!chosen) return;

  const key = chosen.dataset.filter;
  let visibleRows = 0;
  for (const section of catalog.querySelectorAll('[data-group]')) {
    section.hidden = key !== 'all' && section.dataset.group !== key;
    if (!section.hidden) visibleRows += section.querySelectorAll('.price-row').length;
  }
  for (const button of filterBar.querySelectorAll('button[data-filter]')) {
    button.setAttribute('aria-pressed', String(button === chosen));
  }
  catalog.classList.toggle('filtered', key !== 'all');
  priceStatus.textContent = `Показано позиций: ${visibleRows}`;
});

const lightbox = document.querySelector('.lightbox');
const photos = Array.from(document.querySelectorAll('[data-photo]'));

if (typeof lightbox.showModal === 'function') {
  const preview = document.querySelector('#lightbox-image');
  const count = document.querySelector('#lightbox-count');
  let current = 0;
  let opener = null;

  function showPhoto(index) {
    current = (index + photos.length) % photos.length;
    preview.src = photos[current].href;
    preview.alt = photos[current].querySelector('img').alt;
    count.textContent = `${current + 1} / ${photos.length}`;
  }

  photos.forEach((photo, index) => {
    photo.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = photo;
      showPhoto(index);
      lightbox.showModal();
    });
  });

  lightbox.querySelector('.lightbox-previous').addEventListener('click', () => showPhoto(current - 1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => showPhoto(current + 1));
  lightbox.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') showPhoto(current - 1);
    if (event.key === 'ArrowRight') showPhoto(current + 1);
  });
  lightbox.addEventListener('close', () => opener?.focus());
}
