// Check page position to show header bar
function isOverTopLumbar(element) {
  const rect = element.getBoundingClientRect();

  return rect.top <= 0;
}
if (window.innerWidth >= 768) {
  const popHeader = document.getElementById("lsLumbarPopHeader");
  const triggerElement = document.getElementById("lsLumbarHero");
  const collapseHeader = popHeader.querySelector(".collapse");
  const fullHeader = popHeader.querySelector(".full");
  collapseHeader.style.display = "none";
  const lsLumbar = document.getElementById("lsLumbar");

  lsLumbar.addEventListener("scroll", () => {
    if (isOverTopLumbar(triggerElement)) {
      fullHeader.style.display = "none";
      collapseHeader.style.display = "flex";
    } else {
      fullHeader.style.display = "flex";
      collapseHeader.style.display = "none";
    }
  });
}

// Close lumbar popup
const lumbarPopupWrapper = document.getElementById("lumbarPopupWrapper");

const namCloseLumbarPopup = () => {
  lumbarPopupWrapper.style.height = "0";
  const body = document.getElementsByTagName("body")[0];
  body.classList.remove("noscroll");
};

const namOpenLumbarPopup = () => {
  lumbarPopupWrapper.style.height = "100%";
  const body = document.getElementsByTagName("body")[0];
  body.classList.add("noscroll");
};
