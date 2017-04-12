(function() {
  const $window = $(window);
  const $winW = $window.width();
  const $indexSlider = $('.indexSlider');
  const $indexMag = $('.indexMag');
  const $latest = $('.latestArticles');
  const $latestMore = $('.latest .more');
  let $latestFrom = 0;
  const $latestSize = 12;
  let $latestInit = false;
  const $latestTmp = `
    <li class="pure-u-1 pure-u-md-1-2 pure-u-lg-1-3">
      <div class="article">
        <a class="img" href="" target="_blank"></a>
        <div class="detail"></div>
      </div>
    </li>
  `;

  /*---------------------
  ** indexSlider
  -----------------------*/
  $indexSlider.find('.sliderItem').width($winW);
  $indexSlider.owlCarousel({
  	autoWidth: true,
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 1000,
    autoplayHoverPause: true,
    dotsClass: 'indexSliderDots'
  });

  /*---------------------
  ** LATEST
  -----------------------*/
  // Set skeleton
  function latestSkeleton ($el) {
    let $latestSke = '';
    for (let i = 0; i < $latestSize; i++) {
      $latestSke = `${$latestSke}${$latestTmp}`
    }
    $el.append($latestSke);
  }
  latestSkeleton($latest);

  // API get data
  function latestGet ($size, $from) {
    $.ajax({
      url: 'https://juksy.getsandbox.com/v1.0/articles/latest',
      data: { size: $size, from: $from },
      type: 'GET',
      dataType: 'json',
      success: function(res) {
        latestSet(res.data);
      },
      error: function(e) {
        console.log(`error: ${e}`);
      }
    });
  }
  latestGet ($latestSize, $latestFrom);

  // API set data
  function latestSet (data) {
    const $list = $latest.find('li');
    for (let i = 0; i < $latestSize; i++) {
      const date = new Date(data[i].published_at).toDateString().split(" ");
      const $item = $list.eq(i+$latestFrom);
      const tmpImg = `
        <img class="owl-lazy lazy" data-src="${data[i].image_cover}" width="100%" height="auto" alt="${data[i].title}">
        <div class="category hide show-md">${data[i].category}</div>
      `;
      const tmpDetail = `
        <div class="pure-g">
          <div class="pure-u-2-3 date">${date[1]} ${date[2]}, ${date[3]} &nbsp; | &nbsp; By ${data[i].author}</div>
          <div class="pageview">
            <div class="icon">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 15.9 15.9" style="enable-background:new 0 0 15.9 15.9;" xml:space="preserve"><path class="st0" d="M8,13.5c-3.6-0.2-6.3-1.8-7.9-5.1C0,8.1,0,7.8,0.1,7.5C1.7,4.2,4.3,2.4,8,2.5c3.6,0,6.3,1.8,7.9,5.1c0.1,0.2,0.1,0.6,0,0.8C14.3,11.7,11.6,13.3,8,13.5z M11.6,7.9c0-2-1.6-3.7-3.6-3.7c-2,0-3.7,1.6-3.7,3.7c0,2,1.7,3.7,3.7,3.7C10,11.6,11.6,10,11.6,7.9z"></path><path class="st0" d="M8,5.8c1.2,0,2.2,1,2.2,2.2c0,1.2-1,2.2-2.2,2.2c-1.2,0-2.2-1-2.2-2.2C5.8,6.8,6.8,5.8,8,5.8z"></path></svg>
            </div>${data[i].pageviews}
          </div>
        </div>
      `;
      const tmpTitle = `<a class="title" data-module="dotdotdot" href="${data[i].link}" target="_blank"><h3>${data[i].title}</h3>`
      ;
      $item.find('a.img').attr('href', data[i].link).append(tmpImg);
      $item.find('.detail').append(tmpDetail);
      $item.find('.article').append(tmpTitle);
      if ($winW < 768) {
        $latest.trigger('refresh.owl.carousel');
      }
    }
    $(document).trigger('dotdotdot');
    if ($winW >= 768) {
      $latest.find('.lazy').lazy({
        effect: "fadeIn",
        effectTime: 1000,
        threshold: 0,
        defaultImage: ''
      });
      $latestMore.show();
    }
    latestInit();
  }

  function latestInit() {
    if ($latestInit === true) return;
    if ($winW < 768) {
      latestMobile();
    }
    else {
      latestDesktop();
    }
    $latestInit = true;
  }

  // Mobile owlCarousel
  function latestMobile() {
    $latest.addClass('owl-carousel owl-theme');
    $latest.owlCarousel({
      items: 1,
      lazyLoad: true,
      dots: false,
      nav: true,
      navContainerClass: 'latestNav',
      navText: ['', '']
    });
    $latest.on('translate.owl.carousel', function(event) {
      const index = event.item.index;
      console.log(index, $latestFrom+$latestSize-1);
      if (index === $latestFrom+$latestSize-1) {
        for (let i = 0; i < $latestSize; i++) {
          $latest.trigger('add.owl.carousel', [$($latestTmp)]).trigger('refresh.owl.carousel');
        }
        $latestFrom = $latestFrom + $latestSize;
        latestGet ($latestSize, $latestFrom);
      }
    });
  }

  // Desktop lazyLoad
  function latestDesktop() {
    $latest.find('.lazy').lazy({
      effect: "fadeIn",
      effectTime: 1000,
      threshold: 0,
      defaultImage: ''
    });
    $latestMore.click(function () {
      $latestMore.hide();
      $latestFrom = $latestFrom + $latestSize;
      latestSkeleton($latest);
      latestGet($latestSize, $latestFrom);
    });
  }

  /*---------------------
  ** indexMag
  -----------------------*/
  $indexMag.owlCarousel({
    loop: true,
    lazyLoad: true,
    dots: false,
    nav: true,
    navContainerClass: 'indexMagNav',
    navText: ['', ''],
    responsive : {
      0: {
        items: 1,
        smartSpeed: 1000,
      },
      768: {
        items: 2,
        smartSpeed: 1000,
        margin: 10
      },
      1024: {
        items: 4,
        smartSpeed: 500,
        margin: 10,
        slideBy: 2
      }
    }
  });

})();
