function changePasswordService(webService, $q) {
  'ngInject';


  const service = {};

  service.save = function(param) {
    var deferObject;
    deferObject = deferObject || $q.defer();
    var promise = webService.post('changePassword', param);
    promise.then(function(response) {
        if (response.statusText == 'OK') {
          // this callback will be called asynchronously
          // when the response is available
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
  name: 'changePasswordService',
  fn: changePasswordService
};
