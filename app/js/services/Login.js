function LoginService(webService, $q) {
  'ngInject';

  const service = {};


  //Timestamp API called on logout
  service.logoutTimestamp = function(param) {
    var deferObject;
    var promise = webService.post('lastLoggedOn', param);
    deferObject = deferObject || $q.defer();
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
  }


  // LoginSF API
  service.apiLogin = function() {
    var deferObject;
    var promise = webService.get('loginSF');
    deferObject = deferObject || $q.defer();
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
  //API for fetching the details of the user
  service.userLogin = function(param) {
    var deferObject;
    var promise = webService.post('applicantLogin', param);
    deferObject = deferObject || $q.defer();
    promise.then(
      function(response) {
        if (response) {
          deferObject.resolve(response);
        } else {
          if (response && response.data.errorMessage) {
            deferObject.reject(response.data.message);
          } else {
            deferObject.reject(response);
          }
        }
      },
      function(reason) {
        deferObject.reject(reason);
      });

    return deferObject.promise;
  };

  //API for forgot password
  service.forgotPasswordEmailVerify = function(param) {
    var deferObject;
    var params = {};
    params.verificationCode = param;
    deferObject = deferObject || $q.defer();
    var promise = webService.post('forgotPassword', param);


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
  name: 'LoginService',
  fn: LoginService
};
