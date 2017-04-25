let vLazyLoad;
let iframeLazyLoad;
let JUKSY = JUKSY || { pageType: null,  isCollection: false,  is18up: false };

export function initJUKSY(obj, key, def) {
  $(function() {
    JUKSY.pageType = $('meta[property="juksy:type"]').attr('content');
    JUKSY.is18up = !!($('meta[property="juksy:adult"]').attr('content') === 'true');
    JUKSY.isCollection = !!($('meta[property="juksy:collection"]').attr('content') === 'true');
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

export function googledfp() {
  let winW = $(window).width();
  function showDFP(element_id) {
    let $adUnit = $('#' + element_id);
    console.debug('Loading DFP:', element_id);

    googletag.cmd.push(function() {
      googletag.pubads().display(
        $adUnit.data('adunit'),
        $adUnit.data('dimensions'),
        element_id);
    });
  }
  $('[data-module="googledfp"]').each(function () {
    let $this = $(this);
    let device = $this.data('device');
    let element_id = this.id;

    // Remove DFP if isCollection = true 
    if (JUKSY.isCollection) { $this.remove(); }
    // Show DFP by device width
    if (winW < 768 && device === 'mobile') {
      showDFP(element_id);
    }

  });
}

// Initial
initJUKSY();
vLazyLoad_init();
dotdotdot();
googledfp();
