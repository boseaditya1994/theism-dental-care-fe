function investorSummaryService(webService, $q) {
  'ngInject';

  const service = {};

  //This function fetches all the details of a current logged in user

  service.summary = function(param) {
    var deferObject;
    deferObject = deferObject || $q.defer();
    var promise = webService.post('profileView', param);
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
  name: 'investorSummaryService',
  fn: investorSummaryService
};
