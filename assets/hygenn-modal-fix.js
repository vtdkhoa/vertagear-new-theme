//------------------------------------------
var clssPopup_HygennModal = (function () {
  // Check page position to show header bar
  function isOverTop(element) {
    const rect = element.getBoundingClientRect();

    return rect.top <= 0;
  }

  function init() {

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
  
  }

  ////////////////////////////
  //RETURN
  return {
    init: init,
  }
})();

////////////////////////////////////
//run with setinteval

$(function () {
  clssPopup_HygennModal.init();
});

