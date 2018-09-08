function keyInformationCtrl($scope, AppSettings, keyInformationService, sharedValues, utilService, businessProfileService, $rootScope) {
  'ngInject';
  // ViewModel
  const vm = this;

  //This function is called on page loading

  vm.init = function() {
    try {
      $scope.util=utilService
      vm.initialize();
      vm.keyInformation();
    } catch (e) {
      console.error(e);
    }
  }

  //This function initiaizes all the variables used in this controller

  vm.initialize = function() {
    try {
      vm.form = {
        applicationId: sharedValues.loanId,
        accountID: ''
      }

      vm.formBusinessProfile = {
        applicationId: sharedValues.loanId
      }
      vm.requestedLoanAmount = '';
      vm.interestRate = '';
      vm.percentFunded = '';
      vm.riskBand = '';
      vm.timeLeft = ''
      vm.EstimatedAnnualBadDebtRate = '';
      vm.borrowerName = '';
      vm.businessRegion = '';
      vm.companyType = '';
      vm.yearsSinceStart = '';
      vm.term = '';
      vm.loanPurpose = '';
      vm.industry = '';
      vm.assetSecurity = '';
      vm.placeholder = AppSettings.investApplicationPagesPlaceholer;
      vm.sentAgreement=false;
      vm.isPercentFundedVisible=false;
      vm.documentGenerated=false;
      vm.isProfilePic = false;
    } catch (e) {
      console.error(e);
    }
  }

  //This function fetched the keyInformation values of a loanId

  vm.keyInformation = function() {
    try {
      vm.accountID = $scope.util.setAccountId();
      vm.form.accountID = vm.accountID;
      var promise = keyInformationService.keyInformation(vm.form);
      promise.then(function(answer) {
        if(answer.data.message=='Failed to authenticate token.'){
          console.error('Failed to authenticate token.');
           $rootScope.$broadcast('logOutUser');
        }
        else{
          vm.requestedLoanAmount = answer.data.loanDetails.peer__Requested_Loan_Amount__c;
          vm.stage=answer.data.loanDetails.peer__Stage__c;
          vm.interestRate = answer.data.loanDetails.peer__Interest_Rate__c;
          vm.percentFunded = answer.data.loanDetails.peer__Percent_Funded__c;
          vm.riskBand = answer.data.loanDetails.peer__Credit_Band_Type__c;
          sharedValues.rating=vm.riskBand;
          if(answer.data.loanDetails.Day_s__c>0)
          {
            vm.timeLeft = answer.data.loanDetails.Day_s__c + ' Days'
          }
          else if(answer.data.loanDetails.Day_s__c == 0)
          {
            vm.timeLeft = answer.data.loanDetails.Hour_s__c + ' Hours ' + answer.data.loanDetails.Minute_s__c + ' Minutes';
          }
          else if(answer.data.loanDetails.Day_s__c < 0)
          {
            vm.timeLeft = answer.data.loanDetails.Hour_s__c + ' Hours ' + answer.data.loanDetails.Minute_s__c + ' Minutes';
          }
          else
          {
            vm.timeLeft = answer.data.loanDetails.Day_s__c + ' Days ' + answer.data.loanDetails.Hour_s__c + ' Hours ' + answer.data.loanDetails.Minute_s__c + ' Minutes';
          }
          vm.EstimatedAnnualBadDebtRate = answer.data.loanDetails.peer__Credit_Rating_Matrix__r.Risk_class__c;
          vm.borrowerName = answer.data.loanDetails.peer__Borrower__r.Company_Name__c;
          vm.businessRegion = answer.data.loanDetails.Application__r.Business_region__c;
          vm.companyType = answer.data.loanDetails.Application__r.Company_type__c;
          vm.yearsSinceStart = answer.data.loanDetails.Application__r.Years_since_start__c;
          vm.term = answer.data.loanDetails.peer__Term__c;
          vm.loanPurpose = answer.data.loanDetails.peer__Loan_Purpose_1__r.Name;
          vm.industry = answer.data.loanDetails.Application__r.Industry__c;
          vm.assetSecurity = answer.data.loanDetails.Application__r.Asset_security__c;
          vm.sentAgreement =answer.data.loanDetails.Sent_Agreement__c;
          vm.documentGenerated = answer.data.loanDetails.Document_Generated__c;
          vm.stage=answer.data.loanDetails.peer__Stage__c;
          if (answer.data.profilePic != null) {
            vm.profilePicture = answer.data.profilePic;
            vm.isProfilePic = true;
          } else {
            vm.isProfilePic = false;
          }
          vm.businessProfile();
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

  //This function converts the timeLeft field to the required form

  vm.timeLeftFilter = function(date) {
    try {
      var finalDate = utilService.timeLeft(date);
      return finalDate;
    } catch (e) {
      console.error(e);
    }
  }

  //This function fetched the businessProfile, Credit Score, and Financial Summary values of a loanId

  vm.businessProfile = function() {
    try {
      var promise = businessProfileService.fetch(vm.formBusinessProfile);
      promise.then(function(answer) {
        if(answer.data.message=='Failed to authenticate token.'){
          console.error('Failed to authenticate token.');
           $rootScope.$broadcast('logOutUser');
        }
        else{
          sharedValues.businessProfile = answer;
          $rootScope.$broadcast('apis');
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

  //This function decides whether to show the percent funded progressbar and loan details

  vm.viewPecentFundedAndLoanDetails = function()
  {
    try
    {
      if((vm.percentFunded < 100) && (vm.stage =='In Funding') && (vm.sentAgreement == false) && (vm.documentGenerated == false) )
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

  vm.init();
}

export default {
  name: 'keyInformationCtrl',
  fn: keyInformationCtrl
};
