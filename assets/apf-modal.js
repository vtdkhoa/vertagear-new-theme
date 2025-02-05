// Close lumbar popup
const apfPopupWrapper = document.getElementById("apfPopupWrapper");

const namCloseApfPopup = () => {
  apfPopupWrapper.style.height = "0";
  const body = document.getElementsByTagName("body")[0];
  body.classList.remove("noscroll");
};

const namOpenApfPopup = () => {
  apfPopupWrapper.style.height = "100%";
  const body = document.getElementsByTagName("body")[0];
  body.classList.add("noscroll");
};