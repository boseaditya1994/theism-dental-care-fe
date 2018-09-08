function investService(webService, $q) {
  'ngInject';


  const service = {};

  service.invest = function(param) {
    var deferObject;
    deferObject = deferObject || $q.defer();
    var promise = webService.post('investListView', param);
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
  name: 'investService',
  fn: investService
};
