function doubleClick($timeout) {
  'ngInject';
  return {

    restrict: 'A',
    link: function(scope, ele, attrs) {
      if (attrs.timeout) {

        ele.click(function() {
          var timeout = attrs.timeout;
          ele.attr('disabled', true);
          ele.addClass('dblClick');
          $timeout(function() {
            ele.attr('disabled', false);
            ele.removeClass('dblClick');
          }, parseInt(timeout));
        });
      } else {
        ele.click(function() {
          ele.attr('disabled', true);
          ele.addClass('dblClick');
          $timeout(function() {
            ele.attr('disabled', false);
            ele.removeClass('dblClick');
          }, 3000);
        });
      }
    }
  };

}

export default {
  name: 'doubleClick',
  fn: doubleClick
};
