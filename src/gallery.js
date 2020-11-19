import imgArray from './gallery-items.js';

const imgLightbx = document.querySelector('.lightbox__image');
const galleryList = document.querySelector('.js-gallery');

const lightBox = document.querySelector('.js-lightbox');
const btnClose = document.querySelector('.lightbox__button');
const imgCard = createImgCard(imgArray);
let currentImgIndex;

galleryList.insertAdjacentHTML('beforeend', imgCard);
galleryList.addEventListener('click', onGalleryClick);
btnClose.addEventListener('click', btnCloseClick);

// функция создания разметки карточки в галерее
function createImgCard(imgArray) {
  return imgArray
    .map(({ preview, original, description }, index) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-index="${index}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join('');
}

// call-back функция для клика по картинке (открытие модального окна)
function onGalleryClick(ev) {
  ev.preventDefault();
  const imgRef = ev.target;
  const originalImgRef = imgRef.dataset.source;

  currentImgIndex = Number(imgRef.getAttribute('data-index'));

  if (imgRef.nodeName !== 'IMG') {
    return;
  }

  setLargeImgRef(originalImgRef);
  openModal(ev);
}

// функция замены ссылки изображения после клика на превью
function setLargeImgRef(source) {
  imgLightbx.src = source;
}

//функция открытия модалки
function openModal(ev) {
  lightBox.classList.add('is-open');
  window.addEventListener('keydown', onEscDown);
  window.addEventListener('keydown', onRightDown);
  window.addEventListener('keydown', onLeftDown);
}

// call-back функция для клика по кнопке закрытия модалки
function btnCloseClick(ev) {
  if (ev.target.nodeName !== 'BUTTON') {
    return;
  }
  closeModal(ev);
}

// функция закрытия модального окна
// +очистка src
function closeModal(ev) {
  lightBox.classList.remove('is-open');

  // удаление слушателей на ESC, влево, вправо(доп задание):
  window.removeEventListener('keydown', onEscDown);
  window.removeEventListener('keydown', onRightDown);
  window.removeEventListener('keydown', onLeftDown);

  // очистка src, чтобы не мелькало большое изображение:
  imgLightbx.src = '';
}

//******дополнительное задание********
const overlayRef = document.querySelector('.lightbox__overlay');

overlayRef.addEventListener('click', overlayRefClick);

// call-back функция для клика по области модалки (закрытие)
function overlayRefClick(ev) {
  if (ev.target === ev.currentTarget) {
    closeModal(ev);
  }
}

// call-back функция для Esc (закрытие)
function onEscDown(ev) {
  if (ev.code === 'Escape') {
    closeModal(ev);
  }
}

// call-back функция для кнопки Вправо (пролистывание)
function onRightDown(ev) {
  if (ev.code === 'ArrowRight') {
    currentImgIndex += 1;
    if (currentImgIndex === imgArray.length) {
      currentImgIndex = 0;
    }
    imgLightbx.src = '';
    imgLightbx.src = imgArray[currentImgIndex].original;
  }
}

// call-back функция для кнопки Влево (пролистывание)
function onLeftDown(ev) {
  if (ev.code === 'ArrowLeft') {
    currentImgIndex -= 1;
    if (currentImgIndex === -1) {
      currentImgIndex = imgArray.length - 1;
    }
    imgLightbx.src = '';
    imgLightbx.src = imgArray[currentImgIndex].original;
  }
}
