(function() {
  // create deferred object
  let YTdeferred = $.Deferred();
  window.onYouTubeIframeAPIReady = function() {
    // console.log('Youtube API ready');
    // resolve when youtube callback is called
    // passing YT as a parameter
    YTdeferred.resolve(window.YT);
  };

  // embedding youtube iframe api
  // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
  let tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  let firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  let $window = $(window);
  let winW = $window.width();
  let winH = $window.height();
  let device = 1024;
  let player;
  let youtubeBottom = 'youtubeBottom';
  let $youtubeWrap = $('.videoBottom');
  let $youtubeBottom = $('#youtubeBottom');
  let id = $youtubeBottom.data('videoid');
  let player_setting = {
    videoId: id, // YouTube 影片ID
    width: 560, // 播放器寬度 (px)
    height: 315, // 播放器高度 (px)
    playerlets: {
      rel: 0, // 播放結束後推薦其他影片
      controls: 0, // 在播放器顯示暫停／播放按鈕
      start: 0, //指定起始播放秒數
      autoplay: 0, // 在讀取時自動播放影片
      loop: 1, // 讓影片循環播放
      playlist: id,
      showinfo: 1, // 隱藏影片標題
      modestbranding: 1, // 隱藏YouTube Logo
      fs: 0, // 隱藏全螢幕按鈕
      cc_load_policty: 0, // 隱藏字幕
      iv_load_policy: 3, // 隱藏影片註解
      autohide: 0 // 當播放影片時隱藏影片控制列
    },
    events: {
      onReady: function(e) {
        // mobile cant autoplay
        if (winW < device) return;
        // set video high quality
        e.target.setPlaybackQuality('hd1080');
        // scroll to auto play
        function vPlay() {
          let in_position = $youtubeWrap.offset().top;
          let window_position = $window.scrollTop();
          let status = $youtubeBottom.data('vplay');
          if (status === 'true') return;
          if (in_position < window_position + winH) {
            e.target.playVideo();
            $youtubeBottom.data('vplay', 'true');
          }
        }
        $window.scroll(_.throttle(vPlay, 250));
      }
    }
  }

  // whenever youtube callback was called = deferred resolved
  // your custom function will be executed with YT as an argument
  // YouTube
  YTdeferred.done(function(YT) {
    // creating a player
    // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
    player = new YT.Player(youtubeBottom, player_setting);
  });

})();
