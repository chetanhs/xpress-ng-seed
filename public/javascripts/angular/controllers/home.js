app.controller('HomeCtrl', function ($scope, $timeout, search) {
  $scope.search = function(){
    $scope.showLoader = true;
    $timeout(function(){
      search.query({q: $scope.q}, function(jobs){
        $scope.jobs = jobs;
        $scope.customResults = $scope.q && $scope.q != '';
        $scope.showLoader = false;
      })
    }, 600);
  }

  $scope.init = function(){
    //Load jobs to be displayed on the home page
    $scope.search();
  }

  $scope.init();

});