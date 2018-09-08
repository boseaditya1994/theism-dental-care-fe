function webService($http, AppSettings, $rootScope, $cookies, popUpService,usSpinnerService) {
  'ngInject';

  const service = {};

  if (AppSettings.appType == 'dev') {
    service.docURL = AppSettings.webhost + ':' + AppSettings.port;
  } else {
    service.docURL = AppSettings.uaturl;
  }

  service.restContextPath = 'https://' + service.docURL + '/api/';


  service.post = function(url, param) {
     
     if(url=='bidToInvest'){
      usSpinnerService.spin('spinner-2');
     }
     else{
      usSpinnerService.spin('spinner-1');
     }
     
    $rootScope.accessToken = $cookies.get('token');
    var parameter = JSON.stringify(param);
    if ($rootScope.accessToken && url.indexOf('applicantLogin')<0 && url.indexOf('signUpAsAnInvestor')<0 && url.indexOf('signUpAsABorrower')<0 && url.indexOf('verifyEmail')<0) {
      var promise = $http({
        method: 'post',
        url: service.restContextPath + url,
        data: {
          parameter,
          token: $rootScope.accessToken
        },
        header: {
          'x-access-token': $rootScope.accessToken
        }

      });

      promise.then(function(answer) {
        if(url=='bidToInvest'){
      usSpinnerService.stop('spinner-2');
     }
     else{
      usSpinnerService.stop('spinner-1');
     }
        
        if (answer && answer.status == 200) {}
      }, function(reason) {
        if (reason.status == -1) {
          popUpService.popUpShow('Beklager!', 'Vennligst sjekk nett-tilkoblingen din, og prøv igjen.');
      }
      });
      return promise;
    } else {
      var promise = $http({
        method: 'post',
        url: service.restContextPath + url,
        data: param

      });
      promise.then(function(answer) {
        if(url=='bidToInvest'){
      usSpinnerService.stop('spinner-2');
     }
     else{
      usSpinnerService.stop('spinner-1');
     }
        if (answer && answer.status == 200) {}

      }, function(reason) {
        if (reason.status == -1) {
          popUpService.popUpShow('Oops!', 'Vennligst sjekk nett-tilkoblingen din, og prøv igjen');
        }

      });
      return promise;
    }

  };

  service.get = function(url) {
    if ($rootScope.accessToken) {
      var promise = $http({
        method: 'get',
        url: service.restContextPath + url,
        header: {
          'x-access-token': $rootScope.accessToken
        }

      });

      promise.then(function(answer) {
        if (answer && answer.status == 200) {}
      }, function(reason) {
        if (reason.status == -1) {
          popUpService.popUpShow('Oops!', 'Vennligst sjekk nett-tilkoblingen din, og prøv igjen');
        }
      });

    } else {
      var promise = $http({
        method: 'get',
        url: service.restContextPath + url

      });
      promise.then(function(answer) {
        if (answer && answer.status == 200) {}
      }, function(reason) {
        if (reason.status == -1) {
          popUpService.popUpShow('Oops!', 'Vennligst sjekk nett-tilkoblingen din, og prøv igjen');
        }
      });
    }
    return promise;
  };


  return service;

}

export default {
  name: 'webService',
  fn: webService
};
