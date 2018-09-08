function fpTransferOutCurrency($filter) {
    'ngInject';

//Returns currency in norwegian format
  return function(value) {
  	
        if (!value) return 0;
        

        var formattedString = null;
        //formattedString = 
        formattedString= $filter('currency')(value, '');
        formattedString = formattedString.split(',').join(' ');
        formattedString = formattedString.split('.').join(',');
        return formattedString;
    }

}

export default {
  name: 'fpTransferOutCurrency',
  fn: fpTransferOutCurrency
};