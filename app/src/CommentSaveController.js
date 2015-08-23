var app = angular.module('image-database-webapp')

app.controller('commentSaveController', function($scope, $http){
    $scope.submit = function() {
        console.log('Comment: ' + $scope.content)
    }
})