function signereKYCFailCtrl(navigationHandlerService) {
  'ngInject';
  // ViewModel
  const vm = this;

  vm.goBackFail = function() {
    try {
      navigationHandlerService.stateChange('invest');
      
    } catch (err) {
      console.error(err);
    }

  }

}

export default {
  name: 'signereKYCFailCtrl',
  fn: signereKYCFailCtrl
};
