let vLazyLoad;
let iframeLazyLoad;

export function pageType() {
  return $('meta[property="juksy:type"]').attr('content');
}

export function is18up() {
  return !!($('meta[property="juksy:adult"]').attr('content') === 'true');
}

export function isCollection() {
  return !!($('meta[property="juksy:collection"]').attr('content') === 'true');
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
  iframeLazyLoad = new LazyLoad({
    elements_selector: "iframe",
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
vLazyLoad_init();
dotdotdot();
