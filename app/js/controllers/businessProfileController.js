function businessProfileCtrl(AppSettings, sharedValues, $rootScope) {
  'ngInject';
  const vm = this;

  //This function is called on page loading

  vm.init = function() {
    vm.initialize();
    vm.show();
  }

  //This function initializes all the variables which are used in this controller

  vm.initialize = function() {
    vm.businessProfile = '';
    vm.placeholder = AppSettings.investApplicationPagesPlaceholer;
    vm.profile = '';
    vm.profilePic = [];
    vm.length = 0;
  }

  //This functions shows the businessProfile of a loanId

  vm.show = function() {
    if (Object.keys(sharedValues.businessProfile).length != 0) {
      if (sharedValues.businessProfile.data.loanDetails.Application__r.Business_Profile__c) {
        vm.profile = sharedValues.businessProfile.data.loanDetails.Application__r.Business_Profile__c;
      }
      if (sharedValues.businessProfile.data.businessPic.length != 0) {
        vm.profilePic = sharedValues.businessProfile.data.businessPic;
      } 
    }
  }

  $rootScope.$on('apis', function() {
    vm.init();
  });

  vm.init();

}

export default {
  name: 'businessProfileCtrl',
  fn: businessProfileCtrl
};
