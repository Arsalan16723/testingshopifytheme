$(document).ready(function () {
  /// Constant

  var windowWidth = $(window).width();

  /// Testiminal/Quotes Swiper Init

  const swiperTestimonial = new Swiper(".testimonial-slider", {
    speed: 600,
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
      nextEl: ".testimonial-slider .swipe-btn-next",
      prevEl: ".testimonial-slider .swipe-btn-prev"
    },
    init: false,
  });

  swiperTestimonial.on("init", function () {
      var bgColor= $('.swiper-slide-active').data('color');
      $(".testimonial-slider").css('background-color', bgColor);
  });

  swiperTestimonial.on("slideChange", function () {
    var bgColor= $('.swiper-slide-next').data('color');
    $(".testimonial-slider").css('background-color', bgColor); 
  });

  if($("body").hasClass('template-index')){
    swiperTestimonial.init();
  }

  /// Featured Product Swiper Init

  const swiper = new Swiper(".product-slider", {
    speed: 600,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 5
      },
      // when window width is >= 480px
      600: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      // when window width is >= 640px
      990: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  });

  var imageContainer = $(".swiper-slide").find(".product-grid-inner");
  var image = $(".swiper-slide").find(".zoom-image");
  var slider = $('.product-page-slider'); 
  var slidercontainerHeight = $('#product-slider-outer'); 

  swiper.on("touchMove", function (event) {
    if (event) {
      if (windowWidth >= 750) {
        //imageContainer.css("transform", `scale(0.9) translate3d(0, 0,0)`);
        image.css("transform", `scale(1.2) translate3d(0, 0,0)`);
        imageContainer.removeClass("hover");
      }
    }
  });

  swiper.on("reachBeginning", function () {
    if (windowWidth >= 750) {
      $(".product-slider-header ")
        .css("opacity", "1")
        .css("transform", "scale(1)");
    }
  });

  swiper.on("slideChangeTransitionStart", function () {
    if (windowWidth >= 750) {
      if (swiper.activeIndex == 1 && swiper.previousIndex == 0) {
        $(".product-slider-header ")
          .css("opacity", "0")
          .css("transform", "scale(0.8)");
      }
    }
  });

  swiper.on("touchEnd", function (event) {
    if (event) {
      if (windowWidth >= 750) {
        image.css("transform", `scale(1.1) translate3d(0,0,0)`);
        setTimeout(() => {
          imageContainer.addClass("hover");
        }, 500);
      }
    }
  });

  /// Function to calculate offset top
  function isScrolledIntoView(elem, offsetValue) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top - offsetValue;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }

  /// var, lets & Constants
  let lastScroll = 0;
  var headerComp = $(".site-header, .site-header-background");
  var headerOuter = $(".site-header-container");

  $(window).on("resize", function () {
    slidercontainerHeight.css('width' , 'calc(50% - 5rem)');
    slider.css('width' , '100%');

  });


  $(window).on("scroll", function () {

    /// Scroll
    var scroll = $(window).scrollTop();

    /// Add Class when in view for animation for all elements
    $('.animate').each(function () {
      if (isScrolledIntoView(this, 100) === true) {
          $(this).addClass('is-inview');
      }
    });

   


    /// Header and Announcement Scroll Animation

    
    if (scroll > lastScroll && scroll > 0 ) {
      headerOuter.addClass("move");
    } else {
      headerOuter.removeClass("move");
    }
    lastScroll = scroll;

    if (scroll > 120) {
      headerComp.addClass("background");
    } else {
      headerComp.removeClass("background");
    }

    /// End of scroll function

  });

  /// Removing Listeners for smaller devices

  if (windowWidth <= 769) {
    swiper.off("reachBeginning");
    swiper.off("slideChangeTransitionStart");
    swiper.off("touchMove");
    swiper.off("touchEnd");
  }

  

  /// lazyload  

    window.lazySizesConfig = window.lazySizesConfig || {};
    window.lazySizesConfig.loadHidden = false;


   /// Quantity Selector function

   $(document).on("click", ".qtybox .btnqty", function () {
    console.log("clicked");
    var qty = parseInt($(this).parent(".qtybox").find(".quantity-input").val());
    if ($(this).hasClass("qtyplus")) {
      qty++;
    } else {
      if (qty > 0) {
        qty--;
      }
    }
    qty = isNaN(qty) ? 1 : qty;
    $(this)
      .parent(".qtybox")
      .find(".quantity-input")
      .val(qty)
      .trigger("change");
  });

  /// Accordian Function

  $(".accordian .title").on("click", function () {
    var accordianIcon = $(".accordian .fa.fa-plus");
    var selectedIcon = $(this).find(".fa.fa-plus");

    if (selectedIcon.hasClass("open")) {
      selectedIcon.removeClass("open");
      selectedIcon.html("+");
    } else {
      accordianIcon.removeClass("open");
      selectedIcon.addClass("open");
      accordianIcon.html("+");
      selectedIcon.html("-");
    }

    $(".accordian ul div").slideUp();
    if ($(this).next().is(":hidden")) {
      $(this).next().slideDown();
    }
  });


  /// Ajax Slide Cart show function  
  
  $(".site-header__cart, .close-cart-btn, .close-cart-btn").on("click", function (e) {
    if(!$('body').hasClass('template-cart')){
      e.preventDefault();
      var scroll = $(document).scrollTop();

      $(".slide-cart-overlay").toggleClass("slide");

      if ($(".slide-cart-overlay").hasClass("slide")) {
        headerComp.addClass("background");
        headerOuter.removeClass("background");
        headerComp.addClass("cart-open");
        headerOuter.addClass("cart-open");
      } else {
        if (scroll < 120) {
          headerComp.removeClass("background");
          headerOuter.removeClass("background");
        }
        headerComp.removeClass("cart-open");
        headerOuter.removeClass("cart-open"); 
      }
    }
  });

  /// Reload Cart for Ajax  

  theme.Cart.prototype._setupCartTemplates();

  /// Instagram Plugin
  if($('.instagram-feed').length > 0){
    $(".instagram-feed").instastory({
      get: `${$('.instagram-feed').attr('handle')}`,
      limit: 4,
      imageSize: 480,
      template: '<div class="col-xs-6 col-sm-3 insta-img"><a href="{{link}}"><div class="image-overlay">{{caption}}</div><img data-src="{{image}}" data-srcset="{{image}} 300w, {{image}} 480w" class="lazyload" alt="{{caption}}" ></a></div>'
    });
  }
  
  
  
});
