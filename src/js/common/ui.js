function searchCover() {
  // Click black background to hide search page
  let $bg = $('nav');
  let $close = $('#noOpen');
  $bg.on('click', '.searchfixed, .searchfixedWrap', function (e) {
    if (e.target !== this) return;
    $close.prop("checked", true);
  });
}

export function ui() {
  searchCover();
}