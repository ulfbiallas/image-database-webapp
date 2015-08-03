var app = angular.module('image-database-webapp')

app.controller('loginController', function($scope, $http, $base64, AuthService) {

    $scope.loginerror = ""
    $scope.loggedOut = true

    $scope.login = function() {
        if ($scope.user != null) {
            var userpwstr = $scope.user.name + ":" + $scope.user.password
            var userpwstrBase64 = $base64.encode(userpwstr)

            $http.defaults.headers.common['Authorization'] = 'Basic ' + userpwstrBase64
            $http.get('http://localhost:8080/account/'+$scope.user.name).
            success(function(data, status, headers, config) {
                $scope.loggedOut = false
                $scope.loggedInAs = $scope.user.name
                $scope.loginerror = ""
                AuthService.setLoggedIn(true)
            }).
            error(function(data, status, headers, config) {
                $scope.loggedOut = true
                $scope.loginerror = "Login Error!"
            });
        }
    }

    $scope.logout = function() {
        $scope.loginerror = ""
        $scope.loggedOut = true
        $scope.loggedInAs = ""
        AuthService.setLoggedIn(false)
    }

});