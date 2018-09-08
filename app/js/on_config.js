function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider) {
  'ngInject';

  if (process.env.NODE_ENV === 'production') {
    $compileProvider.debugInfoEnabled(false);
  }

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $stateProvider
    .state('signUp', {
      url: '/signUpAsAnInvestor',
      controller: 'signupController as signup',
      templateUrl: 'signUp.html',
      title: 'Registrer deg som investor'
    });

  $stateProvider
    .state('verifyEmail', {
      url: '/verifyEmail/token/:id',
      controller: 'emailVerificationCtrl',
      templateUrl: 'login.html',
      title: 'Logg inn'
    });

  $stateProvider
    .state('login', {
      url: '/Login',
      controller: 'loginCtrl as login',
      templateUrl: 'login.html',
      title: 'Logg inn'
    });

  $stateProvider
    .state('signUpAsABorrower', {
      url: '/signUpAsABorrower',
      controller: 'signUpAsABorrowerCtrl as signUpAsABorrower',
      templateUrl: 'signUpAsABorrower.html',
      title: 'Registrer deg for å få en låntager-konto og send inn en lånesøknad'
    });

  $stateProvider
    .state('congratulations', {
      url: '/congratulations',
      templateUrl: 'congratulations.html',
      title: 'Gratulerer'
    });

  $stateProvider
    .state('borrowerDashboard', {
      url: '/borrowerDashboard',
      controller: 'borrowerDashboardCtrl as borrowerDashboard',
      templateUrl: 'borrowerDashboard.html',
      title: 'Sammendrag'
    });


  $stateProvider
    .state('borrowerDashboard.appliedLoans', {
      url: '/appliedLoans',
      controller: 'appliedLoansCtrl as appliedLoans',
      templateUrl: 'appliedLoans.html',
      title: 'Innsendte lånesøknader'
    });

  $stateProvider
    .state('borrowerDashboard.ongoingLoans', {
      url: '/ongoingLoans',
      controller: 'ongoingLoansCtrl as ongoingLoans',
      templateUrl: 'ongoingLoans.html',
      title: 'Pågående lån'
    });

  $stateProvider
    .state('borrowerDashboard.closedLoans', {
      url: '/closedLoans',
      controller: 'closedLoansCtrl as closedLoans',
      templateUrl: 'closedLoans.html',
      title: 'Avsluttede lån'
    });

  $stateProvider
    .state('viewLoanDetails', {
      url: '/viewLoanDetails/:loanId',
      controller: 'viewLoanDetailsCtrl as viewLoanDetails',
      templateUrl: 'viewLoanDetails.html',
      title: 'Detaljer om lån'
    });

  $stateProvider
    .state('viewLoanApplicationDetails', {
      url: '/viewLoanApplicationDetails',
      controller: 'viewLoanApplicationDetailsCtrl as viewLoanApplicationDetails',
      templateUrl: 'viewLoanApplicationDetails.html',
      title: 'Detaljer om lån'
    });


  $stateProvider
    .state('forgotPasswordEmail', {
      url: '/forgotPassword/token/:id',
      controller: 'forgotPasswordCtrl as forgotPassword',
      templateUrl: 'forgotPassword.html',
      title: 'Glemt passord'
    });

  $stateProvider
    .state('signUpAsInvestorPrivate1', {
      url: '/signUpAsInvestorPrivateForm1',
      controller: 'signUpAsInvestorPrivate1Ctrl as signUpAsInvestorPrivate1',
      templateUrl: 'signUpAsAnInvestorPrivate1.html',
      title: 'Registrer deg som investor (Privatperson)'
    });


  $stateProvider
    .state('signUpAsInvestorPrivate2', {
      url: '/signUpAsInvestorPrivateForm2',
      controller: 'signUpAsInvestorPrivate2Ctrl as signUpAsInvestorPrivate2',
      templateUrl: 'signUpAsAnInvestorPrivate2.html',
      title: 'Registrer deg som investor (Privatperson)'
    });

  $stateProvider
    .state('signUpAsInvestorPrivate3', {
      url: '/signUpAsInvestorPrivateForm3',
      controller: 'signUpAsInvestorPrivate3Ctrl as signUpAsInvestorPrivate3',
      templateUrl: 'signUpAsAnInvestorPrivate3.html',
      title: 'Registrer deg som investor (Privatperson)'
    });

  $stateProvider
    .state('signUpAsInvestorCompany1', {
      url: '/signUpAsInvestorCompany1',
      controller: 'signUpAsInvestorCompany1Ctrl as signUpAsInvestorCompany1',
      templateUrl: 'signUpAsAnInvestorCompany1.html',
      title: 'Registrer deg som investor (Selskap)'
    });

  $stateProvider
    .state('signUpAsInvestorCompany2', {
      url: '/signUpAsInvestorCompany2',
      controller: 'signUpAsInvestorCompany2Ctrl as signUpAsInvestorCompany2',
      templateUrl: 'signUpAsAnInvestorCompany2.html',
      title: 'Registrer deg som investor (Selskap)'
    });

  $stateProvider
    .state('signUpAsInvestorCompany3', {
      url: '/signUpAsInvestorCompany3',
      controller: 'signUpAsInvestorCompany3Ctrl as signUpAsInvestorCompany3',
      templateUrl: 'signUpAsAnInvestorCompany3.html',
      title: 'Registrer deg som investor (Selskap)'
    });

  $stateProvider
    .state('myProfile', {
      url: '/myProfile',
      controller: 'myProfileCtrl as myProfile',
      templateUrl: 'viewMyProfile.html',
      title: 'Min profil'
    });


  $stateProvider
    .state('editMyProfile', {
      url: '/editMyProfile',
      controller: 'editProfileController as editProfile',
      templateUrl: 'editMyProfile.html',
      title: 'Endre profil'
    });

  $stateProvider
    .state('requestLoadFirstTime', {
      url: '/requestLoanFirstTime',
      controller: 'requestLoanFirstTimeCtrl as requestLoanFirstTime',
      templateUrl: 'requestLoadFirstTime.html',
      title: 'Søk om lån'
    });

  $stateProvider
    .state('requestLoanSecondTime', {
      url: '/requestForLoan',
      controller: 'requestLoanSecondTimeCtrl as requestLoanSecondTime',
      templateUrl: 'requestLoanSecondTime.html',
      title: 'Søk om lån'
    });

  $stateProvider
    .state('successOfRequestLoan', {
      url: '/successOfRequestLoan',
      templateUrl: 'successOfRequestLoan.html',
      title: 'Gratulerer'

    });

  $stateProvider
    .state('investorSummary', {
      url: '/investorSummary',
      controller: 'investorSummaryCtrl as investorSummary',
      templateUrl: 'investorSummary.html',
      title: 'Kontosammendrag'
    });


  $stateProvider
    .state('invest', {
      url: '/invest',
      controller: 'investController as invest',
      templateUrl: 'invest.html',
      title: 'Oversikt over låneforespørsler'
    });

  $stateProvider
    .state('loan', {
      url: '/loan/:loanId',
      controller: 'loanDetailsCtrl as loanDetails',
      templateUrl: 'loanDetails.html',
      title: 'Loan Details'
    });

  $stateProvider
    .state('loan.keyInformation', {
      url: '/keyInformation',
      controller: 'keyInformationCtrl as keyInformation',
      templateUrl: 'keyInformation.html',
      title: 'Oversikt'
    });


  $stateProvider
    .state('transfer', {
      url: '/transfer',
      abstract: true,
      template: '<div ui-view></div>'
    });

  $stateProvider
    .state('transfer.in', {
      url: '/in',
      templateUrl: 'transferIn.html',
       title: 'Sett inn penger'
    })

  $stateProvider
    .state('transfer.in.details', {
      url: '/details',
      controller: 'transferInDetailsCtrl as transferInDetails',
      templateUrl: 'transferInDetails.html',
      title: 'Sett inn penger'
    });

  $stateProvider
    .state('transfer.in.details.vipps', {
      url: '/vipps',
      controller: 'vippsController as vippsCtrl',
      templateUrl: 'vipps.html',
      title: 'Vipps'
    });

  $stateProvider
    .state('transfer.in.details.norwegianBank', {
      url: '/norwegianBank',
      controller: 'norwegianAndInternationalCtrl as norwegian',
      templateUrl: 'norwegianBank.html',
      title: 'Overføring fra norsk bankkonto'
    });

  $stateProvider
    .state('transfer.in.details.internationalBank', {
      url: '/internationalBank',
      controller: 'norwegianAndInternationalCtrl as international',
      templateUrl: 'internationalBank.html',
      title: 'Overføring fra utenlandsk bankkonto'
    });

  $stateProvider
    .state('transfer.out', {
      url: '/out',
      controller: 'transactionOutCtrl as transactionOut',
      templateUrl: 'transferOut.html',
      title: 'Uttak fra din FundingPartner-konto'
    });

  $stateProvider
    .state('loan.businessProfile', {
      url: '/businessProfile',
      controller: 'businessProfileCtrl as businessProfile',
      templateUrl: 'businessProfile.html',
      title: 'Om bedriften'
    });

  $stateProvider
    .state('loan.financialSummary', {
      url: '/financialSummary',
      controller: 'financialSummaryCtrl as financialSummary',
      templateUrl: 'financialSummary.html',
      title: 'Finansiell informasjon'
    });

  $stateProvider
    .state('loan.creditScore', {
      url: '/creditScore',
      controller: 'creditScoreCtrl as creditScore',
      templateUrl: 'creditScore.html',
      title: 'Kredittkarakter'
    });

  $stateProvider
    .state('kycSuccess', {
      url: '/kycSuccess/:amt/:accId/:appId',
      controller: 'signereKYCCheckCtrl as signereKYCCheck',
      templateUrl: 'successAfterKYC.html',
      title: 'Kundesjekk vellykket'
    });

  $stateProvider
    .state('kycFail', {
      url: '/kycFail',
      controller: 'signereKYCFailCtrl as signereKYCFail',
      templateUrl: 'failAfterKYC.html',
      title: 'Kundesjekk Mislykket'
    });

  $stateProvider
    .state('bankIdValidationFailure', {
      url: '/bankIdValidationFailure',
      controller: 'bankIdValidationFailureCtrl as bankIdValidationFailure',
      templateUrl: 'bankIdValidationFailure.html',
      title: 'BankID verifisering Pågående'
    });

  $stateProvider
    .state('bankIdValidationSuccess', {
      url: '/bankIdValidationSuccess',
      templateUrl: 'bankIdValidationSuccess.html',
      title: 'Verifisering med BankID'
    });

$stateProvider
    .state('processingBankIdValidation', {
      url: '/processingBankIdValidation',
      controller: 'bankIdValidationSuccessCtrl as bankIdValidationSuccess',
      templateUrl: 'bankIdValidationProcessing.html',
      title: 'Verifisering med BankID'
    });

    $stateProvider
    .state('manualSignUp', {
      url: '/manualSignUp',
      controller: 'manualSignUpCtrl as manualSignUp',
      templateUrl: 'manualSignUp.html',
      title: 'Manuell registrering påkrevd'
    });

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;
