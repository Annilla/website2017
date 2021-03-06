import { dotdotdot } from '../../common/module.js';
import { ui } from '../../common/ui.js';
import { topSlider } from './topSlider.js';
import { latest } from './latest.js';
import { popular } from './popular.js';
import { juksyStar } from './juksyStar.js';
import { sideDFP } from './sideDFP.js';

const booting = function() {
  // MODULE
  dotdotdot();
  // UI
  ui();
  // TOP SLIDER
  topSlider();
  // LATEST
  latest();
  // POPULAR
  popular();
  // JUKSY STAR
  juksyStar();
  // SIDE DFP
  sideDFP();
};

export default booting;
