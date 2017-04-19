(function() {
	let $window = $(window);
  let winW = $window.width();
  let winH = $window.height();
  let device = 1024;
  let fb_video_player;
  let $facebookWrap = $('.videoBottom');
  let facebookBottom = 'fbVideo';
  let $facebookBottom = $('#fbVideo');

  function articleFBvideo () {
    FB.Event.subscribe('xfbml.ready', function(msg) {
      if (msg.type === 'video' && msg.id === facebookBottom) {
        // mobile cant autoplay
        if (winW < device) return;
      	fb_video_player = msg.instance;
        // scroll to auto play
        function vPlay() {
          let in_position = $facebookWrap.offset().top;
          let window_position = $window.scrollTop();
          let status = $facebookBottom.data('vplay');
          if (status === 'true') return;
          if (in_position < window_position + winH) {
            fb_video_player.play();
            $facebookBottom.data('vplay', 'true');
          }
        }
        $window.scroll(_.throttle(vPlay, 250));
      }
    });
  }

  // Init Facebook API
	$.getScript('//connect.facebook.net/zh_TW/sdk.js', function() {
    FB.init({
      appId: '608477045879026',
      version: 'v2.8',
      xfbml: true
    });
    
    // Facebook App pageview
    FB.AppEvents.logPageView();

    // Facebook Video at article bottom autoplay
    articleFBvideo();
  });

})();