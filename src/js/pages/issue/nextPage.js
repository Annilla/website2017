let $window = $(window);
let winW = $window.width();
let device = 1024;
let $channel = $('.issue');
let $more = $channel.find('.more');
let $articles = $channel.find('.isArticles');
let $copy = $articles.html();
let $mDFP = $('#juksy_m_hotissue_top_0');
let $mUnit = $mDFP.data('adunit');
let $mDim = $mDFP.data('dimensions');
let $deskDFP = $('#juksy_hotissue_top_0');
let $deskUnit = $deskDFP.data('adunit');
let $deskDim = $deskDFP.data('dimensions');
let dfpCount = 1;
let lazyLoad;

function addChannel() {
  let slotName = winW < device ? ('juksy_m_hotissue_top_'+dfpCount) : ('juksy_hotissue_top_'+dfpCount);
  let newTmp = winW < device ? $copy.replace('juksy_m_hotissue_top_0', slotName) : $copy.replace('juksy_hotissue_top_0', slotName);

  // 插入下一頁HTML
  $articles.append(newTmp);
  // 插入下一頁觸發圖片
  $channel.append(`<img class="infinite" data-original="./src/img/tracker.png" width="0" height="0">`);

  // 圖片 lazyload
  lazyLoad.update();

  // ADD DFP
  // DFP implementing tags on pages with infinite contents
  // https://support.google.com/dfp_premium/answer/4578089?hl=en
  googletag.cmd.push(function() {
    let slot = winW < device ? googletag.defineSlot($mUnit, $mDim, slotName).
      addService(googletag.pubads()) : googletag.defineSlot($deskUnit, $deskDim, slotName).
      addService(googletag.pubads());

    // Display has to be called before
    // refresh and after the slot div is in the page.
    googletag.display(slotName);
    googletag.pubads().refresh([slot]);
  });

  // Add DFP sequence number
  dfpCount ++;
}

export function nextPage() {

  // Lazyload and Next Page
  lazyLoad = new LazyLoad({
    elements_selector: ".issue img",
    callback_load (el) {
      if (winW < 768 && el.classList.contains('infinite')) {
        // 手機自動加載
        addChannel();
      }
    }
  });

  // 平板和桌機 點擊加載更多
  $more.click(addChannel);
}