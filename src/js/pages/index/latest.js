import {v, dotdotdot, toDateString} from '../../common/module.js';

let $window = $(window);
let winW = $window.width();
const device = 768;
let latestLazyLoad;
let $latest = $('.index .latestArticles');
let $latestMore = $('.index .latest .more');
let latestPage = 1;
let latestSize = 12;
let owlCarousel_settings = {
  items: 1,
  lazyLoad: false,
  dots: false,
  nav: true,
  navContainerClass: 'latestNav',
  navText: ['', '']
};

function latestSkeleton() {
  // Set skeleton
  let latestSke = '';
  for (let i = 0; i < latestSize; i++) {
    latestSke += makeLatestItem({});
  }
  $latest.append(latestSke);
}

function makeLatestItem(data) {
  return `
    <li class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3">
      <div class="article">
        <a class="img" href="${v(data, 'link')}" target="_blank">${v(data, 'cover')}</a>
        <div class="detail">${v(data, 'detail')}</div>
        <a class="title" data-module="dotdotdot" href="${v(data, 'link')}" target="_blank">
          <h3>${v(data, 'title')}</h3>
        </a>
      </div>
    </li>
  `;
}

function latestGet(size, page) {
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
    let $list = $latest.find('li');
    for (let i = 0; i < latestSize; i++) {
      let tmpImg = winW < device ? `
        <img src="${data[i].image_cover}" width="100%" height="auto" alt="${data[i].title}">
        <div class="category hide show-md">${data[i].category}</div>
      ` : `
        <img data-src="${data[i].image_cover}" width="100%" height="auto" alt="${data[i].title}">
        <div class="category hide show-md">${data[i].category}</div>
      `;
      let tmpDetail = `
        <div class="pure-g">
          <div class="pure-u-2-3 date">${toDateString(data[i].published_at)} &nbsp; | &nbsp; By ${data[i].author}</div>
          <div class="pageview">
            <div class="icon">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 15.9 15.9" style="enable-background:new 0 0 15.9 15.9;" xml:space="preserve"><path class="st0" d="M8,13.5c-3.6-0.2-6.3-1.8-7.9-5.1C0,8.1,0,7.8,0.1,7.5C1.7,4.2,4.3,2.4,8,2.5c3.6,0,6.3,1.8,7.9,5.1c0.1,0.2,0.1,0.6,0,0.8C14.3,11.7,11.6,13.3,8,13.5z M11.6,7.9c0-2-1.6-3.7-3.6-3.7c-2,0-3.7,1.6-3.7,3.7c0,2,1.7,3.7,3.7,3.7C10,11.6,11.6,10,11.6,7.9z"></path><path class="st0" d="M8,5.8c1.2,0,2.2,1,2.2,2.2c0,1.2-1,2.2-2.2,2.2c-1.2,0-2.2-1-2.2-2.2C5.8,6.8,6.8,5.8,8,5.8z"></path></svg>
            </div>${data[i].pageviews}
          </div>
        </div>
      `;

      var itemIndex = i+(latestPage-1)*latestSize;
      $list.eq(itemIndex).replaceWith(makeLatestItem({
        title: data[i].title,
        link: data[i].link,
        cover: tmpImg,
        detail: tmpDetail
      }));
    }
    
    dotdotdot();
    
    if (winW >= device) {
      latestLazyLoad.update();
      $latestMore.show();
    }

    $latest.trigger('refresh.owl.carousel');
  })
  .catch(function (e) {
    console.log(`LATEST ERROR: ${e}`);
  });
}

function checkNextPage(event) {
  let index = event.item.index;
  return index === latestPage * latestSize - 1;
}

// Initial
if (winW >= device) {
  latestLazyLoad = new LazyLoad({
    threshold: 0,
    data_src: "src"
  });
}

export function latest() {
  latestSkeleton();

  // Detect current device screen.
  if (winW < device) {
    // Mobile owlCarousel
    $latest.addClass('owl-carousel owl-theme');
    $latest.owlCarousel(owlCarousel_settings);
    $latest.on('translate.owl.carousel', function(event) {
      if (checkNextPage(event)) {
        for (let i = 0; i < latestSize; i++) {
          var tmpl = makeLatestItem({});
          $latest.trigger('add.owl.carousel', [tmpl]);
        }
        $latest.trigger('refresh.owl.carousel');
        latestGet(latestSize, ++latestPage);
      }
    });
  } else {
    // Desktop lazyLoad
    $latestMore.click(function () {
      $latestMore.hide();
      latestSkeleton();
      latestGet(latestSize, ++latestPage);
    });
  }

  // Fetching at first time.
  latestGet(latestSize, latestPage);
}
