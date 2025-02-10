

//------------------------------------------

var observeDOMVertagear = (function () {
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

//------------------------------------------
var clsGenerals = (function () {
    //PARAMATERS
    
    //INIT
    function init() {
       
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
    clsGenerals.init();
});


//------------------------------------------

//------------------------------------------
var clsVertagearCart = (function () {
    //PARAMATERS

    //INIT
    function init() {
        cartpage_init();
        cartleft_init();
    }

    //Cart LEFT COLUMN
    function cartleft_init() {
        //console.log('cartleft_init')
        if ($('.cart.ajaxcart').length == 0) return;

        cartleft_watch();
        cartleft_recaculatetotal();
    }

    function cartleft_watch() {
        $(document).on('click', '.ajaxcart__qty', function () {
            console.log('watchclick')

            setTimeout(() => {
                cartleft_recaculatetotal();
            }, 500);
        });
    }

    function cartleft_recaculatetotal() {

        var totalPrice = 0;
        var totalCompare = 0;
        $('.ajaxcart__product').each(function (index, element) {
            // get attr
            var variantprice = parseFloat($(element).attr('variantprice'))
            var compare_at_price =  $(element).attr('compare_at_price') ? parseFloat($(element).attr('compare_at_price')): variantprice;

            var quatity = parseInt($(element).find('input').val())


            // set price to this item
            var strPriceTotal = '';
            if (compare_at_price > variantprice) {
                strPriceTotal = "<s>$" + compare_at_price * quatity / 100 + "</s> " + variantprice * quatity / 100;
            } else {
                strPriceTotal = variantprice * quatity / 100;
            }

            //$(element).find('.tdf-cart-item-lp-p').html(strPriceTotal)

            // tinh Total
            totalPrice += variantprice * quatity;
            totalCompare += compare_at_price * quatity;
        });

        // console.log( totalPrice, totalCompare);

        var strShowTotal = '';
        if (totalCompare > totalPrice) {
            strShowTotal = "<s>$" + totalCompare / 100 + "</s> " + totalPrice / 100;
        } else {
            strShowTotal = "$" + totalPrice / 100;
        }

        $('.cart.ajaxcart .tdf-cart-total-parent').html(strShowTotal);


    }


    //Cart page
    function cartpage_init() {
        //console.log('cartpage_init')
        if ($('.page-cart').length == 0) return;

        cartpage_watch();
        cartpage_recaculatetotal();
    }

    function cartpage_watch() {

        console.log('watch')

        $(document).on('click', '.js-qty', function () {
            console.log('watchclick')

            setTimeout(() => {
                cartpage_recaculatetotal();
            }, 500);
        });


    }

    function cartpage_recaculatetotal() {

        var totalPrice = 0;
        var totalCompare = 0;
        $('.cart__row.table__section').each(function (index, element) {
            // get attr
            var variantprice = parseFloat($(element).attr('variantprice'));
            var compare_at_price =  $(element).attr('compare_at_price') ? parseFloat($(element).attr('compare_at_price')): variantprice;

            var quatity = parseInt($(element).find('.js-qty__num').val());

            console.log(compare_at_price, variantprice,quatity)
            // kiem tra xem no ton tai ko ? 

            // set price to this item
            var strPriceTotal = '';
            if (compare_at_price > variantprice) {
                strPriceTotal = "<s>$" + compare_at_price * quatity / 100 + "</s> " + variantprice * quatity / 100;
                $(element).find('.tdf_price_save .tdf_money').html( '$' + (compare_at_price-variantprice)*quatity/100 )

            } else {
                strPriceTotal = "$"+variantprice * quatity/100;
            }

            $(element).find('.tdf-cart-item-lp-p').html(strPriceTotal)

            // tinh Total
            totalPrice += variantprice * quatity;
            totalCompare += compare_at_price * quatity;
        });

        console.log(totalPrice, totalCompare);

        var strShowTotal = '';
        if (totalCompare > totalPrice) {
            strShowTotal = "<s>$" + totalCompare / 100 + "</s> " + totalPrice / 100;
        } else {
            strShowTotal = "$" + totalPrice / 100;
        }

        $('#js_cart__subtotal').html(strShowTotal);


    }

    ////////////////////////////
    //RETURN
    return {
        init: init,
        cartleft_init: cartleft_init,
        cartleft_recaculatetotal: cartleft_recaculatetotal
    }

})();

////////////////////////////////////
//run with setinteval

$(function () {
    clsVertagearCart.init();
    //clsVertagearCart.cartleft_recaculatetotal()
});
