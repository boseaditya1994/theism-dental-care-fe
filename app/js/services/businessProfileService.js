function businessProfileService(webService, $q) {
  'ngInject';


  const service = {};
  service.fetch = function(param) {
    var deferObject;
    deferObject = deferObject || $q.defer();
    var promise = webService.post('businessCreditFinancailInfo', param);
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
  name: 'businessProfileService',
  fn: businessProfileService
};
