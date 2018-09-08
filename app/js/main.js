import angular from 'angular';
require('angular-cookies');
require('angular-messages');
require('angular-spinner');
// angular modules
import constants from './constants';
import fpconstants from './fpconstants';

import onConfig from './on_config';
import onRun from './on_run';

//import validation from 'nocms-validation';

import 'angular-moment';
import 'angular-ui-router';
import 'angular-sanitize';
import 'angular-smart-table';
import 'angular-ui-bootstrap';
import 'angular-smart-table';
import 'ui-select';
import './templates';
import './filters';
import './controllers';
import './services';
import './directives';

// create and bootstrap application
const requires = [
  'ui.router',
  'ngCookies',
  'ngMessages',
  'templates',
  'app.filters',
  'app.controllers',
  'app.services',
  'app.directives',
  'ui.bootstrap',
  'ui.select',
  'ngSanitize',
  'angularMoment',
  'smart-table',
  'angularSpinner'

];

// mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppSettings', constants);
angular.module('app').constant('FpConstants', fpconstants);

angular.module('app').config(onConfig);

angular.module('app').run(onRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
