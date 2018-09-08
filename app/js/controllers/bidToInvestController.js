function bidToInvestCtrl(sharedValues, bidToInvestLoanService, popUpService, $rootScope, utilService, $window) {
  'ngInject';
  // ViewModel
  const vm = this;

  //This function is called on page loading

  vm.init = function() {
    try {
      vm.initialize();
    } catch (e) {
      console.error(e);
    }
  }

  //This function initialises all the variables used in this controller

  vm.initialize = function() {
    try {
      vm.isConfirmed = false;
      vm.isInsertFAiled = false;
      vm.bidToInvestForm = {
        accountID: utilService.setAccountId(),
        amount: sharedValues.amountToInvest,
        applicationID: sharedValues.loanId
      };
      vm.name = sharedValues.loanName;
      vm.amount = sharedValues.amountToInvest;
    } catch (e) {
      console.error(e);
    }
  }

  //This function helps the investor to bid against a loan

  vm.bidToInvest = function() {
    try {
     
      var promise = bidToInvestLoanService.bidToInvestLoan(vm.bidToInvestForm);
      promise.then(function(answer) {
        if(answer.data.message=='Failed to authenticate token.'){
         utilService.uibModalClose();
             $rootScope.$broadcast('logOutUser');
          }
          else{
          if (answer.data.status == 'Success') {
            vm.flagReset();
            vm.isConfirmed = true;
            if (answer.data.message == 'You have succesfully invested into the loan.') {
              vm.isKYCChecked = true;
              vm.bidToInvestForm.amount = '';
              $rootScope.$broadcast('bidToInvest');
              var value = true;
              $rootScope.$broadcast('updateAvailableFundForInvest', value);

        } else if (answer.data.message == 'Please use the URL to complete the identification process.') {
              vm.flagReset();
              vm.isInsertFAiled = true;
              $window.open(answer.data.url, '_self');

            }

            else if(answer.data.message =='KYC process will be done by FP team manually. Please contact FP team.'){
               
                 vm.flagReset();
                 vm.isDoneByFp=true;
                 vm.isConfirmed = true;

            }
          } else {
            if (answer.data.message == 'An error has occurred. Please contact admin') {
             
              vm.flagReset();
              vm.isConfirmed = true;
              vm.isError=true;
            } else {
              vm.flagReset();
              utilService.uibModalClose();
              popUpService.popUpShow('Beklager!', 'Noe gikk galt.');
            }
          }
        }
        },
        function(reason) {
          var err = reason;
          console.error(err);

        });
      return promise;
    } catch (e) {
      console.error(e);
    }
  }

  //This function resets all the flags used in this controller

  vm.flagReset = function() {
    try {
      vm.isKYCChecked = false
      vm.isConfirmed = false;
      vm.isInsertFAiled = false;
      vm.isDoneByFp=false;
      vm.isError=false;
    } catch (e) {
      console.error(e);
    }
  }

  vm.init();
}

export default {
  name: 'bidToInvestCtrl',
  fn: bidToInvestCtrl
};
