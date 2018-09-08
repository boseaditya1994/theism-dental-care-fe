function forgotPasswordService(webService, $q) {
  'ngInject';

  //gets the token for reset password
  const service = {};

  //ResetPassword API
  service.forgotPassword = function(param) {
    var deferObject;
    var params = {};
    params.verificationCode = param;
    deferObject = deferObject || $q.defer();


    var promise = webService.post('forgotPasswordVerifyCode', param);


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
  name: 'forgotPasswordService',
  fn: forgotPasswordService
};
