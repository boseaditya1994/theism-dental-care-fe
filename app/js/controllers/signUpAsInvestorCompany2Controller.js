function signUpAsInvestorCompany2Ctrl(sharedValues, navigationHandlerService, utilService,$rootScope) {
  'ngInject';

  const vm = this;

  //This function is called when the page is loaded

  vm.init = function() {
    try {
      vm.backButtonDisable();
      vm.initialize();
    } catch (e) {
      console.error(e);
    }
  }

  //This function initialises the variables to be used in this controller

  vm.initialize = function() {
    try {
      vm.form = {
        How_often_do_you_want_to_invest: '',
        What_investment_horizon: '',
        purpose: '',
        WhereDoesTheMoneyComesFrom: '',
        USCitizen: '',
        politicallyExposed: ''
      };
      vm.disableButton = false;
    } catch (e) {
      console.error(e);
    }
  }

  //This function allows the user to procees further with the form

  vm.continue = function() {
    try {
      sharedValues.investorCompanyForm2 = vm.form;
      navigationHandlerService.stateChange('signUpAsInvestorCompany3');
    } catch (e) {
      console.error(e);
    }
  }

  //This function disables the button on invalid input from the user

  vm.disableContinue = function() {
    try {
      vm.disableButton = utilService.disableButton(vm.form);
      return vm.disableButton;
    } catch (e) {
      console.error(e);
    }
  }

   //This function does not allow the user to return back to previous page

  vm.backButtonDisable = function() {
    try {
      if ($rootScope.accessToken && Object.keys(sharedValues.investorCompanyForm2).length > 0) {
        navigationHandlerService.stateChange('signUpAsInvestorCompany3');
      }
    } catch (e) {
      console.error(e);
    }
  }

  vm.init();
}

export default {
  name: 'signUpAsInvestorCompany2Ctrl',
  fn: signUpAsInvestorCompany2Ctrl
};
