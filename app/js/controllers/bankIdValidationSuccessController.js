function bankIdValidationSuccessCtrl(utilService, bankIdValidationSuccessService,$rootScope,navigationHandlerService) {
  'ngInject';
  const vm = this;

  //This function is called at the loading of the page

  vm.init = function() {
    try {
      vm.initialize();
      //vm.validate();
    } catch (e) {
      console.error(e);
    }
  }

  //This function initializes the variables which are used in this controller

  vm.initialize = function() {
    try {
      vm.form = {
        accountID: ''
      }
      vm.syncSignUpdateForm = {
        AccountSFID: '',
        Status: 'Success'
      }
      vm.isBankIdProcessed=false;
    } catch (e) {
      console.error(e);
    }
  }

  //This function completes the Bank ID Validation of a user

  vm.validate = function() {
    try {
      vm.syncSignUpdateForm.AccountSFID = utilService.setAccountId();
      var promise = bankIdValidationSuccessService.SyncSignUpdate(vm.syncSignUpdateForm);
      promise.then(function(answer) {
        vm.isBankIdProcessed=true;
       if(answer.data.Response=='Synchronous signature is successfully done.'){
          
         $rootScope.$broadcast('afterBankIdSuccess');
          navigationHandlerService.stateChange('bankIdValidationSuccess');
        }

        else if(answer.data.Response=='SSN is not matching or document is not signed yet'){
            
          navigationHandlerService.stateChange('bankIdValidationFailure');
        }
        
        else if(answer.data.Response=='Attempt to de-reference a null object.  Please contact with admin.'){
             
            navigationHandlerService.stateChange('bankIdValidationFailure');
       }

       else{
         navigationHandlerService.stateChange('bankIdValidationFailure');
       }


      },
      function(reason) {
        console.error(reason);
        navigationHandlerService.stateChange('bankIdValidationFailure');
      });

    } catch (e) {

      console.error(e);
    }
  }


  


  vm.init();

  $rootScope.$on('userDetailsUpdate', function() {
    if(!vm.isBankIdProcessed){
      vm.validate();
      vm.isBankIdProcessed=false;
    }
    
  });
}

export default {
  name: 'bankIdValidationSuccessCtrl',
  fn: bankIdValidationSuccessCtrl
};
