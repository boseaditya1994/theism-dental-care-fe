function signUpService(webService, $q) {
  'ngInject';
  const service = {};

  //This function calls the applicantRegister API when the user submits the whole form
  service.signUp = function(param) {
    var deferObject;
    deferObject = deferObject || $q.defer();
    var promise = webService.post('applicantRegister', param);
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

  service.emailVerification = function(param) {
    var deferObject;
    var params = {};
    params.verificationCode = param;
    deferObject = deferObject || $q.defer();
    var promise = webService.post('emailVerification', param);
    promise.then(
      function(response) {
        if (response) {

          deferObject.resolve(response);
        } else {
          deferObject.reject(response);
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
  name: 'signUpService',
  fn: signUpService
};
