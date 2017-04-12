(function() {

	$(document).on('dotdotdot', function () {
		$('[data-module="dotdotdot"]').dotdotdot({
	    wrap: 'letter'
	  });
	});

	$(document).on('lazyload', function () {
	  $('[data-module="lazyload"]').lazy({
	    effect: "fadeIn",
	    effectTime: 1000,
	    threshold: 0,
	    defaultImage: ''
	  });
	});

  $(document).trigger('dotdotdot');
  $(document).trigger('lazyload');

})();