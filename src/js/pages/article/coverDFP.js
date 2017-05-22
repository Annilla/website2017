import {isCollection} from '../../common/module.js';

let winW = $(window).width();
let noDFP = isCollection();
let $coverDFP;
let $closeBtn;
let $iframe;
let $tag = $('.article article .tag');
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

// 通知是否有蓋台廣告
window.extraMessage = function (key) {
  switch (key) {
    case 'dfp_popup_top':
      showDFPcover(key);
      break;
    case 'dfp_popup_bottom':
      showDFPcover(key);
      break;
  }
}

// 顯示蓋台廣告並設定 Cookies
function showDFPcover(name) {
  // Set cookies in 1 hour
  Cookies.set(name, 'true', { expires: 1/24 });
  // Show cover
  $('#coverDFP').addClass('show');
}

function addTmp () {
  return $(coverTmp).appendTo('body');
}

function clickDFP() {
  $coverDFP.on('click', '.closeDFP', function () {
    $coverDFP.removeClass(show);
  });
}

function initDFPpre() {
  // If cookies exist, then don't embed AD iframe
  if (Cookies.get('dfp_popup_top')==='true') return;
  // init DFP iframe, call window.alertCoverDFP
  // juksy.com/embed/ads_pre_incover
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

function initDFPpost() {
  // If cookies exist, then don't embed AD iframe
  if (Cookies.get('dfp_popup_bottom')==='true') return;
  // init DFP iframe, call window.alertCoverDFP
  // juksy.com/embed/ads_post_incover
  let status = $tag.data('popup');
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
  $tag.data('popup', 'true');
}

export function coverDFP() {
  // If isCollection is true dont popup
  if (noDFP) return;

  // Dynamic add AD cover
  $coverDFP = addTmp();
  $iframe = $coverDFP.find('iframe.dfp');

  // Listen DFP close btn
  clickDFP();

  // Listen bottom DFP
  poptracker = new LazyLoad({
    elements_selector: "#popupTra",
    threshold: 0,
    data_src: "track",
    callback_load: function() {
      initDFPpost();
    }
  });

  // Init DFP cover iframe
  initDFPpre();
}