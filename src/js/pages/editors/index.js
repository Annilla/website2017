import { dotdotdot } from '../../common/module.js';

const booting = function() {
  // MODULE
  new LazyLoad({
    elements_selector: '.edsPage img'
  });
  dotdotdot();
};

export default booting;