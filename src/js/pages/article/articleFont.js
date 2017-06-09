let $articleFontBtn = $('.article .detail .fontSize');
let $articleFont = $('.article .mainArticle');
let articleFontSize = 1;

export function articleFont() {
  $articleFontBtn.click(function () {
    articleFontSize = articleFontSize === 1 ? 1.125 : 1 ;
    $articleFont.css("font-size", articleFontSize + "rem");
  });
}
