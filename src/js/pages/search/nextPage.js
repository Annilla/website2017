import {v, dotdotdot, toDateString} from '../../common/module.js';

let winW = $(window).width();
let $channel = $('.search');
let $more = $channel.find('.more');
let $articles = $channel.find('.srhArticles');
let $tag = $channel.find('.searchTxt');
let $notFound = $channel.find('.notFound');
let $hasFound = $channel.find('.hasFound');
let srhFrom = 0;
let srhSize = 12;
let srhTag = $.trim($tag.text());
let stopMLoad = false;
let lazyLoad;

function srhSkeleton() {
  // Set skeleton
  let srhSke = '';
  for (let i = 0; i < srhSize; i++) {
    srhSke += makeSearchItem({});
  }
  $articles.append(srhSke);
}

function makeSearchItem(data) {
  return `
    <li class="pure-g">
      <a class="pure-u-1 pure-u-md-7-12 img" href="${v(data, 'link')}" target="_blank">${v(data, 'cover')}</a>
      <div class="txtWrap pure-u-1 pure-u-md-5-12">
        <div class="detail">${v(data, 'detail')}</div>
        <a class="title" data-module="dotdotdot" href="${v(data, 'link')}" target="_blank"><h3>${v(data, 'title')}</h3></a>
        <div class="description hide show-md" data-module="dotdotdot">${v(data, 'summary')}</div>
        <a class="readmore hide show-md" href="${v(data, 'link')}" target="_blank">Read More >></a>
      </div>
    </li>
  `;
}

function srhGet(q, size, from) {
  axios.get(`//${API_HOST}/v1/search/articles`, {
    params: {
      q: q,
      size: size,
      from: from
    }
  })
  .then(function (response) {
    // API set data
    let data = response.data;
    let length = data.length;
    let $list = $articles.find('li');
    // Check whether has articles been found or not at first time
    if (srhFrom === 0 && length === 0) {
      // No data
      $hasFound.remove();
      $notFound.removeClass('hide');
      return;
    }
    else {
      // Has data
      $notFound.remove();
    }
    for (let i = 0; i < length; i++) {
      let tmpImg = `
        <img data-original="${data[i].image_cover}" width="100%" height="auto" alt="${data[i].title}">
      `;
      let tmpDetail = `
        <span class="date">${toDateString(data[i].published_at)}</span>
        <span class="author hide show-md">by ${data[i].author}</span>
      `;

      let itemIndex = srhFrom + i;
      $list.eq(itemIndex).replaceWith(makeSearchItem({
        title: data[i].title,
        link: data[i].link,
        summary: data[i].summary,
        cover: tmpImg,
        detail: tmpDetail
      }));
    }
    dotdotdot();
    lazyLoad.update();
    // If length < srhSize, delete unnecessary skeleton
    if (length < srhSize) {
      for (let j = length; j < srhSize; j++) {
        let itemIndex = srhFrom*srhSize + j;
        $list.eq(itemIndex).remove();
      }
      $more.hide();
      // If length < srhSize, stop mobile auto loading
      stopMLoad = true;
    }
    else {
      $more.show();
    }
  })
  .catch(function (e) {
    console.log(`SEARCH ERROR: ${e}`);
  });
}

function addChannel() {
  // 插入下一頁
  $more.hide();
  srhSkeleton();
  srhFrom = srhFrom + srhSize;
  srhGet(srhTag, srhSize, srhFrom);
  // 插入下一頁觸發圖片
  $channel.append(`<img class="infinite" data-original="./src/img/tracker.png" width="0" height="0">`);
  // 圖片 lazyload
  lazyLoad.update();
}

export function nextPage() {

  srhSkeleton();

  // Lazyload and Next Page
  lazyLoad = new LazyLoad({
    elements_selector: ".search img",
    callback_load (el) {
      if (winW < 768 && el.classList.contains('infinite')) {
        // 手機自動加載
        // If length < srhSize, stop mobile auto loading
        if (stopMLoad === true) return;
        addChannel();
      }
    }
  });

  // 平板和桌機 點擊加載更多
  $more.click(addChannel);

  // Fetching at first time.
  srhGet(srhTag, srhSize, srhFrom);
}