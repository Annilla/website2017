let vLazyLoad;

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

export function iframeLazy() {
  $('[data-module="iframeLazy"]').each(function () {
    let $this = $(this);
    let url = $this.data('src');
    let source = url.includes("facebook") ? 'facebook' : 'youtube';
    let $window = $(window);
    let winH = $window.height();

    function vSrc () {
      if (source === 'facebook') {
        $this.attr('src', `https://static.juksy.com/embed/facebook?href=${url}`);
      } else {
        $this.attr('src', `https://static.juksy.com/embed/youtube?href=${url}`);
      }
    }

    function vPlay () {
      let in_position = $this.offset().top;
      let window_position = $window.scrollTop();
      let status = $this.data('vplay');
      if (status === 'true') return;
      if (in_position < window_position + winH) {
        vSrc();
        $this.data('vplay', 'true');
      }
    }
    $window.scroll(_.throttle(vPlay, 250));

  });
}

// Initial
vLazyLoad_init();
dotdotdot();
iframeLazy();
