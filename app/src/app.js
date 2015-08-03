

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
 		.when('/image/:imageId/view', {
			templateUrl : 'imageview.htm',
			controller  : 'imageViewController'
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



app.controller('tagController', function($scope, $http, $routeParams, AuthService){
    $scope.isLoggedIn = AuthService.isLoggedIn()

    $http.get('http://localhost:8080/tag/'+$routeParams.tagName).then(function(images) {
        $scope.images = images.data
    })
})



app.controller('uploadController', function($scope, $http){
	$http.get('http://localhost:8080/tag').then(function(tags) {
		$scope.tags = tags.data;
	});
});