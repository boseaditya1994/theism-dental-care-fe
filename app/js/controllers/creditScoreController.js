function creditScoreCtrl(AppSettings, sharedValues, $rootScope, popUpService) {
  'ngInject';
  // ViewModel
  const vm = this;

  vm.init = function() {
    try {
      vm.initialize();
    } catch (e) {
      console.error(e);
    }
  }

  vm.initialize = function() {
    try {
      vm.placeholder = AppSettings.investApplicationPagesPlaceholer;
      vm.creditScore = '';
      vm.creditPics = [];
      vm.creditClass=sharedValues.rating;
      vm.show();
    } catch (e) {
      console.error(e);
    }
  }

  vm.show = function() {
    try {
      if (Object.keys(sharedValues.businessProfile).length != 0) {
        if (sharedValues.businessProfile.data.loanDetails.Application__r.Credit_Score__c) {
          vm.creditScore = sharedValues.businessProfile.data.loanDetails.Application__r.Credit_Score__c;
        }
        if (sharedValues.businessProfile.data.creditScorePics.length > 0) {
          vm.creditPics = sharedValues.businessProfile.data.creditScorePics;
        } 
      }
    } catch (e) {
      console.error(e);
    }
  }

  vm.popUp=function()
  {
    popUpService.popUpShow('','');
  }

  $rootScope.$on('apis', function() {
    vm.init();
  });

  vm.init();
}

export default {
  name: 'creditScoreCtrl',
  fn: creditScoreCtrl
};
