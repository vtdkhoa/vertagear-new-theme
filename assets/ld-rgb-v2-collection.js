var rgbHeroPlayBtn = document.getElementById("rgbHeroPlayBtn");
var rgbHeroModal = document.getElementById("rgbHeroModal");
var rgbHeroCloseBtn = document.getElementById("rgbHeroCloseBtn");
var rgbHeroModalDeskVideo = rgbHeroModal.querySelector(".display-desktop");
var rgbHeroModalMobVideo = document.getElementById("rgbCollectionVideoMob");

var rgbInnerWidth = window.innerWidth;

rgbHeroPlayBtn.onclick = () => {
  rgbHeroModal.style.display = "flex";
  if (rgbInnerWidth >= 500) {
    rgbHeroModalDeskVideo.play();
  } else {
    rgbHeroModalMobVideo.style.display = "block";
    rgbHeroModalMobVideo.play();
  }
};
rgbHeroCloseBtn.onclick = () => {
  rgbHeroModal.style.display = "none";
  if (rgbInnerWidth >= 500) {
    rgbHeroModalDeskVideo.pause();
  } else {
    rgbHeroModalMobVideo.pause();
  }
};