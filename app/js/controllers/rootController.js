function rootController(AppSettings,$cookies,$scope, $state, sharedValues, LoginService, $rootScope, $stateParams,navigationHandlerService, popUpService, changePasswordService, investorSummaryService, $timeout, $window, $location, utilService,userService) {
  'ngInject';
  // ViewModel
  const vm = this;
  //Init Method
  vm.init = function() {
    try {
      $scope.util = utilService;
      vm.initialize();
      if(utilService.cookiesGet('userInfo') && utilService.cookiesGet('userInfo').length>0){
        sharedValues.setUserInfo(JSON.parse(utilService.cookiesGet('userInfo')));
      }
      userService.getApplicantTypeAndEmail();
      vm.loginSF();
      vm.linkSet();
      
    } catch (err) {
      console.error(err);
    }

  }
  //Initialises all the local variables
  vm.initialize = function() {
    try {

      vm.user = null;
      vm.accountID = '';
      vm.oldPassword = '';
      vm.newPassword = '';
      vm.hideDashboardButtonFlag = true;
      $rootScope.hideDashboardButtonFlag = true;
      vm.repeatNewPassword = '';
      vm.investorDetails = {};
      vm.submitted = false;
      vm.value = false;
      userService.isTransferOut = false;
      vm.bankIdSuccess = false;
      vm.isInvest = false;
      vm.fundingPartner='';
      vm.contactUs='';
      vm.aboutUs='';
      vm.howItWorks='';
      vm.isChartVisible=false;
    } catch (err) {
      console.error(err);
    }

  }

 
  //Navigates to borrower Dashboard
  vm.goToBorrowerDashboard = function() {
    navigationHandlerService.stateChange('borrowerDashboard.appliedLoans');
  }


  //Navigation on the basis of first time applicant
  vm.applyLoan = function() {
    try {
      $rootScope.firstTimeApplicant = sharedValues.userInfo.firstTimeApplicant;

      if ($rootScope.firstTimeApplicant == false) {
        navigationHandlerService.stateChange('requestLoadFirstTime');
      } else
        navigationHandlerService.stateChange('requestLoanSecondTime');
    } catch (err) {
      console.error(err);
    }


  }


  //LOGIN SF
  vm.loginSF = function() {
    try {


      var login = LoginService.apiLogin();
      login.then(function(answer) {
        if (answer.status == 200 && (answer.data == 'Already Logged In' || answer.data == 'Login Successful')) {
          sharedValues.status = answer.data;
          
          $rootScope.accessToken = $scope.util.cookiesGet('token');
          $rootScope.$broadcast('loginSF');
          if (!String.prototype.endsWith) {
            String.prototype.endsWith = function(searchString, position) {
              var subjectString = this.toString();
              if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
                position = subjectString.length;
              }
              position -= searchString.length;
              var lastIndex = subjectString.indexOf(searchString, position);
              return lastIndex !== -1 && lastIndex === position;
            };
          }
          var url = window.location.href;
          if ($rootScope.accessToken) {
            userService.detailsOfUser();

          } else {
            if ($stateParams.id)
              var id = $stateParams.id;
            if (url.endsWith('/signUpAsAnInvestor')) {
              navigationHandlerService.stateChange('signUp');
            } else if (url.endsWith('/signUpAsABorrower')) {
              navigationHandlerService.stateChange('signUpAsABorrower');
            } else if (url.endsWith('/verifyEmail/token/:id')) {
              navigationHandlerService.stateChange('verifyEmail');

            } else if (url.endsWith('/forgotPassword/token/' + id)) {
              navigationHandlerService.stateChange('forgotPasswordEmail');

            } else {
              navigationHandlerService.stateChange('login');

            }

          }
        } else {
          popUpService.popUpShow('Beklager!', 'Noe gikk galt.');
        }

      });
    } catch (err) {
      console.error(err);
    }

  }

  //This function shows the modal where a user can change his/her password

  vm.changePassword = function() {
    try {
      popUpService.showChangePassword();

    } catch (err) {
      console.error(err);
    }

  }

  //This function saves the changes when a user has changed his/her password

  vm.changePasswordSave = function() {
    try {

      if (sharedValues.userInfo.accountID != '') {
        vm.accountId = sharedValues.userInfo.accountID;
      }
      vm.form = {
        accountID: vm.accountId,
        oldPassword: vm.oldPassword,
        newPassword: vm.newPassword
      }
      var promise = changePasswordService.save(vm.form)
      promise.then(function(answer) {

       if(answer.data.message=='Failed to authenticate token.'){
         $('#changePassword').modal('hide');
             $rootScope.$broadcast('logOutUser');
          }
          else{
          var changePasswordData = answer.data;
          changePasswordData = JSON.parse(changePasswordData);
          changePasswordData = JSON.parse(changePasswordData);
          if (changePasswordData.Response == 'You have successfully changed the password.') {

            popUpService.hideChangePassword();
            popUpService.popUpShow('Vellykket', 'Endring av passord vellykket. Vennligst logg inn for å fortsette.');
            vm.submitted = true;
            vm.resetAll();
            navigationHandlerService.stateChange('login');
          } else {
            popUpService.hideChangePassword();
            popUpService.popUpShow('Beklager!', 'Vennligst oppgi riktig gammelt passord.');
            vm.oldPassword = '';
            vm.newPassword = '';
            vm.repeatNewPassword = '';
          }

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

  };
  //Called in case of logout to reset all datas and cookies
  vm.resetAll = function() {
    try {
      vm.oldPassword = '';
      vm.newPassword = '';
      vm.repeatNewPassword = '';
      sharedValues.status = null;
      sharedValues.investorBank = null;
      sharedValues.appliedLoans = [];
      sharedValues.availableFunds = null;
      vm.hideDashboardButtonFlag = true;
      $rootScope.hideDashboardButtonFlag = true;
      sharedValues.firstTimeApplicantAfterLogin = null;
      sharedValues.headerName = null;
      sharedValues.noOfLoan = null;
      sharedValues.accountNumber = null;
      sharedValues.investorPrivateForm1 = {};
      sharedValues.investorPrivateForm2 = {};
      sharedValues.investorPrivateForm3 = {};
      sharedValues.investorCompanyForm1 = {};
      sharedValues.investorCompanyForm2 = {};
      sharedValues.investorCompanyForm3 = {};
      sharedValues.userInfo = {};
      sharedValues.profileForm = {};
      sharedValues.investorDetails = {};
      sharedValues.companyBankDetails = {};
      sharedValues.bidParts = [];
      sharedValues.loanParts = [];
      sharedValues.investorTrustAccount = [];
      sharedValues.loanAmount = [];
      sharedValues.details = {};
      $scope.util.cookiesRemove('token');
      $scope.util.cookiesRemove('userInfo');
      $rootScope.typeOfApplicant = null;
      $rootScope.accessToken = null;
      $rootScope.firstTimeApplicant = null;
      $rootScope.accountEmail = null;
      $rootScope.availableFunds = null;
      $rootScope.firstTimeApplicantAfterLogin = null;
      $rootScope.headerName = null;
      $rootScope.noOfLoan = null;
      $rootScope.sendAgreement = null;
      $rootScope.accountNumber = null;
      $rootScope.amount=null;
      $rootScope.userDetailsPopulated = null;
      $rootScope.reelle = false;
      $rootScope.multiple = false;
      $rootScope.sendAgreement = false;

    } catch (err) {
      console.error(err);
    }


  }

  //GOTO my profile
  vm.myProfile = function() {
    try {
      navigationHandlerService.stateChange('myProfile');

    } catch (err) {
      console.error(err);
    }

  }


  //LOgout method
  vm.logout = function() {
    try {

if (sharedValues.userInfo.accountID != '') {
        vm.accountId = sharedValues.userInfo.accountID;
      }
      var params = vm.accountId;
      var promise = LoginService.logoutTimestamp(params);
      promise.then(function(answer) {
       
      },
        function(reason) {
          console.error(reason);
        });
     
      vm.resetAll();
      navigationHandlerService.stateChange('login');
    } catch (err) {
      console.error(err);
    }
  }
   
  //Navigates to the dashboard
  vm.goToDashboardFromSucces = function() {
    try {
      navigationHandlerService.stateChange('borrowerDashboard.appliedLoans');
      location.reload();

    } catch (err) {
      console.error(err);
    }


  }

  //Cancel change password
  vm.changePasswordCancel = function() {
    try {

      vm.oldPassword = '';
      vm.newPassword = '';
      vm.repeatNewPassword = '';
    } catch (err) {
      console.error(err);
    }

  }
  //Header for user
  vm.topMenuShow = function() {
    try {
      if ($rootScope.typeOfApplicant == 'Investor' && sharedValues.details.data.investorDetails[0].peer__Sign_Agreement__c) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      //console.error(err);
      return false;
    }
  }

  //This function sets all the links used in this portal

  vm.linkSet=function()
  {
    try{
      vm.fundingPartner=AppSettings.fundingPartnerLink;
      vm.contactUs=AppSettings.contactUs;
      vm.aboutUs=AppSettings.aboutUs;
      vm.howItWorks=AppSettings.howItWorks;
    }
    catch(e)
    {
      console.error(e);
    }
  }

//This function decides where a user will be navigated when clicked upon the FundingPartner logo
   vm.logoClick=function()
  {
    if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }
    
    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}
    if($rootScope.accessToken)
    {
      if($rootScope.typeOfApplicant == 'Investor')
      {
        if ($rootScope.firstTimeApplicant == false)
        {
          if ($rootScope.typeOfInvestor == 'Privatperson (Private person)')
          {
            navigationHandlerService.stateChange('signUpAsInvestorPrivate1');
          }
          else
          {
            navigationHandlerService.stateChange('signUpAsInvestorCompany1');
          }
        }
        else
        {
          if ($rootScope.typeOfInvestor == 'Bedrift (Company)')
          {
            if ($rootScope.reelle == true && $rootScope.multiple == false && $rootScope.sendAgreement == false) {
              navigationHandlerService.stateChange('manualSignUp');
            } else if ($rootScope.reelle == false && $rootScope.multiple == true && $rootScope.sendAgreement == false) {
              navigationHandlerService.stateChange('manualSignUp');
            } else if ($rootScope.reelle == true && $rootScope.multiple == true && $rootScope.sendAgreement == false) {
              navigationHandlerService.stateChange('manualSignUp');
            } else if ($rootScope.reelle == true && $rootScope.multiple == true && $rootScope.sendAgreement == true) {
            var url = window.location.href;
            if (url.endsWith('/editMyProfile')) {
              navigationHandlerService.stateChange('myProfile');
            } else {
            if (url.endsWith('/bankIdValidationSuccess')) {

                        } else if (url.endsWith('/kycFail')) {

                        } else if (url.includes('/kycSuccess')) {

                        } else {
                          navigationHandlerService.stateChange('investorSummary');

                        }
                      }
                    } else if ($rootScope.reelle ==false && $rootScope.multiple == false) {
                      var url = window.location.href;
                      if ($rootScope.sendAgreement == 'false' && !(url.endsWith('/bankIdValidationSuccess'))) {
                        navigationHandlerService.stateChange('bankIdValidationFailure');

                      } else {

                        if (url.endsWith('/editMyProfile')) {
                          navigationHandlerService.stateChange('myProfile');

                        } else {
                          if (url.endsWith('/bankIdValidationSuccess')) {

                          } 
                          else if (url.includes('/bankIdValidationFailure')) {
                          }

                          else if (url.endsWith('/kycFail')) {

                          } else if (url.includes('/kycSuccess')) {

                          } else {
                            navigationHandlerService.stateChange('investorSummary');

                          }


                        }

                      }
                    }
              
                  } 
                  else {
                    var url = window.location.href;
                      if ($rootScope.sendAgreement == false && !(url.endsWith('/bankIdValidationSuccess'))) {
                        navigationHandlerService.stateChange('bankIdValidationFailure');
                      } else {
                        if (url.endsWith('/editMyProfile'))
                        {
                          navigationHandlerService.stateChange('myProfile');
                        } else 
                        {
                          if (url.endsWith('/bankIdValidationSuccess'))
                          {
                          }
                          else if (url.endsWith('/kycFail'))
                          {
                          }
                          else if (url.includes('/kycSuccess')) {
                          }
                          else if (url.includes('/bankIdValidationFailure')) {
                          }

                          else
                          {
                            navigationHandlerService.stateChange('investorSummary');
                          }
                        }
                      }
                  }
                }
              } 
              else
              {
                vm.firstTimeApplicant = angular.copy($rootScope.firstTimeApplicant);
                if ($rootScope.firstTimeApplicant == false)
                {
                  navigationHandlerService.stateChange('requestLoadFirstTime');
                }
                else
                {
                  var url = window.location.href;
                  if (url.endsWith('/editMyProfile'))
                  {
                    navigationHandlerService.stateChange('myProfile');
                  }
                  else {
                    navigationHandlerService.stateChange('borrowerDashboard.appliedLoans');
                  }
                }
              }
            }
          }

  //BroadCasts
 
  $rootScope.$on('getApplicantTypeAndEmail', function() {
    userService.getApplicantTypeAndEmail();
  });
  $rootScope.$on('updateHeaderName', function() {
    userService.getApplicantTypeAndEmail();
  });

  $rootScope.$on('idValidationSuccess', function() {
    vm.init();
  });

  $rootScope.$on('getDetailsOfUser', function() {
    vm.init();
  });

  $rootScope.$on('afterBankIdSuccess', function() {
    vm.init();
  });

  $rootScope.$on('getDetailsOfUserforBorrower', function(value) {
    userService.isrequestForLoan = value;
    userService.getApplicantTypeAndEmail();
    userService.detailsOfUser();
  });

  $rootScope.$on('updateAvailableFund', function(value) {
    userService.isTransferOut = value;
    userService.detailsOfUser();
  });

  $rootScope.$on('updateAvailableFundForInvest', function(value) {
    userService.isInvest = value;
    userService.detailsOfUser();
  });

  $rootScope.$on('$locationChangeSuccess', function() {
    if ($location.path() == '/Login' && $scope.util.cookiesGet('token')) {
      userService.detailsOfUser();
    }
  });

  $rootScope.$on('logOutUser', function() {
    vm.logout();
  });

  $rootScope.$on('$stateChangeSuccess',
    function(event, toState, toParams, fromState, fromParams) {
      vm.currentState = $state.current.name;
      if (vm.currentState == 'loan') {
        navigationHandlerService.stateChange('loan.keyInformation');
      }
      if (vm.currentState == 'requestLoadFirstTime') {
        vm.hideDashboardButtonFlag = false;
        $rootScope.hideDashboardButtonFlag = false;
      }
      if (!$scope.util.cookiesGet('token') && toState.name != 'signUp' &&
        toState.name != 'verifyEmail' && toState.name != 'signUpAsABorrower' &&
        toState.name != 'forgotPasswordEmail' && toState.name != 'login') {
        navigationHandlerService.stateChange('login');
      }

      $timeout(function() {
        $window.scrollTo(0, 0);
      }, 0);


    });

  vm.init();


}

export default {
  name: 'rootController',
  fn: rootController
};
