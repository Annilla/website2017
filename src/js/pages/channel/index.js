import { vLazyLoad_init, dotdotdot } from '../../common/module.js';

const booting = function() {
  // MODULE
  vLazyLoad_init();
  dotdotdot();
};

export default booting;