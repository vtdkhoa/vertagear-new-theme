function signatureIsInViewport(element) {
  const rect = element.getBoundingClientRect();
  const isInViewport =
    rect.top < window.innerHeight / 2 && rect.top >= -400 && rect.left >= 0;

  return isInViewport;
}

const signatureVideoWrappers = document.getElementsByClassName(
  "signature-section__content"
);
for (let i = 0; i < signatureVideoWrappers.length; i++) {
  const element = signatureVideoWrappers[i];
  const video =
    window.innerWidth < 768
      ? element.querySelector("video.display-mobile")
      : element.querySelector("video.display-desktop");
  const playBtn = element.querySelector(".ss__play-btn");
  window.addEventListener("scroll", () => {
    if (!video) return;
    if (signatureIsInViewport(video)) {
      video.play();
      playBtn.style.display = "none";
    } else {
      video.pause();
      playBtn.style.display = "block";
    }
  });

  video.onclick = () => {
    if (video.paused) {
      video.play();
      playBtn.style.display = "none";
    } else {
      video.pause();
      playBtn.style.display = "block";
    }
  }
}