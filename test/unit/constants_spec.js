describe('Unit: Constants', function() {

 let constants;

 beforeEach(function() {
   // instantiate the app module
   angular.mock.module('app');

   // mock the directive
   angular.mock.inject((AppSettings) => {
     constants = AppSettings;
   });
 });

 it('should exist', function() {
   expect(constants).toBeDefined();
 });

 it('should have an application name', function() {
   expect(constants.appTitle).toEqual('Funding Partner');
 });

  it('should have an application type', function() {
    expect(constants.appType).toEqual('uat');
  });

 it('should have an application Url', function() {
   expect(constants.apiUrl).toEqual('/api/v1');
 });

 it('should have an application webhost', function() {
   expect(constants.webhost).toEqual('localhost');
 });

 it('should have an application port', function() {
   expect(constants.port).toEqual('8082');
 });

 it('should have an application uaturl', function() {
   expect(constants.uaturl).toEqual('uatfp-mw.herokuapp.com');
 });

});