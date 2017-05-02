import {vLazyLoad_update} from '../../common/module.js';

let $window = $(window);
let winW = $window.width();
let device = 1024;
let $more = $('.channel .more');
let $articles = $('.channel .chArticles');
let $copy = $articles.html();
let $mDFP = $('#juksy_m_channel_inside_0');
let $mUnit = $mDFP.data('adunit');
let $mDim = $mDFP.data('dimensions');
let $deskDFP = $('#juksy_channel_inside_0');
let $deskUnit = $deskDFP.data('adunit');
let $deskDim = $deskDFP.data('dimensions');
let dfpCount = 1;

export function nextPage() {

  // 平板和手機 點擊加載更多
  $more.click(function () {
    let slotName = winW < device ? ('juksy_m_channel_inside_'+dfpCount) : ('juksy_channel_inside_'+dfpCount);
    let newTmp = winW < device ? $copy.replace('juksy_m_channel_inside_0', slotName) : $copy.replace('juksy_channel_inside_0', slotName);

    // 插入下一頁HTML
    $articles.append(newTmp);

    // 圖片 lazyload
    vLazyLoad_update();

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
  });
}