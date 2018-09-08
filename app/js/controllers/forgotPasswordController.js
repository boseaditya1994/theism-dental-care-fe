function forgotPasswordCtrl($stateParams, forgotPasswordService, navigationHandlerService, popUpService) {
  'ngInject';
  const vm = this;


  vm.init = function() {
    try {
      vm.initializer();
    } catch (err) {
      console.error(err);
    }
  }
  //Method to initialize all the variables
  vm.initializer = function() {
    try {
      vm.form = {
        verificationCode: '',
        newPassword: ''
      };
      vm.confirmPassword = '';
    } catch (err) {
      console.error(err);
    }

  }

  //ResetPassword API called with the user input new password
  vm.resetPassword = function() {
    try {
      vm.form.verificationCode = $stateParams.id;
      var promise = forgotPasswordService.forgotPassword(vm.form);
      promise.then(function(answer) {
          var resetPassword = answer.data;
          resetPassword = JSON.parse(resetPassword);
          resetPassword = JSON.parse(resetPassword);
          //Reset Password success Popup
          if (resetPassword.Response == 'You have successfully chaged the password.') {
            popUpService.popUpShow('Tilbakestill passord', 'Endring av passord vellykket. Vennligst logg inn for å fortsette.');
            navigationHandlerService.stateChange('login');
          } 
          //Popup for Invalid verification code
          else if(resetPassword.Response == 'Invalid verification code.'){
                  popUpService.popUpShow('Beklager!', 'Verifiseringskoden er ugyldig.');
          }

          else {
            //Popup for same old and new Passwords
            popUpService.popUpShow('Beklager!', 'Gammelt og nytt passord er det samme. Vennligst skriv inn et annet passord.');
          }
        },
        function(reason) {
          console.error(reason);
        }
      );
    } catch (err) {
      console.error(err);
    }


  }
  //Validation of the reset password button
  vm.disable = function() {

    try {
      if (vm.form.newPassword && vm.confirmPassword) {
        if (vm.form.newPassword == vm.confirmPassword) {
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
  name: 'forgotPasswordCtrl',
  fn: forgotPasswordCtrl
};
