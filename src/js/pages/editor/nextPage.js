import {
  v,
  dotdotdot,
  toDateString
} from '../../common/module.js';

let $window = $(window);
let winW = $window.width();
let device = 1024;
let $channel = $('.editor');
let $more = $channel.find('.more');
let $articles = $channel.find('.editorArticles');
let $copy = $articles.html();
let lazyLoad;

function addChannel() {
  // 插入下一頁HTML
  $articles.append($copy);
  // 圖片 lazyload
  lazyLoad.update();
}

export function nextPage() {

  // Lazyload and Next Page
  lazyLoad = new LazyLoad({
    elements_selector: ".editorArticles img"
  });

  // 點擊加載更多
  $more.click(addChannel);
}