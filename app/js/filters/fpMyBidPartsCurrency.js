function fpMyBidPartsCurrency($filter) {
    'ngInject';
//Returns currency in norwegian format
  return function(value) {
  	
        if (!value) return 0;
        

        var formattedString = null;
        formattedString= $filter('currency')(value, '', 0);
        formattedString = formattedString.split(',').join(' ');
        return formattedString;
    }

}

export default {
  name: 'fpMyBidPartsCurrency',
  fn: fpMyBidPartsCurrency
};