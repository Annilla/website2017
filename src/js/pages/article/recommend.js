import {v, dotdotdot, toDateString} from '../../common/module.js';

let $window = $(window);
let winW = $window.width();
const device = 768;
let recommendLazyLoad;
let $recommend = $('.recArticles');
let recommendPage = 1;
let recommendSize = 4;
let owlCarousel_settings = {
  items: 1,
  lazyLoad: false
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

function recommendGet(size, page) {
  // API get data
  axios.get(`//${API_HOST}/v1/articles/latest`, {
    params: {
      size: size,
      page: page
    }
  })
  .then(function (response) {
    // API set data
    let data = response.data.data;
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

      var itemIndex = i+(recommendPage-1)*recommendSize;
      $list.eq(itemIndex).replaceWith(makeRecommendItem({
        title: data[i].title,
        link: data[i].link,
        cover: tmpImg,
        detail: tmpDetail
      }));
    }
    
    dotdotdot();
    
    if (winW >= device) {
      recommendLazyLoad.update();
    }

    $recommend.trigger('refresh.owl.carousel');
  })
  .catch(function (e) {
    console.log(`RECOMMEND ERROR: ${e}`);
  });
}

// Initial
if (winW >= device) {
  recommendLazyLoad = new LazyLoad({
    threshold: 0,
    data_src: "src"
  });
}

export function recommend() {
  recommendSkeleton();

  // Detect current device screen.
  if (winW < device) {
    // Mobile owlCarousel
    $recommend.addClass('owl-carousel owl-theme');
    $recommend.owlCarousel(owlCarousel_settings);
  } else {
    // Desktop lazyLoad
  }

  // Fetching at first time.
  recommendGet(recommendSize, recommendPage);
}