function fpConstantsFilter(FpConstants) {
    'ngInject';

  return function (idAsString, type) {
        if (!idAsString) return null;

        var allValues = FpConstants[type];
        var foundValue = _.find(allValues, function (val) {
           return val.id === parseInt(idAsString);
        });
        return foundValue ? foundValue.name : null;
    }

}

export default {
  name: 'fpConstantsFilter',
  fn: fpConstantsFilter
};