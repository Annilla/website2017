import { dotdotdot } from '../../common/module.js';
import { social } from './social.js';
import { articleFont } from './articleFont.js';
import { recommend } from './recommend.js';
import { popular } from './popular.js';
import { coverDFP } from './coverDFP.js';

const booting = function() {
  // MODULE
  new LazyLoad({
    elements_selector: `
      .editorRecommend img,
      .relateArticle img,
      .videoBottom iframe
    `
  });
  dotdotdot();
  // 文章所有分享功能(包含TOP)
  social();
  // 文章內文字放大縮小功能
  articleFont();
  // 專屬推薦
  recommend();
  // 熱門文章
  popular();
  // 廣告蓋台
  coverDFP();
};

export default booting;