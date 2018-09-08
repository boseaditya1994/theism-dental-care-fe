function signereKYCCheckCtrl(sharedValues, signereKYCCheckService, utilService, $rootScope, navigationHandlerService,$stateParams) {
  'ngInject';
  // ViewModel
  const vm = this;


  //Init method
  vm.init = function() {
    try {
     vm.form = {
        AccountSFID: '',
        Status: 'Success',
        amount: '',
        appID: ''
      };
      
    } catch (err) {
      console.error(err);
    }
  }

  //Check for signereKYC
  vm.signereKYCCheck = function() {
   try{

    vm.form.AccountSFID = utilService.setAccountId();
    vm.form.amount = $stateParams.amt;
    vm.form.appID = $stateParams.appId;
    
    var promise = signereKYCCheckService.signereKYCCheck(vm.form);
    promise.then(function(answer) {
      
        var dataAfterParse = JSON.parse(answer.data);
        var finalData = JSON.parse(dataAfterParse);
        if (finalData.Response == 'Your bid is successfully placed') {
            var value = true;
              $rootScope.$broadcast('updateAvailableFundForInvest', value);
        }

        else if(finalData.Response == 'Account ID is missing'){
          console.error('Account ID is missing');
        }
        else if(finalData.Response == 'Status is missing'){
          console.error('Status is missing');
        }
        else if(finalData.Response == 'Amount is missing'){
          console.error('Amount is missing');
        }
        else if(finalData.Response == 'Application is missing'){
          console.error('Application is missing');
        }
        else if(finalData.Response == 'No Account found'){
          console.error('No Account found');
        }
      else if(finalData.Response == 'Loan Application not found'){
          console.error('Loan Application not found');
        }
        else{
          console.error('KYC is pending');
          
        }



      },
      function(reason) {
        console.error(reason);
      });
    } catch (err) {
      console.error(err);
    }
  }

  //GOBACK method from signere
  vm.goBack = function() {

    try {
      navigationHandlerService.stateChange('invest');
    } catch (err) {
      console.error(err);
    }
  }

//Broadcast on to call signereKYCCheck
$rootScope.$on('userDetailsUpdate', function() {
   
    vm.signereKYCCheck();
  });

  vm.init();
}

export default {
  name: 'signereKYCCheckCtrl',
  fn: signereKYCCheckCtrl
};
