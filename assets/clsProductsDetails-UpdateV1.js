var DetailProductShopifyGallery = globalProductDetail;

//PARAMATERS
var clsProductsDetailsUpdateV1 = (function () {
  ////////////////////////////
  //PARAMATERS
  var setting = {
    root: '.popin-gallery',
    zoom: '.popin-zoom',
    isShow: false
  }
  ////////////////////////////
  //INIT
  function init() {
    console.log('ProductsDetailsUpdateV1', true)
    detectdevices()
    init_media()
    swiperGallery()
    swiperVideo()
    swiperZoom()
    check_scroll_topbar()
    events()
    zoom_gallery()

  }

  /// Create array Media
  var arrImage = [];
  var arrVideo = [];

  function init_media() {
    create_arrMedia()
  }


  function create_arrMedia() {
    for (var item of DetailProductShopifyGallery.media) {
      if (item.media_type == 'image') {
        arrImage.push(item)
      }

      if (item.media_type == 'video') {
        arrVideo.push(item)
      }
    }
  }

  function check_mediaEmpty() {
    if (arrImage.length == 0 || arrImage.length <= 6) {
      $('.popin-gallery .group-gallery').hide();
      $('.no-group-gallery').addClass('active');
    }
    else {
      $('.popin-gallery .group-gallery').show();
      $('.popin-gallery .no-group-gallery').removeClass('active');
    }

    if (arrVideo.length == 0) {
      $('.popin-gallery .group-video').hide();
      $('.popin-gallery .no-group-video').addClass('active');
      allVideoPause();
    }
    else {
      $('.popin-gallery .group-video').show();
      $('.popin-gallery .no-group-video').removeClass('active');
    }
  }

  function events() {

    //////////////
    ////// Choose Type before open popup Gallery
    $('.js-popin-gallery').click(function () {
      show(setting.root);
      if ($(this).attr('type') == 'gallery') {
        opengalleryImage();
      } else {
        opengalleryVideo();
      }
    })

    //////////////
    ////// Choose Tab on popup Gallery
    $('.popin-gallery .group-tab .tab').click(function () {
      $('.popin-gallery .group-tab .tab').removeClass('active');
      $(this).addClass('active')
      check_mediaEmpty();
      if ($(this).attr('type') == 'gallery') {
        $('.popin-gallery .group-video').removeClass('active');
        $('.popin-gallery .group-gallery').addClass('active');
        $('.popin-gallery .no-group-video').removeClass('active');
        allVideoPause();
      } else {
        $('.popin-gallery .group-gallery').removeClass('active');
        $('.popin-gallery .group-video').addClass('active');
        $('.popin-gallery .no-group-gallery').removeClass('active');
        playVideoCurrent();
      }
    })


    $('.js-close-popin-gallery').click(function () {
      hide(setting.root);
      allVideoPause();
    })

    $(document).keyup(function (e) {
      //console.log('keyup', e.which)
      if (e.which == 27) {// esc
        hide(setting.root);
        allVideoPause();
      }
    });

    $('#productdetail-video-main .swiper-slide-active video').click(function () {
      if (isMobile) {
        if (this.paused) {
          $('#productdetail-video-main .swiper-slide-active .btn-play').hide();
        } else {
          $('#productdetail-video-main .swiper-slide-active .btn-play').show();
        }
      }
      else {
        if (!this.paused) {
          $('#productdetail-video-main .swiper-slide-active .btn-play').show();
        } else {
          $('#productdetail-video-main .swiper-slide-active .btn-play').hide();
        }
      }
    })

    $(document).on('click', '#productdetail-video-main .swiper-slide-active .btn-play', function () {
      var videomain = $('#productdetail-video-main .swiper-slide-active video')[0]
      if (videomain.paused) {
        videomain.play();
        $(this).hide();
      } else {
        videomain.paused();
        $(this).show();
      }
    });
  }


  /////////Check Type Gallery
  function opengalleryImage() {
    $('.popin-gallery .group-tab .tab[type="video"]').removeClass('active');
    $('.popin-gallery .group-tab .tab[type="gallery"]').addClass('active');
    $('.popin-gallery .group-video').removeClass('active');
    $('.popin-gallery .group-gallery').addClass('active');
    allVideoPause();
    check_mediaEmpty();
    $('.popin-gallery .no-group-video').removeClass('active');
  }

  /////////Check Type Video
  function opengalleryVideo() {
    $('.popin-gallery .group-tab .tab[type="gallery"]').removeClass('active');
    $('.popin-gallery .group-tab .tab[type="video"]').addClass('active');
    $('.popin-gallery .group-gallery').removeClass('active');
    $('.popin-gallery .group-video').addClass('active');
    check_mediaEmpty();
    $('.popin-gallery .no-group-gallery').removeClass('active');
  }


  ///////////////////////
  //////// Animate Popup
  function show(obj) {
    setting.isShow = true;

    var tl = gsap.timeline({
      onComplete: function () {
        if ($('.popin-gallery .group-video').hasClass('active')) {
          playVideoCurrent();
        }
      }
    });

    tl.set(obj + ' .popin-inner', { opacity: 0, y: 500 })
      .set(obj, { display: 'block', opacity: 0 })
      .to(obj, { duration: .3, opacity: 1, y: 0 })
      .to(obj + ' .popin-inner', { duration: .2, opacity: 1, y: 0, ease: "none" }, '+=.1')
  }

  function hide(obj) {
    setting.isShow = false;

    var tl = gsap.timeline({

    });

    tl.to(obj + ' .popin-inner', { duration: .2, opacity: 0, y: 500, ease: "none" })
      .set(obj, { display: 'none' })

  }

  ////////////////////////////
  ////////////////////////////
  //Swiper
  function swiperGallery() {
    if ($('#productdetail-gallery-thumb').length > 0 && $('#productdetail-gallery-main').length > 0) {
      var thumb = new Swiper("#productdetail-gallery-thumb", {
        spaceBetween: 8,
        slidesPerView: 3,
        slidesPerGroup: 3,
        freeMode: true,
        watchSlidesProgress: true,
        navigation: {
          nextEl: ".swiper-gallery-next-thumb",
          prevEl: ".swiper-gallery-prev-thumb",
        },
        breakpoints: {
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        },
      });
      var main = new Swiper("#productdetail-gallery-main", {
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-gallery-next-main",
          prevEl: ".swiper-gallery-prev-main",
        },
        thumbs: {
          swiper: thumb,
        },
      });
    }
  }

  function swiperVideo() {
    if ($('#productdetail-video-thumb').length > 0 && $('#productdetail-video-main').length > 0) {
      var thumb = new Swiper("#productdetail-video-thumb", {
        spaceBetween: 10,
        slidesPerView: 3,
        slidesPerGroup: 3,
        freeMode: true,
        watchSlidesProgress: true,
        navigation: {
          nextEl: ".swiper-video-next-thumb",
          prevEl: ".swiper-video-prev-thumb",
        },
        breakpoints: {
          768: {
            slidesPerView: 1.5,
            spaceBetween: 10,
            slidesPerGroup: 1,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 10,
            slidesPerGroup: 3,
          },
        },
      });
      var main = new Swiper("#productdetail-video-main", {
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-video-next-main",
          prevEl: ".swiper-video-prev-main",
        },
        thumbs: {
          swiper: thumb,
        },
      });

      main.on('slideChangeTransitionEnd', function () {
        allVideoPause()
        playVideoCurrent()
      });
    }
  }

  function swiperZoom() {
    if ($('#productdetail-zoom-thumb').length > 0 && $('#productdetail-zoom-main').length > 0) {
      var thumb = new Swiper("#productdetail-zoom-thumb", {
        spaceBetween: 10,
        slidesPerView: 3,
        slidesPerGroup: 1,
        freeMode: true,
        watchSlidesProgress: true,
        navigation: {
          nextEl: ".swiper-zoom-next-thumb",
          prevEl: ".swiper-zoom-prev-thumb",
        },
      });
      var main = new Swiper("#productdetail-zoom-main", {
        spaceBetween: 10,
        noSwiping: true,
        noSwipingClass: 'swiper-slide',
        navigation: {
          nextEl: ".swiper-zoom-next-main",
          prevEl: ".swiper-zoom-prev-main",
        },
        thumbs: {
          swiper: thumb,
        },
      });

      main.on('slideChangeTransitionEnd', function () {
        //////////////Open popup Zoom - Zoom Image
        /// Code here

        // delete & create zoom 
        if ($('.popin-zoom .image-zoom-topbar').length > 0) {
          var datazoom = $('.popin-zoom .swiper-slide-active .image-container .image-zoom-topbar img').attr('src')

          if ($('.popin-zoom .image-zoom-topbar .magnify-lens').length > 0) {
            $('.popin-zoom .image-zoom-topbar .zoom').attr("data-magnify-src", datazoom)
          }


          $('.popin-zoom .swiper-slide-active .image-zoom-topbar .zoom').magnify({
            src: datazoom,
            afterLoad: function () {
              console.log("1111111111111")
            }
          });
        }
      });
    }
  }

  //Video
  function playVideoCurrent() {
    var currentVideo = $('#productdetail-video-main .swiper-slide-active video')[0];
    if(typeof currentVideo != 'undefined')currentVideo.play();
    $('#productdetail-video-main .swiper-slide-active .btn-play').hide();
  }

  function allVideoPause() {
    var allVideo = $('#productdetail-video-main .swiper-slide video');
    for (var i = 0; i < allVideo.length; i++) {
      allVideo[i].pause();
    }
    var allIframe = $('#productdetail-video-main .swiper-slide iframe');
    allIframe.each(function(){
      this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
    });
    $('#productdetail-video-main .swiper-slide .btn-play').show();
  }



  //////Topbar
  function check_scroll_topbar() {
    if (isMobile) {
      $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();
        var checkscroll = $('.nam-product-images').outerHeight();
        // Do something
        if (scroll > checkscroll - 75) {
          $('.productdetail-topbar').addClass('active');
        }
        else {
          $('.productdetail-topbar').removeClass('active');
          $('.productdetail-topbar').removeClass('alwayunactive');
        }
      });

      $('.productdetail-topbar .close-btn').click(function () {
        $('.productdetail-topbar').addClass('alwayunactive');
      })

      $('.cta-close.js-close-popin-zoom').click(function () {
        hide(setting.zoom)
      })

      $('.topbar-img').click(function () {
        show(setting.zoom)

        setTimeout(() => {
          if ($('.popin-zoom .image-zoom-topbar').length > 0) {
            var datazoom = $('.popin-zoom .swiper-slide-active .image-container .image-zoom-topbar img').attr('src')

            var $zooms = $('.popin-zoom .swiper-slide-active .image-zoom-topbar .zoom').magnify({
              src: datazoom,
              afterLoad: function () {
                console.log("1111111111111")
              }
            });
          }
        }, 1000);
      })




      $('.productdetail-topbar').on('swipeup', function (e) {
        $(this).addClass('alwayunactive');
        e.stopPropagation();
        return false;
      });


      //////////////Open popup Zoom - Zoom Image
      /// Code here

      // delete & create zoom 


    }
  }

  ////////////////////////////
  //DETECT MOBILE
  var isMobile = false;
  function detectdevices() {
    isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      $('body').attr('device', 'Mobile')
    }

    if (/Android/i.test(navigator.userAgent)) {
      $('body').attr('mos', 'Android')
    }
    else if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
      $('body').attr('mos', 'IOS')
    }
  }

  ////////////////////////////
  //HANDLE ZOOM GALLERY

  function zoom_gallery() {
    if ($('.js-popin-gallery.imagezoom').length > 0) {
      $('#productdetail-gallery-main .swiper-slide img').each(function () {
        $(this).imageZoom({
          zoom: 200
        });
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
  clsProductsDetailsUpdateV1.init();
});

