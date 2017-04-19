let $window = $(window);
let winW = $window.width();
const device = 768;

function youtubeFixed ($obj,width) {
 	let $flDom = $obj;
  let newWidth = width;//要縮成的寬度
  let $allVideos = $flDom.find("iframe[src^='https://www.youtube.com'], iframe[src^='//www.youtube.com']");

  // Figure out and save aspect ratio for each video
  $allVideos.each(function() {
    $(this).data('aspectRatio', this.height / this.width)
    .removeAttr('height')
    .removeAttr('width');
  });

  // Resize all videos according to their own aspect ratio
  $allVideos.each(function() {
    var $el = $(this);
    $el
    .width(newWidth)
    .height(newWidth * $el.data('aspectRatio'));
  });
};

export function articleYT() {
	if (winW < device) {
  	youtubeFixed($(".article .mainArticle"), winW-20);
  } else {
	  // 一般文章
	  youtubeFixed($(".article.normal .mainArticle"), 600);
	  // 全版文章
	  // youtubeFixed($(".article.full .mainArticle"), 1024);
	  // 影音文章
	  // youtubeFixed($(".article.normal .mainArticle"), 600);
  }
}
