import {isCollection} from './module.js';

let slots = {};
let winW = parent.document.body.clientWidth;

let DFP = {
  run () {
    $('[data-module="googledfp"]').each(function () {
      if ($(this).is('.loaded')) return;

      let $this = $(this).addClass('loaded');
      let device = $this.data('device');
      let element_id = this.id;
      let noDFP = isCollection();

      // Remove DFP if isCollection = true
      // Remove DFP by device width
      if (noDFP || (winW < 768 && device !== 'mobile') || (winW >= 1024 && device !== 'desktop') || (winW >= 768 && winW < 1023 && device !== 'mobile')) {
        $this.remove();
        return;
      }

      DFP.display(element_id);
    });
  },
  display (id) {
    googletag.cmd.push(function() {
      let $this = $(document.getElementById(id));
      let adunit = $this.data('adunit');
      let dimensions = $this.data('dimensions');

      console.debug('Loading DFP:', { id, adunit, dimensions });

      slots[id] = googletag.defineSlot(
          adunit,
          dimensions,
          id
        )
        .addService(googletag.pubads());
      googletag.enableServices();
      googletag.display(id);
    });
  },
  refresh (id) {
    googletag.cmd.push(function() {
      googletag.pubads().refresh([slots[id]]);
    });
  }
};

export default DFP;
