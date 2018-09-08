function fpPercentage($filter) {
		'ngInject'; 

    //this filter is used show decimal places after input value
  return function (input, decimals) {
        decimals = decimals || 0;
        var formattedString = null;
        if(input!=null){
         

          input = parseFloat(input).toFixed(1);
        formattedString= $filter('number')(input , decimals) + '%';
        
        formattedString = formattedString.replace('.',',');
        return formattedString;
      }
      else{
        formattedString='0%';
        return formattedString;
      }

    };

}

export default {
  name: 'fpPercentage',
  fn: fpPercentage
};



