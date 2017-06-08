import {throttle} from '../../common/module.js';

let $window = $(window);

function fixedDFP() {
  let window_position = $window.scrollTop();
  let $middle = $('#juksy_index');
  let $sideL = $('#juksy_index_side_left');
  let $sideR = $('#juksy_index_side_right');
  let fixed = 'fixed';
  let top = 55+45+30;
  let ref = $middle.offset() ? $middle.offset().top : 0;
  if (ref < window_position + top) {
    $sideL.addClass(fixed);
    $sideR.addClass(fixed);
  }
  else {
    $sideL.removeClass(fixed);
    $sideR.removeClass(fixed);
  }
}

export function sideDFP() {
  // 滑到下方時，左右門簾變成fixed
  $window.scroll(throttle(fixedDFP, 250));
}
