import {v, dotdotdot, toDateString} from '../../common/module.js';

let $channel = $('.editor');
let $more = $channel.find('.more');
let $articles = $channel.find('.editorArticles');
let ediPage = 1;
let ediSize = 12;
let lazyLoad;

function ediSkeleton() {
  // Set skeleton
  let ediSke = '';
  for (let i = 0; i < ediSize; i++) {
    ediSke += makeEditorItem({});
  }
  $articles.append(ediSke);
}

function makeEditorItem(data) {
  return `
    <li class="pure-u-1-1 pure-u-md-1-2 pure-u-lg-1-3">
        <div class="article">
            <a class="img" href="${v(data, 'link')}" target="_blank">${v(data, 'cover')}</a>
            <div class="txtWrap">${v(data, 'detail')}</div>
        </div>
    </li>
  `;
}

function ediGet(size, page) {
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
    for (let i = 0; i < ediSize; i++) {
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

      let itemIndex = i+(ediPage-1)*ediSize;
      $list.eq(itemIndex).replaceWith(makeEditorItem({
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
    console.log(`EDITOR'S ARTICLES ERROR: ${e}`);
  });
}

export function nextPage() {

  // Lazyload and Next Page
  lazyLoad = new LazyLoad({
    elements_selector: ".editorArticles img"
  });

  ediSkeleton();

  $more.click(function () {
    $more.hide();
    ediSkeleton();
    ediGet(ediSize, ++ediPage);
  });

  // Fetching at first time.
  ediGet(ediSize, ediPage);
}