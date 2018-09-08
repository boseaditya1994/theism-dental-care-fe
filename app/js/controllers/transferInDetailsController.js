function transferInDetailsCtrl($state, utilService, $scope, navigationHandlerService,$rootScope) {
  'ngInject';
  const vm = this;

  /*This function initialises all the variables used in this controller*/
  vm.init = function() {
    try {
      vm.active = 'vipps';
      $scope.util = utilService;
      vm.tabRoute();
    } catch (err) {
      console.error(err);
    }

  }

  /*Setting the active tab UI*/
  vm.tabRoute = function() {
    try {
      vm.tabs = [
        { title: 'VIPPS', route: 'vipps' },
        { title: 'Overføring fra norsk bankkonto', route: 'norwegianBank' },
        { title: 'Overføring fra utenlandsk bankkonto', route: 'internationalBank' }
      ];


      _.each(vm.tabs,
        function(tab) {
          if ($state.is('transfer.in.details.' + tab.route)) {
            vm.active = tab.route;
          }
        });

    } catch (err) {
      console.error(err);
    }
  }

  /*ROuting according to the tab selected*/
  vm.tabSelected = function(route) {
    try {
      navigationHandlerService.stateChange('transfer.in.details.' + route);
      vm.active = route;
    } catch (err) {
      console.error(err);
    }

  };


  vm.init();

}
export default {
  name: 'transferInDetailsCtrl',
  fn: transferInDetailsCtrl
};
