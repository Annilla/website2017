import $ from 'jquery';
require('owl.carousel');

export default function () {
  $(document).ready(function(){
  	$('.indexSlider').owlCarousel({
  		items: 1,
  		loop: true,
  		// autoplay: true
  	});
	});
}