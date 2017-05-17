import { Router } from 'director/build/director.js';
import DFP from './common/googledfp.js';

// const routes = {
//   // 首頁
//   '/': require('./pages/index')['default'],
//   // 文章內容頁
//   '/article_:type.html': [
//     require('./pages/article')['default'],
//     () => {
//       DFP.run();
//     }
//   ],
//   // 蓋台廣告
//   '/takeover_:type.html': [
//     () => {
//       DFP.run();
//     }
//   ],
//   // 分類頁
//   '/channel.html': [
//     require('./pages/channel')['default'],
//     () => {
//       DFP.run();
//     }
//   ],
//   // 熱門議題
//   '/issue.html': [
//     require('./pages/issue')['default'],
//     () => {
//       DFP.run();
//     }
//   ],
//   // 主題特企
//   '/events.html': [
//     require('./pages/events')['default']
//   ],
//   // 獨家企劃
//   '/exclusive.html': [
//     require('./pages/exclusive')['default']
//   ],
//   // 品牌館
//   '/brand.html': [
//     require('./pages/brand')['default']
//   ],
//   // 駐站達人
//   '/editors.html': [
//     require('./pages/editors')['default']
//   ],
//   // 達人文章
//   '/editor.html': [
//     require('./pages/editor')['default']
//   ],
//   // 搜尋結果
//   '/search.html': [
//     require('./pages/search')['default']
//   ],
//   // 搜尋結果找不到
//   '/search_notfound.html': [
//     require('./pages/search')['default']
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
      DFP.run();
    }
  ],
  // 蓋台廣告
  '/website2017/dist/takeover_:type.html': [
    () => {
      DFP.run();
    }
  ],
  // 分類頁
  '/website2017/dist/channel.html': [
    require('./pages/channel')['default'],
    () => {
      DFP.run();
    }
  ],
  // 熱門議題
  '/website2017/dist/issue.html': [
    require('./pages/issue')['default'],
    () => {
      DFP.run();
    }
  ],
  // 主題特企
  '/website2017/dist/events.html': [
    require('./pages/events')['default']
  ],
  // 獨家企劃
  '/website2017/dist/exclusive.html': [
    require('./pages/exclusive')['default']
  ],
  // 品牌館
  '/website2017/dist/brand.html': [
    require('./pages/brand')['default']
  ],
  // 駐站達人
  '/website2017/dist/editors.html': [
    require('./pages/editors')['default']
  ],
  // 達人文章
  '/website2017/dist/editor.html': [
    require('./pages/editor')['default']
  ],
  // 搜尋結果
  '/website2017/dist/search.html': [
    require('./pages/search')['default']
  ],
  // 搜尋結果找不到
  '/website2017/dist/search_notfound.html': [
    require('./pages/search')['default']
  ]
};

export default new Router(routes);