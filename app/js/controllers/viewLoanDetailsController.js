function viewLoanDetailsCtrl(viewLoanDetailsService, sharedValues, $scope, utilService,$rootScope,loanService,$stateParams) {
  'ngInject';

  // ViewModel
  const vm = this;
  vm.init = function() {
    try {
      $scope.util = utilService;
      if($stateParams.loanId){
        vm.loanId = $stateParams.loanId;
      }
      vm.accountID = $scope.util.setAccountId();
      vm.loanDetails = '';
      if(sharedValues.ongoingLoans.length){
        for(var i=0;i<sharedValues.ongoingLoans.length;i++){
          if(sharedValues.ongoingLoans[i].Id==vm.loanId){
            vm.viewLoans(vm.loanId,sharedValues.ongoingLoans[i].loan__Term_Cur__c,sharedValues.ongoingLoans[i].loan__First_Installment_Date__c,sharedValues.ongoingLoans[i].loan__Total_Pre_Paid_Fees__c);
          }
        }
      }else{
        vm.getLoans();
      }
    } catch (err) {
      console.error(err);
    }
  }

   vm.getLoans = function() {
    try {
      var ongoingLoans;
      var promise=loanService.getLoans(vm.accountID);
      promise.then(function(respose){
        if(respose){
          ongoingLoans = respose;
          for(var i=0;i<ongoingLoans.length;i++){
            if(ongoingLoans[i].Id==vm.loanId){
              vm.viewLoans(vm.loanId,ongoingLoans[i].loan__Term_Cur__c,ongoingLoans[i].loan__First_Installment_Date__c,ongoingLoans[i].loan__Total_Pre_Paid_Fees__c);
            }
          }
        }
      })
    } catch (err) {
      console.error(err);
    }
  }

  vm.viewLoans = function(loanId, tenure, EMISD, Fee){
    var promise=loanService.viewDetails(loanId, tenure, EMISD, Fee);
    promise.then(function(response){
      if(response){
        vm.loanDetails = response;
      }
    })
  }

  vm.init();

}

export default {
  name: 'viewLoanDetailsCtrl',
  fn: viewLoanDetailsCtrl
};
