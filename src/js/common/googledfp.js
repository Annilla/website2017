import {isCollection} from './module.js';

(function() {
  let winW = $(window).width();
  $('[data-module="googledfp"]').each(function () {
    let $this = $(this);
    let device = $this.data('device');
    let element_id = this.id;
    let noDFP = isCollection();

    // Remove DFP if isCollection = true
    // Remove DFP by device width
    if (noDFP || (winW < 768 && device !== 'mobile') || (winW >= 970 && device !== 'desktop')) {
      $this.remove();
      return;
    }
    
    console.debug('Loading DFP:', element_id);
    googletag.cmd.push(function() {
      googletag.pubads().display(
        $this.data('adunit'),
        $this.data('dimensions'),
        element_id);
    });
  });
})();
