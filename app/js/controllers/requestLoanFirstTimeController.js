function requestLoanFirstTimeCtrl(requestLoanFirstTimeService, utilService, validationService, navigationHandlerService, sharedValues, popUpService, $rootScope) {
  'ngInject'


  const vm = this;


  vm.initialiser = function() {
    try {
      vm.loanForm = {
        accountID: '',
        loanDetails: '',
        accountDetails: ''
      }

      vm.loanDetails = {
        loanAmount: '',
        term: '',
        loanType: '',
        whatIsTheLoanFor: '',
        discountCode: ''
      }


      vm.accountDetails = {
        companyName: '',
        orgName: '',
        signingRightsFName: '',
        signingRightsLName: '',
        signingRightsEmail: '',
        signingRightsPh: '',
        signingRightsSSN:'',
        multiplePeopleRequired: false
      }
       vm.invalidOrg = false;
       vm.invalidIdFormat = false;
       vm.invalidpersonalID = false;
      vm.flagReset();
      vm.conuntComma = 0;
      
    } catch (err) {
      console.error(err);
    }

  }

  vm.flagReset = function() {
    try {
      vm.isAmountZero = false;
      vm.isAmountGreater = false;
      vm.invalidAmount = false;
    } catch (err) {
      console.error(err);
    }

  }


  vm.init = function() {
    try {
      navigationHandlerService.stateChange('requestLoadFirstTime');
      vm.initialiser();
      
    } catch (err) {
      console.error(err);
    }

  }

  vm.requestLoan = function() {
    try {
      if (sharedValues.userInfo) {
        vm.loanForm.accountID = utilService.setAccountId();
        vm.accountDetails.signingRightsEmail = sharedValues.userInfo.accountEmail;
      }
      vm.getPhoneNumberWithCode(vm.accountDetails.signingRightsPh);
      //initializing the loan details
      var loanDetails = new Array();
      loanDetails.push(vm.loanDetails);
      //initializing the account details
      var accountDetails = new Array();
      accountDetails.push(vm.accountDetails);
      //removing space and ',' from amount
      vm.loanForm = {
        accountID: vm.loanForm.accountID,
        loanDetails: loanDetails,
        accountDetails: accountDetails
      };
      //Request loan for first time API call
      var promise = requestLoanFirstTimeService.requestForLoan(vm.loanForm);
      promise.then(function(answer) {
        if(answer.data.message=='Failed to authenticate token.'){
         
             $rootScope.$broadcast('logOutUser');
          }
         else if (answer.data.status == 'Success') {
            //API SUCCESS
            navigationHandlerService.stateChange('successOfRequestLoan');
            sharedValues.userInfo.firstTimeApplicant = true;
            utilService.cookiesSet('userInfo', JSON.stringify(sharedValues.userInfo));
            var value = true;
            $rootScope.hideDashboardButtonFlag = true;
            $rootScope.$broadcast('getDetailsOfUserforBorrower', value);
          }
          //API FAILURE
          else {
            //Invalid Discount Code Popup
            if (answer.data.errorMessage == 'Invalid Discount Code') {
              popUpService.popUpShow('Beklager!', 'Ugyldig rabattkode.');
            } //Loan details invalid Popup 
            else {
              popUpService.popUpShow('Ugyldig bruker', 'Ta kontakt med administrator for mer informasjon.');
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
  //Input Loan Amount Validations 
  vm.inputAmount = function() {
    try {
      if (vm.loanDetails.loanAmount) {

        vm.amount = vm.loanDetails.loanAmount.split(' ').join('');
        vm.amount = vm.amount.split(',').join('.');
        vm.amount = parseFloat(vm.amount);
        if (isNaN(vm.amount)) {
          vm.flagReset();
          vm.invalidAmount = true;
        } else if (vm.amount == 0) {
          vm.flagReset();
          vm.isAmountZero = true;
        } else if (vm.amount < 0) {
          vm.flagReset();
          vm.invalidAmount = true;
        } 
        //This Regex is used for Norwegian currency.
        //Valid Input Amount - 1 000,50 / 100 000 / 100,80
        //Invalid Amount - 1000.80 / 1   000 /,,,,,,100 / 100,,,,,80 /,80
        else if (!vm.loanDetails.loanAmount.match(/^((?:^\d{1,3}(?:\s?\d{3})*(?:,\d{2})?$)|(?:^\d{1,3}(?:,?\d{3})*(?:\s\d{2})?$))/))
        {
          vm.flagReset();
          vm.invalidAmount = true;
        } 
           else if (vm.amount > 10000000) {
          vm.flagReset();
          vm.isAmountGreater = true;
        }
       else {
        vm.flagReset();
      }
    }
    else
    {
          vm.flagReset();
    }
    } catch (err) {
      console.error(err);
    }

  }

  //Validations for submit button
  vm.disableSubmit = function() {
    try {
      if (vm.accountDetails.companyName && vm.accountDetails.orgName && vm.accountDetails.signingRightsFName && vm.accountDetails.signingRightsLName && vm.accountDetails.signingRightsPh && vm.loanDetails.loanType && vm.loanDetails.loanAmount && vm.loanDetails.term && vm.loanDetails.whatIsTheLoanFor && vm.accountDetails.signingRightsSSN) {
        if (vm.isAmountZero == false && vm.isAmountGreater == false && vm.invalidAmount == false && vm.invalidOrg == false && vm.invalidPhoneFormat == false && vm.invalidIdFormat == false && vm.invalidpersonalID == false) {
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

  //Validation for organisation number

  vm.validOrgNumber = function(org)
  { 
     try {
      vm.invalidOrg = validationService.isValidOrganisationNumber(org);
    } catch (err) {
      console.error(err);
    }
  }

  //This function checks whether the user has given a valid Phone Number as an input

  vm.isValidPhoneNumber = function(phoneNo) {
    vm.invalidPhoneFormat = validationService.isValidPhoneNumber(phoneNo);
  }

  //This function sets phone number with proper ISD code

  vm.getPhoneNumberWithCode = function(telephone) {
    vm.accountDetails.signingRightsPh = validationService.getPhoneNumberWithCode(telephone);
  }

  //This function checks for valid Personal Id Number input

  vm.isValidPersonalId = function() {
    try {
      var validPersonalId = validationService.isValidPersonalIDNumber(vm.accountDetails.signingRightsSSN);
      vm.invalidpersonalID = validPersonalId.invalidpersonalID;
      vm.invalidIdFormat = validPersonalId.invalidIdFormat;
    } catch (e) {
      console.error(e);
    }
  }

  //This function sets valid PersoanlID Number

  vm.getValidPersonalIDNumber = function(personalIDNumber) {
    try {
      vm.accountDetails.signingRightsSSN = validationService.getValidPersonalIDNumber(personalIDNumber);
      } catch (e) {
      console.error(e);
    }
  }

  vm.init();
}

export default {
  name: 'requestLoanFirstTimeCtrl',
  fn: requestLoanFirstTimeCtrl
};
