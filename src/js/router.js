import { Router } from 'director/build/director.js';

// npm run prod use: /website2017/dist

const routes = {
  // 首頁
  '/website2017/dist/index.html': require('./pages/index')['default'],
  // 文章內容頁
  '/website2017/dist/article_:type.html': [
    require('./pages/article')['default'],
    () => {
      require('./common/googledfp.js');
    }
  ]
};

export default new Router(routes);