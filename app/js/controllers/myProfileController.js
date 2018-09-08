function myProfileCtrl(sharedValues, utilService, $rootScope, popUpService ,validationService) {
  'ngInject';


  const vm = this;


  //init function
  vm.init = function() {
    try {
      vm.initialize();
      vm.assignValues();
    } catch (err) {
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

  vm.changeLegalInformation = function() {
    popUpService.popUpShow('Kontakt FundingPartner', 'Kontakt FundingPartner via kontakt@fundingpartner.no om du ønsker å oppdatere noen av personopplysningene som du oppga da du registrerte deg på portalen.');
    
  }

  //Changes the date format of last password changed
  vm.dateFormat = function(date) {
    try {
      var finalDate = utilService.dateFormat(date);
      return finalDate;
    } catch (err) {
      console.error(err);
    }
  }

  $rootScope.$on('details', function() {

    vm.init();
  });

  //Initialize the form
  vm.initialize = function() {
    try {
      vm.form = {
        accountID: ''
      }

      vm.profileForm = {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        postalCode: '',
        postalPlace: '',
        country: '',
        phone: '',
        personalIDNumber: '',
        bankkonto: '',
        purposeForInvesting: '',
        passwordLastchangedOn: ''
      }
    } catch (err) {
      console.error(err);
    }

  }


  //assign the values to form
  vm.assignValues = function() {
    try {
      if (sharedValues.investorDetails.Telephone__c) {
        vm.telephoneNo = sharedValues.investorDetails.Telephone__c;
        vm.telephone = vm.getPhoneNumberForView(vm.telephoneNo);
      }
      if (sharedValues.investorBank) {

        vm.bankAccount = sharedValues.investorBank;
        vm.bankAccount=vm.getBankAccountNumber(vm.bankAccount);
        vm.bankAccount = '****.**.' + vm.bankAccount.substring(8, 13);
      }


      if (sharedValues.investorDetails.What_is_the_purpose_of_the_savings__c) {
        if (sharedValues.investorDetails.What_is_the_purpose_of_the_savings__c == 'Return on capital') {
          vm.purpose_of_the_savings = 'Avkastning';
        } else if (sharedValues.investorDetails.What_is_the_purpose_of_the_savings__c == 'Risk diversification') {
          vm.purpose_of_the_savings = 'Risikospredning';
        } else if (sharedValues.investorDetails.What_is_the_purpose_of_the_savings__c == 'Help small businesses') {
          vm.purpose_of_the_savings = 'Hjelpe små og mellomstore bedrifter';
        } else {
          vm.purpose_of_the_savings = 'Annet';
        }
      }

      vm.profileForm = {
        firstName: sharedValues.investorDetails.peer__First_Name__c,
        lastName: sharedValues.investorDetails.peer__Last_Name__c,
        email: sharedValues.investorDetails.cnotify__Email__c,
        address: sharedValues.investorDetails.BillingStreet,
        postalCode: sharedValues.investorDetails.BillingPostalCode,
        postalPlace: sharedValues.investorDetails.BillingCity,
        country: sharedValues.investorDetails.BillingCountry,
        phone: sharedValues.investorDetails.Telephone__c,
        personalIDNumber: sharedValues.investorDetails.Personal_ID_number__c,
        bankkonto: sharedValues.investorBank,
        purposeForInvesting: sharedValues.investorDetails.What_is_the_purpose_of_the_savings__c,
        passwordLastchangedOn: sharedValues.investorDetails.Password_Last_Changed_on__c
      };
      sharedValues.profileForm = vm.profileForm;
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
  name: 'myProfileCtrl',
  fn: myProfileCtrl
};
