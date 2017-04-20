import {v, vLazyLoad_update, dotdotdot, toDateString} from '../../common/module.js';

let $window = $(window);
let winW = $window.width();
const device = 1024;
let $popular = $('.article .popArticle');
let popPage = 1;
let popSize = 10;

function popSkeleton() {
  // Set skeleton
  let popSke = '';
  for (let i = 0; i < popSize; i++) {
    popSke += makePopularItem({});
  }
  $popular.append(popSke);
}

function makePopularItem(data) {
  return `
    <li class="pure-u-1 pure-u-lg-1-2">
      <div class="article pure-g">
        <div class="pure-u-1-8 pure-u-md-1-6">
          <div class="rankWrap">
            <div class="rank">${v(data, 'rank')}</div>
            <div class="date hide show-md">${v(data, 'date')}</div>
          </div>
        </div>
        <div class="pure-u-7-8 pure-u-md-5-6 itemWrap">
          <div class="pure-u-7-24 pure-u-md-1-5">
            <a class="img" href="${v(data, 'link')}" target="_blank">${v(data, 'cover')}</a>
          </div>
          <div class="pure-u-17-24 pure-u-md-4-5">
            <a class="title" data-module="dotdotdot" href="${v(data, 'link')}" target="_blank" >${v(data, 'title')}</a>
            <div class="detail hide show-md">${v(data, 'category')} &nbsp; | &nbsp;${v(data, 'author')}</div>
          </div>
        </div>
      </div>
    </li>
  `;
}

function popGet(size, page) {
  axios.get(`//${API_HOST}/v1/articles/popular`, {
    params: {
      size: size,
      page: page
    }
  })
  .then(function (response) {
    // API set data
    let data = response.data.data;
    let $list = $popular.find('li');
    for (let i = 0; i < popSize; i++) {
      let tmpImg = `
        <img data-original="${data[i].image_thumb}" width="100%" height="auto" alt="${data[i].title}">
      `;
      let tmpTitle = `
        <h4>${data[i].title}</h4>
      `;

      let itemIndex;
      if ( winW < device) {
        itemIndex = (popPage-1)*popSize + i;
      } else {
        itemIndex = (i < popSize/2) ? ((popPage-1)*popSize + i*2) : ((popPage-1)*popSize + ((i%5)+1)*2-1);
      }

      $list.eq(itemIndex).replaceWith(makePopularItem({
        rank: i+1,
        date: toDateString(data[i].published_at),
        link: data[i].link,
        cover: tmpImg,
        title: tmpTitle,
        category: data[i].category,
        author: data[i].author
      }));
    }
    dotdotdot();
    vLazyLoad_update();
  })
  .catch(function (e) {
    console.log(`POPULAR ERROR: ${e}`);
  });
}

export function popular() {
  popSkeleton();

  // Fetching at first time.
  popGet(popSize, popPage);
  
}