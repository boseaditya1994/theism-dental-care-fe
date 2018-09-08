function sharedValues() {
  'ngInject';

  const service = {};


	  service.status='';
    service.headerName='';
   	service.typeOfApplicant='';
   	service.accountID='';
    service.noOfLoan='';
    service.availableFunds='';
    service.firstTimeApplicant='';
    sharedValues.accountNumber='';
    service.firstTimeApplicantAfterLogin='';
   	service.investorPrivateForm1={};
   	service.investorPrivateForm2={};
    service.investorPrivateForm3={};
    service.investorCompanyForm1={};
    service.investorCompanyForm2={};
    service.investorCompanyForm3={};
    service.profileForm={};
    service.investorDetails={};
    service.companyBankDetails={};
    service.bidParts=[];
    service.loanParts=[];
    service.details={};
    service.loanId='';
    service.loanName='';
    service.isAmountZero='';
    service.isAmountGreater='';
    service.invalidAmount='';
    service.amountToInvest='';
    service.businessProfile={};
    service.submitted={};
    service.userInfo = {};
    service.ongoingLoans={};
    service.appliedLoans=[];
    service.transactionAmount='';
    service.fromState='';
    service.investorTrustAccount=[];
    service.loanAmount=[];
    service.investorBank='';
    service.rating='';
    service.reelle=false;
    service.multiple=false;
    service.isPercentFundedVisible=false;
    service.isChartVisible=false;
    service.setUserInfo = function(userInfoObj) {
        service.userInfo = userInfoObj;
    }
  return service;

}

export default {
  name: 'sharedValues',
  fn: sharedValues
};
