function closedLoansCtrl(sharedValues, $scope, utilService, ongoingLoansService, viewLoanDetailsService, navigationHandlerService,loanService ) {
  'ngInject';
  // ViewModel
  const vm = this;

  vm.init = function() {
    try {
      $scope.util = utilService;
      vm.closedLoansCopy = [];
      vm.closedLoans = [];
      vm.ongoingLoans = '';
      vm.accountID = $scope.util.setAccountId();
      vm.getLoans();

    } catch (err) {
      console.error(err);
    }

  }
  //Fetching the List of all the loan Applications
  vm.getLoans = function() {
    try {
      var promise=loanService.getLoans(vm.accountID);
      promise.then(function(respose){
        console.log(respose);
        if(respose){
            vm.ongoingLoans = respose;
          vm.closedLoanCheck();
          
          
        }
      },
          function(reason) {
            $rootScope.$broadcast('logOutUser');
            console.error(reason);
          });
    } catch (err) {
      console.error(err);
    }
  }
  // Filtering all the loan applications that are valid for Closed Loans
  vm.closedLoanCheck = function() {
    try {
      if (vm.ongoingLoans) {
        for (var i = 0; i < vm.ongoingLoans.length; i++) {
          if (vm.ongoingLoans[i].loan__Loan_Status__c == 'Closed - Obligations met' || vm.ongoingLoans[i].loan__Loan_Status__c == 'Closed - Premature' || vm.ongoingLoans[i].loan__Loan_Status__c == 'Closed - Refinanced' || vm.ongoingLoans[i].loan__Loan_Status__c == 'Closed- Written Off') {
            vm.closedLoans.push(vm.ongoingLoans[i]);
          }
        }
        vm.closedLoansCopy = angular.copy(vm.closedLoans);
      }
    } catch (err) {
      console.error(err);
    }
  }

  vm.init();
}

export default {
  name: 'closedLoansCtrl',
  fn: closedLoansCtrl
};
