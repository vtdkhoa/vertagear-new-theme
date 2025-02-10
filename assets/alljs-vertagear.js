var observeDOMVertagear = (function () {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    return function (obj, callback) {
        var mutationObserver;
        if (obj && 1 === obj.nodeType)
            return MutationObserver
                ? ((mutationObserver = new MutationObserver(callback)).observe(obj, { childList: !0, subtree: !0 }), mutationObserver)
                : void (window.addEventListener && (obj.addEventListener("DOMNodeInserted", callback, !1), obj.addEventListener("DOMNodeRemoved", callback, !1)));
    };
})(),
clsGenerals = { init: function () {} },
clsVertagearCart =
    ($(function () {
        clsGenerals.init();
    }),
    (function () {
        function cartleft_init() {
            0 != $(".cart.ajaxcart").length &&
                ($(document).on("click", ".ajaxcart__qty", function () {
                    console.log("watchclick"),
                        setTimeout(() => {
                            cartleft_recaculatetotal();
                        }, 500);
                }),
                cartleft_recaculatetotal());
        }
        function cartleft_recaculatetotal() {
            var totalPrice = 0,
                totalCompare = 0,
                strShowTotal =
                    ($(".ajaxcart__product").each(function (index, element) {
                        var strPriceTotal,
                            variantprice = parseFloat($(element).attr("variantprice")),
                            compare_at_price = $(element).attr("compare_at_price") ? parseFloat($(element).attr("compare_at_price")) : variantprice,
                            quatity = parseInt($(element).find("input").val());
                        variantprice < compare_at_price && ((strPriceTotal = "<s>$" + (compare_at_price * quatity) / 100 + "</s> $" + (variantprice * quatity) / 100), $(element).find(".ajaxcart-item__price").html(strPriceTotal)),
                            (totalPrice += variantprice * quatity),
                            (totalCompare += compare_at_price * quatity);
                    }),
                    ""),
                strShowTotal = totalPrice < totalCompare ? "<s>$" + totalCompare / 100 + "</s> $" + totalPrice / 100 : "$" + totalPrice / 100;
            $(".cart.ajaxcart .tdf-cart-total-parent").html(strShowTotal);
        }
        function cartpage_recaculatetotal() {
            var totalPrice = 0,
                totalCompare = 0,
                strShowTotal =
                    ($(".cart__row.table__section").each(function (index, element) {
                        var variantprice = parseFloat($(element).attr("variantprice")),
                            compare_at_price = $(element).attr("compare_at_price") ? parseFloat($(element).attr("compare_at_price")) : variantprice,
                            quatity = parseInt($(element).find(".js-qty__num").val()),
                            selling_plan_price = $(element).attr("selling-plan-price") ? parseFloat($(element).attr("selling-plan-price")) : null,
                            strPriceTotal = (console.log(compare_at_price, variantprice, quatity), "");
                        if(selling_plan_price == null){
                            variantprice < compare_at_price
                                ? ((strPriceTotal = "<s>$" + (compare_at_price * quatity) / 100 + "</s> $" + (variantprice * quatity) / 100),
                                  $(element)
                                      .find(".tdf_price_save .tdf_money")
                                      .html("$" + ((compare_at_price - variantprice) * quatity) / 100))
                                : (strPriceTotal = "$" + (variantprice * quatity) / 100),
                                $(element).find(".tdf-cart-item-lp-p").html(strPriceTotal),
                                (totalPrice += variantprice * quatity),
                                (totalCompare += compare_at_price * quatity);
                        }else{
                            $(element).find(".tdf-cart-item-lp-p").text(Shopify.formatMoney(selling_plan_price * quatity,'${{amount}}'));
                            totalPrice += selling_plan_price * quatity
                            totalCompare += selling_plan_price * quatity
                        }
                    }),
                    console.log(totalPrice, totalCompare),
                    ""),
                strShowTotal = totalPrice < totalCompare ? "<s>" + Shopify.formatMoney(totalCompare,'${{amount}}') + "</s> " + Shopify.formatMoney(totalPrice,'${{amount}}') : Shopify.formatMoney(totalPrice,'${{amount}}');
            $("#js_cart__subtotal").html(strShowTotal);
        }
        return {
            init: function () {
                0 != $(".page-cart").length &&
                    (console.log("watch"),
                    $(document).on("click", ".js-qty", function () {
                        console.log("watchclick"),
                            setTimeout(() => {
                                cartpage_recaculatetotal();
                            }, 500);
                    }),
                    cartpage_recaculatetotal()),
                    cartleft_init();
            },
            cartleft_init: cartleft_init,
            cartleft_recaculatetotal: cartleft_recaculatetotal,
        };
    })());
$(function () {
clsVertagearCart.init();
});
