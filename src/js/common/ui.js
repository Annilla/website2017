import {throttle} from './module.js';
import {dExclusive} from './deskexclu.js';

function navFixed() {
  let $window = $(window);
  let winH = $window.height();
  let fixed = 'fixed';
  let $nav = $('.header .nav');
  let $navH = $nav.height();
  let $navGroup = $nav.find('.navGroup');

  function fixedNAV() {
    let window_position = $window.scrollTop();
    let navTop = $nav.offset() ? $nav.offset().top : 0;
    if (window_position > navTop) {
      $navGroup.addClass(fixed);
    }
    else if (window_position < navTop + $navH) {
      $navGroup.removeClass(fixed);
    }
  }

  $window.scroll(throttle(fixedNAV, 250));
}

function searchCover() {
  // Click black background to hide search page
  let $bg = $('nav');
  let $close = $('#noOpen');
  $bg.on('click', '.searchfixed, .searchfixedWrap', function (e) {
    if (e.target !== this) return;
    $close.prop("checked", true);
  });
}

function mTopic() {
  let $tagWrap = $('.mtopic .tagWrap');
  let $tag = $tagWrap.find('.tag');

  // check if no tag
  if($tag.length === 0) return;

  // Add class for owl-carousel
  $tagWrap.addClass('owl-carousel owl-theme');

  // Init owl-carousel
  $tagWrap.owlCarousel({
    margin: 10,
    autoWidth: true,
    dots: false,
    nav: true,
    navContainerClass: 'topicNav',
    navText: ['', '']
  });
}

function dTopic() {
  let $tagWrap = $('.dtopic .tagWrap');
  let $tag = $tagWrap.find('.tag');

  // check if no tag
  if($tag.length === 0) return;

  // Add tag inline style css
  $tag.each(function () {
    let $this = $(this);
    $this.css('width',$this.width());
  });

  // Add class for owl-carousel
  $tagWrap.addClass('owl-carousel owl-theme');

  // Init owl-carousel
  $tagWrap.owlCarousel({
    margin: 20,
    autoWidth: true
  });

  // Hide owl-dots if only has one dot
  let $dots = $('.owl-dots');
  let $dot = $dots.find('.owl-dot');
  if ($dot.length === 1) {
    $dots.hide();
  }

}

export function ui() {
  // Nav fixed top
  navFixed();
  // Search popup
  searchCover();
  // Mobile topic
  mTopic();
  // Desktop topic
  dTopic();
  // Desktop menu exclusive
  dExclusive();
}