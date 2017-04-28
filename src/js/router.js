import { Router } from 'director/build/director.js';

const routes = {
  // 首頁
  '/': require('./pages/index')['default'],
  // 文章內容頁
  '/article_:type.html': [
    require('./pages/article')['default'],
    () => {
      require('./common/googledfp.js');
    }
  ]
};

export default new Router(routes);