(function() {
  const $window = $(window);
  const $indexSlider = $('.indexSlider');
  const $indexMag = $('.indexMag');

  $indexSlider.find('.sliderItem').width($window.width());

  $indexSlider.owlCarousel({
  	autoWidth: true,
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 1000,
    autoplayHoverPause: true,
    dotsClass: 'indexSliderDots'
  });

  $indexMag.owlCarousel({
    loop: true,
    dots: false,
    nav: true,
    navContainerClass: 'indexMagNav',
    navText: ['', ''],
    responsive : {
      0: {
        items: 1,
        smartSpeed: 1000,
      },
      768: {
        items: 2,
        smartSpeed: 1000,
        margin: 10
      },
      1024: {
        items: 4,
        smartSpeed: 500,
        margin: 10,
        slideBy: 2
      }
    }
  });

})();
