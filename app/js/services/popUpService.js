function popUpService($rootScope) {
  'ngInject';


  const service = {};

  service.header = '';
  service.message = '';
  service.popUpShow = function(header, message) {
    service.header = header;
    service.message = message;

    $rootScope.$broadcast('getpopUp');

  };


  service.showChangePassword = function() {
    $('#changePassword').modal('show');
  }

  service.hideChangePassword = function() {
    $('#changePassword').modal('hide');
  }

  return service;

}
export default {
  name: 'popUpService',
  fn: popUpService
};
