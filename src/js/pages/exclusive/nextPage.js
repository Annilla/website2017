import {v, dotdotdot, toDateString} from '../../common/module.js';

let $window = $(window);
let winW = $window.width();
let device = 1024;
let $channel = $('.exclusive');
let $more = $channel.find('.more');
let $articles = $channel.find('.excArticles');
let $tag = $('.tagWrap li');
let excPage = 1;
let excSize = 12;
let excTag = [];
let now = 'now';
let lazyLoad;

function excSkeleton() {
  // Set skeleton
  let excSke = '';
  for (let i = 0; i < excSize; i++) {
    excSke += makeExclusiveItem({});
  }
  $articles.append(excSke);
}

function makeExclusiveItem(data) {
  return `
    <li class="pure-u-1-1 pure-u-md-1-2 pure-u-lg-1-3">
        <div class="article">
            <a class="img" href="${v(data, 'link')}" target="_blank">${v(data, 'cover')}</a>
            <div class="txtWrap">${v(data, 'detail')}</div>
        </div>
    </li>
  `;
}

function excGet(size, page) {
  axios.get(`//${API_HOST}/v1/articles/popular`, {
    params: {
      size: size,
      page: page
    }
  })
  .then(function (response) {
    // API set data
    let data = response.data.data;
    let $list = $articles.find('li');
    for (let i = 0; i < excSize; i++) {
      let tmpImg = `
        <img data-original="${data[i].image_cover}" width="100%" height="auto" alt="${data[i].title}">
        <span class="category">${data[i].category}</span>
      `;
      let tmpDetail = `
        <div class="date">${toDateString(data[i].published_at)}</div>
        <a class="title" data-module="dotdotdot" href="${data[i].link}" target="_blank">
          <h3>${data[i].title}</h3>
        </a>
      `;

      let itemIndex = i+(excPage-1)*excSize;
      $list.eq(itemIndex).replaceWith(makeExclusiveItem({
        link: data[i].link,
        cover: tmpImg,
        detail: tmpDetail
      }));
    }
    dotdotdot();
    lazyLoad.update();
    $more.show();
  })
  .catch(function (e) {
    console.log(`EXCLUSIVE ERROR: ${e}`);
  });
}

function addChannel() {
  // 插入下一頁
  $more.hide();
  excSkeleton();
  excGet(excSize, ++excPage);
  // 插入下一頁觸發圖片
  $channel.append(`<img class="infinite" data-original="./src/img/tracker.png" width="0" height="0">`);
  // 圖片 lazyload
  lazyLoad.update();
}

export function nextPage() {

  excSkeleton();

  // Lazyload and Next Page
  lazyLoad = new LazyLoad({
    elements_selector: ".exclusive img",
    callback_load (el) {
      if (winW < 768 && el.classList.contains('infinite')) {
        // 手機自動加載
        addChannel();
      }
    }
  });

  // 平板和桌機 點擊加載更多
  $more.click(addChannel);

  // Get all tags in this page
  excTag = $tag.map(function(i, el) {
    return $(el).text();
  }).get();
  // Fetching at first time. excGet(excSize, excPage, excTag);
  excGet(excSize, excPage);

  // 點擊 tag 換內容
  $tag.click(function() {
    $tag.removeClass(now);
    $(this).addClass(now);
    excTag = [];
    excPage = 1;
    excTag.push($(this).text());
    $articles.html('');
    excSkeleton();
    // excGet(excSize, excPage, excTag);
    excGet(excSize, excPage);
  });
}