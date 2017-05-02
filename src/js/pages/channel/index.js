import { vLazyLoad_init, dotdotdot } from '../../common/module.js';
import { nextPage } from './nextPage.js';

const booting = function() {
  // MODULE
  vLazyLoad_init();
  dotdotdot();
  // Next Page
  nextPage();
};

export default booting;