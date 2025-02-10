$(document).ready(function () {
  $('.press-reviews_content').eq(0).slick({
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1
  });
  $('.press-reviews #slider-pagination-list .slider-page').click(function(e){
    $('.press-reviews_tab.active .press-reviews_content').slick('slickGoTo', parseInt($(this).attr('slick-index')) - 1);
    $('.press-reviews .press-reviews_tab.active #slider-pagination-list li a').removeClass('active');
    $('.press-reviews .press-reviews_tab.active #slider-pagination-list li a[slick-index="'+$(this).attr('slick-index')+'"]').addClass('active');
  })
  $('.press-reviews .slider-pagination__wrapper .next.slick-arrow').click(function(e){
    $('.press-reviews_tab.active .press-reviews_content').slick('slickNext');
    let currentSlide = $('.press-reviews_tab.active .press-reviews_content').slick('slickCurrentSlide');
    let currentPage = currentSlide + 1;
    $('.press-reviews .press-reviews_tab.active #slider-pagination-list li a').removeClass('active');
    $('.press-reviews .press-reviews_tab.active #slider-pagination-list li a[slick-index="'+currentPage+'"]').addClass('active');
  })
  $('.press-reviews .slider-pagination__wrapper .prev.slick-arrow').click(function(e){
    $('.press-reviews_tab.active .press-reviews_content').slick('slickPrev');
    let currentSlide = $('.press-reviews_tab.active .press-reviews_content').slick('slickCurrentSlide');
    let currentPage = currentSlide + 1;
    $('.press-reviews .press-reviews_tab.active #slider-pagination-list li a').removeClass('active');
    $('.press-reviews .press-reviews_tab.active #slider-pagination-list li a[slick-index="'+currentPage+'"]').addClass('active');
  })
  if(window.innerWidth > 500){
    $('.youtube-reviews-1 .youtube-reviews_content').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      arrows: false
    });
  }else{
    $('.youtube-reviews-1 .youtube-reviews_content').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    });
  }
  $('.youtube-reviews-1 #slider-pagination-list .slider-page').click(function(e){
    $('.youtube-reviews-1 .youtube-reviews_content').slick('slickGoTo', parseInt($(this).attr('slick-index')) * 4);
    $('.youtube-reviews-1 #slider-pagination-list li a').removeClass('active');
    $('.youtube-reviews-1 #slider-pagination-list li a[slick-index="'+$(this).attr('slick-index')+'"]').addClass('active');
  })
  $('.youtube-reviews-1 .slider-pagination__wrapper .next.slick-arrow').click(function(e){
    $('.youtube-reviews-1 .youtube-reviews_content').slick('slickNext');
    let currentSlide = $('.youtube-reviews-1 .youtube-reviews_content').slick('slickCurrentSlide');
    let currentPage = currentSlide / 4 + 1;
    $('.youtube-reviews-1 #slider-pagination-list li a').removeClass('active');
    $('.youtube-reviews-1 #slider-pagination-list li a[slick-index="'+currentPage+'"]').addClass('active');
  })
  $('.youtube-reviews-1 .slider-pagination__wrapper .prev.slick-arrow').click(function(e){
    $('.youtube-reviews-1 .youtube-reviews_content').slick('slickPrev');
    let currentSlide = $('.youtube-reviews-1 .youtube-reviews_content').slick('slickCurrentSlide');
    let currentPage = currentSlide / 4 + 1;
    $('.youtube-reviews-1 #slider-pagination-list li a').removeClass('active');
    $('.youtube-reviews-1 #slider-pagination-list li a[slick-index="'+currentPage+'"]').addClass('active');
  })
  $('.award-reviews_content').slick({
    infinite: true,
    arrows: false,
    variableWidth: true,
    swipe: true,
    centerMode: true
  });
  $('.award-reviews #slider-pagination-list .slider-page').click(function(e){
    $('.award-reviews_content').slick('slickGoTo', parseInt($(this).attr('slick-index')) - 1);
    $('.award-reviews #slider-pagination-list li a').removeClass('active');
    $('.award-reviews #slider-pagination-list li a[slick-index="'+$(this).attr('slick-index')+'"]').addClass('active');
  })
  $('.award-reviews .slider-pagination__wrapper .next.slick-arrow').click(function(e){
    $('.award-reviews_content').slick('slickNext');
    let currentSlide = $('.award-reviews_content').slick('slickCurrentSlide');
    let currentPage = currentSlide + 1;
    $('.award-reviews #slider-pagination-list li a').removeClass('active');
    $('.award-reviews #slider-pagination-list li a[slick-index="'+currentPage+'"]').addClass('active');
  })
  $('.award-reviews .slider-pagination__wrapper .prev.slick-arrow').click(function(e){
    $('.award-reviews_content').slick('slickPrev');
    let currentSlide = $('.award-reviews_content').slick('slickCurrentSlide');
    let currentPage = currentSlide + 1;
    $('.award-reviews #slider-pagination-list li a').removeClass('active');
    $('.award-reviews #slider-pagination-list li a[slick-index="'+currentPage+'"]').addClass('active');
  })
  $('.esport-reviews_list').slick({
    infinite: true,
    arrows: false,
    swipe: true,
    slidesToShow: 7,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      }
    ]
  });
  $('.other-review-tabs.active').slick({
    infinite: true,
    arrows: false,
    swipe: true,
    slidesToShow: 1,
  });
  $('.other-reviews .other-content_title .slider-pagination').html($('.other-review-tabs[data-product="PL4500"] + .slider-pagination-custom').html())
  const refeshOtherReviewSlider = () =>{
    $('.other-reviews #slider-pagination-list .slider-page').click(function(e){
      $('.other-review-tabs.active').slick('slickGoTo', parseInt($(this).attr('slick-index')) - 1);
      $('.other-reviews .other-content_title #slider-pagination-list li a').removeClass('active');
      $('.other-reviews .other-content_title #slider-pagination-list li a[slick-index="'+$(this).attr('slick-index')+'"]').addClass('active');
    })
    $('.other-reviews .slider-pagination__wrapper .next.slick-arrow').click(function(e){
      $('.other-review-tabs.active').slick('slickNext');
      let currentSlide = $('.other-review-tabs.active').slick('slickCurrentSlide');
      let currentPage = currentSlide + 1;
      $('.other-reviews .other-content_title #slider-pagination-list li a').removeClass('active');
      $('.other-reviews .other-content_title #slider-pagination-list li a[slick-index="'+currentPage+'"]').addClass('active');
    })
    $('.other-reviews .slider-pagination__wrapper .prev.slick-arrow').click(function(e){
      $('.other-review-tabs.active').slick('slickPrev');
      let currentSlide = $('.other-review-tabs.active').slick('slickCurrentSlide');
      let currentPage = currentSlide + 1;
      $('.other-reviews .other-content_title #slider-pagination-list li a').removeClass('active');
      $('.other-reviews .other-content_title #slider-pagination-list li a[slick-index="'+currentPage+'"]').addClass('active');
    })
  }
  refeshOtherReviewSlider();
  $('.press-reviews .product-review-tabs .product-reviews-tab').click((e) =>{
    $('.press-reviews .product-review-tabs .product-reviews-tab').removeClass('active');
    $('.press-reviews .press-reviews_container .from-press_desktop .press-reviews_tab').removeClass('active');
    $(e.currentTarget).addClass('active');
    $tab = $(e.currentTarget).attr('data-tab');
    $('.press-reviews .press-reviews_container .from-press_desktop .press-reviews_tab[data-tab="'+$tab+'"]').addClass('active');
    if($('.press-reviews .press-reviews_container .from-press_desktop .press-reviews_tab[data-tab="'+$tab+'"] .press-reviews_content.slick-initialized').length == 0){
      $('.press-reviews .press-reviews_container .from-press_desktop .press-reviews_tab[data-tab="'+$tab+'"] .press-reviews_content').slick({
        arrows: false
      });
    }
  })
  $('.other-cate-item').click((e) => {
    $('.other-cate-item').removeClass('active');
    let category = $(e.currentTarget).text();
    $(e.currentTarget).addClass('active');
    $('.product-review-tabs').removeClass('active');
    $('.product-review-tabs[data-category="'+category+'"]').addClass('active');
    $('.product-review-tabs[data-category="'+category+'"] .product-review-tab').eq(0).click();
  })
  $('.product-review-tab').click((e) => {
    $('.product-review-tab').removeClass('active');
    $(e.currentTarget).addClass('active');
    let product = $(e.currentTarget).attr('data-product');
    $('.other-review-tabs').removeClass('active');
    $('.other-review-tabs[data-product="'+product+'"]').addClass('active');
    $('.other-review-tabs:not(.slick-initialized)[data-product="'+product+'"]').slick({
      infinite: true,
      arrows: false,
      swipe: true,
      slidesToShow: 1,
    });
    let pagination =  $('.other-review-tabs[data-product="'+product+'"] + .slider-pagination-custom').html();
    $('.other-reviews .other-content_title .slider-pagination').html(pagination);
    refeshOtherReviewSlider()
  })
  $('.youtube-reviews-2 .youtube-reviews_content').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      }
    ]
  });
  $('.youtube-reviews-2 #slider-pagination-list .slider-page').click(function(e){
    $('.youtube-reviews-2 .youtube-reviews_content').slick('slickGoTo', parseInt($(this).attr('slick-index')) *4);
    $('.youtube-reviews-2 #slider-pagination-list li a').removeClass('active');
    $('.youtube-reviews-2 #slider-pagination-list li a[slick-index="'+$(this).attr('slick-index')+'"]').addClass('active');
  })
  $('.youtube-reviews-2 .slider-pagination__wrapper .next.slick-arrow').click(function(e){
    $('.youtube-reviews-2 .youtube-reviews_content').slick('slickNext');
    let currentSlide = $('.youtube-reviews-2 .youtube-reviews_content').slick('slickCurrentSlide');
    let currentPage = currentSlide / 4 + 1;
    $('.youtube-reviews-2 #slider-pagination-list li a').removeClass('active');
    $('.youtube-reviews-2 #slider-pagination-list li a[slick-index="'+currentPage+'"]').addClass('active');
  })
  $('.youtube-reviews-2 .slider-pagination__wrapper .prev.slick-arrow').click(function(e){
    $('.youtube-reviews-2 .youtube-reviews_content').slick('slickPrev');
    let currentSlide = $('.youtube-reviews-2 .youtube-reviews_content').slick('slickCurrentSlide');
    let currentPage = currentSlide / 4 + 1;
    $('.youtube-reviews-2 #slider-pagination-list li a').removeClass('active');
    $('.youtube-reviews-2 #slider-pagination-list li a[slick-index="'+currentPage+'"]').addClass('active');
  })
});
