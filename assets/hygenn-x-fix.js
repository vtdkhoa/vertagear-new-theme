try {

  if (window.innerWidth < 768) {
    new Flickity(".hygenn-features__slides", {
      cellAlign: "left",
      contain: true,
      prevNextButtons: false,
    });
  }

  // Hero video
  const hygennHeroVideo = document.getElementById("hygennHeroVideo");
  const hygennHeroVideoPlayBtn = document.getElementById(
    "hygennHeroVideoPlayBtn"
  );

  hygennHeroVideo.onclick = () => {
    if (hygennHeroVideo.paused) {
      hygennHeroVideo.play();
      hygennHeroVideoPlayBtn.style.display = "none";
    } else {
      hygennHeroVideo.pause();
      hygennHeroVideoPlayBtn.style.display = "block";
    }
  };

  // For auto video and see more content

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
  const hygennX = document.getElementById("hygennX");
  for (let i = 0; i < lsVideoWrappers.length; i++) {
    const element = lsVideoWrappers[i];
    const video = element.querySelector("video");
    const playBtn = element.querySelector(".play-btn");
    hygennX.addEventListener("scroll", () => {
      if (!video) return;
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

  const lsHygennContent = document.getElementsByClassName("ls-hygenn-content");
  for (let i = 0; i < lsHygennContent.length; i++) {
    const element = lsHygennContent[i];
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




} catch (error) {

}