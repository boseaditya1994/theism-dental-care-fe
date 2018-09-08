function navigationHandlerService($state) {

  'ngInject';
  const service = {};

  service.stateChange = function(state) {
    $state.go(state);
  }


  return service;

}
export default {
  name: 'navigationHandlerService',
  fn: navigationHandlerService
};
