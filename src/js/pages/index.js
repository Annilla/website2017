(function() {
  const $window = $(window);
  const $winW = $window.width();
  const $indexSlider = $('.indexSlider');
  const $indexMag = $('.indexMag');
  const $latest = $('.latestArticles');

  // indexSlider
  $indexSlider.find('.sliderItem').width($winW);
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

  // latest
  if ($winW < 768) {
    $latest.addClass('owl-carousel owl-theme');
    $latest.owlCarousel({
      items: 1,
      loop: true,
      lazyLoad: true,
      dots: false,
      nav: true,
      navContainerClass: 'latestNav',
      navText: ['', '']
    });
  }
  else {
    $latest.find('.lazy').lazy({
      effect: "fadeIn",
      effectTime: 1000,
      threshold: 0,
      defaultImage: ''
    });
  }

  // indexMag
  $indexMag.owlCarousel({
    loop: true,
    lazyLoad: true,
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
