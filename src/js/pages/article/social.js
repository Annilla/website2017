window.Clipboard = require('clipboard');

let $window = $(window);
let winW = $window.width();
let winH = $window.height();
let $fbShare = $('.article .detail .social .fbShare, .floatSocial .share, .MfloatSocial .fb');
let $commonBtn = $('.MfloatSocial');
let $lineShare = $commonBtn.find('.line');
let $share = $commonBtn.find('.share');
let $top = $commonBtn.find('.top');
let $deskShare = $('.floatSocial');
let deskW = 1280;
let showOut = 'showOut';
let copyLinkL = '.floatSocial .copy';
let copyLinkR = '.MfloatSocial .copy';
let open = 'open';
let copyConfig = {
  text: function(trigger) {
    return document.URL;
  }
};
let clipboardL = new Clipboard(copyLinkL, copyConfig);
let clipboardR = new Clipboard(copyLinkR, copyConfig);

function successpop(e) {
  alert(`
    複製成功
    ${e.text}`);
}

function DeskShare() {
  let window_position = $window.scrollTop();
  if (winH < window_position) {
    $deskShare.addClass(showOut);
  } else {
    $deskShare.removeClass(showOut);
  }
}

function topCommon() {
  let window_position = $window.scrollTop();
  let tagTop = $('article .tag').offset() ? $('article .tag').offset().top : winH*2;
  if (tagTop < window_position + winH) {
    $commonBtn.addClass(showOut);
  }
  else if (window_position < winH) {
    $commonBtn.removeClass(showOut);
  }
}

export function social() {
  // Facebook share
  $fbShare.on('click', function() {
    FB.ui({
      method: 'share',
      href: window.location.href,
    }, function(response) {});
  });

  // Copy link
  clipboardL.on('success', successpop);
  clipboardR.on('success', successpop);

  // Line share
  $lineShare.click(function(e) {
    e.preventDefault();
    window.location.href = 'http://line.naver.jp/R/msg/text/?' + document.title + '%0A' + document.URL;
  });

  // Open share button
  $share.click(function () {
    $share.toggleClass(open);
  });

  // Top
  $top.click(function () {
    $('html,body').animate({ scrollTop: 0 }, 1000);
  });

  // 桌機分享浮動按鈕到第二屏才出現
  if (winW >= deskW) {
    $window.scroll(_.throttle(DeskShare, 250));
  }

  // 右下角按鈕到tag的地方才出現，第一屏消失
  $window.scroll(_.throttle(topCommon, 250));

}
