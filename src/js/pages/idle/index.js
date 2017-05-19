import { dotdotdot } from '../../common/module.js';
import { ui } from '../../common/ui.js';
import { popular } from './popular.js';

const booting = function() {
  // MODULE
  dotdotdot();
  // UI
  ui();
  // popular
  popular();
};

export default booting;