let $share = $('.article .detail .social .fbShare, .floatSocial .share');
let copyLink = '.floatSocial .copy';
let clipboard = new Clipboard(copyLink, {
  text: function(trigger) {
    return document.URL;
  }
});

export function social() {
  // facebook share
  $share.on('click', function() {
    FB.ui({
      method: 'share',
      href: window.location.href,
    }, function(response) {});
  });

  // Copy link
  clipboard.on('success', function(e) {
    alert(`
      複製成功
      ${e.text}`);
  });
}
