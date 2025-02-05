if (typeof namCloseSeatPopup === 'function') {
  // do something
} else {
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
    seatPopupWrapper.style.display = "none";
  };
  
  const namOpenSeatPopup = () => {
    seatPopupWrapper.style.display = "block";
  };
}
