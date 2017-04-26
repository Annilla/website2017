let $fbShare = $('.article .detail .social .fbShare, .floatSocial .share, .MfloatSocial .fb');
let $lineShare = $('.MfloatSocial .line');
let $share = $('.MfloatSocial .share');
let $top = $('.MfloatSocial .top');
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
}
