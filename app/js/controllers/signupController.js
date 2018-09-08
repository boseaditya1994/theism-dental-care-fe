function signupController(signUpService, popUpService, utilService, navigationHandlerService) {
  'ngInject'
  const vm = this;
  /*This function initialises all the variables used in this controller*/
  vm.init = function() {
    try {
      vm.applicationForm = {
        applicantEmail: '',
        applicantPassword: '',
        applicantType: 'Investor',
        typeOfInvestor: ''
      }
      vm.confirmPassword = '';
      vm.buttonDisable = true;
    } catch (err) {
      console.error(err);
    }
  }


  /*This function is called when the user submits the form to signup */
  vm.signUp = function() {
    try {
      var promise = signUpService.signUp(vm.applicationForm);
      promise.then(function(answer) {
          var dataSignUpParse = JSON.parse(answer.data);
          var dataSignUpParse = JSON.parse(dataSignUpParse);
          if (dataSignUpParse.Response == 'Success') {
            popUpService.popUpShow('Registrering vellykket', '<p>En lenke har blitt sendt til ' + vm.applicationForm.applicantEmail + '.<br> Vennligst klikk på lenken for å verifisere kontoen din. Dersom du ikke har mottatt en e-post, sjekk spamfilteret før du tar kontakt med kontakt@fundingpartner.no.</p>');
            navigationHandlerService.stateChange('login');
          } else if (dataSignUpParse.Response == 'Seems like you are already registered') {
            popUpService.popUpShow('Allerede registrert', '<p>Du er allerede registrert.<br> Vennligst logg inn for å fortsette.</p>');
            navigationHandlerService.stateChange('login');
          } else {
            popUpService.popUpShow('Beklager!', 'Noe gikk galt.');
          }
        },
        function(reason) {
          console.error(reason);
        });
      return promise;
    } catch (err) {
      console.error(err);
    }
  }

  /*This function disables the button on invalid input from the user*/
  vm.disableSignUp = function() {
    try {
      vm.buttonDisable = utilService.disableButtonWithConfirmPsw(vm.applicationForm, vm.confirmPassword);
      return vm.buttonDisable;
    } catch (err) {
      console.error(err);
    }
  }

  vm.init();
}

export default {
  name: 'signupController',
  fn: signupController
};
