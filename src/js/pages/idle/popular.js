import {v, dotdotdot} from '../../common/module.js';

let winW = $(window).width();
let $popular = $('.idle .idleArticles');
let popPage = 1;
let popSize = 4;
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
    <li class="pure-u-1-4">
      <a href="${v(data, 'link')}" target="_blank">
        <div class="img">${v(data, 'cover')}</div>
        <div class="title" data-module="dotdotdot">${v(data, 'title')}</div>
      </a>
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
      let tmpDetail = `
        <h3>${data[i].title}</h3>
      `;

      let itemIndex = i+(popPage-1)*popSize;
      $list.eq(itemIndex).replaceWith(makePopularItem({
        link: data[i].link,
        cover: tmpImg,
        title: tmpDetail
      }));
    }
    dotdotdot();
    lazyLoad.update();
  })
  .catch(function (e) {
    console.log(`IDLE ERROR: ${e}`);
  });
}

export function popular() {
  lazyLoad = new LazyLoad({
    elements_selector: ".idleArticles img"
  });

  popSkeleton();

  // Fetching at first time.
  popGet(popSize, popPage);
}
