// mobile
var flkty = new Flickity(".rgb__feature__carousel", {
  // options
  cellAlign: "left",
  contain: true,
  prevNextButtons: false,
});

var rgbFeatureDescs = [
  {
    isShowMore: false,
    short:
      "With the power of our interactive gameplay modes, your gaming experience...",
    full: "With the power of our interactive gameplay modes, your gaming experience extends beyond your monitor and onto your chair. Detonate a bomb, see the lights flash. Get shot or injured, see the colors change from green to yellow to red. The sync options go on and on, allowing you to take your gameplay to the next level.",
  },
  {
    isShowMore: false,
    short:
      "All presets and effect customizations are done through your PC to...",
    full: "All presets and effect customizations are done through your PC to maintain a cord-free seating experience. The RGB LED kit is the first of its kind to allow full spectrum customization in lighting effects while keeping the mobility of a regular gaming chair. With zero wires to hold you back, you can achieve optimal performance while enjoying a symphony of visual effects to bolster your gaming experience.",
  },
  {
    isShowMore: false,
    short:
      "Customizable RGB LEDs let you style your gaming chair to match your...",
    full: "Customizable RGB LEDs let you style your gaming chair to match your mood. Choose from dozens of out-of-box presets and patterns or create your own, all from the ease of your fingertips. Fully adjustable intensity, pattern, color, and speeds of individual LEDs put the creative vision in your own hands.",
  },
  {
    isShowMore: false,
    short: "Charging is made simple with our multi-option recharging method...",
    full: "Charging is made simple with our multi-option recharging method. The magnetic charging port allows you to quickly connect/disconnect with ease. If wiring is not your choice, you may opt for rechargeable batteries and external charging instead. Different uses for different habits.",
  },
];

var rgbFeatureDescElements = document.getElementsByClassName(
  "cell__content__text__desc"
);
for (let i = 0; i < rgbFeatureDescElements.length; i++) {
  var element = rgbFeatureDescElements[i];
  var rgbFeatureDesc = rgbFeatureDescs[i];
  var desc = element.querySelector(".content");
  var seemore = element.querySelector(".see-more");

  element.onclick = () => {
    if (!rgbFeatureDesc.isShowMore) {
      rgbFeatureDesc.isShowMore = true;
      desc.innerHTML = rgbFeatureDesc.full;
      seemore.innerHTML = "See less";
    } else {
      rgbFeatureDesc.isShowMore = false;
      desc.innerHTML = rgbFeatureDesc.short;
      seemore.innerHTML = "See more";
    }
  };
}

// desktop
var flktyDesk = new Flickity(".rgb__feature__container", {
  freeScroll: true,
  contain: true,
  prevNextButtons: false,
  pageDots: false,
});
var rgbFeatureCarouselLeftBtn = document.getElementById(
  "rgbFeatureCarouselLeftBtn"
);
var rgbFeatureCarouselRightBtn = document.getElementById(
  "rgbFeatureCarouselRightBtn"
);
rgbFeatureCarouselLeftBtn.onclick = () => {
  flktyDesk.select("0");
};
rgbFeatureCarouselRightBtn.onclick = () => {
  flktyDesk.select("3");
};
