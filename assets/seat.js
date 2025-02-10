{
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
  const lsSeat = document.getElementById("lsSeat");
  for (let i = 0; i < lsVideoWrappers.length; i++) {
    const element = lsVideoWrappers[i];
    const videos = element.getElementsByTagName("video");
    const playBtn = element.querySelector(".play-btn");
    lsSeat.addEventListener("scroll", () => {
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

  const lsSeatContent = document.getElementsByClassName("ls-seat-content");
  for (let i = 0; i < lsSeatContent.length; i++) {
    const element = lsSeatContent[i];
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
}

// Hero video
const seatHeroVideo = document.getElementById("seatHeroVideo");
const seatHeroVideoPlayBtn = document.getElementById(
  "seatHeroVideoPlayBtn"
);

seatHeroVideo.onclick = () => {
  if (seatHeroVideo.paused) {
    seatHeroVideo.play();
    seatHeroVideoPlayBtn.style.display = "none";
  } else {
    seatHeroVideo.pause();
    seatHeroVideoPlayBtn.style.display = "block";
  }
};
