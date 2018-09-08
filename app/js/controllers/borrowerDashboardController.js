function borrowerDashboardCtrl(navigationHandlerService,sharedValues,$rootScope, $scope, utilService, $state) {
  'ngInject';

  // ViewModel
  const vm = this;

  vm.init = function() {
    vm.active = 'appliedLoans';
    $scope.util = utilService;
    $rootScope.noOfLoan = sharedValues.noOfLoan;
  }
  //Translation for the TAB NAMES
  vm.tabs = [
    { title: 'Innsendte lånesøknader', route: 'appliedLoans' },
    { title: 'Pågående lån', route: 'ongoingLoans' },
    { title: 'Avsluttede lån', route: 'closedLoans' }
  ];
  //Setting the active tab UI
  _.each(vm.tabs,
    function(tab) {
      if ($state.is('borrowerDashboard.' + tab.route)) {
        vm.active = tab.route;
      }
    });
  //ROuting according to the tab selected
  vm.tabSelected = function(route) {
    vm.active = route;
    navigationHandlerService.stateChange('borrowerDashboard.' + route);
  };

  vm.init();

}


export default {
  name: 'borrowerDashboardCtrl',
  fn: borrowerDashboardCtrl
};
