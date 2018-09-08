function signUpAsInvestorCompany1Ctrl(signUpInvestorPrivateService, utilService, navigationHandlerService, validationService, FpConstants, $state, sharedValues, postalCodeService, $rootScope, $cookies) {
  'ngInject';

  // ViewModel
  const vm = this;

  //This function is called at the loading of the page

  vm.init = function() {
    try {
      vm.initialize();
      vm.backButtonDisable();
    } catch (e) {
      console.error(e);
    }
  }

  //To check if the organisation number is valid

  vm.validOrgNumber = function(org) {
    try {
      vm.invalidOrg = validationService.isValidOrganisationNumber(org);
    } catch (err) {
      console.error(err);
    }
  }

  //This function initializes the variables which are used in this controller

  vm.initialize = function() {
    try {
      vm.allCountries = FpConstants.AllCountries;
      vm.form = {
        companyName: '',
        companyOrgNumber: '',
        address: '',
        addressLine2: '',
        postalCode: '',
        postalLocation: '',
        country: 'Norway',
        bankAccountNumber: '',
        firstName: '',
        lastName: '',
        SignerEmail: '',
        telephone: '',
        personalIDNumber: '',
        AreMultiple: false,
        reelle: false,
        Nationality: 'Norway'
      }
      vm.invalidBankAccount = false;
      vm.touched = false;
      vm.invalidpersonalID = false;
      vm.touchedpersonalID = false;
      vm.invalidIdFormat = false;
      vm.invalidPhoneFormat = false;
      vm.pcodeFlag = false;
      vm.zipCodeZero = false;
      vm.invalidOrg = false;
    } catch (e) {
      console.error(e);
    }
  }

  //This function takes the user to the next page with the input details

  vm.continue = function() {
    try {
      vm.form.accountID=utilService.setAccountId();
      vm.getPhoneNumberWithCode(vm.form.telephone);
      vm.getValidPersonalIDNumber(vm.form.personalIDNumber);
      vm.getBankAccountNumber(vm.form.bankAccountNumber);
      sharedValues.investorCompanyForm1 = vm.form;
      if (vm.form.AreMultiple == false && vm.form.reelle == false && (vm.form.AreMultiple == false && vm.form.reelle == false)) {
        navigationHandlerService.stateChange('signUpAsInvestorCompany2');
      } else {
        var promise = signUpInvestorPrivateService.continue(vm.form)
        promise.then(function(answer) {
        if(answer.data.message=='Failed to authenticate token.'){
         
             $rootScope.$broadcast('logOutUser');
          }
          else{
          sharedValues.userInfo.firstTimeApplicant = true;
          utilService.cookiesSet('userInfo', JSON.stringify(sharedValues.userInfo));
          $rootScope.$broadcast('getDetailsOfUser');
          navigationHandlerService.stateChange('manualSignUp');
        }
        },
        function(reason) {
          var err = reason;
           $rootScope.$broadcast('logOutUser');
          console.error(err);
        });
      return promise;
      }
    } catch (e) {
      console.error(e);
    }

  }

  //This function disables button on user invalid input

  vm.disableContinue = function() {
    try {
      if (vm.form.companyName && vm.form.companyOrgNumber && vm.form.firstName && vm.form.lastName && vm.form.address && vm.form.postalCode && vm.form.postalLocation && vm.form.country && vm.form.telephone && vm.form.bankAccountNumber && vm.form.Nationality && vm.form.personalIDNumber) {
        if (vm.invalidBankAccount == false && vm.touched == false && vm.invalidIdFormat == false && vm.invalidpersonalID == false && vm.invalidPhoneFormat == false && vm.zipCodeZero == false && vm.invalidOrg == false){
          return false;
        }
         else {
          return true;
        }

      } else {
        return true;
      }
    } catch (e) {
      console.error(e);
    }
  }

  //This function checks for valid Bank Account Number input

  vm.isValidBankAccount = function() {
    try {
      var isValid = validationService.isValidBankAccount(vm.form.bankAccountNumber);
      vm.invalidBankAccount = isValid.invalidBankAccount;
      vm.touched = isValid.touched;
    } catch (e) {
      console.error(e);
    }
  }

  //This function checks for valid Personal Id Number input

  vm.isValidPersonalId = function() {
    try {
      var validPersonalId = validationService.isValidPersonalIDNumber(vm.form.personalIDNumber);
      vm.invalidpersonalID = validPersonalId.invalidpersonalID;
      vm.invalidIdFormat = validPersonalId.invalidIdFormat;
    } catch (e) {
      console.error(e);
    }
  }

  //This function returns the postal place for a particular postal code

  vm.postalCodeChanged = function(postalCode,land) {
    try {
      vm.isZipCodeZero(vm.form.postalCode);
      vm.landNorway = vm.isLandNorway(land,postalCode);
      if (postalCode && postalCode.length === 4) {
        var promise = postalCodeService.getPostalPlaceAsync(postalCode);
        promise.then(function successCallback(response) {
          var data = response.data;
          if (data && data.valid) {
            vm.form.postalLocation = data.result;
          }
        });
      }
      if (postalCode) {
        vm.pcodeFlag = false;
      } else {
        vm.pcodeFlag = true;
      }
    } catch (e) {
      console.error(e);
    }
  }

  //This function checks whether the user has given a valid Phone Number as an input

  vm.isValidPhoneNumber = function(phoneNo) {
    vm.invalidPhoneFormat = validationService.isValidPhoneNumber(phoneNo);
    }

  //This function sets phone number with proper ISD code

  vm.getPhoneNumberWithCode = function(telephone) {
    vm.form.telephone = validationService.getPhoneNumberWithCode(telephone);
  }

  //This function sets valid Bank Account Number

  vm.getBankAccountNumber = function(bankAccountNumber) {
    try {
      vm.form.bankAccountNumber = validationService.getValidBankAccountNumber(bankAccountNumber);
    } catch (e) {
      console.error(e);
    }
  }

  //This function sets valid PersoanlID Number

  vm.getValidPersonalIDNumber = function(personalIDNumber) {
    try {
      vm.form.personalIDNumber = validationService.getValidPersonalIDNumber(personalIDNumber);
    } catch (e) {
      console.error(e);
    }
  }

  //This function does not allow the user to return back to previous page

  vm.backButtonDisable = function() {
    try {
      if (utilService.cookiesGet('token') && Object.keys(sharedValues.investorCompanyForm1).length > 0) {
        navigationHandlerService.stateChange('signUpAsInvestorCompany2');
      }
    } catch (e) {
      console.error(e);
    }
  }

  //This function checks whether zipCode is zero or not

  vm.isZipCodeZero = function(zipCode) {
    try {
      vm.zipCodeZero = validationService.isZipCodeZero(zipCode);
      } catch (e) {
      console.error(e);
    }
  }

//If country is Norway then postal code should be 4 digits
  vm.isLandNorway =function(land,zipCode){
    try{
      vm.landIsNorway = validationService.isLandNorway(land,zipCode);
    return vm.landIsNorway;
    }
    catch(err){
      console.error(err);
    }
    
  }

  vm.init();

}

export default {
  name: 'signUpAsInvestorCompany1Ctrl',
  fn: signUpAsInvestorCompany1Ctrl
};
