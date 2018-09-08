function appliedLoansCtrl(appliedLoansService, $rootScope,viewLoanApplicationDetailsService, sharedValues, $scope, utilService, navigationHandlerService) {
  'ngInject';
  // ViewModel
  const vm = this;

  vm.init = function() {
    try {
      $scope.util = utilService;
      vm.appliedLoans = {};
      vm.accountID = '';
      vm.appliedLoansCopy = {};
      vm.accountID = $scope.util.setAccountId();
      vm.form = {
        borrowerId: vm.accountID,
        additionalFields: ''
      }
      vm.getLoans();
    } catch (err) {
      console.error(err);
    }
  }
  //Fetching all the loan applications
  vm.getLoans = function() {
    try {
      if (sharedValues.appliedLoans.length) {
        //checking if the loan application list already exists
        vm.appliedLoans = angular.copy(sharedValues.appliedLoans);
        vm.loanCheck();
      } else {
        var promise = appliedLoansService.fetch(vm.form);
        promise.then(function(answer) {

          if(answer.data.message=='Failed to authenticate token.'){
         
             $rootScope.$broadcast('logOutUser');
          }
          else{
            vm.appliedLoans = answer.data.message.content;
            sharedValues.appliedLoans = angular.copy(vm.appliedLoans);
            
            vm.loanCheck();
          }
          },
          function(reason) {
            console.error(reason);
          });
      }

    } catch (err) {
      console.error(err);
    }

  }

  //Filtering the loan applications according to the  loan status
  vm.loanCheck = function() {
    try {
      if (vm.appliedLoans) {
        for (var i = 0; i < vm.appliedLoans.length; i++) {
          if (vm.appliedLoans[i].genesis__Status__c == 'Funded') {
            {
              vm.appliedLoans.splice(i, 1);
              i--;
            }
          }
        }
        vm.appliedLoansCopy = angular.copy(vm.appliedLoans);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // TO view the Details of the loan application
  vm.viewDetails = function(loanId) {
    try {
      var promise = viewLoanApplicationDetailsService.view(loanId);
      promise.then(function(answer) {
          sharedValues.loanDetails = answer;
        },
        function(reason) {
          console.error(reason);
        });
      navigationHandlerService.stateChange('viewLoanDetails');
    } catch (err) {
      console.error(err);
    }
  }

  vm.init();

  $rootScope.$on('userDetailsUpdate', function() {
    vm.init();
  });

}

export default {
  name: 'appliedLoansCtrl',
  fn: appliedLoansCtrl
};
