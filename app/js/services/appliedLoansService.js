function appliedLoansService(webService, $q) {
  'ngInject';


  const service = {};
  service.fetch = function(param) {
    var deferObject;
    deferObject = deferObject || $q.defer();
    var promise = webService.post('retrieveLoanApplication', param);
    promise.then(function(response) {
        if (response.statusText == 'OK') {
          deferObject.resolve(response);
        } else {
          deferObject.reject('Unable to change..');
        }
      },
      function(reason) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        deferObject.reject(reason);
      });
    return deferObject.promise;
  };

  return service;

}
export default {
  name: 'appliedLoansService',
  fn: appliedLoansService
};
