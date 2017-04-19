let $share = $('.article .detail .social .fbShare');

export function social() {
  $share.on('click', function() {
    FB.ui({
      method: 'share',
      href: window.location.href,
    }, function(response) {});
  });
}
