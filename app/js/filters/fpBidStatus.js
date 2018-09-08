function fpBidStatus() {
//Check status and according to the status return active Or archived
return function (status) {
        if (!status) return null;

        if (status === 'In Funding' || status === 'Ready To Fund') {
            return '<i class="fa fa-circle text-success"></i> Pågående';
        } else if (status === 2) {
            return '<i class="fa fa-circle text-danger"></i> Avviste';
        }
        return null;
    }
}

export default {
  name: 'fpBidStatus',
  fn: fpBidStatus
};