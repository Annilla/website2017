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

export function dotdotdot() {
  $('[data-module="dotdotdot"]').dotdotdot({
    wrap: 'letter'
  });
}

export function toDateString(timestamp) {
  let assoc = new Date(timestamp).toDateString().split(" ");
  return `${assoc[1]} ${assoc[2]}, ${assoc[3]}`;
}

export function throttle(fn, threshhold, scope) {
  // https://remysharp.com/2010/07/21/throttling-function-calls
  threshhold || (threshhold = 250);
  let last;
  let deferTimer;
  return function () {
    let context = scope || this;

    let now = +new Date;
    let args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}
