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

  var ArrVideo = [
    {
      "desktop": "https://cdn.shopify.com/videos/c/o/v/e010190f17934ea6b20899641f2437e0.mp4",
      "mobile": "https://cdn.shopify.com/videos/c/o/v/121f399084084f3d818ba5daa4a3a143.mp4"
    },
    {
      "desktop": "https://cdn.shopify.com/videos/c/o/v/36ca87a8403b4b4ebe11fb37364637e7.mp4",
      "mobile": "https://cdn.shopify.com/videos/c/o/v/ab4af1620e414db8a2c6d1b24ce3d1c9.mp4"
    }
  ]



  const lsSeat = document.getElementById("lsSeat");
  for (let i = 0; i < lsVideoWrappers.length; i++) {
    const element = lsVideoWrappers[i];
    const video = element.querySelector("video");
    const playBtn = element.querySelector(".play-btn");

    if ($('body').attr('device') == 'Mobile') {

      video.src = ArrVideo[i].mobile;

    } else {
      video.src = ArrVideo[i].desktop;
    }

    lsSeat.addEventListener("scroll", () => {
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
