function signUpAsABorrowerService(webService, $q) {
  'ngInject';


  const service = {};

  //Signup as borrower Method
  service.signUp = function(param) {
    var deferObject;
    deferObject = deferObject || $q.defer();
    //Signup as borrower API call
    var promise = webService.post('applicantRegister', param);
    promise.then(function(response) {
        if (response.statusText == 'OK') {
          // this callback will be called asynchronously
          // when the response is available
          deferObject.resolve(response);
        } else {
          deferObject.reject('Unable to register..');
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
  name: 'signUpAsABorrowerService',
  fn: signUpAsABorrowerService
};
