function loanDetailsCtrl($scope, $stateParams, $state, $rootScope, sharedValues, keyInformationService, utilService, navigationHandlerService) {
  'ngInject';
  // ViewModel
  const vm = this;

  //This function is called on page loading

  vm.init = function() {
    try {
      $scope.util = utilService;
      vm.initialization();
      vm.loanDetails();
    } catch (e) {
      console.error(e);
    }
  }

  //This function initializes the variables used by the controller

  vm.initialization = function() {
    try {
      vm.active = 'keyInformation';
      var id = $stateParams.loanId;
      sharedValues.loanId = id;
      vm.form = {
        applicationId: sharedValues.loanId,
        accountID: ''

      };

      vm.bidToInvestForm = {
        amount: '',
        isAmountZero: false,
        isAmountGreater: false,
        invalidAmount: false,
        isAmountGreaterThanInvestment:false
      };
      vm.interestRate = '';
      vm.name = '';
      vm.rating = '';
      vm.duration = '';
      vm.interestRate = '';
      vm.biddersAlready = '';
      vm.amountAlreadyInvestedInLoan = '';
      vm.amountAvailableForFurtherInvestment = '';
      vm.readyForFund = '';
      vm.expiryDay ='';
      vm.isPercentFundedVisible=false;
      vm.tabs = [
        { title: 'Oversikt', route: 'keyInformation' },
        { title: 'Om bedriften', route: 'businessProfile' },
        { title: 'Kredittkarakter', route: 'creditScore' },
        { title: 'Finansiell informasjon', route: 'financialSummary' }
      ];
      vm.amount = '';
      vm.isValid = {};
      bidToInvest.amountToInvest.$error={};
    } catch (e) {
      console.error(e);
    }
  }

  //This function fetches the loan details of the a given loan id

  vm.loanDetails = function() {
    try {

      vm.accountID = $scope.util.setAccountId();
      vm.form.accountID = vm.accountID;
      var promise = keyInformationService.keyInformation(vm.form);
      promise.then(function(answer) {
        if(answer.data.message=='Failed to authenticate token.'){
          console.error('Failed to authenticate token.');
        }
        else{
          if (answer.data.loanDetails.Loan_Title__c) {
            vm.name = answer.data.loanDetails.Loan_Title__c;
          } else {
            vm.name = 'Uten navn';
          }
          sharedValues.loanName = vm.name;
          vm.rating = answer.data.loanDetails.peer__Credit_Band_Type__c;
          sharedValues.rating = vm.rating;
          vm.duration = answer.data.loanDetails.peer__Term__c;
          vm.interestRate = answer.data.loanDetails.peer__Interest_Rate__c;
          vm.biddersAlready = answer.data.biddersAlready;
          vm.amountAlreadyInvestedInLoan = answer.data.yourAmt;
          vm.amountAvailableForFurtherInvestment = answer.data.loanDetails.peer__Remaining_Requested_Amount__c;
          vm.percentFunded = answer.data.loanDetails.peer__Percent_Funded__c;
          vm.sentAgreement =answer.data.loanDetails.Sent_Agreement__c;
          vm.stage=answer.data.loanDetails.peer__Stage__c;
          vm.documentGenerated = answer.data.loanDetails.Document_Generated__c;
          vm.readyForFund = answer.data.loanDetails.Ready_for_fund__c;
          vm.expiryDay = answer.data.loanDetails.Day_s__c;
          vm.viewPecentFundedAndLoanDetails();

        }
        },
        function(reason) {
          var err = reason;
          console.error(err);
        });
    } catch (e) {
      console.error(e);
    }
  }

  //This function opens the popup where a user can bid for a loan

  vm.bidToInvest = function() {
    try {
      sharedValues.amountToInvest = vm.bidToInvestForm.amount;
      utilService.uibModalOpen('bidToInvestCtrl as bid', 'bidModal.html')
    } catch (e) {
      console.error(e);
    }
  }

  //This function checks whether an amount entered by the user is valid or not

  vm.inputAmount = function() {
    try {
      if (vm.bidToInvestForm.amount) {
        bidToInvest.amountToInvest.$error.customError = false;
        vm.amount = vm.bidToInvestForm.amount.toString();
        vm.amount = vm.amount.split(' ').join('');
        var availableFunds = $rootScope.availableFunds;
        if (vm.bidToInvestForm.amount < 0) {
          vm.flagReset();
          vm.bidToInvestForm.invalidAmount = true;
        }

        if (vm.amount > availableFunds) {
          vm.flagReset();
          vm.bidToInvestForm.isAmountGreater = true;

        } 
        else if(vm.amount >vm.amountAvailableForFurtherInvestment){
              vm.flagReset();
          vm.bidToInvestForm.isAmountGreaterThanInvestment=true;
        }
        else if (!vm.amount.match(/^[0-9]+\.?[0-9]*$/)) {
          vm.flagReset();
          vm.bidToInvestForm.invalidAmount = true;
        } else {
          vm.flagReset();
        }
      } else {
        vm.flagReset();
         bidToInvest.amountToInvest.$error.customError = true;
      }

    } catch (e) {
      console.error(e);
    }
  }





  vm.flagReset = function() {
    try {
      vm.bidToInvestForm.isAmountZero = false;
      vm.bidToInvestForm.isAmountGreater = false;
      vm.bidToInvestForm.invalidAmount = false;
      vm.bidToInvestForm.isAmountGreaterThanInvestment=false;
    } catch (e) {
      console.error(e);
    }
  }

  //This function  disables the button if the user given an invalid amount as input

  vm.disable = function() {
    try {
      if (vm.bidToInvestForm.amount) {
        if (vm.bidToInvestForm.isAmountZero == false && vm.bidToInvestForm.isAmountGreater == false && vm.bidToInvestForm.invalidAmount == false && vm.bidToInvestForm.isAmountGreaterThanInvestment==false) {
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

  //This function ensure that a tab is active when clicked upon

  _.each(vm.tabs,
    function(tab) {
      try {
        if ($state.is('loan.' + tab.route)) {
          vm.active = tab.route;
        }
      } catch (e) {
        console.error(e);
      }
    });

  //This functiom is takes the user to selected tab page

  vm.tabSelected = function(route) {
    try {
      vm.active = route;
      navigationHandlerService.stateChange('loan.' + route);
    } catch (e) {
      console.error(e);
    }
  };

  vm.viewPecentFundedAndLoanDetails = function()
  {
    try
    {
      if((vm.percentFunded < 100) && (vm.stage=='In Funding') && (vm.readyForFund == false) && (vm.expiryDay >0) )
      {
        vm.isPercentFundedVisible=true;
      }
      else
      {
        vm.isPercentFundedVisible=false;
      }
      sharedValues.isPercentFundedVisible=vm.isPercentFundedVisible;
    }
    catch(e)
    {
      console.error(e);
    }
  }

  $rootScope.$on('bidToInvest', function() {
    vm.loanDetails();
  });
  vm.init();
}

export default {
  name: 'loanDetailsCtrl',
  fn: loanDetailsCtrl
};
