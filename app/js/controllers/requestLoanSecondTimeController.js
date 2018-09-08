function requestLoanSecondTimeCtrl(navigationHandlerService, requestLoanSecondTimeService, sharedValues, popUpService, $rootScope, utilService,$scope) {
  'ngInject'


  const vm = this;

  vm.init = function() {
    try {
      $scope.util = utilService;
      navigationHandlerService.stateChange('requestLoanSecondTime');
      vm.initalizer();
    } catch (err) {
      console.error(err);
    }
  }
  //Initialize the variables
  vm.initalizer = function() {

    try {
      vm.loanForm = {
        accountID: '',
        loanDetails: '',
        accountDetails: ''
      }

      vm.loanDetails = {
        loanAmount:'',
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
        multiplePeopleRequired: ''
      }

      vm.flagReset();
    } catch (err) {
      console.error(err);
    }

  }
  //Reset Amount Validation Flag
  vm.flagReset = function() {
    try {
      vm.isAmountZero = false;
      vm.isAmountGreater = false;
      vm.invalidAmount = false;
    } catch (err) {
      console.error(err);
    }
  }
  //Request Loan API
  vm.requestLoan = function() {
    try {
      vm.accountID = $scope.util.setAccountId();
      var loanDetails = new Array();
      loanDetails.push(vm.loanDetails);
      var accountDetails = new Array();
      accountDetails.push(vm.accountDetails);
    
      vm.loanForm = {
        accountID: vm.accountID,
        loanDetails: loanDetails,
        accountDetails: accountDetails
      };
      //Calling the request loan api
      var promise = requestLoanSecondTimeService.requestForLoan(vm.loanForm);
      promise.then(function(answer) {

        if(answer.data.message=='Failed to authenticate token.'){
         
             $rootScope.$broadcast('logOutUser');
          }
          //API SUCCESS
         else if (answer.data.status == 'Success') {
            var value = true;
            $rootScope.$broadcast('getDetailsOfUserforBorrower', value);
            navigationHandlerService.stateChange('successOfRequestLoan');
          }
          //API FAILURE because of Invalid Discount code 
          else {
            if (answer.data.errorMessage == 'Invalid Discount Code') {
              popUpService.popUpShow('Beklager!', 'Ugyldig rabattkode.');
            } else {
              //Something Went Wrong
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


  //Input Amount Validation
   vm.inputAmount = function() {
    try {
      if (vm.loanDetails.loanAmount) {
        vm.amount = vm.loanDetails.loanAmount.split(' ').join('');
        vm.amount = vm.amount.split(',').join('.');
        
        //This Regex is used for Norwegian currency.
        //Valid Input Amount - 1 000,50 / 100 000 / 100,80
        //Invalid Amount - 1000.80 / 1   000 /,,,,,,100 / 100,,,,,80 /,80
        if (!vm.loanDetails.loanAmount.match(/^((?:^\d{1,3}(?:\s?\d{3})*(?:,\d{2})?$)|(?:^\d{1,3}(?:,?\d{3})*(?:\s\d{2})?$))/))
       {
          vm.flagReset();
          vm.invalidAmount = true;
        } else {
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
          else if(vm.amount > 10000000)
          {
             vm.flagReset();
            vm.isAmountGreater = true;
          } else {
            vm.flagReset();
          }
        }

      } else {
        vm.flagReset();
      }
    } catch (err) {
      console.error(err);
    }

  }

  //Validation For Submit Loan
  vm.disableSubmit = function() {
    try {
      if (vm.loanDetails.loanAmount && vm.loanDetails.term && vm.loanDetails.whatIsTheLoanFor && vm.loanDetails.loanType) {
        if (vm.isAmountZero == false && vm.isAmountGreater == false && vm.invalidAmount == false) {
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
  name: 'requestLoanSecondTimeCtrl',
  fn: requestLoanSecondTimeCtrl
};
