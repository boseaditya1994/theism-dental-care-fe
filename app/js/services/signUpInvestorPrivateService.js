function signUpInvestorPrivateService(webService, $q) {
  'ngInject';
  const service = {};

  //This function calls the SignUpInvestor API when the user submits the whole form

  service.continue = function(param) {
    var deferObject;
    deferObject = deferObject || $q.defer();
    var promise = webService.post('signUpInvestor', param);
    promise.then(function(response) {
        if (response.data.errorMessage == 'Succesfully Done') {
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

  //This function calls the bankIdValidation API through which a user can validate his her Bank Account

  service.bankIdValidation = function(param) {
    var deferObject;
    deferObject = deferObject || $q.defer();
    var promise = webService.post('SigneraSynchronousSign', param);
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
  name: 'signUpInvestorPrivateService',
  fn: signUpInvestorPrivateService
};
