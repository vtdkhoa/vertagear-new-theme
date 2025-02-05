var galleryFlickity = new Flickity(".rgb__carousel-gallery", {
  freeScroll: true,
  contain: true,
  prevNextButtons: false,
  pageDots: false,
  autoPlay: 1500,
  pauseAutoPlayOnHover: false,
});

var rgbGalleryCarouselLeftBtn = document.getElementById(
  "rgbGalleryCarouselLeftBtn"
);
var rgbGalleryCarouselRightBtn = document.getElementById(
  "rgbGalleryCarouselRightBtn"
);
rgbGalleryCarouselLeftBtn.onclick = () => {
  galleryFlickity.previous();
};
rgbGalleryCarouselRightBtn.onclick = () => {
  galleryFlickity.next();
};
