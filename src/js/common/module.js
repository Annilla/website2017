(function() {

	$('[data-module="dotdotdot"]').dotdotdot({
    wrap: 'letter'
  });

  $('[data-module="lazyload"]').lazy({
    effect: "fadeIn",
    effectTime: 1000,
    threshold: 0,
    defaultImage: ''
  });

})();