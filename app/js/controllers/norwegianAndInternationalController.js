function norwegianAndInternationalCtrl(sharedValues,validationService,$rootScope) {
  'ngInject'

  const vm = this;

  /*This function initialises all the variables used in this controller*/
  vm.init = function() {

    try {
      vm.initialize();
      vm.assigncompanyDetails();

    } catch (err) {

      console.error(err);
    }

  }

  //This function will initialize the form
  vm.initialize = function() {
    try {
      vm.companyDetails = {
        Account_Number__c: '',
        BIC_SWIFT__c: '',
        FundingPartners_addresse__c: '',
        IBAN_number_elektronisk__c: '',
        KID__c: ''

      }
    } catch (err) {
      console.error(err);
    }


  }


  /*This function assigns all the value in company details */

  vm.assigncompanyDetails = function() {
    try {

 if(sharedValues.investorTrustAccount.loan__Bank_Account_Number__c){

          vm.accountNo = sharedValues.investorTrustAccount.loan__Bank_Account_Number__c;
          vm.accountNo=vm.getBankAccountNumber(vm.accountNo);
    }
    vm.companyDetails={
     Account_Number__c:vm.accountNo,
     BIC_SWIFT__c:sharedValues.investorTrustAccount.BIC__c,
     FundingPartners_addresse__c: sharedValues.companyBankDetails.FundingPartners_addresse__c,
     IBAN_number_elektronisk__c: sharedValues.investorTrustAccount.IBAN__c,
     KID__c: sharedValues.investorDetails.KID__c
   };
 }
 catch(err){

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

  vm.init();

  $rootScope.$on('userDetailsUpdate', function() {
    vm.init();
  });

}

export default {

  name: 'norwegianAndInternationalCtrl',
  fn: norwegianAndInternationalCtrl
};
