function signUpAsInvestorPrivate1Ctrl(navigationHandlerService, utilService, validationService, FpConstants, sharedValues, postalCodeService,$rootScope) {
  'ngInject';

  // ViewModel
  const vm = this;

  /*This function is called at the loading of the page*/

  vm.init = function() {
    try {
      vm.initialize();
      vm.backButtonDisable();
    } catch (e) {
      console.error(e);
    }
  }

  //This function initialises all the variables used in this controller

  vm.initialize = function() {
    try {
      vm.allCountries = FpConstants.AllCountries;

      vm.form = {
        firstName: '',
        lastName: '',
        address: '',
        addressLine2: '',
        postalCode: '',
        postalLocation: '',
        country: 'Norway',
        telephone: '',
        personalIDNumber: '',
        bankAccountNumber: ''
      };
      vm.pcodeFlag = false;
      vm.poststed = false;
      vm.invalidIdFormat = false;
      vm.invalidBankAccount = false;
      vm.touched = false;
      vm.invalidpersonalID = false;
      vm.touchedpersonalID = false;
      vm.invalidPhoneFormat = false;
      vm.zipCodeZero = false;
      vm.zipCodeLength = false;
    } catch (e) {
      console.error(e);
    }
  }

  //This function takes the user to the next pafe with the details of this page 

  vm.continue = function() {
    try {
      vm.getPhoneNumberWithCode(vm.form.telephone);
      vm.getValidPersonalIDNumber(vm.form.personalIDNumber);
      vm.getBankAccountNumber(vm.form.bankAccountNumber);

      sharedValues.investorPrivateForm1 = vm.form;
      navigationHandlerService.stateChange('signUpAsInvestorPrivate2');
    } catch (e) {
      console.error(e);
    }
  }

  //This function disables continue button on invalid user input

  vm.disableContinue = function() {
    try {
      if (vm.form.firstName && vm.form.lastName && vm.form.country && vm.form.telephone && vm.form.bankAccountNumber && vm.form.postalLocation && vm.form.postalCode && vm.form.address && vm.form.personalIDNumber) {
        if (vm.invalidBankAccount == false && vm.pcodeFlag == false && vm.poststed == false && vm.touched == false && vm.invalidpersonalID == false && vm.invalidIdFormat == false && vm.invalidPhoneFormat == false && vm.zipCodeZero==false && vm.zipCodeLength==false && vm.landNorway==false) {
          return false;
        } else {
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
      vm.isZipCodeZero(postalCode);
      vm.isZipCodeLength(postalCode);
       vm.landNorway = vm.isLandNorway(land,postalCode);
      vm.pcodeFlag = validationService.isInValidPostalCode(postalCode);
      if (postalCode && postalCode.length === 4) {
        var promise = postalCodeService.getPostalPlaceAsync(postalCode);
        promise.then(function successCallback(response) {
          var data = response.data;
          if (data && data.valid) {
            vm.form.postalLocation = data.result;
          }
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  //This function checks whether the user has given a valid Phone Number as an input

  vm.isValidPhoneNumber = function(phoneNo) {
    try {
      vm.invalidPhoneFormat = validationService.isValidPhoneNumber(phoneNo);
      } catch (e) {
      console.error(e);
    }
  }

  //This function sets phone number with proper ISD code

  vm.getPhoneNumberWithCode = function(telephone) {
    try {
      vm.form.telephone = validationService.getPhoneNumberWithCode(telephone);
    } catch (e) {
      console.error(e);
    }
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

  //This function does not allow the user to return back to this page

  vm.backButtonDisable = function() {
    try {
      if ($rootScope.accessToken && Object.keys(sharedValues.investorPrivateForm1).length > 0) {
        navigationHandlerService.stateChange('signUpAsInvestorPrivate2');
      }
    } catch (e) {
      console.error(e);
    }
  }

  
  //This function checks whether the Zip Code is zero or not.

  vm.isZipCodeZero = function(zipCode) {
    try {
      vm.zipCodeZero = validationService.isZipCodeZero(zipCode);
      } catch (e) {
      console.error(e);
    }
  }

//This function is used to check the zip length
  vm.isZipCodeLength = function(zipCode) {
    try {
      vm.zipCodeLength = validationService.isZipCodeLength(zipCode);
      } catch (e) {
      console.error(e);
    }
  }

//If country is Norway then postal code should be 4 digits
   vm.isLandNorway =function(land,zipCode){
    vm.landIsNorway = validationService.isLandNorway(land,zipCode);
    return vm.landIsNorway;
  }


  vm.init();
}

export default {
  name: 'signUpAsInvestorPrivate1Ctrl',
  fn: signUpAsInvestorPrivate1Ctrl
};
