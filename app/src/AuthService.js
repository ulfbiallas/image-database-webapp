var app = angular.module('image-database-webapp')

app.service('AuthService', function($route) {

    this.loggedIn = false

    this.isLoggedIn = function() {
        return this.loggedIn
    }

    this.setLoggedIn = function(loggedIn) {
        this.loggedIn = loggedIn
        $route.reload()
    }

});