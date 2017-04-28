import { vLazyLoad_init, dotdotdot } from '../../common/module.js';
import { topSlider } from './topSlider.js';
import { latest } from './latest.js';
import { popular } from './popular.js';
import { juksyStar } from './juksyStar.js';

const booting = function() {
  console.log('index');
  // MODULE
  vLazyLoad_init();
  dotdotdot();
  // TOP SLIDER
  topSlider();
  // LATEST
  latest();
  // POPULAR
  popular();
  // JUKSY STAR
  juksyStar();
};

export default booting;
