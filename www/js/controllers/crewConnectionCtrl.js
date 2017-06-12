angular.module('crewConnectionCtrl',[])
  .controller('crewConnectionCtrl', function($scope, $state, $http) {
    $scope.user = {};
    $scope.Login = function() {
      var request = {
        method: "post",
        url: "/api/cia/loginHandler.do",
        //url: "http://cia.airchina.com.cn/cia/loginHandler.do",
        data: {
          userId: $scope.user.username,
          password: $scope.user.password
        }
      };
      var tempStorage = window.sessionStorage;
      $http(request).then(function (response){
        console.log(response.status);
        if(response.data.includes('notification')){
          $state.go('tabsController.roster');
        }
      })
        .catch(function(response) {
          console.error('Gists error', response.status, response.data);
          if(response.data.includes('notification')){
            $state.go('tabsController.roster');
          }
        });
    }
  });

