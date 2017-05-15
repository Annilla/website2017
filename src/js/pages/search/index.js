import { dotdotdot } from '../../common/module.js';
import { ui } from '../../common/ui.js';
import { nextPage } from './nextPage.js';

const booting = function() {
  // MODULE
  // new LazyLoad({
  //   elements_selector: ".search img"
  // });
  dotdotdot();
  // UI
  ui();
  // Lazyload and Next Page
  nextPage();
};

export default booting;