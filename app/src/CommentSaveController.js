var app = angular.module('image-database-webapp')

app.controller('commentSaveController', function($scope, $http, $routeParams){
    $scope.submit = function() {
        console.log('Comment: ' + $scope.content)
        console.log('Image: ' + $routeParams.imageId)

        var comment = {
            "content": $scope.content
        }

        var commentUrl = 'http://localhost:8080/image/'+$routeParams.imageId+'/comments'
        $http.post(commentUrl, comment).then(function(response) {
            console.log('status: ' + response.status)
        })

    }
})