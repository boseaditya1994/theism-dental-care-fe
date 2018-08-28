function RootCtrl(LoginService,$cookies, $rootScope, $state,sharedValues) {
  'ngInject'
  
  const vm = this;
  vm.status='';

  vm.init = function() {
    console.log(sharedValues.email);
    var login = LoginService.apiLogin();
    login.then(function(answer){
    console.log('Success',answer);
    },
    function(reason){
      console.log('Failed',reason);
    });
    $rootScope.accessToken=$cookies.get('token');
    console.log($rootScope.accessToken);
    if($rootScope.accessToken==null){
      $state.go('Home');
    }
    else{
      $state.go('dashboard');
    }
  }

  vm.logOut = function() {
    $rootScope.accessToken = null;
    //$cookies.remove('accountID');
    $cookies.remove('token');
    $state.go('Home');
  }

  vm.init();

}

export default {
  name: 'RootCtrl',
  fn: RootCtrl
};