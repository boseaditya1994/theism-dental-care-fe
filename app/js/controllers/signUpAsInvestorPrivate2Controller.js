function signUpAsInvestorPrivate2Ctrl($cookies, $state, navigationHandlerService, sharedValues, utilService, $rootScope) {
  'ngInject';
  const vm = this;

  /*This function is called at the loading of a page*/

  vm.init = function() {
    try {
      vm.initialize();
      vm.backButtonDisable();
    } catch (e) {
      console.error(e);
    }
  }

  /*This function initialises all the variables used in this controller*/

  vm.initialize = function() {
    try {
      vm.form = {
        How_often_do_you_want_to_invest: '',
        What_investment_horizon: '',
        purpose: '',
        WhereDoesTheMoneyComesFrom: '',
        USCitizen: '',
        politicallyExposed: ''
      }
      vm.disableButton = false;
      sharedValues.fromState = $state.current.name;
    } catch (e) {
      console.error(e);
    }
  }

  /*This function is called when the user submits the form*/

  vm.continue = function() {
    try {
      sharedValues.investorPrivateForm2 = vm.form;
      navigationHandlerService.stateChange('signUpAsInvestorPrivate3');
    } catch (e) {
      console.error(e);
    }
  }

  /*This function disables the button on invalid input from the user*/

  vm.disableContinue = function() {
    try {
      vm.disableButton = utilService.disableButton(vm.form);
      return vm.disableButton;
    } catch (e) {
      console.error(e);
    }
  }

  //This function does not allow users to travel to the 1st page

  vm.backButtonDisable = function() {
    try {
      if ($rootScope.accessToken && Object.keys(sharedValues.investorPrivateForm2).length > 0) {
        navigationHandlerService.stateChange('signUpAsInvestorPrivate3');
      }
    } catch (e) {
      console.error(e);
    }
  }

  vm.init();

}

export default {
  name: 'signUpAsInvestorPrivate2Ctrl',
  fn: signUpAsInvestorPrivate2Ctrl
};
