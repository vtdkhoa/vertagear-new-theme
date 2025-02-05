//------------------------------------------
var clsRGBpage = (function () {
    //PARAMATERS
    var setting = {
        root: '.page-rgb',

        isShow: false
    }

    //INIT
    function init() {
        if ($(setting.root).length == 0) return;
        rgb_init();
        contents_setswipersnormal();
    }

  

    ////////////////////////////
    //FUNCTION
    function show() {
        setting.isShow = true;
        $('body').attr('popup', 'show');



        var tl = gsap.timeline({
            onComplete: function () {
                //$(".fe800-popup").attr("loading-popup", 0);
            }
        });

        tl.set(setting.root + ' .popup-inner', { opacity: 0 })
            .set(setting.root, { display: 'block', opacity: 1, top: '100vh' })
            .to(setting.root, { duration: .3, opacity: 1, top: 0, ease: "none" })


    }

    function hide() {
        isContentOpen = false;
        setting.isShow = false;

        var tl = gsap.timeline({
            onComplete: function () {
                $('body').attr('popup', 'hide');
                $(setting.root + ' .popup-inner').html('');
                gsap.set(setting.root, { display: 'none' })

                swipercontent = null;
            }
        });

        tl.to(setting.root, { duration: .3, top: '100vh', opacity: 0, ease: "none" })

    }

    function getshow() {
        return setting.isShow;
    }


    ////////////////////////////
    //CONTENTS POPUPS
    var swipercontent = null;

    var isContentOpen = false;
    function contents_events() {

        $(setting.root).on('click', '.videodetectpercent', function () {
            var statusvideo = $(this).attr('video');

            if (statusvideo == 'play') {
                contents_videos_stop($(this));
                $(this).addClass('notautoplay');
            } else {
                contents_videos_play($(this));

            }
        });
    }

    function contents_setview() {
        if (!swipercontent) {
            contents_percentforsetview()
        }
    }

    function contents_swiperforsetview() {
        $(setting.root + ' .swiper-slide').each(function (index, element) {
            var activeIndex = swipercontent.activeIndex;

            if (activeIndex == index) {
                contents_videos_play($(element))
            } else {
                contents_videos_stop($(element))
            }
        });
    }

    function contents_percentforsetview() {
        var withinViewportArray = $('.videodetectpercent').percentWithinViewport();

        $.each(withinViewportArray, function (index) {
            var myPercVisible = parseInt($(this).attr('data-percent-viewport'));
            //console.log('myPercVisible', myPercVisible)

            if (myPercVisible > 60 && !$(this).hasClass('notautoplay')) {
                contents_videos_play($(this))
            } else {
                contents_videos_stop($(this))
            }
        });
    }

    function contents_clickviewalltext() {
        if ($('body').attr('device') == 'Mobile') {
            
            $('.see-more').click(function () {
                console.log($(this).siblings('.see-less').length)
                if ($(this).siblings('.see-less').length > 0) {
                    $(this).hide();
                    $(this).siblings('.see-less').show();
                }
            })

            $('.see-less').click(function () {
                $(this).hide();
                $(this).siblings('.see-more').show();
            })
        }
    }


    function contents_setswipersnormal() {
        if ($('#swiperfearure').length > 0) {
            new Swiper('#swiperfearure', {
                spaceBetween: 10,
                slidesPerView: 1,
                pagination: {
                    enabled: true,
                    el: ".swiperfearure-pagination",
                    type: 'custom',
                    clickable: true,
                    renderCustom: function (swiper, current, total) {
                        var out = ''
                        for (i = 1; i < total + 1; i++) {
                            if (i == current) {
                                out = out + '<span class="swiper-pagination-bullet swiper-pagination-bullet-active" tabindex=' + i + ' role="button" aria-label="Go to slide ' + i + 1 + '"></span>';
                            }
                            else {
                                out = out + '<span class="swiper-pagination-bullet" tabindex=' + i + ' role="button" aria-label="Go to slide ' + i + 1 + '"></span>';
                            }
                        };
                        return out;
                    },
                },
                navigation: {
                    enabled: false,
                },
                breakpoints: {
                    1024: {
                        slidesPerView: 3.5,
                        navigation: {
                            enabled: true,
                            nextEl: ".swiperfearure-next",
                            prevEl: ".swiperfearure-prev",
                        },
                    },
                },
            });

            if ($('body').attr('device') == 'Mobile') {

                $('#swiperfearure .see-more').click(function () {
                    $(this).parent().addClass('active');
                    $(this).siblings('.desc').find('.see-less').css('display', 'inline-block');
                    $(this).hide();
                })

                $('#swiperfearure .see-less').click(function () {
                    console.log('123123123', $(this).parent().parent())
                    $(this).parent().parent().removeClass('active');
                    $(this).parent().siblings('.see-more').css('display', 'inline-block');
                    $(this).hide();
                })
            }
        }

        if ($('#swiperreview').length > 0) {
            new Swiper('#swiperreview', {
                spaceBetween: 10,
                slidesPerView: 1,
                pagination: {
                    enabled: true,
                    el: ".swiperreview-pagination",
                    type: 'custom',
                    clickable: true,
                    renderCustom: function (swiper, current, total) {
                        var out = ''
                        for (i = 1; i < total + 1; i++) {
                            if (i == current) {
                                out = out + '<span class="swiper-pagination-bullet swiper-pagination-bullet-active" tabindex=' + i + ' role="button" aria-label="Go to slide ' + i + 1 + '"></span>';
                            }
                            else {
                                out = out + '<span class="swiper-pagination-bullet" tabindex=' + i + ' role="button" aria-label="Go to slide ' + i + 1 + '"></span>';
                            }
                        };
                        return out;
                    },
                },
                breakpoints: {
                    1024: {
                        spaceBetween: 90,
                        slidesPerView: 3,
                    },
                },
            });
        }

        if ($('#swipercarouselgallery').length > 0) {
            new Swiper('#swipercarouselgallery', {
                spaceBetween: 40,
                slidesPerView: 1,
                autoplay: {
                    delay: 3000
                },
                navigation: {
                    enabled: false,
                },
                breakpoints: {
                    1024: {
                        spaceBetween: 40,
                        slidesPerView: 2.5,
                        navigation: {
                            enabled: true,
                            nextEl: ".swipercarouselgallery-next",
                            prevEl: ".swipercarouselgallery-prev",
                        },
                    },
                },
            });
        }

        if ($('#swipercontrols').length > 0) {
            new Swiper('#swipercontrols', {
                spaceBetween: 0,
                slidesPerView: 1,
                pagination: {
                    enabled: true,
                    el: ".swipercontrols-pagination",
                    type: 'custom',
                    clickable: true,
                    renderCustom: function (swiper, current, total) {
                        var out = ''
                        for (i = 1; i < total + 1; i++) {
                            if (i == current) {
                                out = out + '<span class="swiper-pagination-bullet swiper-pagination-bullet-active" tabindex=' + i + ' role="button" aria-label="Go to slide ' + i + 1 + '"></span>';
                            }
                            else {
                                out = out + '<span class="swiper-pagination-bullet" tabindex=' + i + ' role="button" aria-label="Go to slide ' + i + 1 + '"></span>';
                            }
                        };
                        return out;
                    },
                },
                breakpoints: {
                    1024: {
                        spaceBetween: 0,
                        slidesPerView: 2,
                    },
                },
            });
        }
    }

    function contents_videos_stop($this) {
        $this.attr('video', 'pause');
        $this.find('.play-btn').show();

        //console.log('leng',$this.find('video').length)
        $this.find('video').each(function () {
            $(this).get(0).pause();
        });

        /* if ($this.find('video').length > 1) {
            var idvideo = $('body').attr('device') == 'Mobile' ? '.video-mobile' : '.video-desktop';
            //$this.find(idvideo).trigger('pause');
            
            
        } else {
            $this.find('video').trigger('pause');
        } */
    }

    function contents_videos_play($this) {
        $this.removeClass('notautoplay');
        $this.attr('video', 'play');
        $this.find('.play-btn').hide();

        if ($this.find('video').length > 1) {
            var idvideo = $('body').attr('device') == 'Mobile' ? '.video-mobile' : '.video-desktop';
            $this.find(idvideo).trigger('play');

            if (videoallowautoplay && $this.find(idvideo)[0]) {
                $this.find(idvideo)[0].muted = true;
            }
        } else {
            $this.find('video').trigger('play');

            if (videoallowautoplay && $this.find(idvideo)[0]) {
                $this.find('video')[0].muted = true;
            }
        }
    }

    ////////////////////////////
    //functions

    var ldRgbLightUpBtnSrc = window.shopData.ldRgbLightUpBtnSrc;
    var ldRgbLightUpBlueBtnSrc = window.shopData.ldRgbLightUpBlueBtnSrc;
    var ldRgbLightUpMainImgSrc = window.shopData.ldRgbLightUpMainImgSrc;

    var objtextfeatures = [
        { url: '#ldRgbCarouselFeature', title: 'Sync Your Game <br class="mb-hide" /> and Audio', desc: 'Blast or destroy, bass or highs—those around you will vibe to the sounds of your gameplay and music through your lights. The party starts with your every move.' },
        { url: '#ldRgbLightLogo', title: 'Light Up  Your Logo <br class="mb-hide" />', desc: `Don't ever let yourself be obscured. Even as darkness descends, shine a spotlight on what you're all about like never before. This RGB kit enhances not only your gaming but also you.` },
        { url: '#ldRgbApps', title: 'Simple Controls via <br class="mb-hide" /> SignalRGB', desc: 'Easily control your lighting experience with the critically acclaimed SignalRGB software. Everything you need is just a click away.' }
    ]

    var objimagefeatures = [
        { image: 'https://cdn.shopify.com/s/files/1/1759/4609/t/73/assets/ld-rgb-feature-1.jpeg' },
        { image: 'https://cdn.shopify.com/s/files/1/1759/4609/t/73/assets/ld-rgb-feature-2.2.jpeg' },
        { image: 'https://cdn.shopify.com/s/files/1/1759/4609/t/73/assets/ld-rgb-feature-3.jpeg' },
    ]

    function rgb_init() {
        $(setting.root).on("click", ".f800-featurescontents .nam-feature__action-wrapper", function () {
            var $index = $(this).index();
            $('.nam-feature__action-wrapper').removeClass('active');
            $(this).addClass('active');

            $('.feature__bg').css('display', 'none')
            $('.feature__bg' + ($index + 1)).css('display', 'block')

            //console.log('.feature__bg' + ($index+1))

            $('#namFeatureTitleDesk').html(objtextfeatures[$index].title)
            $('#namFeatureDescDesk').html(objtextfeatures[$index].desc)
        });

        $(setting.root).on("click", ".light-logo__selection__btns img", function () {
            $(".light-logo__selection__btns img").each(function (index, element) {
                // element == this
                $(element).attr('src', ldRgbLightUpBtnSrc[index])
            });

            var rootindex = $(this).index();
            $(this).attr('src', ldRgbLightUpBlueBtnSrc[rootindex])
            $('#lightLogoImg').attr('src', ldRgbLightUpMainImgSrc[rootindex])
        });

        if ($('body').attr('device') == 'Mobile') {
            $(setting.root).on("click", ".f800-featurescontents .nam-feature__action__switch__btn", function () {
                var $index = $(this).index();
                console.log($index, objimagefeatures[$index].image, objtextfeatures[$index].url);
                $('.nam-feature__action__switch__btn').removeClass('nam-product-main-btn').addClass('nam-product-sec-btn');
                $(this).removeClass('nam-product-sec-btn').addClass('nam-product-main-btn');

                $('#namFeatureImg').attr('src', objimagefeatures[$index].image)
                $('#ldRgbExploreBtn').attr('href', objtextfeatures[$index].url)
                $('#namFeatureTitle').html(objtextfeatures[$index].title)
                $('#namFeatureDesc').html(objtextfeatures[$index].desc)
            });
        }
    }

    ////////////////////////////
    //functions

    function getshow() {
        return setting.isShow;

    }




    ////////////////////////////
    //RETURN
    return {
        init: init,
        hide: hide,
        getshow: getshow
    }

})();

////////////////////////////////////
//run with setinteval

$(function () {
    clsRGBpage.init();
});
