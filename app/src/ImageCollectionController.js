var app = angular.module('image-database-webapp')

app.controller('imageCollectionController', function($scope, $http, AuthService) {

    $scope.images = []
    $scope.page = 0
    $scope.isLoggedIn = AuthService.isLoggedIn()

    $scope.loadMore = function() {
        $http.get('http://localhost:8080/image?page='+$scope.page).then(function(images) {
            $scope.images = $scope.images.concat(images.data)
            $scope.page += 1
        });
    }

    $scope.loadMore()

});
