$(document).ready(function() {
    $('.red-alert .slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: false,
      dots: true,
      asNavFor: '.red-alert .slider-nav-thumbnails'
   });

   $('.red-alert .slider-nav-thumbnails').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      asNavFor: '.red-alert .slider',
      dots: false,
      focusOnSelect: true,
      vertical: true
   });
      
   $('.slider-gallery').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
     arrows: false,
      dots: true,
      focusOnSelect: true,
     arrows: false,
       responsive: [
        {
          breakpoint: 500,
          settings: {
          	slidesToShow: 1,
          	slidesToScroll: 1,
          }
        }
      ] 
   });

   // Remove active class from all thumbnail slides
   $('.red-alert .slider-nav-thumbnails .slick-slide').removeClass('slick-active');

   // Set active class to first thumbnail slides
   $('.red-alert .slider-nav-thumbnails .slick-slide').eq(0).addClass('slick-active');

   // On before slide change match active thumbnail to current slide
   $('.red-alert .slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      var mySlideNumber = nextSlide;
      $('.red-alert .slider-nav-thumbnails .slick-slide').removeClass('slick-active');
      $('.red-alert .slider-nav-thumbnails .slick-slide').eq(mySlideNumber).addClass('slick-active');
  });
  
   $(".red-alert .buy-now select").change(function(){ 
        var element = $(this).find('option:selected'); 
        var producturl = element.attr("product-url"); 
        var productmain = element.attr("product-main"); 
        var datagal1 = element.attr("data-gal1"); 
        var datagal2 = element.attr("data-gal2"); 
        var datagal3 = element.attr("data-gal3"); 
        var datagal4 = element.attr("data-gal4"); 
        var datagal5 = element.attr("data-gal5"); 
        var datagal6 = element.attr("data-gal6"); 
        var datagal7 = element.attr("data-gal7"); 
        var datagal8 = element.attr("data-gal8"); 

     	$('.red-alert .data-gal1').attr('src',datagal1);
     	$('.red-alert .data-gal2').attr('src',datagal2);
     	$('.red-alert .data-gal3').attr('src',datagal3);
     	$('.red-alert .data-gal4').attr('src',datagal4);
     	$('.red-alert .data-gal5').attr('src',datagal5);
     	$('.red-alert .data-gal6').attr('src',datagal6);
     	$('.red-alert .data-gal7').attr('src',datagal7);
     	$('.red-alert .data-gal8').attr('src',datagal8);
     	$('.red-alert #red-alert-product-main').attr('src',productmain);
     
     	$('.red-alert .buy-now-link a').attr('href',producturl);
     	$('.red-alert .buy-now-bottom a').attr('href',producturl);
    }); 
  
  
  $('.snow-storm .slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: false,
      dots: true,
      asNavFor: '.snow-storm .slider-nav-thumbnails',
   });

   $('.snow-storm .slider-nav-thumbnails').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      asNavFor: '.snow-storm .slider',
      dots: false,
      focusOnSelect: true,
      vertical: true
   });
      

   // Remove active class from all thumbnail slides
   $('.snow-storm .slider-nav-thumbnails .slick-slide').removeClass('slick-active');

   // Set active class to first thumbnail slides
   $('.snow-storm .slider-nav-thumbnails .slick-slide').eq(0).addClass('slick-active');

   // On before slide change match active thumbnail to current slide
   $('.snow-storm .slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      var mySlideNumber = nextSlide;
      $('.snow-storm .slider-nav-thumbnails .slick-slide').removeClass('slick-active');
      $('.snow-storm .slider-nav-thumbnails .slick-slide').eq(mySlideNumber).addClass('slick-active');
  });
  
   $(".snow-storm .buy-now select").change(function(){ 
        var element = $(this).find('option:selected'); 
        var producturl = element.attr("product-url"); 
        var productmain = element.attr("product-main"); 
        var datagal1 = element.attr("data-gal1"); 
        var datagal2 = element.attr("data-gal2"); 
        var datagal3 = element.attr("data-gal3"); 
        var datagal4 = element.attr("data-gal4"); 
        var datagal5 = element.attr("data-gal5"); 
        var datagal6 = element.attr("data-gal6"); 
        var datagal7 = element.attr("data-gal7"); 
        var datagal8 = element.attr("data-gal8"); 

        $('.snow-storm .data-gal1').attr('src',datagal1);
        $('.snow-storm .data-gal2').attr('src',datagal2);
        $('.snow-storm .data-gal3').attr('src',datagal3);
        $('.snow-storm .data-gal4').attr('src',datagal4);
        $('.snow-storm .data-gal5').attr('src',datagal5);
        $('.snow-storm .data-gal6').attr('src',datagal6);
        $('.snow-storm .data-gal7').attr('src',datagal7);
        $('.snow-storm .data-gal8').attr('src',datagal8);
     	$('.snow-storm #snow-storm-product-main').attr('src',productmain);
     
     	$('.snow-storm .buy-now-link a').attr('href',producturl);
     	$('.snow-storm .buy-now-bottom a').attr('href',producturl);
    });
  
  	//click dots
    $('.red-alert .node').on('click', function () {
        var target = $(this).attr("data-target");
      	$( "." + target ).trigger( "click" );
    });
  	$('.snow-storm .node').on('click', function () {
        var target = $(this).attr("data-target");
      	$( "." + target ).trigger( "click" );
    });
  
});