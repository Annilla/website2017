let $window = $(window);
let winW = $window.width();
let $ref = $('#juksy_content_top');
let refTop = $ref.offset() ? $ref.offset().top : 0;
let arW = $('article').width();
let $leftDFP = $('#juksy_content_side_left');
let $rightDFP = $('#juksy_content_side_right');
let bannerW = 160;
let gap = 50;

function positionDFP () {
  let posi = (winW - arW)/2 - bannerW - gap;
  $leftDFP.css({
    'left' : posi
  });
  $rightDFP.css({
    'right' : posi
  });
}

export function sideDFP() {
  // PositionDFP
  positionDFP();
}