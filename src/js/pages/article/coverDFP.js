import {isCollection} from '../../common/module.js';

let $window = $(window);
let winW = $(window).width();
let winH = $window.height();
let noDFP = isCollection();
let $main = $('main.article');
let $coverDFP;
let $closeBtn;
let $iframe;
let $tag = $('.article article .tag');
let hide = 'hide';
let show = 'show';
let tbW = 768;
let desW = 1024;
let poptracker;
let coverTmp = `
  <div class="juksyCover" id="coverDFP">
    <div class="popWrap">
      <div class="closeDFP">X</div>
      <div class="popContent">
        <iframe class="dfp" src="" scrolling="no" frameborder="0" allowtransparency="true"></iframe>
      </div>
    </div>
  </div>
`;

function addTmp () {
  $main.after(coverTmp);
  $coverDFP = $('#coverDFP');
  $closeBtn = $coverDFP.find('.closeDFP');
  $iframe = $coverDFP.find('iframe.dfp');
}

function clickDFP() {
  $closeBtn.click(function () {
    let status = $tag.data('popup');

    $coverDFP.removeClass(show);
    if (status === 'true') return;
    if (winW < tbW) {
      $iframe.attr({
        // 'src': `//${APP_HOST}/takeover_bottom.html`,
        'src': `./takeover_bottom.html`,
        'width': 300,
        'height': 250
      });
    }
    else if (winW >= desW) {
      $iframe.attr({
        // 'src': `//${APP_HOST}/takeover_bottom.html`,
        'src': `./takeover_bottom.html`,
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

  // Dynamic add AD cover
  addTmp();

  // Listen DFP close btn
  clickDFP();

  // Listen bottom DFP
  poptracker = new LazyLoad({
    threshold: 0,
    data_src: "track",
    callback_load: function() {
      let status = $tag.data('popup');
      if (status === 'true') return;
      $coverDFP.addClass(show);
      $tag.data('popup', 'true');
    }
  });

  // Init DFP cover
  // juksy.com/embed/ads_pre_incover
  // juksy.com/embed/ads_post_incover
  $coverDFP.addClass(show);
  if (winW < tbW) {
    $iframe.attr({
      // 'src': `//${APP_HOST}/takeover_top.html`,
      'src': `./takeover_top.html`,
      'width': 320,
      'height': 480
    });
  }
  else if (winW >= desW) {
    $iframe.attr({
      // 'src': `//${APP_HOST}/takeover_top.html`,
      'src': `./takeover_top.html`,
      'width': 970,
      'height': 600
    });
  }
}