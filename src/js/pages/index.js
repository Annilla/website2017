(function() {
  const $indexSlider = $('.indexSlider');
  const $window = $(window);

  function indexSliderResizer () {
  	$indexSlider.find('.sliderItem').width($window.width());
  }

  indexSliderResizer();
  $window.resize(indexSliderResizer);

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
