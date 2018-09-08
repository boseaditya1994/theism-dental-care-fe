function fpLoanStatus(FpConstants) {
'ngInject';

//checks status and return whether it is in Payments on track or Payments missing or Default or Archived
return function (status) {
        if (!status) return null;

        switch(status) {
            case FpConstants.LoanStatus.paymentOnTrack:
                //return '<i class='fa fa-circle text-success'></i> Payments on track';'
                return 'Payments on track';
            case FpConstants.LoanStatus.missedPayment:
                //return '<i class='fa fa-circle text-warning'></i> Payments missing';
                return 'Payments missing';
            case FpConstants.LoanStatus.defaulted:
                //return '<i class='fa fa-circle text-danger'></i> Default';
                return 'Default';
            case FpConstants.LoanStatus.archived:
                //return '<i class='fa fa-circle text-muted'></i> Archived';
                return 'Archived';
        }
        return null;
    }
}

export default {
  name: 'fpLoanStatus',
  fn: fpLoanStatus
};