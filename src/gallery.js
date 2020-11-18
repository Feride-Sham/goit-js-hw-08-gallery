import imgArray from "./gallery-items.js";

const imgLightbx = document.querySelector(".lightbox__image");
const galleryList = document.querySelector(".js-gallery");

const lightBox = document.querySelector(".js-lightbox");
const btnClose = document.querySelector(".lightbox__button");
const imgCard = createImgCard(imgArray);

galleryList.insertAdjacentHTML("beforeend", imgCard);
galleryList.addEventListener("click", onGalleryClick);
btnClose.addEventListener("click", btnCloseClick);

// функция создания разметки карточки в галерее
function createImgCard(imgArray) {
  return imgArray
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join("");
}

// call-back функция для клика по картинке
function onGalleryClick(ev) {
  ev.preventDefault();

  const imgRef = ev.target;
  // console.log(imgRef);
  // const parentImgRef = imgRef.closest(".gallery__item");
  // console.log(galleryList.children);
  // console.log(parentImgRef);

  if (imgRef.nodeName !== "IMG") {
    return;
  }

  const originalImgRef = imgRef.dataset.source;
  setLargeImgRef(originalImgRef);
  openModal(ev);
}

// функция замены ссылки изображения после клика на превью
function setLargeImgRef(source) {
  imgLightbx.src = source;
}

//функция открытия модалки
function openModal(ev) {
  lightBox.classList.add("is-open");
  window.addEventListener("keydown", onEscDown);
  // imgLightbx.setAttribute("data-index", value);
}

// call-back функция для клика по кнопке закрытия модалки
function btnCloseClick(ev) {
  if (ev.target.nodeName !== "BUTTON") {
    return;
  }
  closeModal(ev);
}

// функция закрытия модального окна
// +очистка src
function closeModal(ev) {
  lightBox.classList.remove("is-open");

  // удаление слушателя на ESC(доп задание):
  window.removeEventListener("keydown", onEscDown);

  // очистка src, чтобы не мелькало большое изображение:
  imgLightbx.src = "";
}

//******дополнительное задание********
const overlayRef = document.querySelector(".lightbox__overlay");

overlayRef.addEventListener("click", overlayRefClick);

// call-back функция для клика по области модалки (закрытие)
function overlayRefClick(ev) {
  if (ev.target === ev.currentTarget) {
    closeModal(ev);
  }
}

// call-back функция для Esc (закрытие)
function onEscDown(ev) {
  if (ev.code === "Escape") {
    closeModal(ev);
  }
}
