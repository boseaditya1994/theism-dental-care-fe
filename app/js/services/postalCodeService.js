function postalCodeService($http) {
  'ngInject';
  const service = {};
  var postalPlaceApi =
    'https://api.bring.com/shippingguide/api/postalCode.json?clientUrl=http://www.fundingpartner.no&pnr=';

  service.getPostalPlaceAsync = function(postalCode) {
    return $http.get(postalPlaceApi + postalCode);
  };
  return service;
}


export default {
  name: 'postalCodeService',
  fn: postalCodeService
};
