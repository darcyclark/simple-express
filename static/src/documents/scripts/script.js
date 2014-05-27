function Ctrl($scope, $http) {
  $scope.submit = function() {
    if ($scope.text) {
      // send to Express route
      $http.post('/contact', { field: $scope.text }).success(function(response) {
          $scope.message = response;
      });
    }
  };
}
