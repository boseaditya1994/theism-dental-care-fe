function emailVerificationCtrl($stateParams, signUpService, popUpService, $rootScope, navigationHandlerService) {
  'ngInject';
  const vm = this;

  //This function is called on loading of the page

  vm.init = function() {
    try {
      vm.initialize();

      vm.form.verificationCode = $stateParams.id;
      var promise = signUpService.emailVerification(vm.form);
      promise.then(function(answer) {

          if (answer && answer.data.status == 'Success') {
            if (answer.data.type == 'Investor') {
              popUpService.popUpShow('E-postadresse verifisert', '<p>E-postadressen din har blitt verifisert.<br> Logg inn for å se dine investeringsmuligheter.</p>');
              navigationHandlerService.stateChange('login');
            } else {
              popUpService.popUpShow('E-postadresse verifisert', '<p>E-postadressen din har blitt verifisert.<br> Logg inn for muligheten til å søke lån.</p>');
              navigationHandlerService.stateChange('login');
            }
          } else {

            popUpService.popUpShow('Beklager!', 'Noe gikk galt.');
          }
        },
        function(reason) {
          console.error(reason);
        }
      );

    } catch (e) {
      console.error(e);
    }
  }

  //This function initializes all the variables to be used in this controller

  vm.initialize = function() {
    try {
      vm.form = {
        verificationCode: ''
      }
    } catch (e) {
      console.error(e);
    }
  }
  vm.init();
}



export default {
  name: 'emailVerificationCtrl',
  fn: emailVerificationCtrl
};
