import { dotdotdot } from '../../common/module.js';
import { nextPage } from './nextPage.js';

const booting = function() {
  // MODULE
  dotdotdot();
  // Lazyload and Next Page
  nextPage();
};

export default booting;