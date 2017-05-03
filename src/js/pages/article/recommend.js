import {v, dotdotdot, toDateString} from '../../common/module.js';

let $window = $(window);
let winW = $window.width();
const device = 768;
let recommendLazyLoad;
let $recommend = $('.recArticles');
let recommendSize = 4;
let owlCarousel_settings = {
  items: 1,
  lazyLoad: false,
  loop: true,
  autoplay: true,
  autoplayTimeout: 5000,
  smartSpeed: 1000
};

function recommendSkeleton() {
  // Set skeleton
  let recommendSke = '';
  for (let i = 0; i < recommendSize; i++) {
    recommendSke += makeRecommendItem({});
  }
  $recommend.append(recommendSke);
}

function makeRecommendItem(data) {
  return `
    <li class="pure-u-md-1-2">
      <div class="article">
        <a class="img" href="${v(data, 'link')}" target="_blank">${v(data, 'cover')}</a>
        <div class="detail">${v(data, 'detail')}</div>
        <a class="title" data-module="dotdotdot" href="${v(data, 'link')}" target="_blank">
          <h4>${v(data, 'title')}</h4>
        </a>
      </div>
    </li>
  `;
}

function recommendGet(size) {
  // API get data
  axios.get(`//${API_HOST}/v1/articles/jusyforyou`, {
    params: {
      size: size
    }
  })
  .then(function (response) {
    // API set data
    let data = response.data;
    let $list = $recommend.find('li');
    for (let i = 0; i < recommendSize; i++) {
      let tmpImg = winW < device ? `
        <img src="${data[i].image_cover}" width="100%" height="auto" alt="${data[i].title}">
      ` : `
        <img data-src="${data[i].image_cover}" width="100%" height="auto" alt="${data[i].title}">
      `;
      let tmpDetail = `
        ${toDateString(data[i].published_at)}&nbsp; | &nbsp;by ${data[i].author}
      `;

      $list.eq(i).replaceWith(makeRecommendItem({
        title: data[i].title,
        link: data[i].link,
        cover: tmpImg,
        detail: tmpDetail
      }));
    }
    
    dotdotdot();
    
    if (winW >= device) {
      // Desktop lazyLoad
      recommendLazyLoad.update();
    } else {
      // Mobile owlCarousel
      $recommend.addClass('owl-carousel owl-theme');
      $recommend.owlCarousel(owlCarousel_settings);
    }

    $recommend.trigger('refresh.owl.carousel');
  })
  .catch(function (e) {
    console.log(`RECOMMEND ERROR: ${e}`);
  });
}

export function recommend() {
  // Initial
  if (winW >= device) {
    recommendLazyLoad = new LazyLoad({
      elements_selector: ".recArticles img",
      data_src: "src"
    });
  }

  recommendSkeleton();

  // Fetching at first time.
  recommendGet(recommendSize);
}