import {throttle} from './module.js';

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

export function ui() {
  // Nav fixed top
  navFixed();
  // Search popup
  searchCover();
}