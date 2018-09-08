function bidToInvestLoanService(webService, $q) {
  'ngInject';


  const service = {};

  service.bidToInvestLoan = function(param) {
    var deferObject;
    deferObject = deferObject || $q.defer();
    var promise = webService.post('bidToInvest', param);
    promise.then(function(response) {
      if (response.statusText == 'OK') {
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
  name: 'bidToInvestLoanService',
  fn: bidToInvestLoanService
};
