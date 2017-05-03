import { dotdotdot } from '../../common/module.js';
import { topSlider } from './topSlider.js';
import { latest } from './latest.js';
import { popular } from './popular.js';
import { juksyStar } from './juksyStar.js';

const booting = function() {
  // MODULE
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
