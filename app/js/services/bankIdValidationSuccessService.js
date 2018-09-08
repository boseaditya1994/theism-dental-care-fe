function bankIdValidationSuccessService(webService, $q) {
  'ngInject';


  const service = {};

  service.SyncSignUpdate = function(param) {
    var deferObject;
    deferObject = deferObject || $q.defer();
    var promise = webService.post('SyncSignUpdate', param);
    promise.then(function(response) {
      if (response.statusText == 'OK' ) {
        deferObject.resolve(response);
      } else {
        deferObject.reject('Unable to register..');
      }
    }, function(reason) {
      deferObject.reject(reason);
    });

    return deferObject.promise;
  };




  return service;

}
export default {
  name: 'bankIdValidationSuccessService',
  fn: bankIdValidationSuccessService
};