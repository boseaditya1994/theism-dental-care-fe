function ongoingLoansCtrl(sharedValues, ongoingLoansService, viewLoanDetailsService, $scope, utilService, navigationHandlerService,$rootScope,loanService) {
  'ngInject';
  // ViewModel
  const vm = this;

  vm.init = function() {

    try {
      $scope.util = utilService;
      vm.ongoingLoans = '';
      vm.ongoingLoansCopy = '';
      vm.accountID = $scope.util.setAccountId();
      vm.getLoans();
    } catch (err) {
      console.error(err);
    }
  }
  //Fetching all the Loan Applications
  vm.getLoans = function() {
    try {
      var promise=loanService.getLoans(vm.accountID);
      promise.then(function(respose){
        if(respose){
          
          vm.ongoingLoans = respose;
          vm.ongoingLoanCheck();
        }
        
      })
    } catch (err) {
      console.error(err);
    }
  }
  //Filtering the loan applications according to the Ongoing loan status
  vm.ongoingLoanCheck = function() {
    try {
      if (vm.ongoingLoans) {
        for (var i = 0; i < vm.ongoingLoans.length; i++) {
          if (vm.ongoingLoans[i].loan__Loan_Status__c != 'Active - Good Standing' && vm.ongoingLoans[i].loan__Loan_Status__c != 'Active - Bad Standing') {
            {
              vm.ongoingLoans.splice(i, 1);
              i--;
            }
          }
        }
        vm.ongoingLoansCopy = angular.copy(vm.ongoingLoans);
        sharedValues.ongoingLoans = vm.ongoingLoansCopy;
      }
    } catch (err) {
      console.error(err);
    }
  }

  $rootScope.$on('userDetailsUpdate', function() {
    vm.init();
  });

  vm.init();

}

export default {
  name: 'ongoingLoansCtrl',
  fn: ongoingLoansCtrl
};
