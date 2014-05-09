app.controller('HomeCtrl', function ($scope, home) {
  $scope.message = "This is Home controller";

  $scope.requestServer = function(){
    home.getMessage(function(response){
      $scope.message = response.message;
    })
  }
});