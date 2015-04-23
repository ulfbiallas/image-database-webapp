

var app = angular.module('image-database-webapp', ['ngRoute', 'ngResource']);



app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'images.htm',
			controller  : 'imageCollectionController'
		})
		.when('/images', {
			templateUrl : 'images.htm',
			controller  : 'imageCollectionController'
		})
		.when('/tags', {
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