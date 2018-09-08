function userService(sharedValues,$cookies, $rootScope, navigationHandlerService,$timeout, investorSummaryService, $window, $location, utilService) {
  'ngInject';
  const service = {};
  service.detailsOfUser = function() {
    try {
       var isAllowBroadcast=true;
      if (sharedValues.userInfo.accountID != '') {
        service.accountID = sharedValues.userInfo.accountID;
      }
      var form = {
        accountID: service.accountID
      }
      var promise = investorSummaryService.summary(form);
      promise.then(function(answer) {

          
          if(answer.data.errorMessage=='No Account found' || answer.data.message=='Failed to authenticate token.'){
         
             $rootScope.$broadcast('logOutUser');
          }
          else{
          sharedValues.details = answer;
          if (answer.data && answer.data.investorDetails.length > 0) {
            //vm.isChartVisible=true;
            sharedValues.isChartVisible = true;
            sharedValues.bidParts = answer.data.bidsPartsList;
            sharedValues.loanParts = answer.data.loanPartsList;
            sharedValues.investorTrustAccount = answer.data.investorTrustAccount;
            sharedValues.investorBank = answer.data.investorBank;
            sharedValues.investorDetails = answer.data.investorDetails[0];
            sharedValues.companyBankDetails = answer.data.companyBankDetails[0];
            sharedValues.accountNumber = answer.data.investorDetails[0].AccountNumber;
            sharedValues.availableFunds = sharedValues.details.data.investorDetails[0].peer__Funds_Available_For_Investment__c;
            sharedValues.noOfLoan = answer.data.noOfLoansApliedFor;
            $rootScope.accountNumber = sharedValues.accountNumber;
            $rootScope.availableFunds = sharedValues.availableFunds;
            $rootScope.noOfLoan = sharedValues.noOfLoan;
            $rootScope.sendAgreement = answer.data.investorDetails[0].peer__Sign_Agreement__c;
            sharedValues.userInfo.sendAgreement = $rootScope.sendAgreement;
            $rootScope.reelle = answer.data.investorDetails[0].Are_multiple_people_required_to_co_sign__c;
            $rootScope.multiple = answer.data.investorDetails[0].Are_multiple_people_required_to_co_sign__c;
            for (var i = 0; i < answer.data.validAmt.length; i++) {
              sharedValues.loanAmount[i] = answer.data.validAmt[i];
            }
            $rootScope.amount = sharedValues.loanAmount;
            if ($rootScope.typeOfApplicant == 'Investor') {
              if ($rootScope.typeOfInvestor == 'Privatperson (Private person)') {
                if (sharedValues.investorDetails.peer__First_Name__c != undefined && sharedValues.investorDetails.peer__Last_Name__c != undefined) {
                  $rootScope.headerName = sharedValues.investorDetails.peer__First_Name__c + ' ' + sharedValues.investorDetails.peer__Last_Name__c;
                }
              } else {
                if (sharedValues.investorDetails.Company_Name__c != undefined) {
                  $rootScope.headerName = sharedValues.investorDetails.Company_Name__c;
                }
              }
            } else {
              if (sharedValues.investorDetails.Company_Name__c != undefined) {
                $rootScope.headerName = sharedValues.investorDetails.Company_Name__c;
              }
            }
            utilService.cookiesSet('userInfo', JSON.stringify(sharedValues.userInfo));
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
            if (service.isrequestForLoan) {
              navigationHandlerService.stateChange('successOfRequestLoan');
              service.isrequestForLoan = false;
            } else if (service.isTransferOut) {
              navigationHandlerService.stateChange('transfer.out');
              isAllowBroadcast = false;
            } else if (service.isInvest) {
              if ((window.location.href.indexOf('/keyInformation')) || (window.location.href.indexOf('/businessProfile')) || (window.location.href.indexOf('/creditScore')) || (window.location.href.indexOf('/financialSummary')) )
                service.isInvest = false;
              isAllowBroadcast = false;
            } else {
              service.stateChange();
              
            }
            if(isAllowBroadcast){
              $timeout(function(){
                $rootScope.$broadcast('userDetailsUpdate');
              },500);
           }
           
            $rootScope.userDetailsPopulated = true;
          }

        }

        },
        function(reason) {
          var err = reason;
          console.error(err);
        });
    } catch (err) {
     
      console.error(err);
    }


  }


  service.stateChange = function() {
    var url = window.location.href;
    var invalidUrl = url.endsWith('/') || url.endsWith('/Login') || url.endsWith('/signUpAsAnInvestor') || url.endsWith('/signUpAsABorrower') || url.endsWith('/manualSignUp');
    if ($rootScope.typeOfApplicant == 'Investor') {
      if ($rootScope.firstTimeApplicant == false) {
        if ($rootScope.typeOfInvestor == 'Privatperson (Private person)') {
          navigationHandlerService.stateChange('signUpAsInvestorPrivate1');
        } else {
          navigationHandlerService.stateChange('signUpAsInvestorCompany1');
        }
      } else {
        var sendAgreement = sharedValues.details.data.investorDetails[0].peer__Sign_Agreement__c;
        var reelle = sharedValues.details.data.investorDetails[0].Are_multiple_people_required_to_co_sign__c;
        var multiple = sharedValues.details.data.investorDetails[0].Are_multiple_people_required_to_co_sign__c;
        if ($rootScope.typeOfInvestor == 'Bedrift (Company)') {
          if (reelle == true && multiple == false && sendAgreement == false) {
            navigationHandlerService.stateChange('manualSignUp');
          } else if (reelle == false && multiple == true && sendAgreement == false) {
            navigationHandlerService.stateChange('manualSignUp');
          } else if (reelle == true && multiple == true && sendAgreement == false) {
            navigationHandlerService.stateChange('manualSignUp');
          } else if (reelle == false && multiple == false && sendAgreement == false) {
            navigationHandlerService.stateChange('processingBankIdValidation');
          }else if(invalidUrl){
            navigationHandlerService.stateChange('investorSummary');
          }
        }else{
          if (sendAgreement == false ) {
            navigationHandlerService.stateChange('processingBankIdValidation');
          } else if(invalidUrl){
            navigationHandlerService.stateChange('investorSummary');
          }
        }
      }
    } else {
      if ($rootScope.firstTimeApplicant == false) {
        navigationHandlerService.stateChange('requestLoadFirstTime');
      } else {
        if(invalidUrl){
          navigationHandlerService.stateChange('borrowerDashboard.appliedLoans');
        }
      }
    }
  }

  service.getApplicantTypeAndEmail = function() {
    try {
        $rootScope.sendAgreement = sharedValues.userInfo.sendAgreement;
        $rootScope.accountEmail = sharedValues.userInfo.accountEmail;
        if(sharedValues.userInfo.headerName)
          $rootScope.headerName = sharedValues.userInfo.headerName;
        else
          $rootScope.headerName = sharedValues.userInfo.accountEmail;
        $rootScope.typeOfInvestor = sharedValues.userInfo.typeOfInvestor;
        $rootScope.typeOfApplicant = sharedValues.userInfo.typeOfApplicant;
        $rootScope.reelle = sharedValues.userInfo.reelle;
        $rootScope.multiple = sharedValues.userInfo.multiple;
        $rootScope.firstTimeApplicant = sharedValues.userInfo.firstTimeApplicant;
        $rootScope.accountNumber = sharedValues.accountNumber;
        $rootScope.availableFunds = sharedValues.availableFunds;
        $rootScope.noOfLoan = sharedValues.noOfLoan;
        $rootScope.show = true;
    } catch (err) {
      console.error(err);
    }

  }

  return service;
}
export default {
  name: 'userService',
  fn: userService
};
