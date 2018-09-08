function transactionOutService(webService, $q) {
  'ngInject';


  const service = {};

  //This function calls the transactionOut API when the user withdraw money
  service.transactionOut = function(param) {
    var deferObject;
    deferObject = deferObject || $q.defer();


    var promise = webService.post('transactionOut', param);
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
  name: 'transactionOutService',
  fn: transactionOutService
};
