let $window = $(window);
let winH = $window.height();
let $coverDFP = $('#coverDFP');
let $closeBtn = $coverDFP.find('.closeDFP');
let $mDFP_top = $('#juksy_m_content_takeover_top');
let $mDFP_bottom = $('#juksy_m_content_takeover_bottom');
let $deskDFP_top = $('#juksy_content_takeover_top');
let $deskDFP_bottom = $('#juksy_content_takeover_bottom');
let $tag = $('.article article .tag');
let winW = $(window).width();
let hide = 'hide';
let show = 'show';
let tbW = 768;
let desW = 1024;

function clickDFP() {
  $closeBtn.click(function () {
    $coverDFP.removeClass(show);
    if (winW < tbW) {
      $mDFP_top.addClass(hide);
      $mDFP_bottom.removeClass(hide);
    }
    else if (winW >= desW) {
      $deskDFP_top.addClass(hide);
      $deskDFP_bottom.removeClass(hide);
    }
  });
}

function bottomDFP() {
  let in_position = $tag.offset().top;
  let window_position = $window.scrollTop();
  let status = $tag.data('popup');
  if (status === 'true') return;
  if (in_position < window_position + winH) {
    $coverDFP.addClass(show);
    $tag.data('popup', 'true');
  }
}


export function coverDFP() {
  // Listen DFP close btn
  clickDFP();

  // Listen bottom DFP
  $window.scroll(_.throttle(bottomDFP, 250));

  // Init DFP cover
  $coverDFP.addClass(show);
  if (winW < tbW) {
    $mDFP_top.removeClass(hide);
  }
  else if (winW >= desW) {
    $deskDFP_top.removeClass(hide);
  }
}