function editProfileController($scope, postalCodeService, FpConstants, notificationService, editProfileService, sharedValues, popUpService, $rootScope, validationService, navigationHandlerService, utilService) {
  'ngInject'

  const vm = this;

  //Init function
  vm.init = function() {
    try {
      $scope.util = utilService;
      vm.initialize();
      vm.assignValues();
    } catch (err) {
      console.error(err);

    }
  }

  //This function is called when the user clicks on save button
  vm.saveChanges = function() {

    try {
      vm.accountID = $scope.util.setAccountId();

      vm.telephone = vm.getPhoneNumberWithCode(vm.editForm.telephone);
      vm.editForm.telephone = vm.telephone;

      vm.personalIdNo = vm.getValidPersonalIDNumber(vm.editForm.personalIDNumber);
      vm.editForm.personalIDNumber = vm.personalIdNo;
      vm.editForm.accountID = vm.accountID;
      var promise = editProfileService.editProfile(vm.editForm);

      promise.then(function(answer) {

        if(answer.data.message=='Failed to authenticate token.'){
         
             $rootScope.$broadcast('logOutUser');
          }
          else{
          if (answer.data.status == 'Success') {
            vm.updateSharedValues();

            if($rootScope.typeOfInvestor=='Privatperson (Private person)'){
              $scope.util.cookiesSet('userInfo', JSON.stringify(sharedValues.userInfo));
              $rootScope.$broadcast('updateHeaderName');
            }
            notificationService.savedOk();
            navigationHandlerService.stateChange('myProfile');
          } else {
            popUpService.popUpShow('Beklager!', 'Noe gikk galt.');
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
  };

  //updating shared values on success of API
  vm.updateSharedValues = function() {
    sharedValues.investorDetails.peer__First_Name__c = vm.editForm.firstName;
    sharedValues.investorDetails.peer__Last_Name__c = vm.editForm.lastName;
    sharedValues.investorDetails.cnotify__Email__c = vm.editForm.email;
    sharedValues.investorDetails.BillingStreet = vm.editForm.address;
    sharedValues.investorDetails.BillingPostalCode = vm.editForm.postalCode;
    sharedValues.investorDetails.BillingCity = vm.editForm.postalLocation;
    sharedValues.investorDetails.Telephone__c = vm.telephone;
    sharedValues.investorDetails.Personal_ID_number__c = vm.editForm.personalIDNumber;
    sharedValues.investorDetails.What_is_the_purpose_of_the_savings__c = vm.editForm.purpose;
    sharedValues.investorDetails.BillingCountry = vm.editForm.country;
    sharedValues.userInfo.headerName = vm.editForm.firstName + ' ' + vm.editForm.lastName;
  }

  //This function is called to change the postal location according to postal code **only for Norway**

  vm.postalCodeChanged = function(postalCode,land) {
    vm.postalCodeZero=vm.isZipCodeZero(postalCode);
    vm.landNorway = vm.isLandNorway(land,postalCode);

    if (postalCode && postalCode.length === 4) {
      var promise = postalCodeService.getPostalPlaceAsync(postalCode);
      promise.then(function successCallback(response) {
        var data = response.data;
        if (data && data.valid) {
          vm.editForm.postalLocation = data.result;
        }
      });
    }
  };


  //This function is called to disable the save button for any invalid input
  vm.disableSave = function() {
    try {
      if (vm.editForm.firstName && vm.editForm.address && vm.editForm.lastName && vm.editForm.telephone && vm.editForm.country && vm.editForm.postalCode && vm.editForm.postalLocation && vm.editForm.personalIDNumber) {

        if (vm.invalidpersonalID == false  && vm.invalidIdFormat == false && vm.invaidPhoneFormat == false && vm.postalCodeZero==false &&  vm.landNorway==false) {
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



  //This function is called in ng-change to check the personal id no 
  
  vm.isValidPersonalId = function(personalId) {
    try {
      var validPersonalId = validationService.isValidPersonalIDNumber(personalId);
      vm.invalidpersonalID = validPersonalId.invalidpersonalID;
      vm.invalidIdFormat = validPersonalId.invalidIdFormat;
    } catch (e) {
      console.error(e);
    }
  }

  //This function is called to save the personal id no
  vm.getValidPersonalIDNumber = function(personalId) {
    try {
      vm.editForm.personalIDNumber = validationService.getValidPersonalIDNumber(personalId);
      return vm.editForm.personalIDNumber;
    } catch (err) {
      console.error(err);
    }
  }

  //This function is called in ng-change to check phone no 
  vm.isValidPhoneNumber = function(phoneNo) {
    try {
      vm.invaidPhoneFormat = validationService.isValidPhoneNumber(phoneNo);
      return vm.invaidPhoneFormat;
    } catch (err) {
      console.error(err);
    }

  }

  //This function is called to phone no
  vm.getPhoneNumberWithCode = function(phoneNo) {
    try {
      vm.telephone = validationService.getPhoneNumberWithCode(phoneNo);
      return vm.telephone;
    } catch (err) {
      console.error(err);
    }

  }


  //This function is called to initialize the form and variables
  vm.initialize = function() {
    try {
      vm.editForm = {
        accountID: '',
        firstName: '',
        lastName: '',
        address: '',
        postalCode: '',
        postalLocation: '',
        country: '',
        telephone: '',
        personalIDNumber: '',
        email: '',
        purpose: '',
        bankAccountNumber: '',
        myProfile: true
      }
      vm.isValidPersonalIdNo = {};
      vm.invaidPhoneFormat = false;
      vm.invalidpersonalID = false;
      vm.touchedpersonalID = false;
      vm.invalidIdFormat = false;
      vm.postalCodeZero=false;
      vm.landNorway=false;

    } catch (err) {
      console.error(err);
    }

  }

  //This function is called to assign values in  the form 
  vm.assignValues = function() {
    try {
      vm.profileForm = {
        firstName: sharedValues.investorDetails.peer__First_Name__c,
        lastName: sharedValues.investorDetails.peer__Last_Name__c,
        email: sharedValues.investorDetails.cnotify__Email__c,
        address: sharedValues.investorDetails.BillingStreet,
        postalCode: sharedValues.investorDetails.BillingPostalCode,
        postalPlace: sharedValues.investorDetails.BillingCity,
        country: sharedValues.investorDetails.BillingCountry,
        phone: sharedValues.investorDetails.Telephone__c,
        personalIDNumber: sharedValues.investorDetails.Personal_ID_number__c,
        bankkonto: sharedValues.investorBank,
        purposeForInvesting: sharedValues.investorDetails.What_is_the_purpose_of_the_savings__c,
        passwordLastchangedOn: sharedValues.investorDetails.Password_Last_Changed_on__c
      };
      sharedValues.profileForm = vm.profileForm;

      if (sharedValues.investorBank) {
        vm.bankAccount = sharedValues.investorBank;
        vm.bankAccount = vm.getBankAccountNumber(vm.bankAccount);
        vm.bankAccount = '****.**.' + vm.bankAccount.substring(8, 13);
      }

      if (sharedValues.profileForm.country != null) {
        vm.editForm = {
          accountID: '',
          firstName: sharedValues.profileForm.firstName,
          lastName: sharedValues.profileForm.lastName,
          address: sharedValues.profileForm.address,
          postalCode: sharedValues.profileForm.postalCode,
          postalLocation: sharedValues.profileForm.postalPlace,
          country: sharedValues.profileForm.country,
          telephone: sharedValues.profileForm.phone,
          personalIDNumber: sharedValues.profileForm.personalIDNumber,
          email: sharedValues.profileForm.email,
          purpose: sharedValues.profileForm.purposeForInvesting,
          bankAccountNumber: vm.bankAccount,
          myProfile: true
        }
      } else {
        vm.editForm = {
          accountID: '',
          firstName: sharedValues.profileForm.firstName,
          lastName: sharedValues.profileForm.lastName,
          address: sharedValues.profileForm.address,
          postalCode: sharedValues.profileForm.postalCode,
          postalLocation: sharedValues.profileForm.postalPlace,
          country: 'Norway',
          telephone: sharedValues.profileForm.phone,
          personalIDNumber: sharedValues.profileForm.personalIDNumber,
          email: sharedValues.profileForm.email,
          purpose: sharedValues.profileForm.purposeForInvesting,
          bankAccountNumber: vm.bankAccount,
          myProfile: true
        }
      }

      vm.allCountries = FpConstants.AllCountries;

    } catch (err) {
      console.error(err);
    }

  }

//This function is called to get bank account no in save button
  vm.getBankAccountNumber = function(bankAccountNumber) {
    try {
      vm.bankAccountNo = validationService.getValidBankAccountNumber(bankAccountNumber);
      return vm.bankAccountNo;
    } catch (e) {
      console.error(e);
    }
  }

//To check zip code is zero or not
  vm.isZipCodeZero = function(zipCode) {
    try {
      vm.zipCodeZero = validationService.isZipCodeZero(zipCode);
      return vm.zipCodeZero;
    } catch (e) {
      console.error(e);
    }
  }

//If land is Norway then zip code must be 4 digits
  vm.isLandNorway =function(land,zipCode){
    vm.landIsNorway = validationService.isLandNorway(land,zipCode);
    return vm.landIsNorway;
  }

  $rootScope.$on('userDetailsUpdate', function() {
    vm.init();
  });

  vm.init();
}
export default {
  name: 'editProfileController',
  fn: editProfileController
};
