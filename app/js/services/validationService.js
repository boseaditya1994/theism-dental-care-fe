function validationService(utilService, $rootScope,sharedValues) {

  'ngInject';

  const service = {};

  /*
   * Checks is a phone number is valid or not
   */
  service.isValidPhoneNumber = function(telephone) {
    if (telephone) {
      telephone = telephone.split(' ').join('').toString();


      //Check for non-norwegian numbers
      if (telephone.length < 3) {
        return true;
      } else {
        if ((telephone.indexOf('+') == 0 && telephone.indexOf('+47') < 0) || (telephone.indexOf('00') == 0 && telephone.indexOf('0047') != 0)) {

          telephone = telephone.substring(1);
          var lengthWithoutPlus = telephone.length;
          if (lengthWithoutPlus > 2) {
            ///^[0-9]*$/ This regex checks whether the input is in numeric form
            //Valid input :-99999999
            //Invalid input :- adfsddfbdb
            if ((telephone.match(/^[0-9]*$/))) {
              return false;
            }
          } else {
            return true;
          }
        } else {
          telephone = telephone.split('+47').join('');
          if (telephone.indexOf('0047') == 0) {
            telephone = telephone.replace('0047', '');
          }

          // Check for norwegian numbers
          if (telephone.length == 8) {

            if ((telephone.match(/^[0-9]*$/))) {
              return false;
            }
          }
        }
      }

    }
    return true;
  }

  /*
   * returns the phone number with ISD code to be saved to BE
   */
  service.getPhoneNumberWithCode = function(telephone) {
    if (telephone) {
      telephone = telephone.split(' ').join('').toString();

      if (telephone.length == 8 && telephone.indexOf('+47') < 0) {
        telephone = '+47' + telephone;
      }

      return telephone;
    }
    return false;
  }

  /*
   * returns the phone number with ISD code to be viewd in FE
   */
  service.getPhoneNumberForView = function(telephone) {
    if (telephone && telephone.indexOf('+47') > -1) {
      telephone = telephone.split('+47').join('')
      telephone = '+47 ' + utilService.insertCharAfterNChar(telephone, 2).join(' ');

      return telephone;
    } else {
      return telephone;
    }

  }

  //To check if the organisation number is valid

  service.isValidOrganisationNumber = function(org) {
    if (org) {
      if (org.length > 11) {
        return true;
      } else if (org.length == 11 && org.charAt(3) == ' ' && org.charAt(7) == ' ') {
        var orgNew = org.split(' ').join('');
        if (orgNew.match(/^[0-9]+\.?[0-9]*$/)) {
          return false;
        } else {
          return true;
        }
      } else if (org.length == 9 && org.match(/^[0-9]+\.?[0-9]*$/)) {
        return false;
      } else {
        return true;
      }
    }
  }



  /*returns personalIDNumber in the corret format
   */

  service.getValidPersonalIDNumber = function(personalIDNumber) {
    if (personalIDNumber) {
      personalIDNumber = personalIDNumber.replace(' ', '');
      personalIDNumber = utilService.insertCharAfterNChar(personalIDNumber, 6).join(' ');
      return personalIDNumber;
    }
  }

  //This function returns a valid Bank Account Number

  service.getValidBankAccountNumber = function(bankAccountNumber) {
    if (bankAccountNumber) {
      bankAccountNumber = bankAccountNumber.split(' ').join('');
      bankAccountNumber = bankAccountNumber.split('.').join('');
      var newBankAccount = '';
      var newBankAccount1 = '';
      var newBankAccount2 = '';
      for (var i = 0; i < bankAccountNumber.length; i++) {
        if (i <= 3) {
          newBankAccount += bankAccountNumber.charAt(i);
        } else if (i == 4 || i == 5) {
          newBankAccount1 += bankAccountNumber.charAt(i);
        } else {
          newBankAccount2 += bankAccountNumber.charAt(i);
        }
      }
      bankAccountNumber = newBankAccount + '.' + newBankAccount1 + '.' + newBankAccount2;
      return bankAccountNumber;
    }
  }

  //This function is for amount validation
  service.isValidAmount = function(inputAmount) {

    var isValid = {
      isAmountZero: false,
      isAmountGreater: false,
      invalidAmount: false
    }


    if (inputAmount) {


      var amount = inputAmount.split(' ').join('');

      amount = amount.split(',').join('.');


      amount = parseFloat(amount);


      var availableFunds = $rootScope.availableFunds;



      if (amount == 0) {
        isValid.isAmountZero = true;
        isValid.isAmountGreater = false;
        isValid.invalidAmount = false;

      } else if (isNaN(amount)) {
        isValid.isAmountZero = false;
        isValid.isAmountGreater = false;
        isValid.invalidAmount = true;
      } else if (amount < 0) {
        isValid.isAmountZero = false;
        isValid.isAmountGreater = false;
        isValid.invalidAmount = true;
      } else if (amount >sharedValues.availableFunds) {
        isValid.isAmountGreater = true;
        isValid.isAmountZero = false;
        isValid.invalidAmount = false;
      }

      //This Regex is used for Norwegian currency.
      //Valid Input Amount - 1 000,50 / 100 000 / 100,80
      //Invalid Amount - 1000.80 / 1   000 /,,,,,,100 / 100,,,,,80 /,80
      else if (!inputAmount.match(/^((?:^\d{1,3}(?:\s?\d{3})*(?:,\d{2})?$)|(?:^\d{1,3}(?:,?\d{3})*(?:\s\d{2})?$))/)) {
        isValid.invalidAmount = true;
        isValid.isAmountGreater = false;
        isValid.isAmountZero = false;
      } else {
        isValid.isAmountZero = false;
        isValid.isAmountGreater = false;
        isValid.invalidAmount = false;
      }
    } else {
      isValid.isAmountZero = false;
      isValid.isAmountGreater = false;
      isValid.invalidAmount = false;
    }

    return isValid;
  }



  //This function is for amount validation for vipps
  service.isValidAmountVipps = function(inputAmount) {

    var isValidVipps = {
      isAmountLess: false,
      isAmountGreater: false,
      invalidAmount: false
    }


    if (inputAmount) {


      var amount = inputAmount.split(' ').join('');

      amount = amount.split(',').join('.');


      amount = parseFloat(amount);


      var availableFunds = $rootScope.availableFunds;



      if (amount>=0 && amount <100 ) {
        isValidVipps.isAmountLess = true;
        isValidVipps.isAmountGreater = false;
        isValidVipps.invalidAmount = false;

      } else if (isNaN(amount)) {
        isValidVipps.isAmountLess = false;
        isValidVipps.isAmountGreater = false;
        isValidVipps.invalidAmount = true;
      } else if (amount < 0) {
        isValidVipps.isAmountLess = false;
        isValidVipps.isAmountGreater = false;
        isValidVipps.invalidAmount = true;
      } else if (amount >20000) {
        isValidVipps.isAmountGreater = true;
        isValidVipps.isAmountLess = false;
        isValidVipps.invalidAmount = false;
      }

      //This Regex is used for Norwegian currency.
      //Valid Input Amount - 1 000,50 / 100 000 / 100,80
      //Invalid Amount - 1000.80 / 1   000 /,,,,,,100 / 100,,,,,80 /,80
      else if (!inputAmount.match(/^((?:^\d{1,3}(?:\s?\d{3})*(?:,\d{2})?$)|(?:^\d{1,3}(?:,?\d{3})*(?:\s\d{2})?$))/)) {
        isValidVipps.invalidAmount = true;
        isValidVipps.isAmountGreater = false;
        isValidVipps.isAmountLess = false;
      } else {
        isValidVipps.isAmountLess = false;
        isValidVipps.isAmountGreater = false;
        isValidVipps.invalidAmount = false;
      }
    } else {
      isValidVipps.isAmountLess = false;
      isValidVipps.isAmountGreater = false;
      isValidVipps.invalidAmount = false;
    }

    return isValidVipps;
  }
  //This function is used for personal id number validation
  service.isValidPersonalIDNumber = function(personalIDNumber) {

    var validPersonalId = {
      invalidIdFormat: false,
      invalidpersonalID: false,
      touchedpersonalID: false
    };
    if (personalIDNumber) {
      personalIDNumber = personalIDNumber.replace(' ', '');
      ///^((\d{6}\s\d{5})|\d{11})$/ This regex checks whether the personal ID Number is valid or invalid
      //Valid Input :- 211094 14789
      //Invalid Input :- 211094014785236
      if ((personalIDNumber.match(/^((\d{6}\s\d{5})|\d{11})$/))) {
        validPersonalId.invalidIdFormat = false;
      } else {
        validPersonalId.invalidIdFormat = true;
      }


      if (personalIDNumber.charAt(2) == '0') {
        var month = personalIDNumber.charAt(3);

      } else {
        var month = personalIDNumber.charAt(2) + personalIDNumber.charAt(3);


      }

      ///^([1-9]|1[012])$/ This regex checks whether the two digits matches whether 2nd two digits matches the months
      //Valid Input :- 21109412345
      //Invalid Input :- 211409123645

      ///^((\d{6}\s\d{5})|\d{11})$/ This regex checks whether the personal ID Number is valid or invalid
      //Valid Input :- 211094 14789
      //Invalid Input :- 211094014785236
      if ((month.match(/^([1-9]|1[012])$/)) && (personalIDNumber.match(/^((\d{6}\s\d{5})|\d{11})$/))) {
        if (personalIDNumber.length == 11) {
          validPersonalId.invalidpersonalID = false;
          validPersonalId.touchedpersonalID = false;
        } else {
          validPersonalId.invalidpersonalID = true;
          validPersonalId.touchedpersonalID = true;
        }
      } else {
        validPersonalId.invalidpersonalID = true;
        validPersonalId.touchedpersonalID = true;
      }
    } else {
      validPersonalId.invalidIdFormat = false;
      validPersonalId.invalidpersonalID = false;
      validPersonalId.touchedpersonalID = false;
    }

    return validPersonalId;
  }

  //This function checks whether a Postal Code is valid or invalid
  service.isInValidPostalCode = function(postalCode) {
    if (postalCode) {

      ///^[0-9]*$/ This regex checks whether the input is in numeric form
      //Valid input :-99999999
      //Invalid input :- adfsddfbdb
      if (postalCode.match(/^[0-9]*$/)) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  //This checks whether a Postal Location is valid or not

  service.isValidPostalLocation = function(postalLocation) {
    if (postalLocation != '') {

      ///^[A-z\u00C0-\u00ff\s'\.,-\/#!$%\^&\*;:{}=\-_`~()]+$/ This regex checks whether the input is only alphabets
      //Valid input :- Bjørn
      //Invalid input :- 99999999
      if (postalLocation.match(/^[A-z\u00C0-\u00ff\s'\.,-\/#!$%\^&\*;:{}=\-_`~()]+$/)) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  //This function checks whether the zipcode is of length 4 or not.

  service.isZipCodeLength = function(zipCode) {
    if (zipCode) {
      if (zipCode.length < 4) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  //This function is used to check whether the zipcode contains only zero or not
  service.isZipCodeZero = function(zipCode) {
    zipCode = parseInt(zipCode);
    if (zipCode == 0) {
      return true;
    } else {
      return false;
    }
  }

  //This function whether a bank account number is valid or invalid

  service.isValidBankAccount = function(bankAccountNumber) {
    var isValid = {
      invaildBankAccount: false,
      touched: false
    }
    if (bankAccountNumber) {
      bankAccountNumber = bankAccountNumber.split(' ').join('');
      bankAccountNumber = bankAccountNumber.split('.').join('');
      //This regex is used to check banck account no
      // valid - 8888.88.88888 , 88888888888
      //invalid - abcdhcnc , 88888888888888
      if (bankAccountNumber.length == 11 && bankAccountNumber.match(/^[0-9]+\.?[0-9]*$/)) {
        isValid.invaildBankAccount = false;
        isValid.touched = false;
      } else {
        isValid.invaildBankAccount = true;
        isValid.touched = true;
      }
    }
    return isValid;
  }



//This function whether a bank account number is valid or invalid

service.isValidBankAccount = function(bankAccountNumber) {
   var isValid = {
     invaildBankAccount: false,
     touched: false
   }
   if (bankAccountNumber) {
     bankAccountNumber = bankAccountNumber.split(' ').join('');
     bankAccountNumber = bankAccountNumber.split('.').join('');
     //This regex is used to check banck account no
     // valid - 8888.88.88888 , 88888888888
     //invalid - abcdhcnc , 88888888888888
     if (bankAccountNumber.length == 11 && bankAccountNumber.match(/^[0-9]+\.?[0-9]*$/)) {
       isValid.invaildBankAccount = false;
       isValid.touched = false;
     } else {
       isValid.invaildBankAccount = true;
       isValid.touched = true;
     }
   }
   return isValid;
 }

//If land is norway zip code must be 4 digits
 service.isLandNorway = function(land,zipcode){
    if(land=='Norway' && zipcode!=undefined){
        if(zipcode.length>4){
          return true;
        }
        else{
          return false;
        }
    }


    else{
      return false;
    }
  }

  


  return service;
}

export default {
  name: 'validationService',
  fn: validationService
};
