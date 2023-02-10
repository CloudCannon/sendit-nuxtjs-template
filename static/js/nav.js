$(document).ready(function () {
    "use strict";
  // active nav links
   $(".nav-link").each(function(i, obj) {
    if(obj.href === window.location.href){
      obj.classList.add("nuxt-link-active");
    }
   });
});