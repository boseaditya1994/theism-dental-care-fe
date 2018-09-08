function signUpAsInvestorPrivate3Ctrl($window, utilService,popUpService, FpConstants, sharedValues, signUpInvestorPrivateService) {
  'ngInject';

  // ViewModel
  const vm = this;

  //This function is called at the loading of the page

  vm.init = function() {
    try {
      utilService.backButtonDisable();
      vm.initialize();
    } catch (e) {
      console.error(e);
    }
  }

  //This function initializes all the variables to be used in this controller

  vm.initialize = function() {
    try {
      vm.allCountries = FpConstants.AllCountries;
      vm.disableButton = false;
      vm.form = {
        Nationality: 'Norway',
        Occupation: '',
        monthlySalaryORRevenue: '',
        transferringAmtAtOpening: '',
        How_often_do_you_want_to_deposit: '',
        deposit_per_year: '',
        withdrawal_frequency: '',
        doNotOwnTheMoney: '',
        myProfile: false
      };

      vm.finalForm = {
        accountID: '',
        firstName: '',
        lastName: '',
        address: '',
        addressLine2: '',
        postalCode: '',
        postalLocation: '',
        country: '',
        telephone: '',
        personalIDNumber: '',
        bankAccountNumber: '',
        How_often_do_you_want_to_invest: '',
        What_investment_horizon: '',
        purpose: '',
        WhereDoesTheMoneyComesFrom: '',
        USCitizen: '',
        politicallyExposed: '',
        Nationality: 'Norway',
        Occupation: '',
        monthlySalaryORRevenue: '',
        transferringAmtAtOpening: '',
        How_often_do_you_want_to_deposit: '',
        deposit_per_year: '',
        withdrawal_frequency: '',
        doNotOwnTheMoney: '',
        myProfile: false
      }

      vm.accountID = '';

      vm.bankIdValidationForm = {
        accountID: ''
      };
    } catch (e) {
      console.error(e);
    }
  }

  // This function allows the user to continue with the registration process

  vm.continue = function() {
    try {
      vm.accountID = utilService.setAccountId();
      sharedValues.investorPrivateForm3 = vm.form;
      vm.finalForm = {
        accountID: vm.accountID,
        firstName: sharedValues.investorPrivateForm1.firstName,
        lastName: sharedValues.investorPrivateForm1.lastName,
        address: sharedValues.investorPrivateForm1.address,
        addressLine2: sharedValues.investorPrivateForm1.addressLine2,
        postalCode: sharedValues.investorPrivateForm1.postalCode,
        postalLocation: sharedValues.investorPrivateForm1.postalLocation,
        country: sharedValues.investorPrivateForm1.country,
        telephone: sharedValues.investorPrivateForm1.telephone,
        personalIDNumber: sharedValues.investorPrivateForm1.personalIDNumber,
        bankAccountNumber: sharedValues.investorPrivateForm1.bankAccountNumber,
        How_often_do_you_want_to_invest: sharedValues.investorPrivateForm2.How_often_do_you_want_to_invest,
        What_investment_horizon: sharedValues.investorPrivateForm2.What_investment_horizon,
        purpose: sharedValues.investorPrivateForm2.purpose,
        WhereDoesTheMoneyComesFrom: sharedValues.investorPrivateForm2.WhereDoesTheMoneyComesFrom,
        USCitizen: sharedValues.investorPrivateForm2.USCitizen,
        politicallyExposed: sharedValues.investorPrivateForm2.politicallyExposed,
        Nationality: sharedValues.investorPrivateForm3.Nationality,
        Occupation: sharedValues.investorPrivateForm3.Occupation,
        monthlySalaryORRevenue: sharedValues.investorPrivateForm3.monthlySalaryORRevenue,
        transferringAmtAtOpening: sharedValues.investorPrivateForm3.transferringAmtAtOpening,
        How_often_do_you_want_to_deposit: sharedValues.investorPrivateForm3.How_often_do_you_want_to_deposit,
        deposit_per_year: sharedValues.investorPrivateForm3.deposit_per_year,
        withdrawal_frequency: sharedValues.investorPrivateForm3.withdrawal_frequency,
        doNotOwnTheMoney: sharedValues.investorPrivateForm3.doNotOwnTheMoney,
        myProfile: false
      }
      var promise = signUpInvestorPrivateService.continue(vm.finalForm)
      promise.then(function(answer) {
        if(answer.data.message=='Failed to authenticate token.'){
         
             $rootScope.$broadcast('logOutUser');
          }
          else{
        sharedValues.userInfo.firstTimeApplicant = true;
        utilService.cookiesSet('userInfo', JSON.stringify(sharedValues.userInfo));
        vm.bankIdValidation();
      }
        },
        function(reason) {
          var err = reason;
           $rootScope.$broadcast('logOutUser');
          console.error(err);
        });
      return promise;
    } catch (e) {
      console.error(e);
    }
  }

  // This function disables the continue button if user gives invalid input

  vm.disableContinue = function() {
    try {
      vm.disableButton = utilService.disableButton(vm.form);
      return vm.disableButton;
    } catch (e) {
      console.error(e);
    }
  }

  //This function validates the Bank Account of the user

  vm.bankIdValidation = function() {
    try {
      vm.bankIdValidationForm.accountID = utilService.setAccountId();
      var promise = signUpInvestorPrivateService.bankIdValidation(vm.bankIdValidationForm);
      promise.then(function(answer) {
        if(answer.data.message=='Failed to authenticate token.'){
         
             $rootScope.$broadcast('logOutUser');
          }
        else if(answer.data.Response=='An error has occurred. Please contact admin'){
           popUpService.popUpShow('Beklager!', 'En feil har oppstått. Ta kontakt med FundingPartner.'); 
        }
        else{
          var bankIdValidationLink = answer.data.Response;
          $window.open(bankIdValidationLink, '_self');
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
  name: 'signUpAsInvestorPrivate3Ctrl',
  fn: signUpAsInvestorPrivate3Ctrl
};
