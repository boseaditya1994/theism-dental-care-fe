function signUpAsABorrowerCtrl(signUpAsABorrowerService, $state, popUpService, navigationHandlerService) {
  'ngInject';
  // ViewModel

  const vm = this;


  vm.init = function() {
    try {
      vm.initializer();
    } catch (err) {
      console.error(err);
    }
  }
  //Initializes all variables
  vm.initializer = function() {
    try {
      vm.applicationForm = {
        applicantEmail: '',
        applicantPassword: '',
        applicantType: 'Borrower',
        typeOfInvestor: ''
      }
      vm.confirmPassword = '';
    } catch (err) {
      console.error(err);
    }

  }

  //Signup for borrower
  vm.signUp = function() {
    try {
      //Signup for Borrower API call
      var promise = signUpAsABorrowerService.signUp(vm.applicationForm);
      promise.then(function(answer) {
          var dataSignUpParse = JSON.parse(answer.data);
          var dataSignUpParse = JSON.parse(dataSignUpParse);
          //Popup for successful Signup
          if (dataSignUpParse.Response != 'Seems like you are already registered') {
            popUpService.popUpShow('Registrering vellykket', '<p>En lenke har blitt sendt til  ' + vm.applicationForm.applicantEmail + '.<br>Vennligst klikk på lenken for å verifisere kontoen din. Dersom du ikke har mottatt en e-post, sjekk spamfilteret før du tar kontakt med kontakt@fundingpartner.no.</p>');
            navigationHandlerService.stateChange('login');
          }
          //Popup for already registed email
          else if (dataSignUpParse.Response == 'Seems like you are already registered') {
            popUpService.popUpShow('Allerede registrert', '<p>Du er allerede registrert.<br>Vennligst logg inn for å fortsette.</p>');
            navigationHandlerService.stateChange('login');
          }
          //Something went wrong popup
          else {
            popUpService.popUpShow('Beklager!', 'Noe gikk galt.');
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
  }
  //Validation for Signup Button
  vm.disableSignUp = function() {
    try {
      if (vm.applicationForm.applicantEmail && vm.applicationForm.applicantPassword && vm.applicationForm.applicantType && vm.confirmPassword) {
        if (vm.applicationForm.applicantPassword == vm.confirmPassword) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    } catch (err) {
      console.error(err);
    }

  }
  vm.init();
}

export default {
  name: 'signUpAsABorrowerCtrl',
  fn: signUpAsABorrowerCtrl

};
