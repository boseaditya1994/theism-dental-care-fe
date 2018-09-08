function transactionOutCtrl(transactionOutService,$scope,$rootScope,utilService,sharedValues,validationService) {
                'ngInject'

                const vm = this;
//This function initialises all the variables used in this controller
                vm.init=function(){
                    $scope.util=utilService;
                  try{
                
                    vm.initialize();
                    if(sharedValues.investorBank){
                      vm.accountNumber = sharedValues.investorBank;
                      vm.accountNumber=vm.getBankAccountNumber(vm.accountNumber);
                      vm.accountNumber = '****.**.' + vm.accountNumber.substring(8, 13);
                    }
                 
                 }

                 catch(err){
                  console.error(err);
                }
                
              }

//This function is called from ng-change for amount validation
              vm.inputAmount=function()
              {

                try{
                  
                  vm.vaildAmount = validationService.isValidAmount(vm.transactionOutForm.amount);
                  return vm.vaildAmount;

                }

                catch(err){
                  console.error(err);
                }
                
              }
              

  //This function is called to disable the button until the value is correct
  vm.buttonDisable = function() {
    try {
      if (vm.transactionOutForm.amount) {
        if (vm.vaildAmount.isAmountZero == true || vm.vaildAmount.isAmountGreater == true || vm.vaildAmount.invalidAmount == true) {
          return true;
        } else {
          return false;
        }

      } else {
        return true;
      }
    } catch (err) {
      console.error(err);
    }

  }
  //This function is called to get the uibModal
  vm.transaction = function() {


    try {
      sharedValues.transactionAmount = vm.transactionOutForm.amount;

      $scope.util.uibModalOpen('transactionOutModalCtrl as transactionOutModal', 'transferOutModal.html')


    } catch (err) {
      console.error(err);

    }


  }

  //This function will initialize the form
  vm.initialize = function() {
    try {
      vm.transactionOutForm = {
        investorId: '',
        amount: ''
      };
      vm.isConfirmed = false;
      vm.vaildAmount = {};
      vm.value = false;
    } catch (err) {
      console.error(err);
    }
  }

  vm.getBankAccountNumber = function(bankAccountNumber) {
    try {
      vm.bankAccountNo = validationService.getValidBankAccountNumber(bankAccountNumber);
        return vm.bankAccountNo;
    } catch (e) {
      console.error(e);
    }
  }

  $rootScope.$on('userDetailsUpdate', function() {
    vm.init();
  });

  vm.init();

}



export default {
  name: 'transactionOutCtrl',
  fn: transactionOutCtrl

};
