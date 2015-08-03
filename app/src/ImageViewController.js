var app = angular.module('image-database-webapp')

app.controller('imageViewController', function ($scope, $http, $routeParams) {

    imageUrl = 'http://localhost:8080/image/'+$routeParams.imageId+'/view'

    $http.get(imageUrl).then(function(image) {
        var data = image.data
        $http({
            url: imageUrl,
            method: 'GET',
            responseType: 'arraybuffer'
        }).success(function(resp, config1, config2, config3) {
            $scope.imageData = btoa(convertLargeUint8ArrayToString(new Uint8Array(resp)))
        })
    })

})



// src: http://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string
function convertLargeUint8ArrayToString(array){
    var chunkSize = 0x8000;
    var charArray = [];
    for (var i=0; i<array.length; i+=chunkSize) {
        charArray.push(String.fromCharCode.apply(null, array.subarray(i, i+chunkSize)));
    }
    return charArray.join("");
}