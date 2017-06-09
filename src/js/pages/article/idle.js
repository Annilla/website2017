import {isCollection, debounce} from '../../common/module.js';

let $document = $(document);
let winW = $(window).width();
let noIDLE = isCollection();
let $coverIDLE;
let $iframe;
let show = 'show';
let desW = 1024;
let closeIDLE = false;
let listenEvent = 'mousemove keydown mousedown mousewheel DOMMouseScroll';
let coverTmp = `
  <div class="juksyCover" id="idle">
    <div class="popWrap">
      <div class="closeIDLE">X</div>
      <div class="popContent">
        <iframe src="" scrolling="no" frameborder="0" allowtransparency="true"></iframe>
      </div>
    </div>
  </div>
`;

function addTmp () {
  return $(coverTmp).appendTo('body');
}

function clickIDLE() {
  $coverIDLE
    .on('click', '.closeIDLE', function () {
      $coverIDLE.removeClass(show);
    })
    .on('click', function (e) {
      if (e.target !== this) return;
      $coverIDLE.removeClass(show);
    });
}

function openIDLE() {
  // Init IDLE cover
  // juksy.com/embed/idle
  // juksy.com/embed/idle

  // if closeIDLE then stop idle
  if (closeIDLE) {
    $document.off(listenEvent);
    return;
  };

  $coverIDLE.addClass(show);
  $iframe.attr({
    // 'src': `//${APP_HOST}/idle.html`,
    'src': `./idle.html`,
    'width': 980,
    'height': 610
  });
  closeIDLE = true;
}

export function coverIDLE() {

  // If isCollection is true don't popup
  if (noIDLE) return;

  // Mobile don't show idle page
  if (winW < desW) return;

  // Dynamic add AD cover
  $coverIDLE = addTmp();
  $iframe = $coverIDLE.find('iframe');

  // Listen IDLE close button
  clickIDLE();

  // Detact user activities and set idle time
  $document.on(listenEvent, debounce(openIDLE, 180000));
}
