function financialSummaryCtrl(AppSettings, sharedValues, $rootScope) {
  'ngInject';
  // ViewModel
  const vm = this;

  //This function is called when the page is loaded

  vm.init = function() {
    try {
      vm.initialize();
      vm.show();
    } catch (e) {
      console.error(e);
    }
  }

  //This function initializes all the variables used in this controller

  vm.initialize = function() {
    try {
      vm.financialSummaryPics = [];
      vm.financialSummary = '';
      vm.placeholder = AppSettings.investApplicationPagesPlaceholer;
    } catch (e) {
      console.error(e);
    }
  }

  //This function shows the funancial Summary text and pictures of a loanId

  vm.show = function() {
    try {
      if (Object.keys(sharedValues.businessProfile).length != 0) {
        vm.financialSummary = sharedValues.businessProfile.data.loanDetails.Application__r.Financial_Summary__c;
        if (sharedValues.businessProfile.data.financialSummaryPics.length != 0) {
          vm.financialSummaryPics = sharedValues.businessProfile.data.financialSummaryPics;
        }
      }
    } catch (e) {
      console.error(e);
    }

  }
  $rootScope.$on('apis', function() {
    vm.init();
  });

  vm.init();
}

export default {
  name: 'financialSummaryCtrl',
  fn: financialSummaryCtrl
};
