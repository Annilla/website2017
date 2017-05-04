let $window = $(window);
let winW = $window.width();
let device = 1024;
let $channel = $('.events');
let $more = $channel.find('.more');
let $articles = $channel.find('.evArticles');
let $copy = $articles.html();
let lazyLoad;

function addChannel() {
  // 插入下一頁HTML
  $articles.append($copy);
  // 插入下一頁觸發圖片
  $channel.append(`<img class="infinite" data-original="./src/img/tracker.png" width="0" height="0">`);
  // 圖片 lazyload
  lazyLoad.update();
}

export function nextPage() {

  // Lazyload and Next Page
  lazyLoad = new LazyLoad({
    elements_selector: ".events img",
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