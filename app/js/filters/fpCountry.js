function fpCountry(FpConstants) {
    'ngInject';
//This filter checks the country code and returns country
  return function (input) {
        if (!input) return null;
        var country = _.find(FpConstants.AllCountries, function (constCountry) { return constCountry.code === input });
        return country ? country.name : null;
    };
}

export default {
  name: 'fpCountry',
  fn: fpCountry
};