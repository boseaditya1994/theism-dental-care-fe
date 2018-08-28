function webService($http, AppSettings, $rootScope) {
    'ngInject';

    const service = {};

    service.restContextPath = 'http://' + AppSettings.webhost + ':' + AppSettings.port + '/api/';



    service.post = function(url, param) {
        console.log('Webservice calling');
        console.log(param);
        var parameter = JSON.stringify(param);
        console.log($rootScope.accessToken);
        if ($rootScope.accessToken) {
            var promise = $http({
                method: 'post',
                url: service.restContextPath + url,
                data: {
                    parameter,
                    token:$rootScope.accessToken
                },
                header: {
                    'x-access-token': $rootScope.accessToken
                }

            });
            return promise;
        } else {
            //console.log(param);
            var promise = $http({
                method: 'post',
                url: service.restContextPath + url,
                data: param
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
        } else {
            var promise = $http({
                method: 'get',
                url: service.restContextPath + url

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