import { Router } from 'director/build/director.js';

// const routes = {
//   // 首頁
//   '/': require('./pages/index')['default'],
//   // 文章內容頁
//   '/article_:type.html': [
//     require('./pages/article')['default'],
//     () => {
//       require('./common/googledfp.js');
//     }
//   ],
//   '/takeover_:type.html': [
//     require('./common/googledfp.js')['default']
//   ]
// };

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
  ],
  '/website2017/dist/takeover_:type.html': [
    require('./common/googledfp.js')['default']
  ]
};

export default new Router(routes);