import { dotdotdot } from '../../common/module.js';
import { ui } from '../../common/ui.js';

const booting = function() {
  // MODULE
  new LazyLoad({
    elements_selector: '.edsPage img'
  });
  dotdotdot();
  // UI
  ui();
};

export default booting;