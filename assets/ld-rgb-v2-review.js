var reviewInnerWidth = window.innerWidth;

if (innerWidth < 768) {
  new Flickity(".rgb_review_container", {
    contain: true,
    prevNextButtons: false,
  });
}
