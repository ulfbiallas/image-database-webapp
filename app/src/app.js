

var app = angular.module('image-database-webapp', ['ngRoute', 'ngResource', 'base64']);



app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'images.htm',
			controller  : 'imageCollectionController'
		})
		.when('/image', {
			templateUrl : 'images.htm',
			controller  : 'imageCollectionController'
		})
		.when('/image/:imageId', {
			templateUrl : 'image.htm',
			controller  : 'imageController'
		})
		.when('/tag', {
			templateUrl : 'tags.htm',
			controller  : 'tagCollectionController'
		})
		.when('/tag/:tagName', {
			templateUrl : 'tag.htm',
			controller  : 'tagController'
		})
		.when('/upload', {
			templateUrl : 'upload.htm',
			controller  : 'uploadController'
		})
});	



app.controller('loginController', function($scope, $http, $base64, AuthService){
    $scope.loginerror = "";
    $scope.loggedOut = true;

    $scope.login = function() {
        if ($scope.user != null) {
            var userpwstr = $scope.user.name + ":" + $scope.user.password
            var userpwstrBase64 = $base64.encode(userpwstr)

            $http.defaults.headers.common['Authorization'] = 'Basic ' + userpwstrBase64
            $http.get('http://localhost:8080/account/'+$scope.user.name).
            success(function(data, status, headers, config) {
                $scope.loggedOut = false
                $scope.loggedInAs = $scope.user.name
                $scope.loginerror = "";
                AuthService.setLoggedIn(true);
            }).
            error(function(data, status, headers, config) {
                $scope.loggedOut = true
                $scope.loginerror = "Login Error!";
            });
        }
    }

    $scope.logout = function() {
        $scope.loginerror = "";
        $scope.loggedOut = true;
        $scope.loggedInAs = "";
        AuthService.setLoggedIn(false);
    }
});



app.service('AuthService', function($route) {
    this.loggedIn = false
    this.isLoggedIn = function() {
        return this.loggedIn
    };
    this.setLoggedIn = function(loggedIn) {
        this.loggedIn = loggedIn
        $route.reload();
    };
});




app.controller('imageCollectionController', function($scope, $http, AuthService){
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



app.controller('imageController', function ($scope, $http, $routeParams) {
	$http.get('http://localhost:8080/image/'+$routeParams.imageId).then(function(image) {
		$scope.image = image.data;
	});
});



app.controller('tagCollectionController', function($scope, $http){
	$http.get('http://localhost:8080/tag').then(function(tags) {
		$scope.tags = tags.data;
	});
});



app.controller('tagController', function($scope, $http, $routeParams){
	$http.get('http://localhost:8080/tag/'+$routeParams.tagName).then(function(images) {
		$scope.images = images.data;
	});
});



app.controller('uploadController', function($scope, $http){
	$http.get('http://localhost:8080/tag').then(function(tags) {
		$scope.tags = tags.data;
	});
});