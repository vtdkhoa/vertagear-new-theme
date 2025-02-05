const ldPlayPlauseVideo = (video) => {
  if (video.paused) {
    video.play(); 
    const ldVideoControlsAtt =  document.createAttribute("controls");
  	video.setAttributeNode(ldVideoControlsAtt);
  }
  else 
    video.pause(); 
}

const ldWhySection = document.getElementById("ldReasonWhy");
const ldVideoWrapper = ldWhySection.getElementsByClassName("ld-reason__why__videos__item__video-wrapper");
for (let i = 0; i < ldVideoWrapper.length; i++) {
  const video = ldVideoWrapper[i].querySelector("video");
  const playBtn = ldVideoWrapper[i].querySelector("img");
  playBtn.onclick = () => {
	ldPlayPlauseVideo(video);
  	playBtn.style.display = "none";
  }
}

const ldReviewElements = document.getElementsByClassName("ag-vg-product-rating");
for (element of ldReviewElements) {
  if (!element.hasChildNodes()) {
    element.style.display = "none";
  }
}
