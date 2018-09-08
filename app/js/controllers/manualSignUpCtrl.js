function manualSignUpCtrl(sharedValues, navigationHandlerService, utilService,$rootScope) {
  'ngInject';

  const vm = this;

  //This function is called when the page is loaded

  vm.init = function() {
    try {
      vm.backButtonDisable();
     
    } catch (e) {
      console.error(e);
    }
  }

  
  //This function does not allow the user to return back to previous page

  vm.backButtonDisable = function() {
    try {
      if ($rootScope.accessToken) {
        navigationHandlerService.stateChange('manualSignUp');

      }
    } catch (e) {
      console.error(e);
    }
  }


  vm.init();

  $rootScope.$on('loginSF', function() {
    vm.init();
  });
}

export default {
  name: 'manualSignUpCtrl',
  fn: manualSignUpCtrl
};
