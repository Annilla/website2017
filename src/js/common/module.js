(function() {
  let myLazyLoad = new LazyLoad({
    threshold: 0,
    data_src: "original"
  });

  $(document).on('vlazyload_update', function () {
    myLazyLoad.update();
  });

  $(document).on('dotdotdot', function () {
    $('[data-module="dotdotdot"]').dotdotdot({
      wrap: 'letter'
    });
  });

  $(document).trigger('dotdotdot');

})();