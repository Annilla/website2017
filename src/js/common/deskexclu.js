import {v, dotdotdot} from './module.js';

let $excNav = $('.desktopNav li.exclu >a');
let $articles = $('.desktopNav .excluArticles');
let excFrom = 0;
let excSize = 4;
let excTag = $articles.data('tag');
let hasLoaded = false;
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
    <li>
      <a href="${v(data, 'link')}" target="_blank">
        <div class="img"><!--
          -->${v(data, 'image_cover') &&
            `<img data-original="${v(data, 'image_cover')}" width="100%" height="auto" alt="${v(data, 'title')}">`
          }<!--
        --></div>
        <div class="title" data-module="dotdotdot"><!--
          -->${v(data, 'title') &&
          `<h3>${v(data, 'title')}</h3>`
        }<!--
        --></div>
      </a>
    </li>
  `;
}

async function excGet(q, size, from) {
  const {data} = await axios.get(`//${API_HOST}/v1/search/tags`, {
    params: {
      q: q,
      size: size,
      from: from
    }
  });

  // rendering list
  let $list = $articles.find('li');

  // Insert template into skeleton
  for (let i = 0; i < excSize; i++) {
    let $el = $list.eq(from + i);

    if (data[i]) {
      $el.replaceWith(makeExclusiveItem(data[i]));
    } else {
      // delete unnecessary skeleton
      $el.remove();
    }
  }
}

function refreshList() {
  // 多出來的字變...
  dotdotdot();
  // 圖片 lazyload
  lazyLoad.update();
}

async function addChannel() {
  excSkeleton();
  await excGet(excTag, excSize, excFrom);
  refreshList();
}

export function dExclusive() {
  lazyLoad = new LazyLoad({
    elements_selector: ".exclu img"
  });

  // 滑過桌機導覽列 “獨家企劃”
  $excNav.hover(function(){
    if(hasLoaded) return;
    // Fetching at first time.
    addChannel();
    hasLoaded = true;
  },function(){});
  
}