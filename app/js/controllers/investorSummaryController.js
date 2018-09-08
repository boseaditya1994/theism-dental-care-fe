function investorSummaryCtrl($timeout, sharedValues, $rootScope, FpConstants, utilService, ChartService, $scope) {
  'ngInject';

  // ViewModel
  const vm = this;

  /*This function initialises all the variables used in this controller and function calls*/

  vm.init = function() {
    try {
      $scope.util = utilService;
      vm.nothing=false;
      vm.initialize();
      vm.getValue();
      sharedValues.businessProfile = {};
    } catch (e) {
      console.error(e);
    }

  }

  vm.initialize = function() {
    try {
      vm.bidParts = [];
      vm.bidPartsCopy = [];
      vm.loanParts = [];
      vm.loanPartsCopy = [];
      vm.details = [];
      vm.isBroadcast = false;
      vm.grossPortfolioYield = '';
      vm.netInvestmentReturn = '';
      //Initialized variables so as to store values from API
      vm.ARatedInvestments= 0;
      vm.BRatedInvestments = 0;
      vm.CRatedInvestments = 0;
      vm.DRatedInvestments = 0;
      vm.isChartVisible = sharedValues.isChartVisible;
      vm.isChartDetails=false;
      vm.loanTypes = [
        { name: 'Aktive lån', code: 1, cssClass: 'text-success' },
        { name: 'Arkiverte lån', code: 2, cssClass: 'text-danger' },
        { name: 'Alle lån', code: 3 }
      ];
      vm.loanTypeSelected = vm.loanTypes[0];

      vm.bidTypes = [
        { name: 'Aktive', code: 1, cssClass: 'text-success' },
        { name: 'Avviste', code: 2, cssClass: 'text-danger' },
        { name: 'Alle', code: 3 }
      ];
      vm.bidTypeSelected = vm.bidTypes[0];

      vm.chartDetails = {
        type: '',
        pointFormat: '',
        series: [{
          name: '',
          data: [
            { name: '', y: '', color: '' },
            { name: '', y: '', color: '' },
            { name: '', y: '', color: '' },
            { name: '', y: '', color: '' },
            { name: '', y: '', color: '' }
          ]
        }]
      };
      sharedValues.isPercentFundedVisible = false;
      sharedValues.rating='';
    } catch (e) {
      console.error(e);
    }
  }


  vm.filterbidParts = function(bidType) {
    try {
      var bids = [];
      vm.bidPartsCopy = {};
      vm.bidTypeSelected = bidType;
      for (var i = 0; i < vm.bids.length; i++) {
        if (vm.bidFilter(vm.bids[i])) {
          bids.push(vm.bids[i]);
        }
      }
      vm.bidPartsCopy = bids;
      vm.bidParts = vm.bidPartsCopy;
    } catch (err) {
      console.error(err);
    }
  }


  vm.filterloanParts = function(loanType) {
    try {
      var loans = [];
      vm.loanPartsCopy = {};
      vm.loanTypeSelected = loanType;
      for (var i = 0; i < vm.loans.length; i++) {
        if (vm.loanFilter(vm.loans[i])) {
          loans.push(vm.loans[i]);
        }
      }
      vm.loanPartsCopy = loans;
      vm.loanParts = loans;

    } catch (err) {
      console.error(err);
    }
  }





  /*This function is used for loanFilter in the given page*/

  vm.loanFilter = function(loan) {
    try {
      if (vm.loanTypeSelected.code === 3)
      {
        return true;
      }
      if(vm.loanTypeSelected.code === 1)
      {
        return (loan.loan__Loan__r.loan__Loan_Status__c === 'Active - Good Standing' || loan.loan__Loan__r.loan__Loan_Status__c === 'Active - Bad Standing')
      }
      if(vm.loanTypeSelected.code === 2)
      {
        return (loan.loan__Loan__r.loan__Loan_Status__c === 'Closed - Obligations met' || loan.loan__Loan__r.loan__Loan_Status__c === 'Closed- Written Off' || loan.loan__Loan__r.loan__Loan_Status__c === 'Closed - Refinanced')
      }
      return loan.loan__Loan__r.loan__Loan_Status__c === vm.loanTypeSelected.code
    } catch (e) {
      console.error(e);
    }

  };

  /*This function is used for bidFilter in the given page*/

  vm.bidFilter = function(bid) {
    try {
      if (vm.bidTypeSelected.code === 1)
        return (bid.peer__Loan_Application__r.peer__Stage__c === 'In Funding' || bid.peer__Loan_Application__r.peer__Stage__c === 'Ready To Fund');
      if (vm.bidTypeSelected.code === 2)
        return (bid.peer__Loan_Application__r.peer__Stage__c === 'Expired');
      if (vm.bidTypeSelected.code === 3)
        return true;
      return bid.peer__Loan_Application__r.peer__Stage__c === vm.bidTypeSelected.code;
    } catch (e) {
      console.error(e);
    }

  };

  /*This function is used for getting all values in this page*/

  vm.getValue = function() {
    try {
     
      vm.bidParts = sharedValues.bidParts;
       
      vm.loanParts = sharedValues.loanParts;
      vm.loanPartsCopy = vm.loanParts;
      vm.loans = vm.loanParts;
      vm.details = sharedValues.details;
      

      var y = '';
      var z = '';
      for (var i = 0; i < vm.bidParts.length; i++) {
        if (vm.bidParts[i].peer__Loan_Application__r.Day_s__c > 0) {
          y = vm.bidParts[i].peer__Loan_Application__r.Day_s__c + ' Days';
          vm.bidParts[i].peer__Loan_Application__r.timeLeft = y;
        } else if (vm.bidParts[i].peer__Loan_Application__r.Day_s__c == 0) {
          y = vm.bidParts[i].peer__Loan_Application__r.Hour_s__c + ' Hours ' + vm.bidParts[i].peer__Loan_Application__r.Minute_s__c + ' Minutes';
          vm.bidParts[i].peer__Loan_Application__r.timeLeft = y;
        } else if (vm.bidParts[i].peer__Loan_Application__r.Day_s__c < 0) {
          y = vm.bidParts[i].peer__Loan_Application__r.Hour_s__c + ' Hours ' + vm.bidParts[i].peer__Loan_Application__r.Minute_s__c + ' Minutes';
          vm.bidParts[i].peer__Loan_Application__r.timeLeft = y;
        } else {
          y = vm.bidParts[i].peer__Loan_Application__r.Day_s__c + ' Days ' + vm.bidParts[i].peer__Loan_Application__r.Hour_s__c + ' Hours ' + vm.bidParts[i].peer__Loan_Application__r.Minute_s__c + ' Minutes';
          vm.bidParts[i].peer__Loan_Application__r.timeLeft = y;
        }
        z = (vm.bidParts[i].peer__Loan_Application__r.Day_s__c * 24 * 60) + (vm.bidParts[i].peer__Loan_Application__r.Hour_s__c * 60) + (vm.bidParts[i].peer__Loan_Application__r.Minute_s__c);
        vm.bidParts[i].peer__Loan_Application__r.timeLeftInMinutes = z;
        //vm.bidParts[i].peer__Investment_Amount__c = Math.trunc(vm.bidParts[i].peer__Investment_Amount__c);
      }
      vm.bidPartsCopy = vm.bidParts;
      vm.bids = vm.bidParts;
      var count = Object.keys(vm.details).length;
      if (count > 0) {
        //Calculations and values from API stored so as to plot the pie chart
        var length=vm.details.data.creditBandAllocation.length;
        if ((vm.details.data.investorDetails[0].loan__Undeployed_Funds__c != 0 || vm.details.data.investorDetails[0].peer__Amount_In_Funding__c != 0) && length>0) {
          
          if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}
          for(var i=0;i<length;i++)
          {
            if(vm.details.data.creditBandAllocation[i].peer__Credit_Band__c.startsWith('A'))
            {
              vm.ARatedInvestments+=vm.details.data.creditBandAllocation[i].peer__Total_Investment_Order_Amount__c;
            }
            else if(vm.details.data.creditBandAllocation[i].peer__Credit_Band__c.startsWith('B'))
            {
              vm.BRatedInvestments+=vm.details.data.creditBandAllocation[i].peer__Total_Investment_Order_Amount__c;
            }
            else if(vm.details.data.creditBandAllocation[i].peer__Credit_Band__c.startsWith('C'))
            {
              vm.CRatedInvestments+=vm.details.data.creditBandAllocation[i].peer__Total_Investment_Order_Amount__c;
            }
            else
            {
              vm.DRatedInvestments+=vm.details.data.creditBandAllocation[i].peer__Total_Investment_Order_Amount__c;
            }
          }
          vm.isChartDetails=true;
          vm.chartDetails = {
            type: 'pie',
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b> <br> {point.label} : <b>{point.custom}</b>',
            series: [{
              name: 'Verdi',
              data: [
              { name: 'Kredittklasse A', y: vm.ARatedInvestments, color: '#00008B',custom : $scope.util.getAmount(vm.ARatedInvestments),label:'Beløp'},
                { name: 'Kredittklasse B ', y: vm.BRatedInvestments, color: '#2B60DE',custom : $scope.util.getAmount(vm.BRatedInvestments),label:'Beløp'},
                { name: 'Kredittklasse C', y: vm.CRatedInvestments, color: '#488AC7',custom : $scope.util.getAmount(vm.CRatedInvestments),label:'Beløp'},
                { name : 'Kredittklasse D', y : vm.DRatedInvestments, color : '#5e93c4',custom : $scope.util.getAmount(vm.DRatedInvestments),label:'Beløp',},
                { name: 'Reservert beløp', y: vm.details.data.investorDetails[0].peer__Amount_In_Funding__c, color: '#A9A9A9',custom : $scope.util.getAmount(vm.details.data.investorDetails[0].peer__Amount_In_Funding__c),label:'Beløp'},
                { name: 'Tilgjengelige midler', y: vm.details.data.investorDetails[0].peer__Funds_Available_For_Investment__c, color: '#D3D3D3',custom : $scope.util.getAmount(vm.details.data.investorDetails[0].peer__Funds_Available_For_Investment__c),label:'Beløp'}
                ]
            }]
          };
          $timeout(function() {
            ChartService.render(vm.chartDetails);
          }, 1000);
        }
      }
      vm.LoanStatus();
    } catch (e) {
      console.error(e);
    }

  }

  /*This function handles the loan status and converts them from english to norweigan*/

  vm.LoanStatus = function() {
    try {
      for (var i = 0; i < vm.loanParts.length; i++) {
        if (vm.loanParts[i].loan__Loan__r) {
          if (vm.loanParts[i].loan__Loan__r.loan__Loan_Status__c == 'Active - Good Standing' || vm.loanParts[i].loan__Loan__r.loan__Loan_Status__c == 'Active - Bad Standing') {
            if (vm.loanParts[i].loan__Loan__r.loan__Loan_Status__c == 'Active - Good Standing') {
              vm.loanParts[i].loan__Loan__r.loan__Loan_Status__name = 'Betalinger i rute';

            } else {
              vm.loanParts[i].loan__Loan__r.loan__Loan_Status__name = 'Betalinger mangler';

            }
          } else if (vm.loanParts[i].loan__Loan__r.loan__Loan_Status__c == 'Closed - Obligations met' || vm.loanParts[i].loan__Loan__r.loan__Loan_Status__c == 'Closed- Written Off' ||  vm.loanParts[i].loan__Loan__r.loan__Loan_Status__c == 'Closed - Refinanced') {
            vm.nothing=true;
            if (vm.loanParts[i].loan__Loan__r.loan__Loan_Status__c == 'Closed - Obligations met') {
              vm.loanParts[i].loan__Loan__r.loan__Loan_Status__name = 'Fullført - Forpliktelser innfridd';
            } else if (vm.loanParts[i].loan__Loan__r.loan__Loan_Status__c == 'Closed- Written Off') {
              vm.loanParts[i].loan__Loan__r.loan__Loan_Status__name = 'Nedskrevet';
            } else {
              vm.loanParts[i].loan__Loan__r.loan__Loan_Status__name = 'Refinansiert';
            }
          } else {
            vm.loanParts.splice(i, 1);
            i = i - 1;

          }
        }
      }
    } catch (e) {
      console.error(e);
    }

  };

  $rootScope.$on('userDetailsUpdate', function() {
    vm.init();
  });

  vm.init();
}


export default {
  name: 'investorSummaryCtrl',
  fn: investorSummaryCtrl
};
