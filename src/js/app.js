// meta import images
import '../img/juksy.ico';
import '../img/apple-touch-icon-57.png';
import '../img/apple-touch-icon-60.png';
import '../img/apple-touch-icon-72.png';
import '../img/apple-touch-icon-76.png';
import '../img/apple-touch-icon-114.png';
import '../img/apple-touch-icon-120.png';
import '../img/apple-touch-icon-144.png';
import '../img/apple-touch-icon-152.png';
import '../img/apple-touch-icon-180.png';
import '../img/android-chrome-36.png';
import '../img/android-chrome-48.png';
import '../img/android-chrome-72.png';
import '../img/android-chrome-96.png';
import '../img/android-chrome-144.png';
import '../img/android-chrome-192.png';
import '../img/manifest.json';

// index import images
import '../img/index/1500x500_1.jpg';
import '../img/index/1500x500_2.jpg';
import '../img/index/640x840_mag1.jpg';
import '../img/index/640x840_mag2.jpg';

// Plugin CSS
require('juksy-css-reset/css/reset.css');
require('owl.carousel/dist/assets/owl.carousel.css');
require('owl.carousel/dist/assets/owl.theme.default.css');

// Main CSS
require('../scss/app.scss');

// Plugin JS
require('jquery');
require('owl.carousel');
require('dotdotdot');
require('jquery-lazy');

// Main JS
require('./common/module.js');
require('./pages/index.js');
