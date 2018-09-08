function loginCtrl(utilService, sharedValues, $rootScope, LoginService, popUpService, $scope, navigationHandlerService) {
  'ngInject';
  // ViewModel
  const vm = this;
  //Initialized the variables
  vm.initializer = function() {
    try {
      vm.form = {
        ApplicantEmail: '',
        ApplicantPassword: ''
      };
      vm.submitted = false;
      vm.bidParts = [];
      vm.loanParts = [];
      vm.reelle=false;
      vm.multiple=false;
    } catch (err) {
      console.error(err);
    }
  }

  vm.init = function() {
    try {
      vm.initializer();
      $scope.util = utilService;
      $scope.util.noRootScopeScenario();
    } catch (err) {
      console.error(err);
    }

  }
  //Method to log the user in
  vm.login = function() {
    try {
      vm.submitted = true;
     
      //Calling the Login API
      var promise = LoginService.userLogin(vm.form);
      promise.then(function(answer) {
       
   
          $rootScope.accessToken = answer.data.token;
          if ($rootScope.accessToken) {
            $scope.util.cookiesSet('token', $rootScope.accessToken);
            var dataLoginParse = JSON.parse(answer.data.data);
            //Setting the Cookies for Account ID
            var cookies = {};

            if (dataLoginParse.accountID) {
              cookies.accountID = dataLoginParse.accountID;
              sharedValues.userInfo.accountID = dataLoginParse.accountID;
            }
            //Setting the Cookies for Type Of Applicant
            if (dataLoginParse.typeOfApplicant) {
              vm.typeOfApplicant = dataLoginParse.typeOfApplicant;
              cookies.typeOfApplicant = vm.typeOfApplicant;
              sharedValues.userInfo.typeOfApplicant = dataLoginParse.typeOfApplicant;
            }
            //Setting the Cookies for Account Email
            if (dataLoginParse.accountEmail) {
              cookies.accountEmail = dataLoginParse.accountEmail;
              sharedValues.userInfo.accountEmail = dataLoginParse.accountEmail;
            }
            //Setting the Cookies for FirstTime Applicant
            if (dataLoginParse.firstTimeApplicant != null) {
              
              vm.firstTimeApplicant = dataLoginParse.firstTimeApplicant;
              cookies.firstTimeApplicant = vm.firstTimeApplicant;
              sharedValues.userInfo.firstTimeApplicant = dataLoginParse.firstTimeApplicant;
            }
            //Setting the Cookies for Send Agreement
            if (dataLoginParse.SendAgreement != null) {
              vm.sendAgreement = dataLoginParse.SendAgreement;
              cookies.sendAgreement = vm.sendAgreement;
              sharedValues.userInfo.sendAgreement = dataLoginParse.SendAgreement;
            }
            //Setting the Cookies for Type Of Innvestor
            if (dataLoginParse.typeOfInvestor != null) {
              vm.typeOfInvestor = dataLoginParse.typeOfInvestor;
              cookies.typeOfInvestor = vm.typeOfInvestor;
              sharedValues.userInfo.typeOfInvestor = dataLoginParse.typeOfInvestor;
            }

            //Setting the cookies for reelle
            if (dataLoginParse.reelle==false || dataLoginParse.reelle==true) {
              vm.reelle = dataLoginParse.reelle;
              cookies.reelle = vm.reelle
              sharedValues.userInfo.reelle = dataLoginParse.reelle;
            }
            //Setting the cookies for reelle
            if (dataLoginParse.multiple==false || dataLoginParse.multiple==true) {
              vm.multiple = dataLoginParse.multiple;
              cookies.multiple = vm.multiple;
              sharedValues.userInfo.multiple = dataLoginParse.multiple;
            }

            // Checking the status of Login API
            if (dataLoginParse.status == 'Success') {
              $scope.util.cookiesSet('userInfo', JSON.stringify(cookies));
              $rootScope.$broadcast('getDetailsOfUser');
            }

          } else {
            vm.submitted = false;
            //Popup for Unverified Email
            if (answer.data.errorMessage == 'Please authenticate your email first') {
              popUpService.popUpShow('Brukerkontoen er ikke verifisert', 'Vennligst verifiser e-postadressen din.');
            }
            //Popup for Incorrect Password
            else if (answer.data.errorMessage == 'Incorrect password') {
              popUpService.popUpShow('Beklager!', 'Passordet du har oppgitt er ikke korrekt.');
            }
            //Popup for unregisterd Email
            else if (answer.data.errorMessage == 'You are not already registered. Please register first.') {
              popUpService.popUpShow('Ikke registrert', 'E-postadressen du har oppgitt er ikke registrert. Vennligst registrer deg først.');
              navigationHandlerService.stateChange('signUp');

            }
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
  //Method called when the forgot password link is clicked
  vm.forgotPasswordMailSend = function() {
    try {
      vm.email = {
        emailID: vm.form.ApplicantEmail
      };
      if (vm.form.ApplicantEmail) {
        //Forgot Password API Called
        var promise = LoginService.forgotPasswordEmailVerify(vm.email);
        promise.then(function(answer) {
            var forgotPasswordMailSend = answer.data;
            forgotPasswordMailSend = JSON.parse(forgotPasswordMailSend);
            forgotPasswordMailSend = JSON.parse(forgotPasswordMailSend);
            //Popup for reset Password Email sent Notification
            if (forgotPasswordMailSend.Response != 'No Account found') {
              popUpService.popUpShow('Vennligst sjekk e-posten din', 'En lenke har blitt sendt til  ' + vm.email.emailID + '. Trykk på lenken for å bytte passord.');
              navigationHandlerService.stateChange('login');
            }
            //Popup for Invalid Email
            else {
              popUpService.popUpShow('Beklager!', 'Brukerkonto ikke funnet. Vennligst registrer deg først.');
            }

          },
          function(reason) {
            console.error(reason);
          }
        );
      } else {
        popUpService.popUpShow('Beklager!', 'Vennligst oppgi en gyldig e-postadresse.');
      }
    } catch (err) {
      console.error(err);
    }

  }
  //Validations for the Login Button
  vm.disableLogin = function() {
    try {
      if (vm.form.ApplicantEmail && vm.form.ApplicantPassword) {
        return false;
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
  name: 'loginCtrl',
  fn: loginCtrl
};
