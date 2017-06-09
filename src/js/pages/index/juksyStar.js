let $indexMag = $('.indexMag');

let device_responsive = {
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
};

export function juksyStar() {
  $indexMag.owlCarousel({
    loop: true,
    lazyLoad: true,
    dots: false,
    nav: true,
    navContainerClass: 'indexMagNav',
    navText: ['', ''],
    responsive: device_responsive
  });
}
