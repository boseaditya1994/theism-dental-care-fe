function investController($scope, AppSettings, sharedValues, investService, utilService) {
  'ngInject';
  const vm = this;

  //This function initialises variables which are being used in this controller and calls functions on page loading

  vm.init = function() {
    try {
      $scope.util = utilService;
      vm.initialize();
      vm.investListView();
    } catch (e) {
      console.error(e);
    }
  }

  //This function initialises variables which are being used in this controller  

  vm.initialize = function() {
    try {
      vm.loanDetails = [];
      vm.loanDetailsCopy = [];
      vm.countLoan = 0;
      vm.placeholder = AppSettings.investListViewPlaceholder;
      sharedValues.businessProfile = {};
      sharedValues.isPercentFundedVisible = false;
    } catch (e) {
      console.error(e);
    }
  }

  //This function shows all loans present in marketplace

  vm.investListView = function() {
    try {
      sharedValues.businessProfile = {};
      var promise = investService.invest();
      promise.then(function(answer) {
        if(answer.data.message=='Failed to authenticate token.'){
          console.error('Failed to authenticate token.');
        }
          else{
          var x = answer.data;

          
          for (var i = 0; i < x.activeLoanList.length; i++) {
            var y = x.activeLoanList[i].Application__c;
            if (x.profile[y]) {
              x.activeLoanList[i].pic = x.profile[y];
            }
          }
          var t = '';
          var s = 0;
          for (var i = 0; i < answer.data.activeLoanList.length; i++) {
            if (answer.data.activeLoanList[i].peer__Time_Left__c.indexOf('-') != 0) {
              if (answer.data.activeLoanList[i].Day_s__c > 0) {
                t = answer.data.activeLoanList[i].Day_s__c + ' Days';
              } else if (answer.data.activeLoanList[i].Day_s__c == 0) {
                t = answer.data.activeLoanList[i].Hour_s__c + ' Hours ' + answer.data.activeLoanList[i].Minute_s__c + ' Minutes';
              }
              else if(answer.data.activeLoanList[i].Day_s__c < 0)
              {
                t = answer.data.activeLoanList[i].Hour_s__c + ' Hours ' + answer.data.activeLoanList[i].Minute_s__c + ' Minutes';
              }
               else {
                t = answer.data.activeLoanList[i].Day_s__c + ' Days ' + answer.data.activeLoanList[i].Hour_s__c + ' Hours ' + answer.data.activeLoanList[i].Minute_s__c + ' Minutes';
              }
              s = (answer.data.activeLoanList[i].Day_s__c * 24 * 60 * 60) + (answer.data.activeLoanList[i].Hour_s__c * 60) + (answer.data.activeLoanList[i].Minute_s__c);
              answer.data.activeLoanList[i].timeLeft = t;
              answer.data.activeLoanList[i].timeLeftInMinutes = s;
              vm.loanDetails.push(answer.data.activeLoanList[i]);
            }
          }
          vm.loanDetailsCopy = vm.loanDetails;

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

  vm.init();

}

export default {
  name: 'investController',
  fn: investController
};
