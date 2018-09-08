 function notificationService() {

   'ngInject';
   var toastr = require('toastr');
   const service = {};
   toastr.options = {
     'closeButton': true,
     'debug': false,
     'positionClass': 'toast-bottom-full-width',
     'progressBar': true,
     'onclick': null,
     'fadeIn': 500,
     'fadeOut': 3000,
     'timeOut': 6000,
     'extendedTimeOut': 5000,
     'newestOnTop': true
   };


   service.success = function(text, heading, timeoutInMs) {
     toastr.success(text, heading || 'Suksess', { timeOut: timeoutInMs || 2000, extendedTimeOut: 500 });
   };
   service.savedOk = function() {
     toastr.success('Lagring vellykket', 'Suksess', { timeOut: 2000, extendedTimeOut: 500 });
   };
   service.error = function(text, heading) {
     toastr.error(text, heading || 'Error');
   };
   service.info = function(text, heading) {
     toastr.info(text, heading || 'Info');
   };
   service.warning = function(text, heading) {
     toastr.warning(text, heading || 'Warnign');
   };
   service.validationError = function(text, heading) {
     toastr.warning(text, heading || 'Validation error');
   };
   service.clear = function() {
     toastr.clear();
   };
   return service;

 }

 export default {
   name: 'notificationService',
   fn: notificationService
 };
