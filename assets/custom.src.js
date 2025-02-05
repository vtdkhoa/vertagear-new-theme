

//------------------------------------------
//------------------------------------------
var clsVideo = (function () {
    //PARAMATERS
    var timeout_video = null
    //INIT
    function init() {
        if($('.block-video').length == 0 ) return;

        events();

        $(window).load(function () {
            // Run code
            $('.block-video').attr('video','waiting');
            
            timeout_video = setTimeout(() => {
                play();
            }, 4000);
        });
    }

    function events() {
        $('.js-playvideo').click(function (e) { 
            e.preventDefault();
            play();
        });

        $('.js-pausevideo').click(function (e) { 
            e.preventDefault();
            pause();
        });

        
    }

    ////////////////////////////
    //FUNCTION
    function play() {
        clearTimeout(timeout_video);
        $('.block-video').attr('video','play');
        $('.block-video .-desktop video').trigger('play');
    }

    function pause() {
        $('.block-video').attr('video','pause');
        $('.block-video .-desktop video').trigger('pause');
    }
    ////////////////////////////
    //RETURN
    return {
        init: init
    }


})();

////////////////////////////////////
//run with setinteval

$(function () {
    clsVideo.init();
});


//------------------------------------------
//------------------------------------------
var clsMenuQuickview = (function () {
    //PARAMATERS

    //INIT
    function init() {

        if ($('.block-menuquickview').length == 0) return;

        events()
    }

    ////////////////////////////
    //EVENTS
    function events() {
        check()
        $(document).scroll(function () {
            check()
        });

        $('.js-viewmoreallproduct').click(function (e) { 
            e.preventDefault();
            expand();
        });
    }


    ////////////////////////////
    //FUNCTION
    function check() {
        if ($(window).scrollTop() > 0) {
            show();
        } else {
            hide();
        }

       
    }

    function show() {
        $('.block-menuquickview').show();
    }

    function hide() {
        $('.block-menuquickview').hide();
        $('.block-menuquickview').attr('expand','0');
    }


    function expand() {
        var expand = parseInt($('.block-menuquickview').attr('expand'));
        console.log('expand',expand)

        if(expand == 1) {
            $('.block-menuquickview').attr('expand','0');
        }else {
            $('.block-menuquickview').attr('expand','1');
        }
    }


    ////////////////////////////
    //RETURN
    return {
        init: init
    }


})();

////////////////////////////////////
//run with setinteval

$(function () {
    clsMenuQuickview.init();
});


//------------------------------------------
//------------------------------------------
var clsCampagin_review = (function () {
    //PARAMATERS

    //INIT
    function init() {

        if ($('.campagin-review').length == 0) return;

        events()
    }

    ////////////////////////////
    //EVENTS
    function events() {
        // star_rating()
        $( '.campagin-review-recent' ).hover( star_rating, star_reset );


    ////////////////////////////
    //FUNCTION
    function star_rating() {
        var point = $('.point').text().trim();
        var star = '.campagin-review-recent .point .okeReviews-starRating-indicator-layer--foreground';
        const starTotal = 5;

        const starPercentage = (point / starTotal) * 100;
        const starPercentageRounded = `${((starPercentage / 10) * 10)}%`;
        document.querySelector(star).style.width = starPercentageRounded;
        console.log(starPercentageRounded)
    }

    function star_reset() {
        var star = '.campagin-review-recent .point .okeReviews-starRating-indicator-layer--foreground';

        const starPercentageRounded = '20%';
        document.querySelector(star).style.width = starPercentageRounded;
        console.log(starPercentageRounded)
    }






    ////////////////////////////
    //RETURN
    return {
        init: init
    }


})();

////////////////////////////////////
//run with setinteval

$(function () {
    clsCampagin_review.init();
});
