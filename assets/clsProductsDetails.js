//PARAMATERS
var DetailProductShopify = globalProductDetail;
var DetailProductLEDBottomShopify = globalProductLEDBottom;
var DetailProductLEDTopShopify = globalProductLEDTop;
var DetailProductLightUpYourLogoShopify = globalLightUpYourLogo;

let ProductColorCurrentSelectionIndex = 0;


var ProductRgbCartData = {
  chairPrice: DetailProductShopify.variants[ProductColorCurrentSelectionIndex].price / 100,
  chairPrice_original: DetailProductShopify.variants[ProductColorCurrentSelectionIndex].compare_at_price ? DetailProductShopify.variants[ProductColorCurrentSelectionIndex].compare_at_price / 100 : DetailProductShopify.variants[ProductColorCurrentSelectionIndex].price / 100,
  chairColor: "Black/Black",
  options: [
    {
      key: "upgrade",
      price: DetailProductLEDTopShopify.variants[0].price / 100,
      price_original: DetailProductLEDTopShopify.variants[0].compare_at_price ? DetailProductLEDTopShopify.variants[0].compare_at_price / 100 : DetailProductLEDTopShopify.variants[0].price / 100,

      //price: DetailProductLEDTopShopify.id == '7033534775407' ? 229.99:159.99,
      isSelected: false,
      title: "RGB LED Top Kit",
      shopifyVariantId: DetailProductLEDTopShopify.variants[0].id,
    },
    {
      key: "light-up",
      price: DetailProductLightUpYourLogoShopify.variants[0].price / 100,
      price_original: DetailProductLightUpYourLogoShopify.variants[0].compare_at_price ? DetailProductLightUpYourLogoShopify.variants[0].compare_at_price / 100 : DetailProductLightUpYourLogoShopify.variants[0].price / 100,
      isSelected: false,
      title: "Light Up Your Logo.",
      shopifyVariantId: DetailProductLightUpYourLogoShopify.variants[0].id,
    },
    {
      key: "bottom-kit",
      price: DetailProductLEDBottomShopify.variants[0].price / 100,
      price_original: DetailProductLEDBottomShopify.variants[0].compare_at_price ? DetailProductLEDBottomShopify.variants[0].compare_at_price / 100 : DetailProductLEDBottomShopify.variants[0].price / 100,
      //price: 159.99,
      isSelected: false,
      title: "RGB LED Bottom Kit",
      shopifyVariantId: DetailProductLEDBottomShopify.variants[0].id,
    },
  ],
  inventory_quantity: 1,
  quantity: 1,
  totalPrice: DetailProductShopify.variants[ProductColorCurrentSelectionIndex].price / 100,
};

console.log(ProductRgbCartData)


var observeDOM = (function () {
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  return function (obj, callback) {
    if (!obj || obj.nodeType !== 1) return;

    if (MutationObserver) {
      // define a new observer
      var mutationObserver = new MutationObserver(callback)

      // have the observer observe foo for changes in children
      mutationObserver.observe(obj, { childList: true, subtree: true })
      return mutationObserver
    }

    // browser support fallback
    else if (window.addEventListener) {
      obj.addEventListener('DOMNodeInserted', callback, false)
      obj.addEventListener('DOMNodeRemoved', callback, false)
    }
  }
})()

var clsProductsDetails = (function () {
  ////////////////////////////
  //PARAMATERS
  var setting = {
    reorder: false,
  }
  ////////////////////////////
  //INIT
  function init() {
    if ($('.product800-detail').length == 0) return;

    detectdevices();
    zakeke_init();
    layout_init();

    cart_init();
    price_init();

    // khi cap nhat noi dung tu url => nen thay doi layout theo url 




  }

  ////////////////////////////
  ////////////////////////////
  //LAYOUTS
  function layout_init() {
    options_init();
    layout_loadcontents();
    layout_events();

  }

  function layout_events() {
    $('.nam-product__select-color__option').click(function (e) {

      ProductColorCurrentSelectionIndex = $(this).index();
      $('.nam-product__select-color__option').removeClass('selected')
      $(this).addClass('selected')

      layout_changeproduct()


    });

    $(document).click(function (e) {
      videoallowautoplay = true;
    });
  }


  function layout_loadcontents() {
    // MOVE code of NAM to HERE ???

    // Preload color base image
    DetailProductShopify.variants.forEach(variant => {
      preloadImage(variant.featured_image.src);
    })

    const namProductSelectColorOptions = document.getElementById("namProductSelectColorOptions");

    // get url 
    var objurl = url_get();
    $.each(DetailProductShopify.variants, function (indexInArray, valueOfElement) {
      if (valueOfElement.id == objurl.variant) ProductColorCurrentSelectionIndex = indexInArray;
    });

    // create elements contents
    var namProductSelectColorOptionsHTML = '';
    $.each(DetailProductShopify.variants, function (indexInArray, valueOfElement) {
      namProductSelectColorOptionsHTML += `<div id="variantselect-${valueOfElement.id}" class="nam-product__select-color__option ${indexInArray == ProductColorCurrentSelectionIndex ? "selected" : ""}">
        <img
          src="${valueOfElement.featured_image.src.replace(".jpg", "_200x200.jpg")}"
          alt="product color option"
        />
        <div class="nam-product__select-color__option__title">
          ${valueOfElement.title}
        </div>
        </div>`
    });

    namProductSelectColorOptions.innerHTML = namProductSelectColorOptionsHTML;

    layout_changeproduct();

  }

  function layout_changeproduct(i) {
    url_rebuil();

    const variant = DetailProductShopify.variants[ProductColorCurrentSelectionIndex];
    //console.log(variant)

    //console.log('layout_changeproduct', i)
    // MOVE code of NAM to HERE ???

    //$('.nam-product__total-price__pl4500-price').html(`$${variant.price / 100}`)
    $('.nam-product__total-price__title').html(DetailProductShopify.title)
    //$('.nam-product__total-price__title').html(DetailProductShopify.title)

    price_productUpdateTotalPrice();


    //set productid
    const namProductVariantId = document.getElementById("namProductVariantId");
    namProductVariantId.value = DetailProductShopify.variants[ProductColorCurrentSelectionIndex].id;

    ProductRgbCartData.chairColor = variant.title;

    // Update images selection
    const ProductMainImage = document.getElementById("ProductMainImage");
    const ProductZoomImage = document.getElementById("myresult");

    const npiSelectionBaseImg = document.getElementById("npiSelectionBaseImg");
    const variantTitle = variant.title.replace("/", "-").replace(" ", "-");
    const baseImageSrc = DetailProductShopify.images.find((src) =>
      src.includes(`${variantTitle}-base`)
    );

    ProductMainImage.src = baseImageSrc;
    ProductZoomImage.style.backgroundImage = "url('"+baseImageSrc+"')";

    if ($('#objstick #ProductMainImage').length > 0) {
      $('#objstick #ProductMainImage').attr('src', baseImageSrc);

    } else {
      $('#objstick').attr('src', baseImageSrc);
    }

    if ($('.image-container.image-zoom').length > 0) {
      $('.image-container.image-zoom #ProductMainImage').attr('src', baseImageSrc);
    }


    npiSelectionBaseImg.src = baseImageSrc.replace(".jpg", "_100x100.jpg");

    $(".nam-product-images__selection__img").removeClass('selected');

    npiSelectionBaseImg.classList.add("selected");
    namProductVariantId.value = variant.id;

    stick_setobjs();
    //console.log('// test update layout version 1')

    // test update layout version 1
    if ($('.layoutv1').length == 0) return;
    get_inventory_quantity(ProductColorCurrentSelectionIndex)
    handleDiscountDate(variant.id)

    if (ProductRgbCartData.quantity == 1) {
      $('#namProductCartQuantityDownBtn').addClass('unactive')
      if (!ProductRgbCartData.options[0].isSelected && !ProductRgbCartData.options[1].isSelected && !ProductRgbCartData.options[2].isSelected) {
        if ($('.hide-price-total').length > 0) {
          $('.hide-price-total').hide();
        }
      }
      else {
        if ($('.hide-price-total').length > 0) {
          $('.hide-price-total').css('display', 'flex');
        }
      }
    } else {
      $('#namProductCartQuantityDownBtn').removeClass('unactive')
      if ($('.hide-price-total').length > 0) {
        $('.hide-price-total').css('display', 'flex');
      }
    }

    // end test update layout version 1

  }



  ////////////////////////////
  ////////////////////////////
  //EDIT LOGO
  var paralogo = {
    properties: null,
    callAddtocard: false
  }

  function logo_init() {

  }

  function logo_setproperties(properties) {
    paralogo.properties = properties

    if (paralogo.callAddtocard) {
      cart_add();
    } else {
      zakeke_closepopup();
    }
  }

  function logo_getproperties() {

    return paralogo.properties ? {
      quantity: ProductRgbCartData.quantity,
      id: DetailProductLightUpYourLogoShopify.variants[0].id,
      type: DetailProductLightUpYourLogoShopify.tags.includes('Light Up Your Logo') ? 'Light Up Your Logo': '',
      form_type: 'product',
      'properties[customization]': paralogo.properties.customization,
      'properties[_previews]': paralogo.properties._previews,
      'properties[_zakekeZip]': paralogo.properties._zakekeZip
    } : null
  }

  function logo_addtocart() {

  }

  ////////////////////////////
  ////////////////////////////
  //ZAKEKE plugins
  let zakekeStartupInterval;
  function zakeke_init() {
    if (window.location.hostname === "localhost" || location.hostname === "127.0.0.1") {
      return;
    }

    if ($('.nam-product__rgb-options__list').length > 0) {
      zakeke_create();
      zakeke_events();
    }
  }

  function zakeke_create() {
    $('#zakeke-container').html('');

    zakekeStartupInterval = setInterval(() => {
      if (!window.zakekeDesigner) {
        return;
      }

      var options = {
        zakekeUrl: "https://portal.zakeke.com/",
        zakekeApiUrl: "https://api.zakeke.com/api/",
        shop: "vertagear.myshopify.com",
        priceHide: false,
        variantsHide: false,
        productAdvancedProcessing: false,
        productId: DetailProductLightUpYourLogoShopify.id,
        variantId: DetailProductLightUpYourLogoShopify.variants[0].id,
        design: null,
        quantity: 1,
        properties: {},
        locale: "en",
        customizationStrategy: 1,
        directDownload: true,
        sellingPlan: null,
      };

      //console.log('zakeke', options)

      clearInterval(zakekeStartupInterval);
      try {
        zakekeDesigner(options);
      } catch (error) {

      }
    }, 300);
  }

  function zakeke_events() {

    $('.js-zakeke_close').click(function (e) {
      zakeke_closepopup();
    });

    $('.js-zakeke_open').click(function (e) {
      e.stopPropagation();

      zakeke_openpopup();

      return false;
    });
  }


  function zakeke_changecontent() {
    //xu ly noi dung nut buttons 

  }

  function zakeke_openpopupwithoutaddtocart() {
    paralogo.callAddtocard = false;
    zakeke_openpopup()
  }

  function zakeke_openpopup() {
    zakeke_changecontent(); // kiem tra de xu ly nut buttons 

    var rgbModalEngraveLogo = document.getElementById("rgbModalEngraveLogo");
    rgbModalEngraveLogo.style.height = "100vh";

    engraveMobileOpen();

    var body = document.getElementsByTagName("body")[0];
    body.classList.add("noscroll");
  }

  function zakeke_closepopup() {
    var rgbModalEngraveLogo = document.getElementById("rgbModalEngraveLogo");
    rgbModalEngraveLogo.style.height = "0px";

    engraveMobileClose();

    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("noscroll");

    paralogo.callAddtocard = false;
  }

  // egrave on mobile
  function engraveMobileClose() {
    var zakekeContainer = document.getElementById("zakeke-container");
    var engraveLogoCustomIntro = document.getElementsByClassName("vertagear-custom-intro")[0];
    zakekeContainer.style.display = "none";
    engraveLogoCustomIntro.classList.remove("display-flex");


  }

  function engraveMobileOpen() {
    var zakekeContainer = document.getElementById("zakeke-container");
    var engraveLogoCustomIntro = document.getElementsByClassName("vertagear-custom-intro")[0];
    zakekeContainer.style.display = "block";
    engraveLogoCustomIntro.classList.add("display-flex");
  }

  ////////////////////////////
  ////////////////////////////
  //CART
  function cart_init() {
    console.log(123)

    // Click vao Add to card
    $('#namProductAtcBtn, .block-menuquickview .vertagear-cta, .productdetail-topbar .vertagear-cta').click(function (e) {
      e.preventDefault();
      //console.log('#namProductAtcBtn, .block-menuquickview .vertagear-cta')
      cart_add();
    });

    // Observe a specific DOM element:
    observeDOM(document.querySelector('#viewreorder'), function (m) {
      var addedNodes = [], removedNodes = [];
      console.log(m)

      m.forEach(record => record.addedNodes.length & addedNodes.push(...record.addedNodes))

      m.forEach(record => record.removedNodes.length & removedNodes.push(...record.removedNodes))

      //console.log('Added:', addedNodes, 'Removed:', removedNodes);
      if ($('.pre-order-2-button').length > 0) {
        $('#namProductAtcBtn, .buttonsaddtocart').html($('.pre-order-2-button').html()).addClass('reorder');
        $('.quickview-footer-group .vertagear-cta').html($('.pre-order-2-button').html()).addClass('reorder');
        $('.cta-addtocard').html('PRE-ORDER').addClass('reorder');
        $('.viewreorder-extrainfo').html($('.pre-order-2-message').html());

        setting.reorder = true;

        price_quantity_checkbutton();
      } else {
        console.log(123)
        $('#namProductAtcBtn, .buttonsaddtocart,.vertagear-cta.cta-addtocard').html('ADD TO CART').removeClass('reorder');
        $('.quickview-footer-group .vertagear-cta').html('<a class="vertagear-cta -blue " goto=""><img src="https://cdn.shopify.com/s/files/1/1759/4609/files/fe800-shopping-bag.svg?v=1697256452">ADD TO CART</a>').removeClass('reorder');
        $('.viewreorder-extrainfo').html('');

        setting.reorder = false;
        price_quantity_checkbutton();
      }
    });
  }



  // Add to cart action
  function cart_add() {

    // Nếu chọn "Light Up Your Logo" + chưa có LOGO thì hiển thi POPUP
    let isLightUpYourLogoAdded = ProductRgbCartData.options[1].isSelected;  //key: "light-up",
    var logo_getproperties = clsProductsDetails.logo_getproperties();
    // console.log('rgbOptionSelected', isLightUpYourLogoAdded, logo_getproperties)

    if (isLightUpYourLogoAdded && !logo_getproperties) {
      zakeke_openpopup() // hien thi popup
      paralogo.callAddtocard = true;
      $("body").attr("loading", 0);
      return; // THOAT KHOI FUNCTION NAY
    }

    // lay danh sach đã chọn
    const rgbOptionSelected = ProductRgbCartData.options.filter((o) => {
      if (o.key === "light-up") {
        return false;
      }
      return o.isSelected;
    });

    // them data de add vao cart
    var arrItemsProducts = []
    for (let i = 0; i < rgbOptionSelected.length; i++) {
      const o = rgbOptionSelected[i];
      arrItemsProducts.push({ 
        quantity: ProductRgbCartData.quantity,
        id: o.shopifyVariantId,
        properties: {
          "type": o.key
        }
       })
    }


    if (logo_getproperties) {
      arrItemsProducts.push(logo_getproperties)
    }

    if (arrItemsProducts.length > 0) {
      $.ajax({
        type: 'POST',
        url: '/cart/add.js',
        data: { items: arrItemsProducts },
        dataType: 'json',
        success: function (data) {
          console.log('success', data);
          cart_submit();
        }
      });
    } else {
      console.log('success without options');
      cart_submit();
    }
  }

  function cart_submit() {
    zakeke_closepopup();
    
    if ($('#namProductAtcBtn').hasClass('reorder')) {
      // PREORDER 
      // $('#pre_order_custom').click();
      var AddToCartForm = $('#AddToCartForm');
      var selling_plan = document.querySelector('[name="selling_plan"]:checked') ? document.querySelector('[name="selling_plan"]:checked').value : 'full-payment';

      fetch('/cart/add.js', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selling_plan == 'full-payment' ? {
          id: AddToCartForm.find('[name="id"]').val(),
          quantity: AddToCartForm.find('[name="quantity"]').val(),
        }: {
          id: AddToCartForm.find('[name="id"]').val(),
          quantity: AddToCartForm.find('[name="quantity"]').val(),
          selling_plan: selling_plan
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Submission was successful.');
          $("body").attr("loading", 0);
          
          // load data & open popup cart
          ajaxCart.load()
          console.log(1234)
          // setTimeout(() => {
          //   $('.ajaxcart__qty-num').trigger('change');
          // }, 1000);

          // addclass for cartajax
          $('#CartDrawer').addClass('cartreverse');
        })
        .catch((error) => {
          console.log('An error occurred.');
          $("body").attr("loading", 0);
        });
    } else {
      var AddToCartForm = $('#AddToCartForm');

      fetch('/cart/add.js', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: AddToCartForm.find('[name="id"]').val(),
          quantity: AddToCartForm.find('[name="quantity"]').val()
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Submission was successful.');
          $("body").attr("loading", 0);
          
          // load data & open popup cart
          ajaxCart.load() 
          // setTimeout(() => {
          //   $('.ajaxcart__qty-num').trigger('change');
          // }, 1000);

          // addclass for cartajax
          $('#CartDrawer').addClass('cartreverse');
        })
        .catch((error) => {
          console.log('An error occurred.');
          $("body").attr("loading", 0);
        });
    }
  }


  ////////////////////////////
  ////////////////////////////
  // PRICE

  // Update cart quantity
  function price_init() {
    $('body').on('click', '#namProductCartQuantityDownBtn', function () {
      price_quantity_dow()
    });

    $('body').on('click', '#namProductCartQuantityUpBtn', function () {
      price_quantity_up()
    });

    price_quantity_checkbutton();
  }

  function price_quantity_up() {
    ProductRgbCartData.quantity++;
    namProductCartQuantity.innerText = ProductRgbCartData.quantity;
    price_productUpdateTotalPrice();
    namProductQuantity.value = ProductRgbCartData.quantity;

    price_quantity_checkbutton()
  }

  function price_quantity_dow() {
    if (ProductRgbCartData.quantity > 1) {
      ProductRgbCartData.quantity--;
      namProductCartQuantity.innerText = ProductRgbCartData.quantity;
      price_productUpdateTotalPrice();
      namProductQuantity.value = ProductRgbCartData.quantity;
    }

    price_quantity_checkbutton()
  }

  function price_quantity_checkbutton() {
    if (ProductRgbCartData.quantity >= DetailProductShopify.variants[ProductColorCurrentSelectionIndex].inventory_quantity && !setting.reorder) {
      $('#namProductCartQuantityUpBtn').addClass('unactive')
    } else {
      $('#namProductCartQuantityUpBtn').removeClass('unactive')
    }

    if (ProductRgbCartData.quantity == 1) {
      $('#namProductCartQuantityDownBtn').addClass('unactive')
      if (!ProductRgbCartData.options[0].isSelected && !ProductRgbCartData.options[1].isSelected && !ProductRgbCartData.options[2].isSelected) {
        if ($('.hide-price-total').length > 0) {
          $('.hide-price-total').hide();
        }
      }
      else {
        if ($('.hide-price-total').length > 0) {
          $('.hide-price-total').css('display', 'flex');
        }
      }
    } else {
      $('#namProductCartQuantityDownBtn').removeClass('unactive')
      if ($('.hide-price-total').length > 0) {
        $('.hide-price-total').css('display', 'flex');
      }
    }

  }

  // Calculate total price'
  function price_productUpdateTotalPrice() {
    var namProductTotalPriceWithOptions = document.getElementById("namProductTotalPriceWithOptions");
    var namProductTotalPriceWithOptionsList = namProductTotalPriceWithOptions.querySelector(".nam-product__total-price__options__list");
    var namProductTotalPriceNumber = document.getElementById("namProductTotalPrice");
    var totalPriceOriginal = document.getElementById("totalPriceOriginal");

    let isRgbKitAdded = ProductRgbCartData.options.find((o) => o.key === "upgrade").isSelected;
    const optionAdded = ProductRgbCartData.options.filter((o) => {
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


    // show images
    $.each(ProductRgbCartData.options, function (indexInArray, valueOfElement) {
      if (valueOfElement.isSelected) {
        $('.nam-product__total-price__options__images img').eq(indexInArray).show()
        if ($('.hide-price-total').length > 0) {
          $('.hide-price-total').css('display', 'flex');
        }
      } else {
        $('.nam-product__total-price__options__images img').eq(indexInArray).hide()
      }
    });


    // TOTAL PRICE HERE
    var totalprice = ProductRgbCartData.chairPrice

    $.each(ProductRgbCartData.options, function (indexInArray, valueOfElement) {
      totalprice = valueOfElement.isSelected ? totalprice + valueOfElement.price : totalprice

    });
    // console.log("v2",totalprice)

    namProductTotalPriceNumber.innerText = `$${(
      totalprice * ProductRgbCartData.quantity
    ).toFixed(2)}`;

    $('.product-price').html(`$${totalprice}`)

    setTimeout(() => {
      Klarna_updatepurchaseamount(totalprice * ProductRgbCartData.quantity * 100);
    }, 1000);



    // TOTAL Price Original 

    if (!totalPriceOriginal) return
    var OptionsPrice_original = ProductRgbCartData.chairPrice_original
    $.each(ProductRgbCartData.options, function (indexInArray, valueOfElement) {
      OptionsPrice_original = valueOfElement.isSelected ? OptionsPrice_original + valueOfElement.price_original : OptionsPrice_original
    });

    totalPriceOriginal.innerText = `$${(OptionsPrice_original * ProductRgbCartData.quantity).toFixed(2)} `;

    if (OptionsPrice_original == totalprice) {
      totalPriceOriginal.hidden = true;
    } else {
      totalPriceOriginal.hidden = false;
    }


  };

  ////////////////////////////
  ////////////////////////////
  //Klarna app init
  function Klarna_updatepurchaseamount(price) {
    if ($('klarna-placement').length == 0) return;

    //console.log('Klarna_updatepurchaseamount', price)
    //document.getElementsByTagName("klarna-placement")[0].setAttribute("data-purchase-amount", price);
    $('klarna-placement').attr('data-purchase-amount', price)
    $('klarna-placement').attr('purchase-amount', price)
    window.KlarnaOnsiteService = window.KlarnaOnsiteService || []
    var result = window.KlarnaOnsiteService.push({ eventName: 'refresh-placements' })
    //console.log('Klarna_updatepurchaseamount', result)
  }

  ////////////////////////////
  ////////////////////////////
  //OPTIONS 
  function options_init() {
    //options_setcontents();
    options_events();
  }

  function options_events() {
    $('.productoption').click(function (e) {
      if(e.target.innerText == "More details..."){
        return;
      }
      var index = $(this).index();

      if ($(this).hasClass('selected')) {
        options_unactive(index)
      } else {
        options_active(index)
      }

      price_productUpdateTotalPrice();
      url_rebuil();
    });

    $('.product-warning').click(function (e) {
      options_warning_hide()
    });

    // Observe a specific DOM element:
    $('.custom_product_price').each(function (index, element) {
      // element == this
      observeDOM($(element)[0], function (m) {
        var addedNodes = [], removedNodes = [];
        m.forEach(record => record.addedNodes.length & addedNodes.push(...record.addedNodes));
        m.forEach(record => record.removedNodes.length & removedNodes.push(...record.removedNodes));


        options_setcontents()
      });
    });

    // check url for optionsf
    var objurl = url_get();
    if (objurl.option == 'RGB-LED-TOP-KIT') {
      options_active(0)
    } else if (objurl.option == 'LIGHT-UP-YOUR-LOGO') {
      options_active(0)
      options_active(1)
    } else if (objurl.option == 'RGB-LED-BOTTOM-KIT') {
      options_active(2)
    } else if (objurl.option == 'RGB-LED-TOP-BOTTOM-KIT') {
      options_active(0)
      options_active(2)
    } else if (objurl.option == 'ALL-OPTIONS') {
      options_active(0)
      options_active(1)
      options_active(2)
    }


  }

  var timeoutwarning = null
  function options_warning_show($content) {
    $('.product-warning span').html($content);
    $('.product-warning').addClass('showwarning');

    clearTimeout(timeoutwarning);

    setTimeout(() => {
      $('.product-warning').removeClass('showwarning');

    }, 10000);

  }

  function options_warning_hide() {
    $('.product-warning').removeClass('showwarning');
  }

  function options_active(index) {
    if(!window.product.tags.includes('hide-top-kit')){
      var $el = $('#productoption' + (index + 1));
  
      $el.addClass('selected')
      $el.find('button div').html("Remove")
  
      ProductRgbCartData.options[index].isSelected = true;
  
      if (index == 1) {
        //console.log($('#productoption1' ).hasClass('selected'))
        if (!$('#productoption1').hasClass('selected')) {
          options_warning_show('The “Light Up Your Logo” option will include the “RGB LED Top Kit” option.')
  
          options_active(0);
        }
  
      }
  
      options_checkacitve();
    }else{
      if(index == 2){

        var $el = $('#productoption' + (index + 1));
    
        $el.addClass('selected')
        $el.find('button div').html("Remove")
    
        ProductRgbCartData.options[index].isSelected = true;
    
        if (index == 1) {
          //console.log($('#productoption1' ).hasClass('selected'))
          if (!$('#productoption1').hasClass('selected')) {
            options_warning_show('The “Light Up Your Logo” option will include the “RGB LED Top Kit” option.')
    
            options_active(0);
          }
    
        }
    
        options_checkacitve();
      }
    }
  }

  function options_unactive(index) {
    var $el = $('#productoption' + (index + 1));

    $el.removeClass('selected')
    $el.find('button div').html("Add to cart")

    ProductRgbCartData.options[index].isSelected = false;

    if (index == 0) {
      if ($('#productoption2').hasClass('selected')) {
        options_unactive(1)
        options_warning_show('The “Light Up Your Logo” option only works with “RGB LED Top Kit” option.')
      }

    }

    options_checkacitve();
  }

  function options_checkacitve() {
    if ($('#productoption1').hasClass('selected') && $('#productoption2').hasClass('selected')) {
      $('.nam-product__rgb-options__list').addClass('topkitselected')
    } else {
      $('.nam-product__rgb-options__list').removeClass('topkitselected')
    }
  }

  function options_setcontents() {
    $('.options_price').each(function (index, element) {
      if ($(element).find('.tdf_price_sales .money').length > 0) {
        var currency = $(element).find('.tdf_price_sales .money').html();
        ProductRgbCartData.options[index].price = Number(currency.replace(/[^0-9\.-]+/g, ""));
      }
    });


    //console.log('options_setcontents', $('#custom_product_price').find('.tdf_price_sales .money').length)

    if ($('#custom_product_price').find('.tdf_price_sales .money').length > 0) {
      var currency = $('#custom_product_price').find('.tdf_price_sales .money').html();
      ProductRgbCartData.chairPrice = Number(currency.replace(/[^0-9\.-]+/g, ""));
    }

    price_productUpdateTotalPrice();

    //console.log('ProductRgbCartData', ProductRgbCartData)
  }

  ////////////////////////////
  ////////////////////////////
  //OTHERS
  var stickpara = {
    top: 140
  };


  function stick_init() {
    if (isMobile) {
      $('.process-productdetailstick img').css('opacity', 1)
    }
    if ($('.process-productdetailstick').length == 0 || isMobile) return;

    stick_watch()

    // 1. clone image ra ngoai
    $('.process-productdetailstick').clone().attr('id', 'objstick').appendTo("body").removeClass('process-productdetailstick')


    //stick_setobjs();

    $(window).bind('mousewheel scroll wheel DOMMouseScroll touchstart touchmove MozMousePixelScroll', function (event) {
      stick_processdisplay()
    });

    $(window).scroll(function (event) {
      stick_processdisplay()
    });

    $(window).resize(function () {
      console.log('resize')
      stick_setobjs();
    });
  }

  ////////////////////////////
  ////////////////////////////
  // GET inventory quantity product detail version 1 
  function get_inventory_quantity(i) {

    var inventoryQuantity = DetailProductShopify.variants[i].inventory_quantity
    if (inventoryQuantity <= 0) {
      $("#inventory_quantity").hide()
    } else {
      $("#inventory_quantity").show()
      $("#inventory_quantity span").html(inventoryQuantity == 1 ? inventoryQuantity + " chair left" : inventoryQuantity + " chairs left")

    }
    // console.log(inventoryQuantity)

  }

  ////////////////////////////
  ////////////////////////////
  // Discount Date

  function days_between(date1, date2) {

    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = date1 - date2;

    // console.log(differenceMs, differenceMs)

    if (differenceMs >= 0) {
      // Convert back to days and return
      return Math.round(differenceMs / ONE_DAY);
    } else {
      return false;
    }

  }

  function handleDiscountDate(i) {

    var sellyEndDate = null
    var today = new Date()
    if ($("div").find(`[id='selly-${i}']`)) {
      sellyEndDate = new Date($(`div[id='selly-${i}']`).attr('sellyenddate'))
      // console.log("sellyenddate", sellyEndDate)
    }
    const DiscountDate = days_between(sellyEndDate, today)

    // console.log(DiscountDate, "v4", $('#date_discount').length)
    if ($('#date_discount').length > 0) {

      if (DiscountDate) {
        $('#date_discount').show()
        if (DiscountDate > 7) {
          $('#date_discount').html(`Only ${DiscountDate} days left. Whiles supplies last`)
        }
        else if (DiscountDate > 3) {
          $('#date_discount').html(`Sale ends in ${DiscountDate} days, Hurry before it’s too late`)
        }
        else if (DiscountDate > 1) {
          $('#date_discount').html(`${DiscountDate} days left until sale is over`)
        }
        else if (DiscountDate == 1) {
          $('#date_discount').html(`Last chance! Sale ends today at 12 midnight`)
        } else {
          $('#date_discount').hide()
        }


      } else {
        $('#date_discount').hide()
      }


    }

  }

  function stick_processdisplay() {
    const rect = $('.process-productdetailstick')[0].getBoundingClientRect();

    if ($('.product800-detail-update').length != 0) {
      if (rect.y >= stickpara.top) {
        $('#objstick').removeClass('nodisplay')
        $('#objstick').css('opacity', 1)
        $('.process-productdetailstick').addClass('nodisplay')
        $('.process-productdetailstick').css('opacity', 0)
      } else {
        $('#objstick').addClass('nodisplay')
        $('#objstick').css('opacity', 0)
        $('.process-productdetailstick').removeClass('nodisplay')
        $('.process-productdetailstick').css('opacity', 1)
      }
    }
    else {
      if (rect.y >= stickpara.top) {
        $('#objstick').removeClass('nodisplay')
        $('#objstick').css('opacity', 1)
        $('.process-productdetailstick').addClass('nodisplay')
        $('.process-productdetailstick').css('opacity', 0)
      } else {
        $('#objstick').addClass('nodisplay')
        $('#objstick').css('opacity', 0)
        $('.process-productdetailstick').removeClass('nodisplay')
        $('.process-productdetailstick').css('opacity', 1)
      }
    }
  }

  function stick_watch() {
    const resize_ob = new ResizeObserver(function (entries) {
      stick_setobjs()
    });

    // start observing for resize
    resize_ob.observe(document.querySelector(".process-productdetailstick"));

  }

  function stick_setobjs() {
    const rect = $('.process-productdetailstick')[0].getBoundingClientRect();
    //console.log('Current  : ', rect);
    $('#objstick').css({
      left: rect.left,
      top: stickpara.top,
      width: rect.width,
      height: rect.height,
    });


  }

  ////////////////////////////
  ////////////////////////////
  //URLS 
  function url_init() {
    // can quan ly options hien thi theo URL
  }

  function url_get() {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search.slice(1));

    let obj = {};
    for (let pair of params.entries()) {
      obj[pair[0]] = pair[1]    //push keys/values to object
    }

    return obj;

  }

  function url_rebuil() {
    var url = window.location.origin + window.location.pathname + '?variant=' + DetailProductShopify.variants[ProductColorCurrentSelectionIndex].id

    // TOTAL PRICE HERE
    var strSEO = ''

    if (ProductRgbCartData.options[0].isSelected && !ProductRgbCartData.options[1].isSelected && !ProductRgbCartData.options[2].isSelected) {
      strSEO = 'RGB-LED-TOP-KIT'
    } else if (ProductRgbCartData.options[0].isSelected && ProductRgbCartData.options[1].isSelected && !ProductRgbCartData.options[2].isSelected) {
      strSEO = 'LIGHT-UP-YOUR-LOGO'
    } else if (!ProductRgbCartData.options[0].isSelected && !ProductRgbCartData.options[1].isSelected && ProductRgbCartData.options[2].isSelected) {
      strSEO = 'RGB-LED-BOTTOM-KIT'
    } else if (ProductRgbCartData.options[0].isSelected && !ProductRgbCartData.options[1].isSelected && ProductRgbCartData.options[2].isSelected) {
      strSEO = 'RGB-LED-TOP-BOTTOM-KIT'
    } else if (ProductRgbCartData.options[0].isSelected && ProductRgbCartData.options[1].isSelected && ProductRgbCartData.options[2].isSelected) {
      strSEO = 'ALL-OPTIONS'
    }
    else {
      if ($('.hide-price-total').length > 0) {
        $('.hide-price-total').hide();
      }
    }

    if (strSEO != '') {
      url = window.location.pathname + '?variant=' + DetailProductShopify.variants[ProductColorCurrentSelectionIndex].id + '&' + 'option=' + strSEO;
    }

    history.pushState(null, null, url);

  }

  ////////////////////////////
  ////////////////////////////
  //OTHERS
  // Color variant selection
  function preloadImage(url) {
    var img = new Image();
    img.src = url;
  }

  function isurltesting() {
    return window.location.href.indexOf("pl4800-update") > -1;
  }

  ////////////////////////////
  //DETECT MOBILE
  var isMobile = false;
  function detectdevices() {
    isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      $('body').attr('device', 'Mobile')
    }

  }

  var browsername = '';
  function detectbrowsers() {

    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
      browsername = 'Opera';
    }
    else if (navigator.userAgent.indexOf("Chrome") != -1) {
      browsername = 'Chrome';
    }
    else if (navigator.userAgent.indexOf("Safari") != -1) {
      browsername = 'Safari';
    }
    else if (navigator.userAgent.indexOf("Firefox") != -1) {
      browsername = 'Firefox';
    }
    else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {
      browsername = 'IE';
    }
    else {
      browsername = 'unknown';
    }

    $('body').attr('browser', browsername)
  }

  var osname = 'Others';
  function detectos() {

    if (navigator.platform.indexOf('Mac') > -1) {
      osname = 'Mac';
    }
    else if (navigator.platform.indexOf('Win') > -1) {
      osname = 'Win';
    }

    $('body').attr('os', osname)
  }


  ////////////////////////////
  ////////////////////////////
  //RETURN
  return {
    init: init,
    layout_changeproduct: layout_changeproduct,
    logo_addtocart: logo_addtocart,
    logo_getproperties: logo_getproperties,
    logo_setproperties: logo_setproperties,
    zakeke_init: zakeke_init,
    zakeke_closepopup: zakeke_closepopup,
    zakeke_openpopup: zakeke_openpopup,
    zakeke_openpopupwithoutaddtocart: zakeke_openpopupwithoutaddtocart,
    price_productUpdateTotalPrice: price_productUpdateTotalPrice
  }

})();



////////////////////////////////////
//run with setinteval
$(function () {
  clsProductsDetails.init();
});

