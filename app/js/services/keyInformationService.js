function keyInformationService(webService, $q) {
  'ngInject';


  const service = {};

  service.keyInformation = function(param) {
    var deferObject;
    deferObject = deferObject || $q.defer();
    var promise = webService.post('keyInfo', param);
    promise.then(function(response) {
        if (response.statusText == 'OK') {
          deferObject.resolve(response);
        } else {
          deferObject.reject('Unable to change..');
        }
      },
      function(reason) {
        deferObject.reject(reason);
      });
    return deferObject.promise;
  };

  return service;

}
export default {
  name: 'keyInformationService',
  fn: keyInformationService
};
