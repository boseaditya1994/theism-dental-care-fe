function disableOnRequest($rootScope) {
  'ngInject'
  return {
    restrict: 'A',
    link: (scope, element, attrs) => {

      $rootScope.$on('requestOngoing', function() {
        alert('requestOngoing');
        console.log(element);

        element.innerHTML = '<span >' + attrs.processing + '</span><i class="fa fa-spinner fa-spin"></i>';
        console.log(element);
      });

      $rootScope.$on('requestCompleted', function() {
        element.innerHTML = '<span >' + attrs.label + '</span>';
      });
    }
  };
}

export default {
  name: 'disableOnRequest',
  fn: disableOnRequest
};
