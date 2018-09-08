function popUpCtrl(popUpService, $state, $rootScope) {
  'ngInject';
  // ViewModel
  const vm = this;
  vm.header = '';
  vm.message = '';

  vm.init = function() {
    vm.header = popUpService.header;
    vm.message = popUpService.message;
    if(popUpService.message!='')
    {
      if (popUpService.message.charAt(0) == '<') {
      vm.message = popUpService.message;
      } else if(popUpService.message!='') {
      vm.message = '<p>' + popUpService.message + '</p>';
      }
      else
      {
        vm.message = '';
      }
    }
    $('#popup').modal('show');
  }
  $rootScope.$on('getpopUp', function() {
    vm.init();
  });
}

export default {
  name: 'popUpCtrl',
  fn: popUpCtrl
};
