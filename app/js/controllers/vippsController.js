function vippsController(sharedValues,validationService,$scope,vippsService,popUpService,$rootScope) {
  'ngInject'

  const vm = this;

  /*This function initialises all the variables used in this controller*/
  vm.init = function() {

    try {
      vm.initialize();
      vm.assignPhoneNo();

    } catch (err) {

      console.error(err);
    }

  }

  //This function will initialize the form
  vm.initialize = function() {
    try {
      
      vm.vippsPhone='';
      vm.formVipps = {
          accountID: '',
          Amount: ''
      };
      vm.vaildAmount = {};
      
    } catch (err) {
      console.error(err);
    }


  }


  /*This function assigns phone no  */

  vm.assignPhoneNo = function() {
    try {

 if (sharedValues.investorDetails.Telephone__c) {
        vm.telephoneNo = sharedValues.investorDetails.Telephone__c;
        vm.vippsPhone = vm.getPhoneNumberForView(vm.telephoneNo);
      }
 }
 catch(err){

  console.error(err);
}   
  }


    //The function is called for vipps
  vm.confirm = function() {
    try {
    
        vm.formVipps.accountID = $scope.util.setAccountId();

         vm.amount = vm.formVipps.Amount.split(' ').join('');

      vm.amount = vm.amount.split(',').join('.');

      vm.formVipps.Amount=vm.amount;

      var promise = vippsService.vippsTansferIn(vm.formVipps);
      promise.then(function(answer) {
        if(answer.data.message=='Failed to authenticate token.'){
         
             $rootScope.$broadcast('logOutUser');
          }
          
          else if(answer.data.message.status=='Success'){

            if(answer.data.message.message=='IFT is successfully created. It will be sent to Evry in few minutes'){
                 popUpService.popUpShow('Vipps faktura', 'Din Vipps overføring er påbegynt. Du vil motta en Vipps faktura på din mobil i løpet av noen timer. Godkjenn denne for å fullføre overføringen.');
            }
          }

          else{

            if(answer.data.message.message=='Transaction amount is missing'){
                 popUpService.popUpShow('Beklager!', 'Overføringsbeløp mangler.');
            }

            else if(answer.data.message.message=='Account ID is missing'){
              popUpService.popUpShow('Beklager!', 'Brukerkonto ID mangler.');
            }

            else{
              popUpService.popUpShow('Systemfeil!!', 'Vennligst ta kontakt med FundingPartner og forklar problemet.');
            }
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


//To disable button
 vm.buttonDisable = function() {
    try {
      if (vm.formVipps.Amount) {
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

  //This function is called from ng-change for amount validation
              vm.inputAmount=function()
              {

                try{
                  
                  vm.vaildAmount = validationService.isValidAmountVipps(vm.formVipps.Amount);
                  return vm.vaildAmount;

                }

                catch(err){
                  console.error(err);
                }
                
              }

    //To view phone no
  vm.getPhoneNumberForView = function(phoneNo) {
    try {
      vm.telephone = validationService.getPhoneNumberForView(phoneNo);
      return vm.telephone;
    } catch (err) {
      console.error(err);
    }

  }

  vm.init();

  $rootScope.$on('userDetailsUpdate', function() {
    vm.assignPhoneNo();
  });

}

export default {

  name: 'vippsController',
  fn: vippsController
};
