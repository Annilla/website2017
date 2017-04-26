import {isCollection} from '../../common/module.js';

let $window = $(window);
let winW = $(window).width();
let winH = $window.height();
let noDFP = isCollection();
let $coverDFP = $('#coverDFP');
let $closeBtn = $coverDFP.find('.closeDFP');
let $iframe = $coverDFP.find('iframe.dfp');
let $tag = $('.article article .tag');
let hide = 'hide';
let show = 'show';
let tbW = 768;
let desW = 1024;
let poptracker;

function clickDFP() {
  $closeBtn.click(function () {
    let status = $tag.data('popup');

    $coverDFP.removeClass(show);
    if (status === 'true') return;
    if (winW < tbW) {
      $iframe.attr({
        'src': './takeover_bottom.html',
        'width': 300,
        'height': 250
      });
    }
    else if (winW >= desW) {
      $iframe.attr({
        'src': './takeover_bottom.html',
        'width': 480,
        'height': 250
      });
    }
  });
}

export function coverDFP() {
  // If isCollection is true dont popup
  if (noDFP) {
    return;
  }

  // Listen DFP close btn
  clickDFP();

  // Listen bottom DFP
  poptracker = new LazyLoad({
    threshold: 0,
    data_src: "track",
    callback_load: function() {
      $coverDFP.addClass(show);
    }
  });

  // Init DFP cover
  // juksy.com/embed/ads_pre_incover
  // juksy.com/embed/ads_post_incover
  $coverDFP.addClass(show);
  if (winW < tbW) {
    $iframe.attr({
      'src': './takeover_top.html',
      'width': 320,
      'height': 480
    });
  }
  else if (winW >= desW) {
    $iframe.attr({
      'src': './takeover_top.html',
      'width': 970,
      'height': 600
    });
  }
}