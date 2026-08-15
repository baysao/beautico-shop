(function($) { "use strict";
jQuery('.dropdown-icon').on('click', function() {
  jQuery(this).toggleClass('active').next('ul').slideToggle();
  jQuery(this).parent().siblings().children('ul').slideUp();
  jQuery(this).parent().siblings().children('.active').removeClass('active');
});
jQuery(window).on('load', function() {
  $(".egns-preloader").delay(1600).fadeOut("slow");
});
window.addEventListener('scroll', function() {
  const header = document.querySelector('header.header-area');
  header.classList.toggle("sticky", window.scrollY > 0);
});
document.querySelector('.sidebar-button').addEventListener('click', () => 
document.querySelector('.main-menu').classList.toggle('show-menu'));
$('.sidebar-button').click (function(){
  $(this).toggleClass('active');
});

// wow animate 
setTimeout(myGreeting, 1800);
function myGreeting() {
  var wow = new WOW(
    {
      boxClass:     'wow',      // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset:       0,          // distance to the element when triggering the animation (default is 0)
      mobile:       true,       // trigger animations on mobile devices (default is true)
      live:         true,       // act on asynchronously loaded content (default is true)
      callback:     function(box) {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
      },
      scrollContainer: null,    // optional scroll container selector, otherwise use window,
      resetAnimation: true,     // reset animation on end (default is true)
    }
  );
  wow.init();
}


  // Inner Pages Slider
  var swiper = new Swiper(".inner-pages-slider", {
    slidesPerView: 4,
    spaceBetween: 36,
    loop: true,
    speed: 3500,
    autoplay: {
      delay: 2000,
    },
    pagination: {
			el: ".pagination-style-two",
			clickable: 'true',
		},

    breakpoints: {
      280:{
        slidesPerView: 1,
        spaceBetween: 15
      },
      480:{
        slidesPerView: 2,
        spaceBetween: 15
      },
      700:{
        slidesPerView: 2
      },
      850:{
        slidesPerView: 3
      },
      1200:{
        slidesPerView: 3
      },
      1400:{
        slidesPerView: 4
      },
      1600:{
        slidesPerView: 4
        
      },
    }
  });

/* ---------------------------------------------
     Text animation Morphext
--------------------------------------------- */
var typing=new Typed(".text-type", {
  strings: ["ECOMMERCE", "BEAUTY PRODUCTS", "COSMETICS"],
  typeSpeed: 120,
  backSpeed: 70,
  loop: true,
});




}(jQuery));
