

var app = angular.module('image-database-webapp', ['ngRoute', 'ngResource']);



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
		.when('/upload', {
			templateUrl : 'upload.htm',
			controller  : 'uploadController'
		})
});	



app.controller('imageCollectionController', function($scope, $http){
	$http.get('http://localhost:8080/image').then(function(images) {
		$scope.images = images.data;
	});
});



app.controller('imageController', function ($scope, $routeParams) {
	$scope.imageUrl = 'http://localhost:8080/image/'+$routeParams.imageId;
});



app.controller('tagCollectionController', function($scope, $http){
	$http.get('http://localhost:8080/tag').then(function(tags) {
		$scope.tags = tags.data;
	});
});



app.controller('uploadController', function($scope, $http){
	$http.get('http://localhost:8080/tag').then(function(tags) {
		$scope.tags = tags.data;
	});
});