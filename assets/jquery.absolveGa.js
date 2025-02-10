jQuery.fn.absolveGa = function(action, fnParams){
  var actions = {};
      
  actions.virtual_pageview = function(params){
    if(!("path" in params)){
      return false;
    }
    // TODO: strip leading slash of path
    var vpvParams = {
      hitType: 'pageview',
      page: '/virtual_pageview/' + params.path,
      title: ("title" in params) ? params.title : params.path,
    };
    function send() {
      if(typeof ga !== "undefined") {
        ga('send', vpvParams);
        console.log("absolveGA: virtual pageview sent:", vpvParams);
      } else {
        console.log("absolveGa: retrying vpv");
        setTimeout(send, 400);
      }
    }
    return true;
  };
  
  //console.log("absolveGa: ", action, fnParams);
  return (action in actions) ? actions[action](fnParams) : false;
};