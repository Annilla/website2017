let vLazyLoad;

export function facebook_init() {
  $.getScript('//connect.facebook.net/zh_TW/sdk.js', function() {
    FB.init({
      appId: '608477045879026',
      version: 'v2.8',
      xfbml: true
    });
    FB.AppEvents.logPageView();
  });
}

/**
 * Array/Object siample getter with default value.
 */
export function v(obj, key, def) {
  if (!def) {
    def = '';
  }
  if (typeof obj === 'undefined' && typeof obj[key] === 'undefined') {
    return def;
  }
  return obj[key] || def;
}

export function vLazyLoad_init() {
  vLazyLoad = new LazyLoad({
    threshold: 0,
    data_src: "original"
  });
}

export function vLazyLoad_update() {
  vLazyLoad.update();
}

export function dotdotdot() {
  $('[data-module="dotdotdot"]').dotdotdot({
    wrap: 'letter'
  });
}

export function toDateString(timestamp) {
  var assoc = new Date(timestamp).toDateString().split(" ");
  return `${assoc[1]} ${assoc[2]}, ${assoc[3]}`;
}

// Initial
facebook_init();
vLazyLoad_init();
dotdotdot();
