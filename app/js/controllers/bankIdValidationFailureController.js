function bankIdValidationFailureCtrl(utilService, $window, signUpInvestorPrivateService) {
  'ngInject';
  const vm = this;

  //This function is called on page loading

  vm.init = function() {
    try {
      vm.initialize();
    } catch (e) {
      console.error(e);
    }
  }

  //This function initializes all the variables which are being used in the controller

  vm.initialize = function() {
    try {
      vm.bankIdValidationForm = {
        accountID: ''
      };
    } catch (e) {
      console.error(e);
    }
  }

  //This function agian validates the user's Bank ID

  vm.bankIdValidation = function() {
    try {
      vm.bankIdValidationForm.accountID = utilService.setAccountId();
      var promise = signUpInvestorPrivateService.bankIdValidation(vm.bankIdValidationForm);
      promise.then(function(answer) {
if(answer.data.message=='Failed to authenticate token.'){
         
             $rootScope.$broadcast('logOutUser');
          }
          else{
          var bankIdValidationLink = answer.data;
          if (bankIdValidationLink != '') {
            $window.open(bankIdValidationLink.Response, '_self');
          }
        }
        },
        function(reason) {
          var err = reason;
          console.error(err);
        });
    } catch (e) {
      console.error(e);
    }
  }

  vm.init();
}

export default {
  name: 'bankIdValidationFailureCtrl',
  fn: bankIdValidationFailureCtrl
};
