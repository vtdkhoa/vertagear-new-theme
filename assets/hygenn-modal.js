// Check page position to show header bar
function isOverTop(element) {
  const rect = element.getBoundingClientRect();

  return rect.top <= 0;
}
if (window.innerWidth >= 768) {
  const popHeader = document.getElementById("hygennPopHeader");
  const triggerElement = document.getElementById("hygennHero");
  const collapseHeader = popHeader.querySelector(".collapse");
  const fullHeader = popHeader.querySelector(".full");
  collapseHeader.style.display = "none";
  const hygennX = document.getElementById("hygennX");

  hygennX.addEventListener("scroll", () => {
    if (isOverTop(triggerElement)) {
      fullHeader.style.display = "none";
      collapseHeader.style.display = "flex";
    } else {
      fullHeader.style.display = "flex";
      collapseHeader.style.display = "none";
    }
  });
}

// Close lumbar popup
const hygennPopupWrapper = document.getElementById("hygennPopupWrapper");

const namCloseHygennPopup = () => {
  hygennPopupWrapper.style.height = "0";
  const body = document.getElementsByTagName("body")[0];
  body.classList.remove("noscroll");
};
const namOpenHygennPopup = () => {
  hygennPopupWrapper.style.height = "100%";
  const body = document.getElementsByTagName("body")[0];
  body.classList.add("noscroll");
}
