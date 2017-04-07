(function() {
  const $indexSlider = $('.indexSlider');
  const $window = $(window);

  $indexSlider.find('.sliderItem').width($window.width());

  $indexSlider.owlCarousel({
  	autoWidth: true,
    items: 1,
    loop: true,
    singleItem:true,
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 1000,
    autoplayHoverPause: true,
    dotsClass: 'indexSliderDots'
  });

})();
