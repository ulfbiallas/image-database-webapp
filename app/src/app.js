

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



app.controller('loginController', function($scope, $http, $base64){
$scope.blalala = "wurst"
    $scope.login = function() {
        console.log("login: ")
        console.log("vv: " + $scope.user)
        if ($scope.user != null) {
            console.log("username: " + $scope.user.name)
            console.log("password: " + $scope.user.password)
            var userpwstr = $scope.user.name + ":" + $scope.user.password
            var userpwstrBase64 = $base64.encode(userpwstr)
            console.log("userpwstrBase64: " + userpwstrBase64)

            $http.defaults.headers.common['Authorization'] = 'Basic ' + userpwstrBase64
            $http.get('http://localhost:8080/account/'+$scope.user.name).
            success(function(data, status, headers, config) {
                console.log("success: " + data)
                $scope.loggedIn = true
                $scope.loggedInAs = $scope.user.name
            }).
            error(function(data, status, headers, config) {
                console.log("error: " + status)
                $scope.loggedIn = false
            });
        }
    }
});



app.controller('imageCollectionController', function($scope, $http){
    $scope.images = []
    $scope.page = 0

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