const isOverTopSeat = (element) => {
  const rect = element.getBoundingClientRect();

  return rect.top <= 0;
};

if (window.innerWidth >= 768) {
  const popHeader = document.getElementById("lsSeatPopHeader");
  const triggerElement = document.getElementById("lsSeatHero");
  const collapseHeader = popHeader.querySelector(".collapse");
  const fullHeader = popHeader.querySelector(".full");
  collapseHeader.style.display = "none";
  const lsSeat = document.getElementById("lsSeat");

  lsSeat.addEventListener("scroll", () => {
    if (isOverTopSeat(triggerElement)) {
      fullHeader.style.display = "none";
      collapseHeader.style.display = "flex";
    } else {
      fullHeader.style.display = "flex";
      collapseHeader.style.display = "none";
    }
  });
}

// Close seat popup
const seatPopupWrapper = document.getElementById("seatPopupWrapper");

const namCloseSeatPopup = () => {
  seatPopupWrapper.style.height = "0";
  const body = document.getElementsByTagName("body")[0];
  body.classList.remove("noscroll");
};

const namOpenSeatPopup = () => {
  seatPopupWrapper.style.height = "100%";
  const body = document.getElementsByTagName("body")[0];
  body.classList.add("noscroll");
};