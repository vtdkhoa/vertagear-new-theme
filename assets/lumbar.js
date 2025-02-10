function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const isInViewport =
    rect.top < window.innerHeight / 2 && rect.top >= 0 && rect.left >= 0;
  // rect.bottom <=
  //   (window.innerHeight || document.documentElement.clientHeight) / 1.5 &&
  // rect.right <= (window.innerWidth || document.documentElement.clientWidth);

  return isInViewport;
}

const lsVideoWrappersLumbar = document.getElementsByClassName(
  "ls-signature__video-wrapper"
);
const lsLumbar = document.getElementById("lsLumbar");
for (let i = 0; i < lsVideoWrappersLumbar.length; i++) {
  const element = lsVideoWrappersLumbar[i];
  const videos = element.getElementsByTagName("video");
  const playBtn = element.querySelector(".play-btn");
  lsLumbar.addEventListener("scroll", () => {
    for (const video of videos) {
      if (!video) return;
      if (isInViewport(video)) {
        video.play();
        playBtn.style.display = "none";
      } else {
        video.pause();
        playBtn.style.display = "block";
      }
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

const lsSeatContent = document.getElementsByClassName("ls-seat-content");
for (let i = 0; i < lsSeatContent.length; i++) {
  const element = lsSeatContent[i];
  const content = lsContent.seat[i];
  element.addEventListener("click", () => {
    element.innerHTML = content;
  });
}

// Hero video
const lumbarHeroVideo = document.getElementById("lumbarHeroVideo");
const lumbarHeroVideoPlayBtn = document.getElementById(
  "lumbarHeroVideoPlayBtn"
);

lumbarHeroVideo.onclick = () => {
  if (lumbarHeroVideo.paused) {
    lumbarHeroVideo.play();
    lumbarHeroVideoPlayBtn.style.display = "none";
  } else {
    lumbarHeroVideo.pause();
    lumbarHeroVideoPlayBtn.style.display = "block";
  }
};

const lumbarHeroVideoMobile = document.getElementById("lumbarHeroVideoMobile");

lumbarHeroVideoMobile.onclick = () => {
  if (lumbarHeroVideoMobile.paused) {
    lumbarHeroVideoMobile.play();
    lumbarHeroVideoPlayBtn.style.display = "none";
  } else {
    lumbarHeroVideoMobile.pause();
    lumbarHeroVideoPlayBtn.style.display = "block";
  }
};
