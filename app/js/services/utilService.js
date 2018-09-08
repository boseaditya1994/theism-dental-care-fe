function utilService($rootScope, $state, $window, sharedValues, $cookies, $uibModal,$uibModalStack, $filter) {

  'ngInject';

  const service = {};
  var moment = require('moment');

  //This function shows upto 2 decimal places of any fraction number

  service.getTwoDecimalPlaces = function(dollar_amt) {
    if (dollar_amt) {
      var z = parseFloat(Math.round(dollar_amt * 100) / 100).toFixed(2);
      return z;
    } else {
      return 0.00;
    }
  }

  //This function is used to correct date formats according to the project requirement

  service.dateFormat = function(variable) {
    var finalDate;
    if (!variable) {
      finalDate = '';
    } else {
      finalDate = moment(variable).format('DD.MM.YYYY');
      return finalDate;
    }
  }

  //This function is used to correct timeLeft field coming from the back end

  service.timeLeft = function(variable) {
    var date = variable;
    if (!date) {
      return null;
    } else {
      date = date.replace(' Days', ' dager');
      date = date.replace(' Years', 'y');
      date = date.replace(' Hours', 't');
      date = date.replace(' Minutes', 'm');
      date = date.split(' ').join(' & ');
      date = date.replace(' & dager', ' dager');
      return date;
    }
  }

  service.noRootScopeScenario = function() {
    if ($rootScope.accessToken == null) {
      $state.go('login');
    }
  }

  /*insert a character every n characters*/

  service.insertCharAfterNChar = function(str, n) {
    var ret = [];
    var i;
    var len;
    for (i = 0, len = str.length; i < len; i += n) {
      ret.push(str.substr(i, n))
    }
    return ret;
  }

  service.statusTranslation = function(status) {
    if (status == 'Active - Bad Standing')
      return 'Forsinkede betalinger';
    else if (status == 'Active - Good Standing')
      return 'Betalinger i rute';
    else if (status == 'Approved')
      return 'Godkjent';
    else if (status == 'Canceled')
      return 'Kansellert';
    else if (status == 'Closed - Obligations met')
      return 'Fullført - Tilbakebetalt';
    else if (status == 'Closed - Premature')
      return 'Fullført - Tidlig innfrielse';
    else if (status == 'Closed - Refinanced')
      return 'Avsluttet - Refinansiert';
    else if (status == 'Closed- Written Off')
      return 'Avsluttet - Nedskrevet';
    else if (status == 'Partial Application')
      return 'Pågående kapitalinnhenting';
    else if (status == 'Pending Approval')
      return 'Venter på godkjenning';
    else if (status == 'Funded')
      return 'Utbetalt og finansiert';
    else if (status == 'Submitted')
      return 'Innsendt';
    else if (status == 'Under Pre- Screening')
      return 'Under evaluering';
    else if (status == 'Credit Evaluation')
      return 'Kredittvurdering pågår';
    else if (status == 'Credit Committee Review')
      return 'Til vurdering hos kredittkomité';
    else if (status == 'Declined')
      return 'Avslått';
    else if (status == 'Approved if modifications')
      return 'Godkjent med krav om endringer';
     else if (status == 'Marketing Material Approved by Customer')
      return 'Markedsføringsmateriale godkjent av kunde';
    else if (status == 'Listed-Marketplace' || status == 'Ready To Fund' )
      return 'Pågående kapitalinnhenting';
  
  }

  /* this function checks whether its a mobile or desktop*/

  service.detectmob = function() {
    if ($window.innerWidth <= 800) {
      return true;
    } else {
      return false;
    }
  }

  // This function translates loanPurposes from English to Norweigan

  service.loanPurposeTranslate = function(purpose) {
    if (purpose == 'Other')
      return 'Annet';
    else if (purpose == 'Bridge loan')
      return 'Brolån';
    else if (purpose == 'Production equipment')
      return 'Produksjonsutstyr';
    else if (purpose == 'Working Capital')
      return 'Arbeidskapital';
    else if (purpose == 'Growth capital / Expansion capital')
      return 'Vekstkapital/ekspansjonskapital';
  }


  //To get the Term for  the loan in BorrowerViewLoan Details

  service.getTerm = function(term){
    if(term == 6)
      return '6 mnd';
    else if(term == 12)
      return '1 år (12 mnd)';
    else if(term == 24)
      return '2 år (24 mnd)';
    else if(term == 36)
      return '3 år (36 mnd)';
    else if(term == 48)
      return '4 år (48 mnd)';
    else if(term == 60)
      return '5 år (60 mnd)';
  }

  //This disable buttons in various input type places and forms

  service.disableButton = function(form) {
    var disableButton = false;
    if ((form.firstName && form.lastName && form.country && form.telephone && form.bankAccountNumber) || (form.How_often_do_you_want_to_invest && form.What_investment_horizon && form.purpose && form.WhereDoesTheMoneyComesFrom) || (form.Nationality && form.Occupation && form.monthlySalaryORRevenue && form.transferringAmtAtOpening && form.How_often_do_you_want_to_deposit && form.deposit_per_year && form.withdrawal_frequency) || (form.monthlySalaryORRevenue && form.transferringAmtAtOpening && form.How_often_do_you_want_to_deposit && form.deposit_per_year && form.withdrawal_frequency)) {
      disableButton = false;
    } else {
      disableButton = true;
    }
    return disableButton;
  }

  service.disableButtonWithConfirmPsw = function(form, confirmPassword) {
    var disableButton = true;
    if ((form.applicantEmail && form.applicantPassword && form.applicantType && form.typeOfInvestor && confirmPassword && (form.applicantPassword == confirmPassword))) {
      disableButton = false;
    } else {
      disableButton = true;
    }
    return disableButton;
  }

  service.disableChangePwdBtn = function(oldPassword, newPassword, repeatNewPassword) {
    try {
      if (oldPassword && newPassword && repeatNewPassword) {
        if (oldPassword != newPassword) {
          if (newPassword == repeatNewPassword) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      } else {
        return true;
      }
    } catch (err) {
      console.error(err);
    }

  }

  //This function initializes accountID in various scenarios

  service.setAccountId = function() {
    var accountID = '';
    
    if (sharedValues.userInfo.accountID != '') {
      accountID = sharedValues.userInfo.accountID;
       
    }
    return accountID;
    
  }

  //This function sets and changes all values of cookies

  service.cookiesSet = function(field, value) {
    $cookies.put(field, value);
  }

  service.cookiesRemove = function(field) {
    $cookies.remove(field);
  }

  //This function fetches the data from cookies
  service.cookiesGet = function(field) {
    return $cookies.get(field);
  }


  //This function does not allow the user to go to the previous page

  service.backButtonDisable = function() {
    $window.onpopstate = function(e) {
      e.preventDefault();
    }
  }


  //This function opens any uibModal

  service.uibModalOpen = function(controller, templateUrl) {
    $uibModal.open({
      controller: controller,
      templateUrl: templateUrl
    });
  }

  service.uibModalClose = function(){
    $uibModalStack.dismissAll();
  }

  service.setPersonalIDNumber = function(personalIDNumber) {
    personalIDNumber = personalIDNumber.replace(' ', '');
    var new2 = '';
    var new1 = '';
    for (var i = 0; i < 11; i++) {
      if (i <= 5) {
        vm.new2 += vm.spacepersonalIDNumber.charAt(i);
      }
      if (i > 5) {
        new1 += vm.spacepersonalIDNumber.charAt(i);
      }
    }
    personalIDNumber = new2 + ' ' + new1;
    return personalIDNumber;
  }

  //This function returns the norweigan date format
service.dateFormatForDetails = function(str)
  {
    if(str!=null){
     var arr = str.split('-');
               var months = ['jan', 'feb', 'mars', 'apr', 'mai', 'jun','jul', 'aug', 'sept', 'okt', 'nov', 'des'];
               var i = 1;
               for (i; i <= months.length; i++) {
                      if (i == arr[1])
                       {
                         break;
                       }
                  }
                  var formatddate = arr[2]  + ' ' + months[i-1] + ' ' + arr[0];
                  return(formatddate);
    }
  }

//To get the Term for  the loan in BorrowerViewLoan Details

  service.getTerm = function(term){
    if(term == 6)
      return '6 mnd';
    else if(term == 12)
      return '1 år (12 mnd)';
    else if(term == 24)
      return '2 år (24 mnd)';
    else if(term == 36)
      return '3 år (36 mnd)';
    else if(term == 48)
      return '4 år (48 mnd)';
    else if(term == 60)
      return '5 år (60 mnd)';
  }

  //This function gets the amount in the Norweigan format
  service.getAmount = function(value)
  {
    if (!value)
    {
      return 0;
    }
    else
    {
      var formattedString = null;
      formattedString= $filter('currency')(value, '', 2);
      formattedString = formattedString.split(',').join(' ');
      formattedString = formattedString.replace('.',',');
      return formattedString;
    }   
  }

  return service;
}

export default {
  name: 'utilService',
  fn: utilService
};
