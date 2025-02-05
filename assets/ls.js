function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const isInViewport =
    rect.top < window.innerHeight / 2 && rect.top >= 0 && rect.left >= 0;
  // rect.bottom <=
  //   (window.innerHeight || document.documentElement.clientHeight) / 1.5 &&
  // rect.right <= (window.innerWidth || document.documentElement.clientWidth);

  return isInViewport;
}

const lsVideoWrappers = document.getElementsByClassName(
  "ls-signature__video-wrapper"
);
for (let i = 0; i < lsVideoWrappers.length; i++) {
  const element = lsVideoWrappers[i];
  const video = element.querySelector("video");
  const playBtn = element.querySelector(".ls-play-btn");
  window.addEventListener("scroll", () => {
    if (isInViewport(video)) {
      video.play();
      playBtn.style.display = "none";
    } else {
      video.pause();
      playBtn.style.display = "block";
    }
  });
}

// Content
const lsLumbarContent = document.getElementsByClassName("ls-lumbar-content");
for (let i = 0; i < lsLumbarContent.length; i++) {
  const element = lsLumbarContent[i];
  element.addEventListener("click", () => {
    const seeMoreElement = element.querySelector(".see-more");
    const seeLessElement = element.querySelector(".see-less");
    if (seeMoreElement.style.display === "none") {
      seeMoreElement.style.display = "block";
      seeLessElement.style.display = "none";
    } else {
      seeMoreElement.style.display = "none";
      seeLessElement.style.display = "block";
    }
  });
}
