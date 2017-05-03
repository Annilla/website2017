import {v, dotdotdot, toDateString} from '../../common/module.js';

let $window = $(window);
let winW = $window.width();
const device = 768;
let $popular = $('.index .popArticles');
let $popMore = $('.index .popular .more');
let popPage = 1;
let popSize = 10;
let popClick = 0;
let lazyLoad;

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
        <img data-original="${data[i].image_cover}" width="100%" height="auto" alt="${data[i].title}">
        <div class="category">${data[i].category}</div>
      `;
      let tmpDetail = `
        <span class="date">${toDateString(data[i].published_at)}</span>
        <span class="author hide show-md">by ${data[i].author}</span>
        <span class="pageview">
          <span class="icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 15.9 15.9" xml:space="preserve"><path class="st0" d="M8,13.5c-3.6-0.2-6.3-1.8-7.9-5.1C0,8.1,0,7.8,0.1,7.5C1.7,4.2,4.3,2.4,8,2.5c3.6,0,6.3,1.8,7.9,5.1c0.1,0.2,0.1,0.6,0,0.8C14.3,11.7,11.6,13.3,8,13.5z M11.6,7.9c0-2-1.6-3.7-3.6-3.7c-2,0-3.7,1.6-3.7,3.7c0,2,1.7,3.7,3.7,3.7C10,11.6,11.6,10,11.6,7.9z"></path><path class="st0" d="M8,5.8c1.2,0,2.2,1,2.2,2.2c0,1.2-1,2.2-2.2,2.2c-1.2,0-2.2-1-2.2-2.2C5.8,6.8,6.8,5.8,8,5.8z"></path></svg></span>${data[i].pageviews}
        </span>
      `;

      let itemIndex = i+(popPage-1)*popSize;
      $list.eq(itemIndex).replaceWith(makePopularItem({
        title: data[i].title,
        link: data[i].link,
        summary: data[i].summary,
        cover: tmpImg,
        detail: tmpDetail
      }));
      if (winW >= device && i >= popSize/2) {
        $popular.find('li').eq(itemIndex).hide();
      }
    }
    dotdotdot();
    lazyLoad.update();
    if (winW >= device) { $popMore.show(); }
  })
  .catch(function (e) {
    console.log(`POPULAR ERROR: ${e}`);
  });
}

export function popular() {
  lazyLoad = new LazyLoad({
    elements_selector: ".popArticles img"
  });

  popSkeleton();

  $popMore.click(function () {
    $popMore.hide();
    for (let i = popSize/2; i < popSize; i++) {
      $popular.find('li').eq(i+(popPage-1)*popSize).show();
    }
    dotdotdot();
    lazyLoad.update();
  });

  // Fetching at first time.
  popGet(popSize, popPage);
}
