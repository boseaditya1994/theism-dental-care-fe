function transactionOutModalCtrl(sharedValues, transactionOutService, $rootScope,utilService) {
  'ngInject';

  const vm = this;

  //This function initialises all the variables used in this controller
  vm.init = function() {

    try {
      vm.isConfirmed = false;
      vm.isFailed = false;
      vm.isDone = false;
      vm.value = false;
       vm.isSuccess=false;
      vm.transactionOutForm = {
        investorId: '',
        amount: ''
      };
    } catch (err) {
      console.error(err);
    }

  }

  //The function is called when the user withdraw money
  vm.confirm = function() {
    try {
      if (sharedValues.investorDetails.Id) {
        vm.transactionOutForm.investorId = sharedValues.investorDetails.Id;
      }

      vm.amount = sharedValues.transactionAmount.split(' ').join('');

      vm.amount = vm.amount.split(',').join('.');

      var param = {
        investorId: vm.transactionOutForm.investorId,
        amount: vm.amount
      }

      var promise = transactionOutService.transactionOut(param);
      promise.then(function(answer) {

           if(answer.data.message=='Failed to authenticate token.'){
         utilService.uibModalClose();
             $rootScope.$broadcast('logOutUser');
          }
          else if (answer.data.message.status == 'SUCCESS') {

            

            vm.isConfirmed = true;
            vm.isDone = true;
            vm.isFailed = false;
            vm.value = true;
            vm.isSuccess=true;
            
            $rootScope.$broadcast('updateAvailableFund', vm.value);
          } else {
            vm.isConfirmed = true;
            vm.isFailed = true;
            vm.isSuccess=false;
            vm.isDone = true;
          }
        },
        function(reason) {
          var err = reason;
          console.error(err);
        });
      return promise;
    } catch (err) {
      console.error(err);
    }
  };

  vm.init();
}

export default {
  name: 'transactionOutModalCtrl',
  fn: transactionOutModalCtrl
};
