import {is18up} from '../../common/module.js';

let r18 = is18up();
let $coverR18;
let show = 'show';
let coverTmp = `
  <div class="juksyCover R18" id="R18">
    <div class="popWrap">
      <div class="popContent">
        <div class="circle">18<sup>+</sup></div>
        <div class="warning">
          <div class="h1">ADULTS ONLY</div>
          <div class="h2">- 本區域為限制級 -</div>
          <div class="h3">未滿18歲不得瀏覽！</div>
          <div class="btns">
            <a class="btn closeR18">進入頁面</a>
            <a class="btn" href="./">回到首頁</a>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

function addTmp () {
  return $(coverTmp).appendTo('body');
}

function clickR18() {
  $coverR18
    .on('click', '.closeR18', function () {
      // set cookies in 7 days
      Cookies.set('R18', 'true', { expires: 7 });
      $coverR18.removeClass(show);
    });
}

function openR18() {
  $coverR18.addClass(show);
}

export function coverR18() {

  // If is18up is true don't popup
  if (!r18) return;
  // If cookies exist, then don't insert R18
  if (Cookies.get('R18')==='true') return;

  // Dynamic add R18
  $coverR18 = addTmp();

  // Listen R18 close button
  clickR18();

  // Init R18
  openR18();
}
