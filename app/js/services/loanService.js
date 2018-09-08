function loanService(sharedValues, $rootScope, navigationHandlerService,viewLoanDetailsService,ongoingLoansService,$q) {
  'ngInject';
  const service = {};

  service.getLoans = function(accountID){
  	try {
  	  var ongoingLoans;
  	   var deferObject;
    	deferObject = deferObject || $q.defer();
      if (sharedValues.ongoingLoans && sharedValues.ongoingLoans.length) {
        //checking if the loan application list already exists
         sharedValues.ongoingLoans = angular.copy(sharedValues.ongoingLoans);
         deferObject.resolve(sharedValues.ongoingLoans);
      } else {
        var promise = ongoingLoansService.fetch(accountID);
        promise.then(function(answer) {
            sharedValues.ongoingLoans = answer.data.message.content;
            deferObject.resolve(sharedValues.ongoingLoans);
          },
          function(reason) {
            console.error(reason);
          });
      }
      return deferObject.promise;
    } catch (err) {
      console.error(err);
    }
  }

  service.viewDetails = function(loanId, tenure, EMISD, Fee) {
    try {
    var deferObject;
    deferObject = deferObject || $q.defer();
      var promise = viewLoanDetailsService.view(loanId);
      promise.then(function(answer) {
          sharedValues.loanDetails = answer.data.message.content[0];
          sharedValues.loanDetails.loan__Term_Cur__c = tenure;
          sharedValues.loanDetails.loan__First_Installment_Date__c = EMISD;
          sharedValues.loanDetails.loan__Total_Pre_Paid_Fees__c = Fee;
          deferObject.resolve(sharedValues.loanDetails);
          //navigationHandlerService.stateChange('viewLoanDetails');
        },
        function(reason) {
          console.error(reason);
        });
      return deferObject.promise;
    } catch (err) {
      console.error(err);
    }
  }

  return service;
}
export default {
  name: 'loanService',
  fn: loanService
};
