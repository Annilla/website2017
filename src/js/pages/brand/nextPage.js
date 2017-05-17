import {v, dotdotdot, toDateString} from '../../common/module.js';

let winW = $(window).width();
let $channel = $('.brand');
let $more = $channel.find('.more');
let $articles = $channel.find('.braArticles');
let $tag = $channel.find('.intro h1.title');
let braFrom = 0;
let braSize = 6;
let braTag = [$.trim($tag.text())];
let lazyLoad;

function braSkeleton() {
  // Set skeleton
  let braSke = '';
  for (let i = 0; i < braSize; i++) {
    braSke += makeBrandItem({});
  }
  $articles.append(braSke);
}

function makeBrandItem(data) {
  return `
    <li class="pure-u-1-1 pure-u-md-1-2 pure-u-lg-1-3">
        <div class="article">
            <a class="img" href="${v(data, 'link')}" target="_blank">${v(data, 'cover')}</a>
            <div class="txtWrap">${v(data, 'detail')}</div>
        </div>
    </li>
  `;
}

function braGet(q, size, from) {
  axios.get(`//${API_HOST}/v1/search/tags`, {
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
    for (let i = 0; i < length; i++) {
      let tmpImg = `
        <img data-original="${data[i].image_cover}" width="100%" height="auto" alt="${data[i].title}">
        <div class="author hide show-lg">${toDateString(data[i].published_at)} | by ${data[i].author}</div>
      `;
      let tmpDetail = `
        <div class="date hide-md">${toDateString(data[i].published_at)}</div>
        <a class="title" data-module="dotdotdot" href="${data[i].link}" target="_blank">
          <h3>${data[i].title}</h3>
        </a>
      `;

      let itemIndex = braFrom*braSize + i;
      $list.eq(itemIndex).replaceWith(makeBrandItem({
        link: data[i].link,
        cover: tmpImg,
        detail: tmpDetail
      }));
    }
    dotdotdot();
    lazyLoad.update();
    // If length < braSize, delete unnecessary skeleton
    if (length < braSize) {
      for (let j = length; j < braSize; j++) {
        let itemIndex = braFrom*braSize + j;
        $list.eq(itemIndex).remove();
      }
      $more.hide();
    }
    else {
      $more.show();
    }
  })
  .catch(function (e) {
    console.log(`BRAND ERROR: ${e}`);
  });
}

function addChannel() {
  // 插入下一頁
  $more.hide();
  braSkeleton();
  braGet(braTag, braSize, ++braFrom);
  // 圖片 lazyload
  lazyLoad.update();
}

export function nextPage() {

  braSkeleton();

  lazyLoad = new LazyLoad({
    elements_selector: ".braList img"
  });

  // 點擊加載更多
  $more.click(addChannel);

  // Fetching at first time.
  braGet(braTag, braSize, braFrom);

}