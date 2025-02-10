const namProductShopify = globalNamProduct;

const namProductRgbCartData = {
  chairPrice: 499.99,
  chairColor: "Black/Black",
  options: [
    {
      key: "upgrade",
      price: 299,
      isSelected: false,
      title: "RGB Led Kit Upgdare",
      shopifyVariantId: 29205503017071,
    },
    {
      key: "light-up",
      price: 22.99,
      isSelected: false,
      title: "Light Up Your Logo. <a onclick='namRgbModalEngraveLogoOpen()'>Engrave your logo</a>",
      shopifyVariantId: 32306735644783,
    },
    {
      key: "bottom-kit",
      price: 229.99,
      isSelected: false,
      title: "RGB LED Bottom Kit",
      shopifyVariantId: 29205503869039,
    },
  ],
  quantity: 1,
  totalPrice: 499.99,
};

let namProductColorCurrentSelectionIndex = 0;

// Color variant selection
const namProductColorOptions = document.getElementsByClassName(
  "nam-product__select-color__option"
);
const namProductSelectColorOptions = document.getElementById(
  "namProductSelectColorOptions"
);
const namPreloadImage = (url) => {
    var img=new Image();
    img.src=url;
}
// Preload color base image
namProductShopify.variants.forEach(variant => {
  namPreloadImage(variant.featured_image.src);
})
const namProductSelectColorOptionsHTML = namProductShopify.variants
  .map(
    (v, index) => `<div class="nam-product__select-color__option ${
      index === 0 ? "selected" : ""
    }">
            <img
              src="${v.featured_image.src.replace(".png", "_100x100.png")}"
              alt="product color option"
            />
            <div class="nam-product__select-color__option__title">
              ${v.title}
            </div>
            </div>`
  )
  .join("");
namProductSelectColorOptions.innerHTML = namProductSelectColorOptionsHTML;

const ProductMainImage = document.getElementById("ProductMainImage");
const namProductBigVideo = document.getElementById("namProductBigVideo");

let namProductBigBaseImgSrc = "";
const namProductImagesSelection = document.getElementById(
  "namProductImagesSelection"
);

const npiSelectionBaseImg = document.getElementById("npiSelectionBaseImg");
const npiSelectionStaticImgs = document.getElementById(
  "npiSelectionStaticImgs"
);

const namShowBigImg = () => {
  ProductMainImage.style.display = "block";
  namProductBigVideo.style.display = "none";
  namProductBigVideo.pause();
};
const namShowBigVideo = () => {
  ProductMainImage.style.display = "none";
  namProductBigVideo.style.display = "block";
  namProductBigVideo.play();
};

const namRemoveClassname = (elements, classname) => {
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    element.classList.remove(classname);
  }
};

const namProductVariantId = document.getElementById("namProductVariantId");
namProductVariantId.value = namProductShopify.variants[0].id;

const namProductColorSelectHandler = (i) => {
  namProductColorCurrentSelectionIndex = i;
  const variant = namProductShopify.variants[i];

  namProductRgbCartData.chairColor = variant.title;

  // Update images selection
  const variantTitle = variant.title.replace("/", "-").replace(" ", "-");
  const baseImageSrc = namProductShopify.images.find((src) =>
    src.includes(`${variantTitle}-base`)
  );
  namProductBigBaseImgSrc = baseImageSrc;

  ProductMainImage.src = baseImageSrc;
  npiSelectionBaseImg.src = baseImageSrc.replace(".jpg", "_100x100.jpg");
  namRemoveClassname(
    document.getElementsByClassName("nam-product-images__selection__img"),
    "selected"
  );
  npiSelectionBaseImg.classList.add("selected");
  namShowBigImg();
  updateBigImageForRgbOption();

  npiSelectionBaseImg.onclick = () => {
    ProductMainImage.src = baseImageSrc;
    namRemoveClassname(
      document.getElementsByClassName("nam-product-images__selection__img"),
      "selected"
    );
    npiSelectionBaseImg.classList.add("selected");

    namShowBigImg();
  };

  namProductVariantId.value = variant.id;
};

// Add static images, video selection
const namSeletionVideoThumbnail = namProductShopify.images.find((src) =>
  src.includes("v2-video-thumbnail")
);
const namVideoThumbnailHtml = document.createElement("div");
namVideoThumbnailHtml.classList.add("video-thumbnail-wrapper");
namVideoThumbnailHtml.innerHTML = `<img
src="${namSeletionVideoThumbnail?.replace(".jpg", "_100x100.jpg")}"
class="nam-product-images__selection__img"
/>
<img src="//cdn.shopify.com/s/files/1/1759/4609/files/ls-play-video.svg" class="play-btn" />`;
npiSelectionStaticImgs.appendChild(namVideoThumbnailHtml);
namVideoThumbnailHtml.onclick = () => {
  namRemoveClassname(
    document.getElementsByClassName("nam-product-images__selection__img"),
    "selected"
  );
  namVideoThumbnailHtml
    .querySelector(".nam-product-images__selection__img")
    .classList.add("selected");

  namShowBigVideo();
};

const namSelectionStaticImgs = namProductShopify.images.filter((src) =>
  src.includes("v2-image")
);
namSelectionStaticImgs.forEach((s) => {
  const imgElement = document.createElement("img");
  imgElement.src = s;
  imgElement.classList.add("nam-product-images__selection__img");
  npiSelectionStaticImgs.appendChild(imgElement);
  imgElement.onclick = () => {
    const src = s.replace("_100x100", "");
    ProductMainImage.src = src;
    namProductBigBaseImgSrc = src;
    const imgs = document.getElementsByClassName(
      "nam-product-images__selection__img"
    );
    namRemoveClassname(imgs, "selected");
    imgElement.classList.add("selected");

    namShowBigImg();
  };
});

namProductColorSelectHandler(0);

for (let i = 0; i < namProductColorOptions.length; i++) {
  const element = namProductColorOptions[i];
  element.onclick = () => {
    namProductColorSelectHandler(i);
    namRemoveClassname(namProductColorOptions, "selected");
    element.classList.add("selected");
  };
}

const namProductRgbOptions = document.getElementsByClassName(
  "nam-product__rgb-option"
);
const namProductRgbEngraveBtn = document.getElementById(
  "namProductRgbEngraveBtn"
);
const namProductRgbOption2 = document.getElementById("namProductRgbOption2");

for (let i = 0; i < namProductRgbOptions.length; i++) {
  const element = namProductRgbOptions[i];
  const addToChairTextElm = element.querySelector(
      ".nam-product__rgb-option__add-to-chair-text"
    );
  
  element.onclick = () => {
    // Add icon and update price
    const addIcon = element.querySelector(
      ".nam-product__rgb-option__added-icon"
    );
    
    const namProductRgbSelectionDataOption = namProductRgbCartData.options[i];
    if (addIcon.style.display === "none") {
      addIcon.style.display = "block";
      namProductRgbSelectionDataOption.isSelected = true;
      namProductRgbCartData.totalPrice +=
        namProductRgbSelectionDataOption.price;
      addToChairTextElm.textContent = "Added to chair";
    } else {
      addIcon.style.display = "none";
      namProductRgbSelectionDataOption.isSelected = false;
      namProductRgbCartData.totalPrice -=
        namProductRgbSelectionDataOption.price;
      addToChairTextElm.textContent = "Add to chair";
    }

    if (i === 0) {
      // Show second option and rgb image
      if (namProductRgbOption2.style.maxHeight === "0px") {
        namProductRgbOption2.style.maxHeight = "500px";
        namProductRgbOption2.style.marginBottom = "20px";
      } else {
        namProductRgbOption2.style.maxHeight = "0";
        namProductRgbOption2.style.marginBottom = "0";
      }
    }

    // Update display of engrave btn
    if (i === 1) {
      if (namProductRgbEngraveBtn.style.display === "none") {
        namProductRgbEngraveBtn.style.display = "block";
      } else {
        namProductRgbEngraveBtn.style.display = "none";
      }
    }

    // Update total price
    namProductUpdateTotalPrice(namProductRgbCartData);
  // update big image by rgb options
    updateBigImageForRgbOption();
  };
}

// Calculate total price
const namProductTotalPriceWithOptions = document.getElementById(
  "namProductTotalPriceWithOptions"
);
const namProductTotalPriceWithOptionsList =
  namProductTotalPriceWithOptions.querySelector(
    ".nam-product__total-price__options__list"
  );
const namProductTotalPriceNumber = document.getElementById(
  "namProductTotalPrice"
);

const namProductUpdateTotalPrice = (data = namProductRgbCartData) => {
  let isRgbKitAdded = data.options.find((o) => o.key === "upgrade").isSelected;
  const optionAdded = data.options.filter((o) => {
    if (o.key === "light-up") {
      if (!isRgbKitAdded) {
        return false;
      }
    }
    return o.isSelected;
  });
  const optionList = optionAdded
    .map(
      (o) =>
        `<li><div class="each"><div class="title">${o.title}</div><div class="price">$${o.price}</div></div></li>`
    )
    .join("");
  if (optionList.length > 0) {
    namProductTotalPriceWithOptions.style.display = "block";
    namProductTotalPriceWithOptionsList.innerHTML = optionList;
  } else {
    namProductTotalPriceWithOptions.style.display = "none";
  }

  namProductTotalPriceNumber.innerText = `$${(
    data.totalPrice * data.quantity
  ).toFixed(2)}`;
};

// Update cart quantity
const namProductCartQuantityDownBtn = document.getElementById(
  "namProductCartQuantityDownBtn"
);
const namProductCartQuantityUpBtn = document.getElementById(
  "namProductCartQuantityUpBtn"
);
const namProductCartQuantity = document.getElementById(
  "namProductCartQuantity"
);
const namProductQuantity = document.getElementById("namProductQuantity");

namProductCartQuantityDownBtn.onclick = () => {
  if (namProductRgbCartData.quantity > 1) {
    namProductRgbCartData.quantity--;
    namProductCartQuantity.innerText = namProductRgbCartData.quantity;
    namProductUpdateTotalPrice();
    namProductQuantity.value = namProductRgbCartData.quantity;
  }
};
namProductCartQuantityUpBtn.onclick = () => {
  namProductRgbCartData.quantity++;
  namProductCartQuantity.innerText = namProductRgbCartData.quantity;
  namProductUpdateTotalPrice();
  namProductQuantity.value = namProductRgbCartData.quantity;
};

// Add to cart action
const namProductAtcBtn = document.getElementById("namProductAtcBtn");
const AddToCartForm = document.getElementById("AddToCartForm");
namProductAtcBtn.onclick = async () => {
  let isRgbKitAdded = namProductRgbCartData.options.find(
    (o) => o.key === "upgrade"
  ).isSelected;
  const rgbOptionSelected = namProductRgbCartData.options.filter((o) => {
    if (o.key === "light-up") {
      if (!isRgbKitAdded) {
        return false;
      }
    }
    return o.isSelected;
  });

  for (let i = 0; i < rgbOptionSelected.length; i++) {
  	const cartFormData = new FormData();
    const o = rgbOptionSelected[i];

    cartFormData.append("id", o.shopifyVariantId);
    cartFormData.append("quantity", namProductRgbCartData.quantity);

    await fetch("/cart/add.js", {
      method: "POST",
      body: cartFormData,
    });
  }
  AddToCartForm.submit();
};

// Flickity
new Flickity(document.getElementById("npiSelectionStaticImgs"), {
  contain: true,
  pageDots: false,
  freeScroll: true,
  groupCells: true,
});
