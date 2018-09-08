function signUpAsInvestorCompany3Ctrl($window, utilService, FpConstants, sharedValues, $cookies, signUpInvestorPrivateService, $state, investorSummaryService, $rootScope, navigationHandlerService,popUpService) {
  'ngInject';

  // ViewModel
  const vm = this;

  //This function is called on the loading of the page

  vm.init = function() {
    try {
      utilService.backButtonDisable();
      vm.initialize();
    } catch (e) {
      console.error(e);
    }
  }

  //This function is used to initialize the variables used in the controller

  vm.initialize = function() {
    try {
      vm.allCountries = FpConstants.AllCountries;
      vm.form = {
        monthlySalaryORRevenue: '',
        transferringAmtAtOpening: '',
        How_often_do_you_want_to_deposit: '',
        deposit_per_year: '',
        withdrawal_frequency: '',
        doNotOwnTheMoney: ''
      };

      vm.bankIdValidationForm = {
        accountID: ''
      }

      vm.finalForm = {
        accountID: '',
        companyName: '',
        companyOrgNumber: '',
        firstName: '',
        lastName: '',
        SignerEmail: '',
        address: '',
        addressLine2: '',
        postalCode: '',
        postalLocation: '',
        country: '',
        telephone: '',
        personalIDNumber: '',
        AreMultiple: '',
        reelle: '',
        bankAccountNumber: '',
        How_often_do_you_want_to_invest: '',
        What_investment_horizon: '',
        purpose: '',
        WhereDoesTheMoneyComesFrom: '',
        USCitizen: '',
        politicallyExposed: '',
        Nationality: '',
        monthlySalaryORRevenue: '',
        transferringAmtAtOpening: '',
        How_often_do_you_want_to_deposit: '',
        deposit_per_year: '',
        withdrawal_frequency: '',
        doNotOwnTheMoney: '',
        myProfile: false
      }

      vm.disableButton = false;
    } catch (e) {
      console.error(e);
    }
  }

  //This function onboards the lender

  vm.continue = function() {
    try {
      vm.accountID = utilService.setAccountId();
      sharedValues.investorCompanyForm3 = vm.form;
      vm.finalForm = {
        accountID: vm.accountID,
        companyName: sharedValues.investorCompanyForm1.companyName,
        companyOrgNumber: sharedValues.investorCompanyForm1.companyOrgNumber,
        firstName: sharedValues.investorCompanyForm1.firstName,
        lastName: sharedValues.investorCompanyForm1.lastName,
        SignerEmail: sharedValues.investorCompanyForm1.SignerEmail,
        address: sharedValues.investorCompanyForm1.address,
        addressLine2: sharedValues.investorCompanyForm1.addressLine2,
        postalCode: sharedValues.investorCompanyForm1.postalCode,
        postalLocation: sharedValues.investorCompanyForm1.postalLocation,
        country: sharedValues.investorCompanyForm1.country,
        telephone: sharedValues.investorCompanyForm1.telephone,
        personalIDNumber: sharedValues.investorCompanyForm1.personalIDNumber,
        AreMultiple: sharedValues.investorCompanyForm1.AreMultiple,
        reelle: sharedValues.investorCompanyForm1.reelle,
        bankAccountNumber: sharedValues.investorCompanyForm1.bankAccountNumber,
        How_often_do_you_want_to_invest: sharedValues.investorCompanyForm2.How_often_do_you_want_to_invest,
        What_investment_horizon: sharedValues.investorCompanyForm2.What_investment_horizon,
        purpose: sharedValues.investorCompanyForm2.purpose,
        WhereDoesTheMoneyComesFrom: sharedValues.investorCompanyForm2.WhereDoesTheMoneyComesFrom,
        USCitizen: sharedValues.investorCompanyForm2.USCitizen,
        politicallyExposed: sharedValues.investorCompanyForm2.politicallyExposed,
        Nationality: sharedValues.investorCompanyForm1.Nationality,
        monthlySalaryORRevenue: sharedValues.investorCompanyForm3.monthlySalaryORRevenue,
        transferringAmtAtOpening: sharedValues.investorCompanyForm3.transferringAmtAtOpening,
        How_often_do_you_want_to_deposit: sharedValues.investorCompanyForm3.How_often_do_you_want_to_deposit,
        deposit_per_year: sharedValues.investorCompanyForm3.deposit_per_year,
        withdrawal_frequency: sharedValues.investorCompanyForm3.withdrawal_frequency,
        doNotOwnTheMoney: sharedValues.investorCompanyForm3.doNotOwnTheMoney,
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

  //This function disables the button upon invalid input from the user

  vm.disableContinue = function() {
    try {
      vm.disableButton = utilService.disableButton(vm.form);
      return vm.disableButton;
    } catch (e) {
      console.error(e);
    }
  }

  //This function initiates bank ID validation of the onboarding investor

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
  name: 'signUpAsInvestorCompany3Ctrl',
  fn: signUpAsInvestorCompany3Ctrl
};
