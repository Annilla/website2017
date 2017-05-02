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
  ],
  // 蓋台廣告
  '/takeover_:type.html': [
    require('./common/googledfp.js')['default']
  ],
  // 分類頁
  '/channel.html': [
    require('./pages/channel')['default'],
    () => {
      require('./common/googledfp.js');
    }
  ]
};

// npm run prod use: /website2017/dist

// const routes = {
//   // 首頁
//   '/website2017/dist/index.html': require('./pages/index')['default'],
//   // 文章內容頁
//   '/website2017/dist/article_:type.html': [
//     require('./pages/article')['default'],
//     () => {
//       require('./common/googledfp.js');
//     }
//   ],
//   // 蓋台廣告
//   '/website2017/dist/takeover_:type.html': [
//     require('./common/googledfp.js')['default']
//   ],
//   // 分類頁
//   '/website2017/dist/channel.html': [
//     require('./pages/channel')['default'],
//     () => {
//       require('./common/googledfp.js');
//     }
//   ]
// };

export default new Router(routes);