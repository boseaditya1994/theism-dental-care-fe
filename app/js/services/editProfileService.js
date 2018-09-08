function editProfileService(webService, $q) {
  'ngInject';


  const service = {};

  //This function calls the signUpInvestor API when the user submits the whole form
  service.editProfile = function(param) {
    var deferObject;
    deferObject = deferObject || $q.defer();


    var promise = webService.post('signUpInvestor', param);
    promise.then(function(response) {

      if (response.statusText == 'OK') {
        // this callback will be called asynchronously
        // when the response is available


        deferObject.resolve(response);
      } else {


        deferObject.reject('Unable to register..');
      }
    }, function(reason) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      deferObject.reject(reason);
    });

    return deferObject.promise;
  };


  return service;

}
export default {
  name: 'editProfileService',
  fn: editProfileService
};
